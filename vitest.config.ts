import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/type.ts',
        'src/index.ts',
        'src/module/basic/index.ts',
        'src/module/control/index.ts',
        'src/module/core/index.ts',
        'src/module/core/Feature/index.ts',
        'src/module/interaction/index.ts',
        'src/module/layer/index.ts',
        'src/module/source/index.ts',
        'src/module/source/TileSource/subClass/index.ts',
        'src/module/util/index.ts',
        'src/utils/index.ts'
      ],
      thresholds: {
        lines: 60,
        branches: 46,
        'src/module/basic/Popup/index.ts': {
          lines: 74,
          branches: 58
        },
        'src/module/control/Control/index.ts': {
          lines: 54,
          branches: 22
        },
        'src/module/core/Map/index.ts': {
          lines: 55,
          branches: 42
        },
        'src/module/interaction/Interaction/index.ts': {
          lines: 87,
          branches: 78
        },
        'src/module/layer/BaseLayer/index.ts': {
          lines: 47,
          branches: 40
        },
        'src/module/source/Source/index.ts': {
          lines: 60,
          branches: 62
        },
        'src/module/util/Event/index.ts': {
          lines: 84,
          branches: 78
        }
      }
    }
  }
})
