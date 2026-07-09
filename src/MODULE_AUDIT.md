# src/module 模块审查与重构待办

审查时间：2026-07-09  
范围：`src/module` 下的基础类型、核心地图/要素、图层、数据源、交互、控件和工具模块。  
目标：梳理当前类设计的可优化点、遗漏能力和建议重构顺序。

## 总体结论

当前模块已经覆盖了一个 OpenLayers 封装库的核心骨架：

- 基础值对象：`Color`、`Lnglat`、`Extent`、`Pixel`、`Size`、`Style`、`Popup`
- 核心对象：`Map`、`Projection`、各类 `Feature`
- 图层：`BaseLayer`、`VectorLayer`、`TileLayer`、`ImageLayer`、`XYZ/WMS/WMTS`、`Gaode/Tdt`
- 数据源：`Source`、`VectorSource`、`ImageSource`、`TileSource` 及常用瓦片子类
- 交互：`Draw`、`Measure`、`Modify`、`Select`、缩放/拖拽/联动等
- 工具：`Event`、`Format`、`ProjUtil`、`MapToken`

但整体还处在“功能优先、封装逐步抽象”的阶段。最值得优先处理的是：

1. `Map` 类职责过重，图层/交互/控件/弹窗/事件/几何计算都集中在一个类里。
2. `VectorLayer` 与 `VectorSource` 同时维护 Feature 状态，存在双写和同步成本。
3. `BaseLayer` 反向依赖具体交互类，导致基础层与交互层耦合。
4. 老图层类 `XYZLayer/WMSLayer/WMTSLayer` 与新 `TileSource` 体系重复，应该逐步迁移。
5. 事件绑定模式在多个类中重复，`on/once/un` 校验、包装和解绑可以抽公共 helper。
6. 仍有不少 `any`、空实现、调试输出、TODO，需要分批收敛。

## 高优先级问题

### 1. Map 职责过重

位置：`src/module/core/Map/index.ts`

现状：

- 同时管理 view、layer、layerGroup、interaction、control、popup、事件、空间查询、几何计算。
- `on/once` 逻辑重复。
- `addLayer/removeLayer/addInteraction/removeInteraction/addPopup/removePopup` 都有类似查重、校验、状态同步逻辑。
- `removeLayerGroup` 和 `removeLayerGroupById` 中存在疑似 bug：
  - `this.layerGroups = this.layerGroups.splice(index, 1)`
  - `splice` 返回被删除元素数组，这会把图层组列表变成“被删除的那一项”，而不是删除后的列表。

建议：

- 拆成内部 manager：
  - `LayerManager`
  - `InteractionManager`
  - `ControlManager`
  - `PopupManager`
  - `MapEventManager`
- `Map` 保持门面角色，只暴露稳定 API。
- 先修复 `layerGroups.splice` 赋值问题。
- 抽一个 `validateEvent(type, callback, methodName)`，避免事件校验重复。

### 2. VectorLayer 与 VectorSource 状态双写

位置：

- `src/module/layer/VectorLayer/index.ts`
- `src/module/source/VectorSource/index.ts`

现状：

- `VectorSource` 有 `featureCache`，能把 ol `Feature` 稳定映射到 OMap `BasicFeature`。
- `VectorLayer` 又维护一份 `features: BaseFeature[]`。
- `Draw/Measure/Modify/Select/Style` 都依赖 `VectorLayer.features`。
- `initVectorLyaerEvent()` 监听 source `addfeature`，手动同步一份到 `features`。

风险：

- 手动 `addFeature/removeFeature/clear` 与原生 source 事件同时发生时容易重复或漏同步。
- 后续如果业务直接操作 `VectorSource`，`VectorLayer.features` 可能不同步。
- 查询方法一部分走 `_layer.getSource()`，一部分走 `vectorSource`，职责边界不稳定。

建议：

- 短期：继续保留 `features`，但把同步逻辑集中成：
  - `syncFeatureFromOlFeature(feature)`
  - `removeFeatureByOlFeature(feature)`
  - `syncFeaturesFromSource()`
