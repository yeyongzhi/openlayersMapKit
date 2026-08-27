import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'OMap',
  description: '基于 OpenLayers 的类型安全地图应用开发 SDK',
  base: process.env.DOCS_BASE ?? '/openlayersMapKit/',
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: 'API', link: '/api/' },
      { text: '示例', link: '/examples/basic-map' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '开发指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '架构与模块', link: '/guide/architecture' },
            { text: '迁移指南', link: '/guide/migration' },
            { text: '故障排查', link: '/guide/troubleshooting' },
            { text: '版本与发布', link: '/guide/versioning' },
            { text: '发布状态', link: '/guide/release-status' },
            { text: '历史模块审计', link: '/guide/module-audit' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API 参考',
          items: [
            { text: '模块总览', link: '/api/' },
            { text: 'Core', link: '/api/core' },
            { text: 'Layer 与 Source', link: '/api/layer-source' },
            { text: 'Interaction', link: '/api/interaction' },
            { text: 'Basic', link: '/api/basic' },
            { text: 'Control', link: '/api/control' },
            { text: 'Util', link: '/api/util' }
          ]
        }
      ],
      '/examples/': [
        {
          text: '示例',
          items: [
            { text: '创建地图', link: '/examples/basic-map' },
            { text: 'Vue 地图工具', link: '/examples/vue-map-toolkit' }
          ]
        }
      ]
    },
    socialLinks: []
  }
})
