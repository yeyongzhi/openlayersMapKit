---
layout: home

hero:
  name: OMap
  text: OpenLayers 的类型安全业务封装
  tagline: 用统一的 Map、Layer、Source、Feature 和 Interaction API 快速构建地图应用
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 浏览 API
      link: /api/
    - theme: alt
      text: 查看 GitHub
      link: https://github.com/yeyongzhi/openlayersMapKit

features:
  - title: 面向对象 API
    details: 对 OpenLayers 常用能力进行模块化封装，并保留访问原生实例的能力。
  - title: 国内地图服务
    details: 提供高德、天地图、XYZ、WMS 和 WMTS 等常见图层入口。
  - title: TypeScript
    details: 发布声明文件，并持续收紧 Feature、事件和属性类型。
  - title: 生命周期可控
    details: Map 统一托管图层、交互、控件和弹窗，并通过幂等 dispose 完整释放资源。
  - title: 多种消费方式
    details: 同时验证 ESM、CommonJS/UMD、TypeScript 声明和 Vite 生产构建。
  - title: 发布质量门禁
    details: 使用 API 基线、Vitest、Playwright、独立 tarball 和文档构建保护发布质量。
---

::: warning 当前状态
OMap 正在进行首次公开发布前的产品化改造，当前版本属于 Beta，不建议直接用于关键生产系统。
:::

## 从这里开始

- 第一次使用：阅读[快速开始](/guide/getting-started)和[环境与兼容性](/guide/compatibility)。
- 理解设计：阅读[核心概念](/guide/core-concepts)和[架构与模块](/guide/architecture)。
- 查找能力：进入 [API 参考](/api/)或浏览[完整示例](/examples/basic-map)。
- 评估发布进度：查看[发布状态](/guide/release-status)和[版本策略](/guide/versioning)。
