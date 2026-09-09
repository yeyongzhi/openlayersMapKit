# 更新日志

本项目遵循[语义化版本](https://semver.org/lang/zh-CN/)，并参照 [Keep a Changelog](https://keepachangelog.com/zh-CN/) 记录面向使用者的变化。

## [Unreleased]

### Added

- 新增项目整体说明和从代码完善到 npm、GitHub Pages 正式发布的完整交付计划。
- 新增 VitePress 环境与兼容性指南、站内搜索、GitHub 编辑入口、项目导航和 sitemap。

### Changed

- 精简根目录阶段性审计和旧计划文档，长期维护信息统一沉淀到项目说明、贡献指南、更新日志和交付计划。
- 将 npm 包主页指向 VitePress 文档站，并将 README 中发布后可见的仓库链接改为 GitHub 绝对地址。
- 加固 npm 发布工作流：在校验阶段传递精确版本，并只发布该版本对应的 tarball。

### Fixed

- 修复 Draw 一次完成派发两次 `drawend` 的问题。事件快照包含新完成的要素；程序化向绘制图层添加要素不再合成绘制完成事件。
- 修正文档中不存在的 `GaodeLayerType.VEC` 示例，并明确经纬度需要通过 `ProjUtil.fromLonLat()` 转为视图投影坐标。

## [0.1.0-beta.1] - 2026-09-03

### Added

- 增加 `OMapError`、`OMapErrorCode` 和统一的公共错误契约。
- 增加 Map、Feature、Layer、Source、Interaction、Control、Basic 和 Util 模块的 TypeScript 包装 API。
- 增加统一的 `Disposable` 生命周期协议、Feature wrapper resolver 与 Map 子系统管理器。
- 增加 ESM、CommonJS/UMD 和 TypeScript 类型声明输出。
- 增加 Vitest、Playwright、消费者测试、覆盖率和公共 API 基线检查。
- 增加 VitePress 文档站、Vite/HTML 示例及 npm、Pages 发布演练工作流。
- 增加 `ImageStaticSource`、图层 Source wrapper getter 和 Select 候选要素管理能力。

### Changed

- npm 包名调整为 `openlayers-map-kit`。
- OpenLayers 调整为 peer dependency；ESM 复用宿主项目的 `ol`，UMD/CJS 构建继续内置 OpenLayers。
- Map 的 Layer、Interaction、Control、Popup、View、Feature query 和事件适配职责拆分为独立组件。
- Interaction 的同类原生事件改为共享监听，并在最后一个订阅者退订或销毁时释放。
- Interaction 构造选项 `active` 在所有公开交互中统一生效。

### Deprecated

- `Lnglat` 已废弃，请使用 `LngLat`；旧名称暂时作为兼容别名保留。

### Fixed

- 修复 Map、Layer、Interaction、Popup 和 Control 销毁后的监听器、DOM、Overlay 与缓存残留问题。
- 修复已有默认值的 Map View 选项被错误声明为必填的问题。
- 修复同类原生事件重复派发和 Feature wrapper 重复创建问题。
- 修复 Select 的 `features` 白名单、`layers` 组合条件及主动选择状态不同步问题。
- 修复 VectorLayer 与 Select 的多样式数组被截断问题。
- 修复 DragBox 实例共享回调，以及部分交互污染默认参数的问题。
- 修复 TileLayer 数据源参数校验与派生图层丢失 Source wrapper 的问题。

### Removed

- 从包根运行时导出中移除未进入公共契约的内部默认参数、事件常量及参数转换助手。
- 移除 DragBox 内部共享的模块级回调单例，改为实例级持有。

[Unreleased]: https://github.com/yeyongzhi/openlayersMapKit/compare/v0.1.0-beta.1...HEAD
[0.1.0-beta.1]: https://github.com/yeyongzhi/openlayersMapKit/releases/tag/v0.1.0-beta.1
