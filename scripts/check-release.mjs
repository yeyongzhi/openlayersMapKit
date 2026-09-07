import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { appendFileSync, readFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'

export function releasePlan(version, ref, requireTag = false) {
  const match =
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-(alpha|beta|rc)\.(0|[1-9]\d*))?$/.exec(version)
  assert.ok(match && match[0] === version, 'Version must be x.y.z or x.y.z-alpha/beta/rc.n')
  const tag = `v${version}`
  if (requireTag || ref?.startsWith('refs/tags/')) {
    assert.equal(ref, `refs/tags/${tag}`, 'Git tag must match package.json version')
  }
  return { version, tag, distTag: match[4] ?? 'latest' }
}

export async function assertVersionAvailable(name, version, fetcher = fetch) {
  const response = await fetcher(
    `https://registry.npmjs.org/${encodeURIComponent(name)}/${encodeURIComponent(version)}`,
    { signal: AbortSignal.timeout(15000) }
  )
  if (response.status === 404) return
  assert.notEqual(response.status, 200, `${name}@${version} already exists; choose a new version`)
  throw new Error(`Registry check failed: HTTP ${response.status}`)
}

function mainContainsHead() {
  execFileSync('git', ['merge-base', '--is-ancestor', 'HEAD', 'origin/main'], { stdio: 'pipe' })
}

async function main() {
  const root = fileURLToPath(new URL('../', import.meta.url))
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
  const requireTag = process.env.RELEASE_REQUIRE_TAG === 'true'
  const plan = releasePlan(pkg.version, process.env.GITHUB_REF, requireTag)
  if (requireTag) {
    mainContainsHead()
    assert.equal(
      execFileSync('git', ['status', '--porcelain'], { cwd: root, encoding: 'utf8' }).trim(),
      '',
      'Release checkout must be clean'
    )
  }
  if (process.argv.includes('--check-registry')) await assertVersionAvailable(pkg.name, pkg.version)
  if (process.env.GITHUB_OUTPUT)
    appendFileSync(process.env.GITHUB_OUTPUT, `dist_tag=${plan.distTag}\n`)
  console.log(
    JSON.stringify({ name: pkg.name, ...plan, mode: 'validation only; no publication' }, null, 2)
  )
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main()
}
