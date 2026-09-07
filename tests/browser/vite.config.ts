import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  root: fileURLToPath(new URL('./fixture', import.meta.url)),
  server: { host: '127.0.0.1', port: 4175, strictPort: true },
  resolve: {
    alias: {
      'openlayers-map-kit': fileURLToPath(
        new URL('../../dist/openlayers-map-kit.es.mjs', import.meta.url)
      )
    }
  }
})
