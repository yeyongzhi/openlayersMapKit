import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'OMap',
      formats: ['umd', 'es'],
      fileName: (format) => `omap.${format}.js`
    },
    rollupOptions: {
      external: (id) => id === 'ol' || id.startsWith('ol/'),
      output: {
        globals: {
          ol: 'ol',
          'ol/layer': 'ol.layer',
          'ol/source': 'ol.source',
          'ol/proj': 'ol.proj',
          'ol/util': 'ol.util',
        }
      },
      plugins: []
    }
  },
  plugins: []
})