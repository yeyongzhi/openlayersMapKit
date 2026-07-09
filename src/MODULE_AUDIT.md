# src/module 优化改动清单

审查时间：2026-07-09
审查范围：`src/module` 下的 core、layer、source、interaction、control、basic、util 模块。
文档目标：记录当前源码中仍需要推进的优化项；已经完成或已被当前代码吸收的内容不再列入。

## 当前状态概览

当前模块已经具备 OpenLayers 封装库的主要骨架：

- 基础对象：`Color`、`Lnglat`、`Extent`、`Pixel`、`Size`、`Style`、`Popup`
- 核心对象：`Map`、`Projection`、各类 `Feature`
- 图层：`BaseLayer`、`VectorLayer`、`TileLayer`、`ImageLayer`、`XYZ/WMS/WMTS`、`Gaode/Tdt`
- 数据源：`Source`、`VectorSource`、`ImageSource`、`TileSource` 及常用瓦片子类
- 交互：`Draw`、`Measure`、`Modify`、`Select`、缩放、拖拽、联动等
- 工具：`Event`、`Format`、`ProjUtil`、`MapToken`

`VectorSource` 已经补充了比较完整的 Feature cache、增删查、范围查询、loader、url、事件等能力，后续重点不再是补 `VectorSource` 基础 API，而是统一各模块对它的使用方式。

## 第一优先级：补测试与状态源验证

### 1. VectorLayer 与 VectorSource 状态源验证

位置：

- `src/module/layer/VectorLayer/index.ts`
- `src/module/source/VectorSource/index.ts`
- `src/module/interaction/Draw/index.ts`
- `src/module/interaction/Modify/index.ts`
- `src/module/interaction/Select/index.ts`

当前状态：

- `VectorSource` 已经维护 `featureCache`，并能通过 `createOMapFeature` 复用稳定的 OMap Feature 包装。
- `VectorLayer` 不再维护独立 `features` 状态，Feature API 已委托给 `VectorSource`。
- `VectorSource` 已监听原生 `addfeature/removefeature/clear` 事件来同步 cache。
- `Draw/Modify/Select` 已通过 `VectorLayer.getFeatureByOlFeature()` 或 `getFeatures()` 门面获取 OMap Feature。

建议改动：

- 补测试覆盖 Draw 新增 Feature 后的 `drawEnd` 回调。
- 补测试覆盖 Modify 快照恢复。
- 补测试覆盖 Select 样式函数、filter 和 select 事件。
- 继续把交互中扫描 `getFeatures()` 的路径替换为更直接的 resolver。

验收标准：

- 直接操作 `VectorSource` 或原生 source 后，`VectorLayer` 查询结果仍然一致。
- 绘制、修改、选择和样式函数都拿到同一个 OMap Feature 包装对象。

## 第二优先级：核心抽象补齐

### 2. 几何 Feature 构造逻辑抽公共 helper

位置：`src/module/core/Feature/*`

当前问题：

- `Point`、`LineString`、`Polygon`、`Multi*` 中存在重复的构造、校验和坐标转换逻辑。

建议改动：

- 抽公共 helper：
  - `initByCoordinates`
  - `initByOlFeature`
  - `normalizeCoordinates`

验收标准：

- 新增一种几何类型时，不需要重复大量初始化逻辑。

### 3. basic 值对象统一协议

位置：`src/module/basic/*`

建议统一：

- `toArray()`
- `toString(precision?)`
- `equals(value)`
- `clone()`
- `static from(value)`

涉及对象：

- `Lnglat`
- `Pixel`
- `Size`
- `Extent`
- `Color`

验收标准：

- 值对象 API 风格一致。
- handle 函数可以复用统一协议，减少分支判断。

## 第三优先级：Format 与工具能力完善

### 4. Format API 补齐

位置：`src/module/util/Format/*`

建议补充：

