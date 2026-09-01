import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const esm = await readFile(new URL('../dist/omap.es.mjs', import.meta.url), 'utf8')
const umd = await readFile(new URL('../dist/omap.umd.cjs', import.meta.url), 'utf8')

assert.match(esm, /from ['"]ol\//, 'ESM 产物应从 peer dependency 导入 OpenLayers')
assert.doesNotMatch(umd, /require\(['"]ol(?:\/|['"])/, 'UMD/CJS 产物不应依赖外部 OpenLayers')
