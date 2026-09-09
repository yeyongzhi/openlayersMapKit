import { defineConfig } from 'vitepress'
// 逐类 API 侧边栏由 scripts/gen-api-docs.mjs 生成，新增公开类后重跑该脚本即可同步
import apiClassSidebar from './api-sidebar.json'

export default defineConfig({
  lang: 'zh-CN',
  title: 'OMap',
  description: '基于 OpenLayers 的类型安全地图应用开发 SDK',
  base: process.env.DOCS_BASE ?? '/openlayersMapKit/',
  head: [
    ['meta', { name: 'theme-color', content: '#2563eb' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'OMap — OpenLayers 类型安全业务封装' }],
    [
      'meta',
      {
        property: 'og:description',
        content: '使用统一的 Map、Layer、Source、Feature 和 Interaction API 构建地图应用。'
      }
    ]
  ],
  lastUpdated: true,
  cleanUrls: true,
  sitemap: {
    hostname: 'https://yeyongzhi.github.io/openlayersMapKit/'
  },
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: 'API', link: '/api/' },
      { text: '示例', link: '/examples/basic-map' },
      {
        text: '项目',
        items: [
          { text: '发布状态', link: '/guide/release-status' },
          { text: '版本策略', link: '/guide/versioning' },
          { text: 'GitHub', link: 'https://github.com/yeyongzhi/openlayersMapKit' },
          { text: 'npm', link: 'https://www.npmjs.com/package/openlayers-map-kit' }
        ]
      }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '开发指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '环境与兼容性', link: '/guide/compatibility' },
            { text: '核心概念', link: '/guide/core-concepts' },
            { text: '架构与模块', link: '/guide/architecture' },
            { text: '迁移指南', link: '/guide/migration' },
            { text: '故障排查', link: '/guide/troubleshooting' },
            { text: '版本与发布', link: '/guide/versioning' },
            { text: '发布状态', link: '/guide/release-status' },
            { text: '0.1.0-beta.1 发布说明', link: '/guide/release-notes-0.1.0-beta.1' },
            { text: '历史模块审计', link: '/guide/module-audit' }
          ]
        }
      ],
      '/api/': [
        {
          text: '模块总览',
          items: [
            { text: '模块与稳定性', link: '/api/' },
            { text: 'Core', link: '/api/core' },
            { text: 'Layer 与 Source', link: '/api/layer-source' },
            { text: 'Interaction', link: '/api/interaction' },
            { text: 'Basic', link: '/api/basic' },
            { text: 'Control', link: '/api/control' },
            { text: 'Util', link: '/api/util' }
          ]
        },
        {
          text: '逐类参考',
          items: apiClassSidebar
        }
      ],
      '/examples/': [
        {
          text: '示例',
          items: [
            { text: '创建地图', link: '/examples/basic-map' },
            { text: 'Vector 与 Geometry', link: '/examples/vector-geometry' },
            { text: 'XYZ / WMS / WMTS 图层', link: '/examples/tile-layers' },
            { text: 'Vue 地图工具', link: '/examples/vue-map-toolkit' },
            { text: '控件', link: '/examples/controls' },
            { text: '销毁与路由切换', link: '/examples/lifecycle' }
          ]
        }
      ]
    },
    outline: { level: [2, 3], label: '本页内容' },
    search: { provider: 'local' },
    editLink: {
      pattern: 'https://github.com/yeyongzhi/openlayersMapKit/edit/dev/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    lastUpdated: {
      text: '最后更新于'
    },
    footer: {
      message: '基于 MIT 许可证发布',
      copyright: 'Copyright © 2026 Aurora'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/yeyongzhi/openlayersMapKit' }]
  }
})
