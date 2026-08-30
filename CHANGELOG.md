# 更新日志

本项目遵循 [Semantic Versioning](https://semver.org/lang/zh-CN/)，并以 Keep a Changelog 的分类方式记录面向使用者的变化。

## [Unreleased]

### Added

- 增加公开 `OMapError`/`OMapErrorCode`，并为 Measure 提供精确事件 payload 与结束结果快照。
- 增加完整质量门禁：类型检查、零警告 Lint、格式检查、覆盖率、库与文档构建、包消费验证。
- 增加 ESM、CommonJS/UMD 与 TypeScript 声明消费者冒烟测试。
- 增加统一的 `Disposable` 生命周期协议、Feature wrapper resolver 与 Map 子系统管理器。
- 增加 VitePress 文档站和发布工作流。
- 增加控件事件与标识能力：`Control` 基类及其子类（`Zoom`、`FullScreen`）现提供 `on`/`once`/`un` 事件订阅（返回订阅 id 可精准退订，`un` 与 `dispose` 时自动解绑底层 OpenLayers 监听）与 `setId`。`getControl()` 的返回类型由通用 `OMapControlCommonType` 收窄为具体泛型 `T`，调用方可直接拿到原生控件实例类型。
- 增加 `Select.getFeatures()` / `Select.setFeatures()`，用于读取与替换候选白名单（构造选项 `features`）。
- 增加静态图片数据源包装类 `ImageStaticSource`（继承 `ImageSource`），提供 `getImageExtent()` / `getUrl()` 等 OMap 语义方法，并通过 `src`（包根）对外导出。
- 增加图层数据源包装的可达性：基类 `BaseLayer` 新增 `getSourceWrapper()` 统一返回关联的 OMap 数据源包装；`TileLayer`/`XYZLayer`/`WMSLayer`/`WMTSLayer` 新增类型化 getter（`getTileSource`/`getXYZSource`/`getWMSSource`/`getWMTSSource`），`ImageLayer` 新增 `getImageStaticSource()` / `getImageSource()`。

### Changed

- **交互事件桥接改为按事件类型复用**：`Interaction` 基类的原生监听现在每个事件类型只注册一份，所有订阅者共享它；最后一个订阅者退订或交互 `dispose()` 时自动注销。此前每调用一次 `on()`/`once()` 都会新建一份原生监听，N 个订阅会让一次原生事件触发 N 次派发、每个回调被执行 N 次（共 N² 次）。
- **交互构造选项 `active` 全量生效**：此前仅 `Draw`、`Modify`、`Select` 应用该选项，其余 9 个交互（`DragBox`、`DragPan`、`DragZoom`、`DoubleClickZoom`、`InteractionExtent`、`KeyboardZoom`、`Link`、`Measure`、`MouseWheelZoom`）会忽略它。
- 交互构造选项 `id`、`active` 不再透传给 OpenLayers，避免污染原生交互属性字典。
- `ImageLayer` 补齐自定义 `loader` 分支：此前 `OMapImageSourceParamsType` 已声明 `loader` 字段却未实现，现在按 `url` 是否存在自动分流——有 `url` 走 `ImageStaticSource`（静态图片），否则走 `ImageSource`（自定义 loader）。

- 将 `Map` 的 Layer、Interaction、Control、Popup、View、Feature query 和事件适配职责拆分为独立组件。
- 公共事件、坐标 tuple、回调与部分 properties 类型进一步收紧。
- ESM 与 UMD/CJS 构建内联 OpenLayers，确保 Node 消费者可直接加载两个入口。

### Deprecated

- `Lnglat` 已废弃，请使用兼容别名 `LngLat`；计划在下一个主版本移除旧名称。

### Fixed

- 修复同类原生事件被多次订阅时重复派发、资源移除后监听器残留，以及 Feature wrapper 重复创建问题。
- 修复 `Select` 构造选项 `features` 完全不生效：原先仅用于触发生成 filter，却未在 filter 内做候选判断，导致白名单外的要素同样可选；现在 `features` 作为候选白名单生效。
- 修复 `Select` 传入 `features` 时会清空 `layers`：两者本应正交（分别限定图层与要素），此前清空 `layers` 会使 filter 无法解析要素所属图层，在交互尚未挂载到地图时退化为「任何要素都不可选」。
- 修复 `Select.select()` / `deselect()` / `clearSelection()` 主动操作时不同步 `selected` / `deselected`：这三个方法只改动 OpenLayers 原生 collection（它不会派发 `select` 事件），导致 `getSelected()` / `getDeselected()` 返回陈旧数据。现在主动操作会同步增量状态，`clearSelection()` 还会把原选中项记入 `deselected`。
- 修复样式函数返回 `Style[]` 时被截断为首个样式（`VectorLayer` 与 `Select`），多符号样式现在能完整生效。
- 修复 `DragBox` 的 `onBoxEnd` 回调被所有实例共享：原先存放在模块级单例里，后创建的实例会覆盖前一个实例的回调，且任意一个实例销毁都会清空全部回调。现在每个 `DragBox` 实例持有独立的回调持有者。
- 修复 `DoubleClickZoom` 与 `MouseWheelZoom` 把默认参数常量当作 `Object.assign` 的第一个参数，导致用户参数被写回 `OMAP_INTERACTION_DEFAULT_PARAMS` 而污染后续所有实例。
- 修复 `TileLayer` 把 `source` 参数对象原样透传给 OpenLayers 导致构造必然崩溃：现在 `source` 只接受 OMap 数据源包装实例或 OpenLayers 原生数据源实例，纯参数对象会抛出 `OMapError`。
- 修复 `WMSLayer`/`WMTSLayer`/`XYZLayer`/`GaodeLayer`/`TdtLayer`/`ImageLayer` 在构造完成后丢弃 OMap 数据源包装，外部再也取不到的问题：各图层现在把创建的（或接收的）包装登记到基类，可通过上述 getter 取回。

### Removed

- **收敛公开 API 表面（破坏性变更）**：`src/module/source` 桶文件原先通过 `export *` 把一批内部符号一并透传到包根，现已改为仅透传类型（`export type *`），以下符号不再作为运行时值对外导出：
  - `TILE_SOURCE_EVENT_TYPES`（瓦片事件名枚举，仅 `TileSource` 内部使用）。
  - 全部瓦片源默认参数对象：`DEFAULT_TILE_SOURCE_PARAMS` 及 `XYZSource`/`WMTSSource`/`TileWMSSource`/`DataTileSource`/`ImageTileSource`/`TileDebugSource`/`UTFGridSource`/`VectorTileSource`/`OGCVectorTileSource`/`UrlTileSource`/`TileImageSource` 各自的 `DEFAULT_*_SOURCE_PARAMS`。
  - `TileSource/type.ts` 内的 `handleGetTileGridParams` / `handleGetTileGrid` / `handleGetTileSourceParams` 等内部参数转换助手。
  - 这些符号从未进入公开 API 契约，且 SDK 内部各模块仍直接从各自的 `type.ts` 引入，故本次改动不影响 `src` 内部实现；但若有外部消费方曾直接 `import` 上述符号，升级后将无法再作为值使用（需改为引用其所属 `type.ts` 或对应公开选项类型）。
- 移除 `DragBox/handle.ts` 的模块级单例 `DragBoxParamsBoxEndHandle`，改为工厂函数 `createDragBoxParamsBoxEndHandle()`。该符号从未由包根导出，仅内部使用；若外部曾直接从源码路径引入，请改为 `DragBox` 构造选项 `onBoxEnd`。

## [0.1.0-beta.1] - Unreleased

内部联调版本。完成公开 Beta 门禁前不会发布至 npm。
