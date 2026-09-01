import { build } from 'vite'

if (process.argv.includes('--obfuscate')) {
  process.env.OBFUSCATE = 'true'
}

await build({ mode: 'es' })
await build({ mode: 'umd' })
await import('./sync-declarations.mjs')