- 中期：`VectorLayer.getFeatures()` 委托给 `this.vectorSource.getFeatures()`。
- 长期：删除 `VectorLayer.features`，由 `VectorSource.featureCache` 作为唯一 Feature 状态源。

### 3. BaseLayer 反向依赖交互类

位置：`src/module/layer/BaseLayer/index.ts`

现状：

```ts
import Draw from '../../interaction/Draw/index'
import Modify from '../../interaction/Modify/index'
import Measure from '../../interaction/Measure/index'
target: Map | Draw | Modify | Measure | null = null;
```

问题：

- 基础图层层不应该依赖具体交互类。
- 后续新增交互时，`BaseLayer` 类型也要跟着改。
- 会增加循环依赖风险。

建议：

- 定义轻量接口：

```ts
type LayerTarget = Map | { getInteraction?: () => unknown; type?: string } | null
```

或更直接：

```ts
interface OMapLayerTarget {
  type?: string | null;
}
```

- `VectorLayer` 如需判断是否是绘制/测量目标，应放到 `VectorLayer` 自己或 `Interaction` 抽象层处理，而不是 `BaseLayer`。

### 4. 旧图层类与新 Source 体系重复

位置：

- `src/module/layer/XYZLayer`
- `src/module/layer/WMSLayer`
- `src/module/layer/WMTSLayer`
- `src/module/source/TileSource/subClass/*`

现状：

- 新的 `TileSource` 体系已经有 `XYZSource`、`TileWMSSource`、`WMTSSource` 等。
- 旧 `XYZLayer/WMSLayer/WMTSLayer` 仍直接 new `OlSource.XYZ/TileWMS/WMTS`。
- `tileGrid` 参数转换逻辑在多个 layer 里重复。
- `WMTSLayer` 内仍有调试输出：
  - `console.log("_sourceParams")`
  - `console.log(_sourceParams)`
- `WMTSLayer` 构造里 `super('WMS', ...)` 疑似写错，应为 `WMTS`。

建议：

- `XYZLayer/WMSLayer/WMTSLayer` 改成组合对应 Source 类：
  - `XYZLayer -> XYZSource`
  - `WMSLayer -> TileWMSSource`
  - `WMTSLayer -> WMTSSource`
- 抽公共 tileGrid 参数转换工具，放到 `layer/common` 或 `source/TileSource`。
- 删除调试输出。
- 修正 `WMTSLayer` 类型名。

## 中优先级重构

### 5. Interaction 事件模式可继续抽象

位置：`src/module/interaction/*`

现状：

- `Draw/Modify/Select/Measure` 已部分收敛。
- 其他交互如 `DragBox`、`DragPan`、`DragZoom`、`MouseWheelZoom`、`DoubleClickZoom`、`KeyboardZoom`、`Link` 仍有重复的：
  - 参数校验
  - `OlEvent.listen`
  - `this.events.emit`
  - `on/once/un`

建议：

- 在 `Interaction` 基类里提供：
  - `protected validateEvent(...)`
  - `protected bindOlEvent(...)`
  - `protected emitWrappedEvent(...)`
- 子类只提供 `eventTypes` 和 `eventTransform`。

### 6. Feature 类有空实现和重复实现

位置：`src/module/core/Feature/*`

现状：

- `BasicFeature` 中有空方法：
  - `dispatchEvent()`
  - `clone()`
  - `getGeometryName()`
- `Point/LineString/Polygon/Multi*` 中大量构造、参数校验、坐标转换逻辑重复。
- `createBaseFeatureByOlFeature` 不支持 `GeometryCollection`，但 type 里包含了 `GeometryCollection`。

建议：

- 空方法要么实现，要么删除，要么显式 `throw` 并写 TODO。
- 抽 `GeometryFeatureBase` 或 helper：
  - `initByCoordinates`
  - `initByOlFeature`
  - `normalizeCoordinates`
- 补 `GeometryCollection` 封装，或从公开 type 中移除。
- `clone()` 应返回对应 OMap Feature，且保持 properties/style/id 复制策略明确。

### 7. Format 存在全局 formatTool 状态

位置：

- `src/module/util/Format/index.ts`
- `src/module/util/Format/module/index.ts`

现状：

