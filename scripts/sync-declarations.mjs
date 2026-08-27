import { writeFile } from 'node:fs/promises'

await writeFile(
  new URL('../dist/index.d.mts', import.meta.url),
  "export * from './index.d.ts'\n",
  'utf8'
)
