import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const pkg = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'))
const cli = process.env.npm_execpath
assert.ok(cli, 'Run this script using pnpm check:tarball')
function pnpm(args, cwd = root) {
  // pnpm may be a standalone executable or a Node.js entry point.
  const executable = /\.(?:c?js|mjs)$/.test(cli) ? process.execPath : cli
  const argv = executable === process.execPath ? [cli, ...args] : args
  execFileSync(executable, argv, { cwd, stdio: 'inherit', timeout: 180000 })
}

mkdirSync(path.join(root, 'artifacts'), { recursive: true })
const tarball = path.join(root, 'artifacts', `${pkg.name}-${pkg.version}.tgz`)
// check:all has already built and tested this exact checkout; do not rebuild during packing.
pnpm(['--config.ignore-scripts=true', 'pack', '--out', tarball])
const entries = execFileSync('tar', ['-tzf', tarball], { encoding: 'utf8' }).trim().split(/\r?\n/)
for (const entry of entries) {
  assert.ok(
    /^package\/(?:dist\/|package\.json$|README\.md$|LICENSE$)/.test(entry),
    `Unexpected package entry: ${entry}`
  )
}
for (const required of [
  'dist/openlayers-map-kit.es.mjs',
  'dist/openlayers-map-kit.umd.cjs',
  'dist/index.d.ts',
  'dist/index.d.mts',
  'README.md',
  'LICENSE'
]) {
  assert.ok(entries.includes(`package/${required}`), `Missing package entry: ${required}`)
}

const consumerRoot = path.join(root, '.tmp-package-consumer')
mkdirSync(consumerRoot, { recursive: true })
const consumer = mkdtempSync(path.join(consumerRoot, 'run-'))
writeFileSync(
  path.join(consumer, 'package.json'),
  JSON.stringify({ name: 'omap-tarball-consumer', private: true, type: 'module' })
)
pnpm(
  [
    '--ignore-workspace',
    'add',
    '--ignore-scripts',
    '--lockfile=false',
    tarball,
    'ol@10.6.1',
    `typescript@${pkg.devDependencies.typescript}`,
    `vite@${pkg.devDependencies.vite}`
  ],
  consumer
)
for (const file of ['esm-smoke.mjs', 'cjs-smoke.cjs', 'types-smoke.mts']) {
  copyFileSync(path.join(root, 'tests/consumer', file), path.join(consumer, file))
}
execFileSync(process.execPath, ['esm-smoke.mjs'], { cwd: consumer, stdio: 'inherit' })
execFileSync(process.execPath, ['cjs-smoke.cjs'], { cwd: consumer, stdio: 'inherit' })
writeFileSync(
  path.join(consumer, 'tsconfig.json'),
  JSON.stringify({
    compilerOptions: {
      target: 'ES2022',
      module: 'NodeNext',
      moduleResolution: 'NodeNext',
      strict: true,
      skipLibCheck: true,
      noEmit: true
    },
    include: ['types-smoke.mts']
  })
)
pnpm(['--ignore-workspace', 'exec', 'tsc'], consumer)
writeFileSync(
  path.join(consumer, 'index.html'),
  '<!doctype html><html><body><div id="map" style="height:400px"></div><script type="module" src="/main.ts"></script></body></html>'
)
writeFileSync(
  path.join(consumer, 'main.ts'),
  "import 'ol/ol.css'\nimport { Map as OMap, Point, VectorLayer } from 'openlayers-map-kit'\nconst map = new OMap(document.querySelector('#map')!, { view: { center: [0, 0], zoom: 10 } })\nconst layer = new VectorLayer()\nlayer.addFeatures([new Point([0, 0])])\nmap.addLayer(layer)\nwindow.addEventListener('pagehide', () => map.dispose())\n"
)
pnpm(['--ignore-workspace', 'exec', 'vite', 'build'], consumer)
console.log(`Tarball ESM/CJS/types/Vite consumer passed: ${tarball}`)
console.log(`Isolated consumer retained for inspection: ${consumer}`)