- `Format` 实例初始化时调用 `updateFormatTool(this._format)`。
- `module/index.ts` 使用全局 `formatTool`。
- 多个 `Format` 实例同时存在时，后创建的实例会覆盖前一个实例的底层 format。

风险：

- `new Format(GeoJSON)` 和 `new Format(WKT)` 同时使用时，读写可能串到最后一个实例。

建议：

- 移除全局 `formatTool`。
- 各格式模块改为纯函数，接收当前实例的 `_format`：

```ts
handleReadFeature(format, type, source, options)
```

- 或让 `Format` 类内部直接调用 strategy 对象。

### 8. Event 类类型和解绑行为需要统一

位置：`src/module/util/Event/index.ts`

现状：

- `remove(id)` 中如果 `unlisten` 是函数才调用。
- `off(type)` 中直接 `OlEvent.unlistenByKey(item.unlisten)`。
- 但项目中传入的 `unlisten` 有时是 `EventsKey`，有时可能是函数。

建议：

- 统一 `OMapEventsKeyType` 为 `EventsKey | EventsKey[] | (() => void)`。
- 提供内部 `disposeUnlisten(unlisten)`。
- `remove/off` 都用同一个释放逻辑。

### 9. Style 函数会重复包装 Feature

位置：`src/module/basic/Style/handle.ts`

现状：

- `handleGetStyleValue` 对每次 ol style callback 都调用 `createBaseFeatureByOlFeature`。
- 这会创建新的 OMap Feature 包装对象，可能和 `VectorLayer.features` / `VectorSource.featureCache` 不一致。

建议：

- 样式函数应优先通过 `VectorSource.featureCache` 或 `VectorLayer` 提供的映射获取稳定 OMap Feature。
- 避免每帧样式计算时重复创建 wrapper。

## 低优先级整理

### 10. basic 值对象可以统一协议

位置：`src/module/basic/*`

建议统一：

- `toArray()`
- `toString(precision?)`
- `equals(value)`
- `clone()`
- `static from(value)`

当前 `Lnglat/Pixel/Size/Extent/Color` 能力风格不完全一致。统一后，所有 handle 函数也能更简单。

### 11. Control 类能力偏少

位置：`src/module/control/*`

现状：

- 只有 `Zoom`、`FullScreen`。

建议补充：

- `ScaleLine`
- `MousePosition`
- `OverviewMap`
- `Rotate`
- `Attribution`
- 自定义 DOM Control 基类

### 12. Popup 还有样式和生命周期 TODO

位置：`src/module/basic/Popup/*`

现状：

- `handle.ts` 中有小箭头样式 TODO。
- `_initElementEvent()` 是空实现。

建议：

- 增加 `dispose()`。
- 支持箭头、关闭按钮、autoPan、className、HTML content 更新策略。
- 明确 `setElement(undefined)` 是否允许，避免旧 Measure 中出现过的问题。

## 遗漏或待补功能清单

### Source/Layer

- `ImageSource` 子类还不完整：
  - `ImageStatic`
  - `ImageWMS`
  - `GeoTIFF`
  - `Raster`
  - `ImageCanvas`
- `TileSource` 可继续补：
  - `BingMaps`
  - `Google`
  - `IIIF`
  - `OGCMapTile`
  - `TileArcGISRest`
  - `TileJSON`
  - `Zoomify`
  - `OGCVectorTile` 已有，但可以补示例和 layer 封装
- `VectorTileLayer` 当前缺位，虽然已有 `VectorTileSource`。
- `HeatmapLayer` 缺位。
- `ClusterSource` 缺位。
- `LayerGroup` 不是 ol `LayerGroup` 封装，是否需要真实 `ol/layer/Group` 版本需要确认。

### Interaction

- 常用但未封装：
  - `Snap`
  - `Translate`
  - `PinchZoom`
  - `PinchRotate`
  - `DragRotate`
  - `DragRotateAndZoom`
  - `KeyboardPan`
- `Modify` 待增强：
  - 支持 properties/style 的撤销记录
  - 支持 redo
  - 支持删除 feature 的撤销
