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
        lines: 67,
        branches: 52,
        'src/module/basic/Popup/index.ts': {
          lines: 92,
          branches: 80
        },
        'src/module/control/Control/index.ts': {
          lines: 100,
          branches: 94
        },
        'src/module/core/Map/index.ts': {
          lines: 90,
          branches: 85
        },
        'src/module/interaction/Interaction/index.ts': {
          lines: 87,
          branches: 78
        },
        'src/module/layer/BaseLayer/index.ts': {
          lines: 100,
          branches: 95
        },
        'src/module/source/Source/index.ts': {
          lines: 100,
          branches: 87
        },
        'src/module/util/Event/index.ts': {
          lines: 95,
          branches: 88
        }
      }
    }
  }
})