- 补充常用格式：`GPX`、`GML`、`MVT`、`EsriJSON`、`TopoJSON`。
- 收紧 `BasicFeature<any>` 泛型。

验收标准：

- OpenLayers 常用 format 能力在 OMap 层有一致入口。
- 类型提示能准确表达输入输出。

## 后续能力补充清单

### Source / Layer

- `ImageSource` 子类：
  - `ImageStatic`
  - `ImageWMS`
  - `GeoTIFF`
  - `Raster`
  - `ImageCanvas`
- `TileSource` 子类：
  - `BingMaps`
  - `Google`
  - `IIIF`
  - `OGCMapTile`
  - `TileArcGISRest`
  - `TileJSON`
  - `Zoomify`
- 图层：
  - `VectorTileLayer`
  - `HeatmapLayer`
- 数据源：
  - `ClusterSource`

### Interaction

- 新增常用交互：
  - `Snap`
  - `Translate`
  - `PinchZoom`
  - `PinchRotate`
  - `DragRotate`
  - `DragRotateAndZoom`
  - `KeyboardPan`
- `Modify` 增强：
  - 支持 properties/style 的撤销记录
  - 支持 redo
  - 支持删除 feature 的撤销
- `Draw` 增强：
  - 明确 `drawabort` 后业务状态清理策略
  - 支持绘制过程中的 tooltip 和 vertex marker
- `Select` 增强：
  - 支持主动 `select(feature)`
  - 支持 `clear()`
  - 支持获取原生 selected collection

### Control

- `ScaleLine`
- `MousePosition`
- `OverviewMap`
- `Rotate`
- `Attribution`
- 自定义 DOM Control 基类

### Popup

位置：`src/module/basic/Popup/*`

建议补充：

- `dispose()`
- 箭头样式
- 关闭按钮
- `autoPan`
- `className`
- HTML content 更新策略
- 明确 `setElement(undefined)` 是否允许

### Map

建议补充：

- `dispose()`
- `setTarget()` / `getTarget()`
- `updateSize()`
- `getProjection()`
- layer zIndex 排序工具
- interaction/control/popup 的批量清理
- `getFeaturesAtCoordinate`
- `getFeaturesInExtent`
- `forEachLayerAtPixel`

## 推荐实施顺序

### 阶段一：继续统一状态源

1. 为 `VectorSource.featureCache` 与 `VectorLayer` 门面补测试。
2. 把交互中扫描 `getFeatures()` 的路径继续替换为 resolver。

### 阶段二：补齐核心 API

1. 抽 Feature 几何初始化 helper。
2. 统一 basic 值对象协议。
3. 收紧 `Format` 泛型并补更多格式。

### 阶段三：补能力和测试

1. 补常用 Source、Layer、Interaction、Control。
2. 为核心类增加单元测试：
   - `Event`
   - `VectorSource`
   - `VectorLayer`
   - `Draw/Measure/Modify/Select`
   - `Format`

## 推荐优先处理文件

1. `src/module/layer/VectorLayer/index.ts`
2. `src/module/source/VectorSource/index.ts`
3. `src/module/interaction/Draw/index.ts`
4. `src/module/interaction/Measure/index.ts`
5. `src/module/interaction/Modify/index.ts`
6. `src/module/interaction/Select/index.ts`
7. `src/module/core/Feature/BasicFeature/handle.ts`
8. `src/module/core/Feature/*/index.ts`
9. `src/module/basic/*`
10. `src/module/util/Format/*`

## 备注

- `VectorSource.featureCache` 已经作为唯一 Feature 状态源，后续应优先补测试保证该约束不回退。
- `UrlTile`、`TileImage` 在 OpenLayers 文档中标记 deprecated，不代表业务 API 中的 `XYZ/WMS/WMTS` 必须废弃；OMap 应保持业务层 API 稳定，底层实现可以内部迁移。
- 当前工作区存在大量已修改文件，后续大范围重构前建议先统一行尾和格式化策略，减少 diff 噪声。