- `Draw` 待增强：
  - `drawabort` 后业务状态清理策略
  - 绘制过程中的临时 tooltip/vertex marker 可选能力
- `Select` 待增强：
  - 支持主动 `select(feature)` / `clear()`
  - 支持获取原生 selected collection

### Feature

- `GeometryCollection` 缺封装。
- `Feature` 序列化/反序列化策略还散落在 `Format`。
- `BasicFeature.clone()` 未实现。
- 统一 Feature properties/id/style 复制策略。

### Format

- 可补：
  - GPX
  - GML
  - MVT
  - EsriJSON
  - TopoJSON
- `writeFeaturesNode` 在 `Format` 类未暴露。
- KML/WKT/GeoJSON 模块中泛型 `BasicFeature<any>` 可以收紧。

### Map

- 缺少：
  - `dispose()`
  - `setTarget()` / `getTarget()`
  - `updateSize()` 明确封装
  - `getProjection()`
  - layer zIndex 排序工具
  - interaction/control/popup 的批量清理
- 空间查询可补：
  - `getFeaturesAtCoordinate`
  - `getFeaturesInExtent`
  - `forEachLayerAtPixel`

## 建议重构路线图

### 第一阶段：修 bug 和降低耦合

1. 修复 `Map.removeLayerGroup/removeLayerGroupById` 的 `splice` 赋值问题。
2. 修复 `WMTSLayer`：
   - 删除 `console.log`
   - `super('WMS')` 改为 `super('WMTS')`
3. `BaseLayer.target` 改为抽象接口，移除对 `Draw/Modify/Measure` 的直接 import。
4. `Format` 去掉全局 `formatTool`。
5. `Event` 统一解绑逻辑。

### 第二阶段：统一状态源

1. `VectorLayer.getFeatures()` 改为委托 `VectorSource.getFeatures()`。
2. `VectorLayer` 查询方法逐步委托给 `VectorSource`。
3. `Style` 函数从稳定 cache 获取 OMap Feature。
4. `Draw/Measure/Modify/Select` 统一依赖 `VectorSource` 的 Feature cache。

### 第三阶段：Layer/Source 体系迁移

1. 老 `XYZLayer/WMSLayer/WMTSLayer` 改用新 Source 子类组合。
2. 抽公共 tileGrid 参数转换。
3. 补 `VectorTileLayer`、`HeatmapLayer`、`ClusterSource`。
4. 为常用 Source 写 README 和示例。

### 第四阶段：补能力和 API 稳定化

1. 补 `Snap/Translate` 等常用交互。
2. 补 `ScaleLine/MousePosition/OverviewMap` 控件。
3. 补 `GeometryCollection`。
4. `BasicFeature.clone/dispatchEvent/getGeometryName` 完成或删除。
5. 为核心类添加单元测试：
   - `Event`
   - `VectorSource`
   - `VectorLayer`
   - `Draw/Measure/Modify/Select`
   - `Format`

## 推荐优先处理文件

按收益和风险排序：

1. `src/module/core/Map/index.ts`
2. `src/module/layer/VectorLayer/index.ts`
3. `src/module/source/VectorSource/index.ts`
4. `src/module/layer/BaseLayer/index.ts`
5. `src/module/util/Format/module/index.ts`
6. `src/module/util/Event/index.ts`
7. `src/module/layer/XYZLayer/index.ts`
8. `src/module/layer/WMSLayer/index.ts`
9. `src/module/layer/WMTSLayer/index.ts`
10. `src/module/core/Feature/BasicFeature/index.ts`

## 备注

- `UrlTile`、`TileImage` 在 OpenLayers 文档中标记 deprecated，不代表业务上的 `XYZ/WMS/WMTS` 要废弃。OMap 应保持业务 API 稳定，底层 source 实现可以内部迁移。
- `VectorLayer.features` 当前还不能直接删除，因为 `Draw/Measure/Modify/Select/Style` 都在依赖它。建议先把 `VectorSource.featureCache` 做成稳定唯一来源，再逐步迁移。
- 当前仓库存在较多 CRLF/LF 行尾差异，后续大规模重构前建议先统一 `.gitattributes`，否则 diff 会长期噪声很大。
