import { defineConfig } from 'vite'
import path from 'path'
import * as JavaScriptObfuscator from 'javascript-obfuscator';
import { createFilter } from '@rollup/pluginutils';
import dts from 'vite-plugin-dts';

// 🔑 判断是否启用混淆（通过环境变量 OBFUSCATE）
const shouldObfuscate = process.env.OBFUSCATE === 'true';

export default defineConfig({
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
  },
  build: {
    // 禁用默认压缩（避免和 obfuscator 冲突）
    minify: false,
    // 关闭 sourcemap（必须！）
    sourcemap: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'OMap',
      formats: ['umd', 'es'],
      fileName: (format) => format === 'es' ? 'omap.es.mjs' : 'omap.umd.cjs'
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
          'ol/Feature': 'ol.Feature',
          'ol/Overlay': 'ol.Overlay',
          'ol/geom': 'ol.geom',
          'ol/style': 'ol.style',
          'ol/coordinate': 'ol.coordinate',
          'ol/sphere': 'ol.sphere',
          'ol/interaction': 'ol.interaction',
          'ol/interaction/Draw': 'ol.interaction.Draw',
          'ol/render/Feature': 'ol.render.Feature',
          'ol/Observable': 'ol.Observable',
          'ol/tilegrid': 'ol.tilegrid',
          'ol/extent': 'ol.extent',
          'ol/format': 'ol.format',
          'ol/control': 'ol.control',
          'ol/easing': 'ol.easing',
          'ol/events/Target': 'ol.events.Target',
          'ol/events': 'ol.events'
        }
      },
      plugins: shouldObfuscate ? [
        // ✅ 自定义混淆插件（作用于 bundle 输出）
        {
          name: 'obfuscate-output',
          generateBundle(_, bundle) {
            const filter = createFilter(['**/*.js'], ['**/*.map']);
            for (const fileName in bundle) {
              const file = bundle[fileName];
              if (file.type === 'chunk' && filter(fileName)) {
                const obfuscatedCode = JavaScriptObfuscator.obfuscate(file.code, {
                  compact: true,
                  controlFlowFlattening: true,
                  controlFlowFlatteningThreshold: 0.75,
                  deadCodeInjection: true,
                  deadCodeInjectionThreshold: 0.4,
                  identifierNamesGenerator: 'mangled',
                  identifiersPrefix: '__obf_',
                  renameGlobals: false, // 👈 UMD 全局名保留
                  stringArray: true,
                  stringArrayEncoding: ['base64'],
                  stringArrayThreshold: 0.75,
                  rotateStringArray: true,
                  shuffleStringArray: true,
                  splitStrings: true,
                  splitStringsChunkLength: 4,
                  transformObjectKeys: true,
                  unicodeEscapeSequence: false,
                  disableConsoleOutput: false,
                }).getObfuscatedCode();

                file.code = obfuscatedCode;
              }
            }
          },
        },
      ] : []
    }
  },
  plugins: [
    dts({
      entryRoot: 'src',
      insertTypesEntry: true,
      rollupTypes: true,
      tsconfigPath: path.resolve(__dirname, 'tsconfig.json')
    })
  ]
})
