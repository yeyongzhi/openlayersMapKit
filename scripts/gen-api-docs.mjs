/**
 * 逐类 API 文档生成器
 *
 * 基于 TypeScript Compiler API 直接从 src 源码提取每个公开类的真实签名，
 * 生成 docs/api/<group>/<ClassName>.md。签名来自类型检查器，不会与源码脱节。
 *
 * 用法：
 *   node scripts/gen-api-docs.mjs --stats            仅打印发现的类与成员统计
 *   node scripts/gen-api-docs.mjs --preview Map      预览单个类的 markdown（不落盘）
 *   node scripts/gen-api-docs.mjs                    生成全部页面到 docs/api
 *   node scripts/gen-api-docs.mjs --out-json x.json  同时导出结构化数据
 */
import ts from 'typescript'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SRC_MODULE = path.join(ROOT, 'src', 'module')
const DOCS_API = path.join(ROOT, 'docs', 'api')

/** 从导出入口自动发现的分组；基类需手工登记（未公开导出，但子类继承其成员）。 */
const ENTRY_GROUPS = ['basic', 'core', 'layer', 'source', 'interaction', 'util', 'control']

/** 未公开导出、但需要单独成页的基类（供子类页链接与查阅继承成员）。 */
const EXTRA_CLASSES = [
  {
    name: 'BaseLayer',
    file: 'src/module/layer/BaseLayer/index.ts',
    group: 'layer',
    internal: true
  },
  {
    name: 'BasicFeature',
    file: 'src/module/core/Feature/BasicFeature/index.ts',
    group: 'core',
    internal: true
  },
  {
    name: 'Control',
    file: 'src/module/control/Control/index.ts',
    group: 'control',
    internal: true
  },
  { name: 'Event', file: 'src/module/util/Event/index.ts', group: 'util', internal: true }
]

/** 人工补充说明：一句话描述与注意点。键为类名。 */
const CLASS_NOTES = JSON.parse(fs.readFileSync(path.join(__dirname, 'api-docs-notes.json'), 'utf8'))

// ---------------------------------------------------------------- 编译器准备

const tsconfigPath = path.join(ROOT, 'tsconfig.json')
const cfgFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile)
if (cfgFile.error) throw new Error('读取 tsconfig.json 失败')
const parsed = ts.parseJsonConfigFileContent(cfgFile.config, ts.sys, ROOT)
const program = ts.createProgram(parsed.fileNames, { ...parsed.options, noEmit: true })
const checker = program.getTypeChecker()

// ---------------------------------------------------------------- 发现公开类

function normalize(p) {
  return p.split(path.sep).join('/')
}

