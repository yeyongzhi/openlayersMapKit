/**
 * 枚举根入口 `src/index.ts` 的公开导出符号，用于建立公开 API 验收矩阵。
 *
 * 用法：node scripts/audit-public-api.mjs [--out <file>]
 */
import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const ROOT = process.cwd()
const ENTRY = path.resolve(ROOT, 'src/index.ts')
const TESTS_DIR = path.resolve(ROOT, 'tests')

const outArgIndex = process.argv.indexOf('--out')
const OUT_FILE =
  outArgIndex >= 0 && process.argv[outArgIndex + 1]
    ? path.resolve(ROOT, process.argv[outArgIndex + 1])
    : null

const program = ts.createProgram([ENTRY], {
  target: ts.ScriptTarget.ESNext,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  strict: true,
  esModuleInterop: true,
  skipLibCheck: true,
  lib: ['lib.es2022.d.ts', 'lib.dom.d.ts', 'lib.dom.iterable.d.ts']
})

const checker = program.getTypeChecker()
const sourceFile = program.getSourceFile(ENTRY)

if (!sourceFile) {
  console.error('无法解析入口文件：' + ENTRY)
  process.exit(1)
}

const moduleSymbol = checker.getSymbolAtLocation(sourceFile)

if (!moduleSymbol) {
  console.error('无法获取入口模块符号。')
  process.exit(1)
}

/** 解析别名导出到其真实目标符号。 */
const resolveSymbol = (symbol) => {
  let current = symbol
  let guard = 0
  while (current.flags & ts.SymbolFlags.Alias && guard < 16) {
    const aliased = checker.getAliasedSymbol(current)
    if (!aliased || aliased === current) break
    current = aliased
    guard += 1
  }
  return current
}

/** 递归收集 `tests` 目录下所有测试源码。 */
const collectTestSources = () => {
  if (!fs.existsSync(TESTS_DIR)) return []
  const files = []
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        if (entry.name === 'consumer') continue
        walk(full)
      } else if (/\.(test\.)?[cm]?ts$/.test(entry.name) && entry.name.endsWith('.ts')) {
        files.push(full)
      }
    }
  }
  walk(TESTS_DIR)
  return files
}

/** 统计每个公开类在测试中被词边界引用的次数。 */
const buildTestUsage = () => {
  const sources = collectTestSources()
  const usage = new Map()
  const patterns = new Map()

  for (const file of sources) {
    const text = fs.readFileSync(file, 'utf8')
    for (const item of results) {
      if (item.kind !== 'class' && item.kind !== 'function') continue
      let regex = patterns.get(item.name)
      if (!regex) {
        regex = new RegExp(`\\b${item.name}\\b`, 'g')
        patterns.set(item.name, regex)
      }
      regex.lastIndex = 0
      const count = (text.match(regex) ?? []).length
      if (count > 0) {
        usage.set(item.name, (usage.get(item.name) ?? 0) + count)
      }
    }
  }
  return usage
}

const results = []
const seen = new Set()

for (const symbol of checker.getExportsOfModule(moduleSymbol)) {
  const name = symbol.getName()
  if (name === 'default' || seen.has(name)) continue
  seen.add(name)

  const target = resolveSymbol(symbol)
  const declaration = target.declarations?.[0] ?? symbol.declarations?.[0]
  const filePath = declaration
    ? path.relative(ROOT, declaration.getSourceFile().fileName).replace(/\\/g, '/')
    : 'unknown'

  let kind = 'type'
  if (target.flags & ts.SymbolFlags.Class) kind = 'class'
  else if (target.flags & ts.SymbolFlags.Enum) kind = 'enum'
  else if (target.flags & ts.SymbolFlags.Interface) kind = 'interface'
  else if (target.flags & ts.SymbolFlags.TypeAlias) kind = 'type'
  else if (target.flags & ts.SymbolFlags.Function) kind = 'function'
  else if (target.flags & ts.SymbolFlags.Variable) kind = 'const'

  results.push({ name, kind, filePath })
}

const kindOrder = { class: 0, enum: 1, function: 2, const: 3, interface: 4, type: 5 }
results.sort((a, b) => {
  const diff = (kindOrder[a.kind] ?? 9) - (kindOrder[b.kind] ?? 9)
  return diff !== 0 ? diff : a.name.localeCompare(b.name)
})

const grouped = results.reduce((acc, item) => {
  acc[item.kind] = acc[item.kind] ?? []
  acc[item.kind].push(item)
  return acc
}, {})

const usage = buildTestUsage()

const lines = []
for (const kind of ['class', 'function', 'enum', 'const', 'interface', 'type']) {
  const list = grouped[kind]
  if (!list?.length) continue
  lines.push(`\n## ${kind} (${list.length})`)
  for (const item of list) {
    const used = usage.get(item.name)
    const suffix = kind === 'class' || kind === 'function' ? `  [tests: ${used ?? 0}]` : ''
    lines.push(`- ${item.name}  <-  ${item.filePath}${suffix}`)
  }
}
lines.push(`\n总计：${results.length} 个公开导出`)

if (outArgIndex >= 0) {
  const untested = results
    .filter((item) => item.kind === 'class' && !usage.has(item.name))
    .map((item) => item.name)
  lines.push(`\n未被任何测试引用的公开类（${untested.length}）：${untested.join(', ')}`)
}

const text = lines.join('\n')
console.log(text)

if (OUT_FILE) {
  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true })
  fs.writeFileSync(OUT_FILE, text, 'utf8')
  fs.writeFileSync(
    OUT_FILE.replace(/\.txt$/, '') + '.json',
    JSON.stringify(results, null, 2),
    'utf8'
  )
  console.log(`\n已写入：${path.relative(ROOT, OUT_FILE)}`)
}
