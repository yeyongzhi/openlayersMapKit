/**
 * 文档链接校验
 *
 * vitepress 未安装时（离线/精简环境）用它代替 docs:build 做基本体检：
 * 校验导航配置、侧边栏数据与全部 markdown 中的站内相对/绝对链接是否指向存在的文件。
 *
 * 用法：node scripts/check-docs-links.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DOCS = path.join(ROOT, 'docs')

const broken = []
let checked = 0

function resolveDocLink(link) {
  // 去掉 hash 与 query
  const clean = link.split('#')[0].split('?')[0]
  if (!clean) return null
  if (clean.startsWith('/')) {
    // 目录形式的链接（/api/、/）指向该目录下的 index.md
    const rel = clean.endsWith('/') ? clean + 'index' : clean
    return path.join(DOCS, rel + '.md')
  }
  return null
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) return e.name === 'node_modules' ? [] : walk(p)
    return [p]
  })
}

// 1. 导航与侧边栏（config.mts 内联 link + api-sidebar.json 生成的 link）
const config = fs.readFileSync(path.join(DOCS, '.vitepress', 'config.mts'), 'utf8')
const configLinks = [...config.matchAll(/link:\s*'([^']+)'/g)].map((m) => m[1])
for (const link of configLinks) {
  checked++
  const target = resolveDocLink(link)
  if (target && !fs.existsSync(target)) broken.push('导航 ' + link + ' → ' + target)
}

const sidebarPath = path.join(DOCS, '.vitepress', 'api-sidebar.json')
if (fs.existsSync(sidebarPath)) {
  const groups = JSON.parse(fs.readFileSync(sidebarPath, 'utf8'))
  for (const group of groups) {
    for (const item of group.items ?? []) {
      checked++
      const target = resolveDocLink(item.link)
      if (target && !fs.existsSync(target)) broken.push('侧边栏 ' + item.link + ' → ' + target)
    }
  }
}

// 2. markdown 正文中的站内链接
const mds = walk(DOCS).filter((f) => f.endsWith('.md'))
for (const file of mds) {
  const text = fs.readFileSync(file, 'utf8')
  const rel = path.relative(ROOT, file)
  // 相对链接 ./x.md、../x.md 与绝对站内链接 /guide/x
  for (const m of text.matchAll(/\]\((\.{1,2}\/[^)\s]+|\/[^)\s]*)(#[^)]*)?\)/g)) {
    const link = m[1]
    if (/^https?:\/\//.test(link)) continue
    checked++
    let target
    if (link.startsWith('/')) target = resolveDocLink(link)
    else target = path.resolve(path.dirname(file), link.split('#')[0])
    if (!fs.existsSync(target)) broken.push(rel + ' → ' + link)
  }
}

console.log('校验 ' + mds.length + ' 个 markdown 文件、' + checked + ' 条站内链接')
if (broken.length) {
  console.log('\n死链 ' + broken.length + ' 处：')
  for (const b of broken) console.log('  - ' + b)
  process.exit(1)
}
console.log('全部链接有效')