function collectFromEntry(file, out, group) {
  if (!fs.existsSync(file)) return
  const src = fs.readFileSync(file, 'utf8')

  // 记录 import 名 → 来源文件，供无 from 子句的 export {} 解析
  const importMap = new Map()
  for (const m of src.matchAll(/import\s+([^'"]+?)\s+from\s*'([^']+)'/g)) {
    const abs = path.resolve(path.dirname(file), m[2]) + '.ts'
    const names = m[1]
      .replace(/[{}]/g, ',')
      .split(',')
      .map((s) =>
        s
          .trim()
          .split(/\s+as\s+/)
          .pop()
          .trim()
      )
      .filter((n) => /^\w+$/.test(n) && n !== 'type' && n !== 'default')
    for (const n of names) if (!importMap.has(n)) importMap.set(n, abs)
  }

  // local：源文件中的原始标识符，供重命名导出（如 OMapFormatType → FormatType）定位声明
  const push = (name, abs, named, local) => {
    if (!/^[A-Za-z]\w*$/.test(name)) return
    if (out.some((c) => c.name === name)) return
    out.push({ name, file: abs, group, named: Boolean(named), local: local ?? name })
  }

  // export { default as X } from '...' / export { A, B as C } from '...' / export { A, B }
  for (const m of src.matchAll(/export\s*\{([^}]+)\}(\s*from\s*'([^']+)')?/g)) {
    const fromSpec = m[3]
    for (const raw of m[1].split(',')) {
      const parts = raw
        .trim()
        .split(/\s+as\s+/)
        .map((s) => s.trim())
      const local = parts[0]
      const exported = parts[1] ?? parts[0]
      if (!/^\w+$/.test(exported)) continue
      let abs
      if (fromSpec) abs = path.resolve(path.dirname(file), fromSpec) + '.ts'
      else if (local === 'default') abs = file
      else abs = importMap.get(local) ?? file
      push(exported, abs, local !== 'default', local === 'default' ? exported : local)
    }
  }

  // export * from './dir/index' 递归（绝对路径传递，避免相对基准丢失）
  for (const m of src.matchAll(/export\s*\*\s*from\s*'([^']+)'/g)) {
    const abs = path.resolve(path.dirname(file), m[1])
    if (path.basename(abs) !== 'index') continue // 跳过 type.ts 等纯类型文件
    collectFromEntry(abs + '.ts', out, group)
  }
}

const discovered = []
for (const g of ENTRY_GROUPS) {
  collectFromEntry(path.join(SRC_MODULE, g, 'index.ts'), discovered, g)
}
for (const extra of EXTRA_CLASSES) {
  if (!discovered.some((c) => c.name === extra.name)) {
    discovered.push({ ...extra, file: path.join(ROOT, extra.file) })
  }
}

// 具名导出（LngLat）可能指向 default 是另一类的文件，需按名字定位到源文件内的同名类
/**
 * 非类、非 const 对象的导出（Proxy 等），无法从 AST 提取签名，
 * 页面由手工维护，但同样纳入侧边栏。
 */
const MANUAL_PAGES = {
  MapToken: { group: 'util', file: 'src/module/util/MapToken/index.ts' }
}

const targets = []
for (const c of discovered) {
  if (MANUAL_PAGES[c.name]) continue
  const sf = program.getSourceFile(c.file)
  if (!sf) {
    console.warn(`[warn] 源文件未纳入 program：${normalize(path.relative(ROOT, c.file))}`)
    continue
  }
  targets.push({ ...c, sf })
}

// ---------------------------------------------------------------- 成员提取

function hasModifier(node, kind) {
  return (ts.getModifiers?.(node) ?? node.modifiers ?? []).some((m) => m.kind === kind)
}

function isStatic(node) {
  return hasModifier(node, ts.SyntaxKind.StaticKeyword)
}

function isHidden(node) {
  return (
    hasModifier(node, ts.SyntaxKind.PrivateKeyword) ||
    hasModifier(node, ts.SyntaxKind.ProtectedKeyword)
  )
}

function docOf(node) {
  const symbol = checker.getSymbolAtLocation(node.name ?? node)
  if (!symbol) return ''
  const parts = symbol.getDocumentationComment(checker)
  // 表格单元格转义统一由 escapeCell 处理，此处只压平换行
  return ts
    .displayPartsToString(parts)
    .replace(/\s*\n\s*/g, ' ')
    .trim()
}

function typeText(node, fallbackNode) {
  const target = node ?? fallbackNode
  if (!target) return 'unknown'
  let text = checker.typeToString(checker.getTypeAtLocation(target))
  // 超长内联类型折叠，避免表格被巨型联合类型撑爆
  if (text.length > 160) {
    const t = checker.getTypeAtLocation(target)
    if (t.isUnion?.()) return t.types.length + ' 种联合类型（见类型声明）'
    text = text.slice(0, 157) + '…'
  }
  return text
}

function signatureText(decl, name, isCtor) {
  const sig = checker.getSignatureFromDeclaration(decl)
  if (!sig) return null
  const params = sig.parameters.map((p) => {
    const vd = p.valueDeclaration
    let t = checker.typeToString(
      checker.getTypeOfSymbolAtLocation(p, vd ?? decl),
      undefined,
      ts.TypeFormatFlags.NoTruncation
    )
    const optional =
      vd && ts.isParameter(vd) && (vd.questionToken !== undefined || vd.initializer !== undefined)
    // 可选参数上的 | undefined 是冗余信息，去掉以提升可读性
    if (optional) t = t.replace(/\s*\|\s*undefined$/, '')
    const rest = vd && ts.isParameter(vd) && vd.dotDotDotToken !== undefined
    return (rest ? '...' : '') + p.name + (optional ? '?' : '') + ': ' + t
  })
  const ret = checker.typeToString(sig.getReturnType())
  if (isCtor) return `new ${name}(${params.join(', ')})`
  return `${name}(${params.join(', ')}): ${ret}`
}

function memberName(member) {
  if (!member.name) return '(anonymous)'
  if (ts.isComputedPropertyName(member.name)) return member.name.getText()
  return member.name.getText()
}

function classChain(classDecl) {
  const chain = [classDecl]
  const seen = new Set([classDecl])
  let cur = classDecl
  for (let i = 0; i < 12; i++) {
    const ext = cur.heritageClauses?.find((h) => h.token === ts.SyntaxKind.ExtendsKeyword)
    const expr = ext?.types?.[0]?.expression
    if (!expr) break
    let sym = checker.getSymbolAtLocation(expr)
    if (!sym) break
    if (sym.flags & ts.SymbolFlags.Alias) sym = checker.getAliasedSymbol(sym)
    const decl = sym.declarations?.find(ts.isClassDeclaration)
    if (!decl || seen.has(decl)) break
    chain.push(decl)
    seen.add(decl)
    cur = decl
  }
  return chain
}

function findClassInFile(sf, name) {
  let found
  const visit = (node) => {
    if (found) return
    if (ts.isClassDeclaration(node) && node.name?.text === name) {
      found = node
      return
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
  return found
}

function findDefaultClass(sf, name) {
  // 优先同名类；否则取文件的 default 导出
  const same = findClassInFile(sf, name)
  if (same) return same
  const moduleSymbol = checker.getSymbolAtLocation(sf)
  if (!moduleSymbol) return undefined
  const def = checker.getExportsOfModule(moduleSymbol).find((s) => s.name === 'default')
  if (!def) return undefined
  let sym = def
  if (sym.flags & ts.SymbolFlags.Alias) sym = checker.getAliasedSymbol(sym)
  return sym.declarations?.find(ts.isClassDeclaration)
}

/** 剥离 `as const` / `satisfies` 包装，取回对象字面量。 */
function unwrapConst(initializer) {
  let node = initializer
  while (
    node &&
    (ts.isAsExpression(node) ||
      ts.isSatisfiesExpression(node) ||
      ts.isParenthesizedExpression(node))
  ) {
    node = node.expression
  }
  return ts.isObjectLiteralExpression(node) ? node : undefined
}

/** 常量枚举对象：export const X = { ... }（本项目的 DrawMode / MeasureMode 等均为此形式）。 */
function findConstObject(sf, name) {
  let found
  const visit = (node) => {
    if (found) return
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === name &&
      node.initializer &&
      unwrapConst(node.initializer)
    ) {
      found = node
      return
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
  if (!found) return undefined

  const objectLiteral = unwrapConst(found.initializer)
  const text = sf.getFullText()
  const entries = []
  for (const p of objectLiteral.properties) {
    if (!ts.isPropertyAssignment(p)) continue
    const key = p.name.getText().replace(/['"]/g, '')
    const value = p.initializer.getText().replace(/['"]/g, '')
    let doc = ''
    for (const d of ts.getJSDocCommentsAndTags(p)) {
      if (ts.isJSDoc(d) && typeof d.comment === 'string') doc = d.comment.trim()
    }
    if (!doc) {
      const lineStart = text.lastIndexOf('\n', p.end) + 1
      const lineEnd = text.indexOf('\n', p.end)
      const line = text.slice(lineStart, lineEnd === -1 ? undefined : lineEnd)
      const m = line.match(/\/\/\s*(.+)$/)
      if (m) doc = m[1].trim()
    }
    entries.push({ key, value, doc })
  }
  return { node: found, entries }
}

function extractConst(target, constObj) {
  const symbol = checker.getSymbolAtLocation(constObj.node.name)
  const doc = symbol ? ts.displayPartsToString(symbol.getDocumentationComment(checker)).trim() : ''
  return {
    kind: 'const',
    name: target.name,
    exportName: target.name,
    group: target.group,
    internal: Boolean(target.internal),
    file: normalize(path.relative(ROOT, target.sf.fileName)),
    className: target.name,
    doc,
    entries: constObj.entries,
    // 供通用统计使用
    ctors: [],
    statics: [],
    props: [],
    methods: [],
    inherited: [],
    inheritedByOwner: [],
    chain: [target.name],
    extends: null
  }
}

function extract(target) {
  const classDecl = findDefaultClass(target.sf, target.name)
  if (classDecl) return extractClass(target, classDecl)
  const constObj = findConstObject(target.sf, target.local ?? target.name)
  if (constObj) return extractConst(target, constObj)
  return null
}

function extractClass(target, classDecl) {
  const chain = classChain(classDecl)
  const own = classDecl
  const result = {
    name: target.name,
    exportName: target.name,
    group: target.group,
    internal: Boolean(target.internal),
    file: normalize(path.relative(ROOT, target.sf.fileName)),
    className: classDecl.name?.text ?? target.name,
    extends: chain[1]?.name?.text ?? null,
    chain: chain.map((c) => c.name?.text ?? '?'),
    doc: docOf(classDecl),
    ctors: [],
    statics: [],
    props: [],
    methods: [],
    inherited: [] // { from, kind, text, doc }
  }

  chain.forEach((cd, depth) => {
    const ownerName = cd.name?.text ?? '?'
    // 存在纯声明重载时，实现签名不应出现在文档里
    const overloadNames = new Set()
    for (const m of cd.members) {
      if (ts.isMethodDeclaration(m) && !m.body) overloadNames.add(memberName(m))
    }
    for (const member of cd.members) {
      if (isHidden(member)) continue
      const mName = memberName(member)
      if (mName.startsWith('_')) continue // 内部成员
      if (memberName(member) === 'constructor') continue

      const static_ = isStatic(member)
      const record = { owner: ownerName, depth, doc: docOf(member), text: '' }

      if (ts.isConstructorDeclaration(member)) continue
      if (
        ts.isPropertyDeclaration(member) ||
        ts.isGetAccessor(member) ||
        ts.isSetAccessor(member)
      ) {
        const isAccessor = ts.isGetAccessor(member) || ts.isSetAccessor(member)
        record.text = `${mName}: ${typeText(member.type, member.name)}`
        record.kind = isAccessor ? 'accessor' : 'property'
        if (static_) result.statics.push(record)
        else if (depth === 0) result.props.push(record)
        else result.inherited.push(record)
        continue
      }
      if (ts.isMethodDeclaration(member)) {
        if (member.body && overloadNames.has(mName)) continue
        const text = signatureText(member, mName, false)
        if (!text) continue
        record.text = text
        record.kind = 'method'
        if (static_) result.statics.push(record)
        else if (depth === 0) result.methods.push(record)
        else result.inherited.push(record)
      }
    }
    // 构造重载：只取最外层类，且排除实现签名
    if (cd === own) {
      const ctorDecls = cd.members.filter(ts.isConstructorDeclaration)
      const hasOverloadDecl = ctorDecls.some((c) => !c.body)
      for (const member of ctorDecls) {
        if (hasOverloadDecl && member.body) continue
        const text = signatureText(member, ownerName, true)
        if (text) result.ctors.push({ text, doc: docOf(member) })
      }
    }
  })

  // 按来源类名聚合继承成员
  const byOwner = new Map()
  for (const it of result.inherited) {
    if (!byOwner.has(it.owner)) byOwner.set(it.owner, [])
    byOwner.get(it.owner).push(it)
  }
  result.inheritedByOwner = [...byOwner.entries()].map(([from, items]) => ({ from, items }))

  // 稳定排序
  const byName = (a, b) => a.text.localeCompare(b.text, 'zh')
  result.props.sort(byName)
  result.methods.sort(byName)
  result.statics.sort(byName)
  return result
}

const extracted = []
for (const t of targets) {
  const r = extract(t)
  if (!r) {
    console.warn(`[warn] 未能定位类声明：${t.name}（${normalize(path.relative(ROOT, t.file))}）`)
    continue
  }
  extracted.push(r)
}
extracted.sort((a, b) => a.group.localeCompare(b.group) || a.name.localeCompare(b.name))

// ---------------------------------------------------------------- 生成 markdown

function escapeCell(s) {
  return String(s).replace(/\|/g, '\\|').replace(/\n/g, ' ')
}

function table(rows, headers) {
  if (!rows.length) return '暂无。\n'
  const lines = [`| ${headers.join(' | ')} |`, `| ${headers.map(() => '---').join(' | ')} |`]
  for (const r of rows) lines.push(`| ${r.map(escapeCell).join(' | ')} |`)
  return lines.join('\n') + '\n'
}

function linkTo(cls) {
  return `[${cls.className}](./${cls.name}.md)`
}

function renderConst(cls, all, note) {
  const stable = note.stability ?? 'stable-beta'
  const out = []
  out.push('# ' + cls.className)
  out.push('')
  out.push('> 稳定性：`' + stable + '` — 常量枚举（只读对象）')
  out.push('')
  const desc = note.desc ?? cls.doc
  if (desc) out.push(desc, '')
  out.push('## 引入', '')
  out.push('```ts')
  out.push('import { ' + cls.exportName + " } from 'omap'")
  out.push('```', '')
  out.push('源码：`' + cls.file + '`', '')
  out.push('## 成员', '')
  out.push(
    table(
      cls.entries.map((e) => [`\`${cls.exportName}.${e.key}\``, `\`'${e.value}'\``, e.doc || '—']),
      ['常量', '值', '说明']
    )
  )
  if (note.notes?.length) {
    out.push('## 说明与注意点', '')
    for (const n of note.notes) out.push('- ' + n)
    out.push('')
  }
  if (note.example) {
    out.push('## 示例', '')
    out.push('```ts')
    out.push(note.example.trim())
    out.push('```', '')
  }
  if (note.related?.length) {
    out.push('## 相关', '')
    for (const r of note.related) out.push('- ' + r)
    out.push('')
  }
  out.push('<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->')
  out.push('')
  return out.join('\n')
}

function render(cls, all) {
  if (cls.kind === 'const') return renderConst(cls, all, CLASS_NOTES[cls.name] ?? {})
  const note = CLASS_NOTES[cls.name] ?? {}
  const stable = note.stability ?? (cls.internal ? 'internal' : 'stable-beta')
  // 别名导出（如 LngLat = Lnglat）：页面统一以导出名呈现，并标注实现类名
  const aliased = cls.className !== cls.exportName
  const ctorText = (text) =>
    aliased ? text.replace('new ' + cls.className + '(', 'new ' + cls.exportName + '(') : text
  const out = []
  out.push(`# ${cls.exportName}`)
  out.push('')
  out.push(`> 稳定性：\`${stable}\`${cls.internal ? ' — 基类，不直接从包入口导出' : ''}`)
  if (aliased) {
    out.push('>')
    out.push('> 本导出为实现类 `' + cls.className + '` 的别名，两者 API 完全一致。')
  }
  out.push('')
  const desc = note.desc ?? cls.doc
  if (desc) out.push(desc, '')
  out.push('## 引入', '')
  out.push('```ts')
  out.push(`import { ${cls.exportName} } from 'omap'`)
  out.push('```', '')
  if (!cls.internal) {
    out.push(`源码：\`${cls.file}\``, '')
  }

  if (cls.ctors.length) {
    out.push('## 构造', '')
    out.push('```ts')
    for (const c of cls.ctors) out.push(ctorText(c.text))
    out.push('```', '')
    const docs = cls.ctors.filter((c) => c.doc)
    if (docs.length) {
      out.push(
        table(
          docs.map((c) => [`\`${ctorText(c.text)}\``, c.doc]),
          ['重载', '说明']
        )
      )
    }
  }

  if (cls.statics.length) {
    out.push('## 静态成员', '')
    out.push(
      table(
        cls.statics.map((s) => [`\`${s.text}\``, s.doc || '—']),
        ['成员', '说明']
      )
    )
  }

  if (cls.props.length) {
    out.push('## 属性', '')
    out.push(
      table(
        cls.props.map((p) => [`\`${p.text}\``, p.doc || '—']),
        ['属性', '说明']
      )
    )
  }

  if (cls.methods.length) {
    out.push('## 方法', '')
    out.push(
      table(
        cls.methods.map((m) => [`\`${m.text}\``, m.doc || '—']),
        ['方法', '说明']
      )
    )
  }

  if (cls.inheritedByOwner?.length) {
    out.push('## 继承成员', '')
    out.push(`继承链：${cls.chain.join(' → ')}`, '')
    for (const grp of cls.inheritedByOwner) {
      out.push(`### 继承自 ${grp.from}`, '')
      out.push(
        table(
          grp.items
            .slice()
            .sort((a, b) => a.text.localeCompare(b.text, 'zh'))
            .map((i) => [`\`${i.text}\``, i.doc || '—']),
          ['成员', '说明']
        )
      )
    }
  }

  if (note.notes?.length) {
    out.push('## 说明与注意点', '')
    for (const n of note.notes) out.push(`- ${n}`)
    out.push('')
  }

  if (note.example) {
    out.push('## 示例', '')
    out.push('```ts')
    out.push(note.example.trim())
    out.push('```', '')
  }

  const related = []
  if (cls.extends) {
    const base = all.find((c) => c.className === cls.extends)
    if (base) related.push(`基类：${linkTo(base)}`)
  }
  const subs = all.filter((c) => c.extends === cls.className)
  if (subs.length) related.push(`子类：${subs.map(linkTo).join('、')}`)
  if (note.related?.length) related.push(...note.related)
  if (related.length) {
    out.push('## 相关', '')
    for (const r of related) out.push(`- ${r}`)
    out.push('')
  }

  out.push(`<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->`)
  out.push('')
  return out.join('\n')
}

// ---------------------------------------------------------------- CLI

const argv = process.argv.slice(2)
if (argv.includes('--stats')) {
  const byGroup = new Map()
  for (const c of extracted) {
    if (!byGroup.has(c.group)) byGroup.set(c.group, [])
    byGroup.get(c.group).push(c)
  }
  let totalMembers = 0
  for (const c of extracted) {
    totalMembers += c.props.length + c.methods.length + c.statics.length + c.inherited.length
  }
  console.log('发现 ' + extracted.length + ' 个类，成员条目合计 ' + totalMembers + ' 条')
  for (const [g, list] of byGroup) {
    const detail = list
      .map((c) => {
        const counts = [
          c.ctors.length + 'c',
          c.statics.length + 's',
          c.props.length + 'p',
          c.methods.length + 'm',
          c.inherited.length + 'i'
        ].join('/')
        return c.name + '(' + counts + ')'
      })
      .join(' ')
    console.log('  ' + g.padEnd(12) + String(list.length).padStart(2) + ' 类：' + detail)
  }
  const empty = extracted.filter(
    (c) =>
      c.kind !== 'const' &&
      !c.ctors.length &&
      !c.statics.length &&
      !c.props.length &&
      !c.methods.length &&
      !c.inherited.length
  )
  if (empty.length) {
    console.log('\n[warn] 无成员的类：' + empty.map((c) => c.name).join(', '))
  }
  const missing = extracted.filter((c) => !CLASS_NOTES[c.name])
  if (missing.length) console.log(`\n缺少人工说明：${missing.map((c) => c.name).join(', ')}`)
  process.exit(0)
}

if (argv.includes('--preview')) {
  const name = argv[argv.indexOf('--preview') + 1]
  const cls = extracted.find((c) => c.name === name)
  if (!cls) {
    console.error(`未找到类 ${name}；可选：${extracted.map((c) => c.name).join(', ')}`)
    process.exit(1)
  }
  console.log(render(cls, extracted))
  process.exit(0)
}

const jsonIdx = argv.indexOf('--out-json')
if (jsonIdx !== -1) {
  fs.writeFileSync(argv[jsonIdx + 1], JSON.stringify(extracted, null, 2), 'utf8')
  console.log(`已导出 JSON：${argv[jsonIdx + 1]}`)
}

// ---------------------------------------------------------------- 侧边栏数据

const GROUP_ORDER = ['core', 'layer', 'source', 'interaction', 'basic', 'control', 'util']
const GROUP_TITLES = {
  core: 'Core',
  layer: 'Layer',
  source: 'Source',
  interaction: 'Interaction',
  basic: 'Basic',
  control: 'Control',
  util: 'Util'
}
/** 高频类排在各组前面，其余按字母序。 */
const PINNED = [
  'Map',
  'Projection',
  'BasicFeature',
  'Point',
  'LineString',
  'Polygon',
  'Circle',
  'MultiPoint',
  'MultiLineString',
  'MultiPolygon',
  'LinearRing',
  'BaseLayer',
  'VectorLayer',
  'XYZLayer',
  'WMSLayer',
  'WMTSLayer',
  'ImageLayer',
  'TileLayer',
  'GaodeLayer',
  'TdtLayer',
  'LayerGroup',
  'Source',
  'VectorSource',
  'TileSource',
  'XYZSource',
  'WMTSSource',
  'TileWMSSource',
  'ImageSource',
  'VectorTileSource',
  'OGCVectorTileSource',
  'DataTileSource',
  'ImageTileSource',
  'Draw',
  'Measure',
  'Modify',
  'Select',
  'DragBox',
  'DragPan',
  'DragZoom',
  'MouseWheelZoom',
  'DoubleClickZoom',
  'KeyboardZoom',
  'Link',
  'InteractionExtent',
  'LngLat',
  'Lnglat',
  'Extent',
  'Size',
  'Pixel',
  'Color',
  'Style',
  'Popup',
  'Control',
  'Zoom',
  'FullScreen',
  'Format',
  'ProjUtil',
  'MapToken'
]

function buildSidebar() {
  const byGroup = new Map()
  const add = (group, name) => {
    if (!byGroup.has(group)) byGroup.set(group, [])
    const list = byGroup.get(group)
    if (list.some((i) => i.text === name)) return
    list.push({ text: name, link: '/api/' + group + '/' + name })
  }
  for (const c of extracted) add(c.group, c.exportName)
  for (const [name, meta] of Object.entries(MANUAL_PAGES)) add(meta.group, name)

  const rank = (item) => {
    const i = PINNED.indexOf(item.text)
    return i === -1 ? Number.MAX_SAFE_INTEGER : i
  }
  const groups = []
  for (const g of GROUP_ORDER) {
    const items = byGroup.get(g)
    if (!items?.length) continue
    items.sort((a, b) => rank(a) - rank(b) || a.text.localeCompare(b.text))
    groups.push({
      text: GROUP_TITLES[g] + '（' + items.length + '）',
      collapsed: true,
      items
    })
  }
  return groups
}

// ---------------------------------------------------------------- 输出

let written = 0
for (const cls of extracted) {
  const dir = path.join(DOCS_API, cls.group)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, `${cls.name}.md`), render(cls, extracted), 'utf8')
  written++
}

const sidebarPath = path.join(ROOT, 'docs', '.vitepress', 'api-sidebar.json')
fs.writeFileSync(sidebarPath, JSON.stringify(buildSidebar(), null, 2) + '\n', 'utf8')

console.log(`已生成 ${written} 个 API 页面到 docs/api/<group>/`)
console.log(`已更新侧边栏数据：docs/.vitepress/api-sidebar.json（${buildSidebar().length} 个分组）`)
