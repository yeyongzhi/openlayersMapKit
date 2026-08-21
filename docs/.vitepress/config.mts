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
            { text: '发布状态', link: '/guide/release-status' }
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
            { text: 'Interaction', link: '/api/interaction' }
          ]
        }
      ],
      '/examples/': [
        {
          text: '示例',
          items: [{ text: '创建地图', link: '/examples/basic-map' }]
        }
      ]
    },
    socialLinks: []
  }
})
