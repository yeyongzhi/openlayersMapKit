# 更新日志

本项目遵循 [Semantic Versioning](https://semver.org/lang/zh-CN/)，并以 Keep a Changelog 的分类方式记录面向使用者的变化。

## [Unreleased]

### Added

- 增加公开 `OMapError`/`OMapErrorCode`，并为 Measure 提供精确事件 payload 与结束结果快照。
- 增加完整质量门禁：类型检查、零警告 Lint、格式检查、覆盖率、库与文档构建、包消费验证。
- 增加 ESM、CommonJS/UMD 与 TypeScript 声明消费者冒烟测试。
- 增加统一的 `Disposable` 生命周期协议、Feature wrapper resolver 与 Map 子系统管理器。
- 增加 VitePress 文档站和发布工作流。

### Changed

- 将 `Map` 的 Layer、Interaction、Control、Popup、View、Feature query 和事件适配职责拆分为独立组件。
- 公共事件、坐标 tuple、回调与部分 properties 类型进一步收紧。
- ESM 与 UMD/CJS 构建内联 OpenLayers，确保 Node 消费者可直接加载两个入口。

### Deprecated

- `Lnglat` 已废弃，请使用兼容别名 `LngLat`；计划在下一个主版本移除旧名称。

### Fixed

- 修复同类原生事件被多次订阅时重复派发、资源移除后监听器残留，以及 Feature wrapper 重复创建问题。

## [0.1.0-beta.1] - Unreleased

内部联调版本。完成公开 Beta 门禁前不会发布至 npm。
