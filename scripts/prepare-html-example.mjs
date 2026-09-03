import { access, copyFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const vendor = path.join(root, 'examples/html/public/vendor')
const files = [
  ['dist/openlayers-map-kit.umd.cjs', 'openlayers-map-kit.umd.js'],
  ['node_modules/ol/ol.css', 'ol.css'],
  ['examples/shared/example.css', 'example.css']
]

await mkdir(vendor, { recursive: true })

for (const [source, target] of files) {
  const sourcePath = path.join(root, source)
  try {
    await access(sourcePath)
  } catch {
    throw new Error(`无法准备 UMD 示例，缺少文件：${source}。请先执行 pnpm install 和 pnpm build。`)
  }
  await copyFile(sourcePath, path.join(vendor, target))
}

console.log('UMD 示例资源已更新。')
