import { defineConfig } from 'vite'
import path from 'path'

// 自定义 Rollup 插件：将 ol/xxx 映射为 window.ol.xxx（仅适用于 UMD 构建）
const injectOlGlobals = () => {
  return {
    name: 'inject-ol-globals',
    resolveId(id) {
      if (id === 'ol' || id.startsWith('ol/')) {
        return id
      }
      return null
    },
    load(id) {
      console.log(id)
      if (id === 'ol') {
        return `export default window.ol`
      }
      if (id.startsWith('ol/')) {
        const propPath = id.slice(3).replace(/\//g, '\.') // 转换 ol/layer -> .layer
        return `export default window.ol${propPath};`
      }
      return null
    }
  }
}

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
        }
      },
      plugins: [
        // 只在 UMD 构建中插入插件（ESM 不需要）
        process.env.BUILD_FORMAT === 'umd' ? injectOlGlobals() : []
      ]
    }
  },
  plugins: []
})