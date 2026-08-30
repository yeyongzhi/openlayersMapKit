# API 模块总览

| 模块        | 主要公开能力                                                       | 页面                              |
| ----------- | ------------------------------------------------------------------ | --------------------------------- |
| Core        | `Map`、`Projection`、各类 Feature                                  | [core](./core.md)                 |
| Layer       | `VectorLayer`、`TileLayer`、`XYZLayer`、`WMSLayer`、`WMTSLayer` 等 | [layer-source](./layer-source.md) |
| Source      | `VectorSource`、`ImageSource`、`TileSource` 及瓦片子类             | [layer-source](./layer-source.md) |
| Interaction | `Draw`、`Modify`、`Measure`、`Select`、拖拽和缩放                  | [interaction](./interaction.md)   |
| Control     | `Zoom`、`FullScreen`                                               | [control](./control.md)           |
| Basic       | `LngLat`、`Extent`、`Pixel`、`Size`、`Color`、`Style`、`Popup`     | [basic](./basic.md)               |
| Util        | `Event`、`Format`、`ProjUtil`、`MapToken`、`LnglatUtil`            | [util](./util.md)                 |

每个页面按类给出构造签名、属性、方法、事件与生命周期说明，并标注稳定性分级。Layer 与 Source 关系紧密，合并为一页呈现。

## 逐类参考

除上面的模块页外，每个公开类都有独立页面，包含构造重载、静态成员、自有成员、继承成员（按来源基类分组）与稳定性标记。

签名由 `scripts/gen-api-docs.mjs` 直接调用 TypeScript 编译器从 `src` 提取，因此与代码始终一致；新增公开类后重跑该脚本即可同步页面与侧边栏。

**Core（11）** — [Map](./core/Map.md) · [Projection](./core/Projection.md) · [BasicFeature](./core/BasicFeature.md) · [Point](./core/Point.md) · [LineString](./core/LineString.md) · [Polygon](./core/Polygon.md) · [Circle](./core/Circle.md) · [MultiPoint](./core/MultiPoint.md) · [MultiLineString](./core/MultiLineString.md) · [MultiPolygon](./core/MultiPolygon.md) · [LinearRing](./core/LinearRing.md)

**Layer（12）** — [BaseLayer](./layer/BaseLayer.md) · [VectorLayer](./layer/VectorLayer.md) · [XYZLayer](./layer/XYZLayer.md) · [WMSLayer](./layer/WMSLayer.md) · [WMTSLayer](./layer/WMTSLayer.md) · [ImageLayer](./layer/ImageLayer.md) · [TileLayer](./layer/TileLayer.md) · [GaodeLayer](./layer/GaodeLayer.md) · [TdtLayer](./layer/TdtLayer.md) · [LayerGroup](./layer/LayerGroup.md) · [GaodeLayerType](./layer/GaodeLayerType.md) · [TdtLayerType](./layer/TdtLayerType.md)

**Source（15）** — [Source](./source/Source.md) · [VectorSource](./source/VectorSource.md) · [TileSource](./source/TileSource.md) · [XYZSource](./source/XYZSource.md) · [WMTSSource](./source/WMTSSource.md) · [TileWMSSource](./source/TileWMSSource.md) · [ImageSource](./source/ImageSource.md) · [VectorTileSource](./source/VectorTileSource.md) · [OGCVectorTileSource](./source/OGCVectorTileSource.md) · [DataTileSource](./source/DataTileSource.md) · [ImageTileSource](./source/ImageTileSource.md) · [TileDebugSource](./source/TileDebugSource.md) · [UTFGridSource](./source/UTFGridSource.md) · [UrlTileSource](./source/UrlTileSource.md) · [TileImageSource](./source/TileImageSource.md)

**Interaction（15）** — [Draw](./interaction/Draw.md) · [Measure](./interaction/Measure.md) · [Modify](./interaction/Modify.md) · [Select](./interaction/Select.md) · [DragBox](./interaction/DragBox.md) · [DragPan](./interaction/DragPan.md) · [DragZoom](./interaction/DragZoom.md) · [MouseWheelZoom](./interaction/MouseWheelZoom.md) · [DoubleClickZoom](./interaction/DoubleClickZoom.md) · [KeyboardZoom](./interaction/KeyboardZoom.md) · [Link](./interaction/Link.md) · [InteractionExtent](./interaction/InteractionExtent.md) · [DrawMode](./interaction/DrawMode.md) · [MeasureMode](./interaction/MeasureMode.md) · [InteractionType](./interaction/InteractionType.md)

**Basic（9）** — [LngLat](./basic/LngLat.md) · [Lnglat](./basic/Lnglat.md) · [Extent](./basic/Extent.md) · [Size](./basic/Size.md) · [Pixel](./basic/Pixel.md) · [Color](./basic/Color.md) · [Style](./basic/Style.md) · [Popup](./basic/Popup.md) · [PopupPositioning](./basic/PopupPositioning.md)

**Control（3）** — [Control](./control/Control.md) · [Zoom](./control/Zoom.md) · [FullScreen](./control/FullScreen.md)

**Util（5）** — [Format](./util/Format.md) · [ProjUtil](./util/ProjUtil.md) · [MapToken](./util/MapToken.md) · [Event](./util/Event.md) · [FormatType](./util/FormatType.md)

## 稳定性分级

| 标记            | 含义                                                             |
| --------------- | ---------------------------------------------------------------- |
| `stable-beta`   | Beta 期间承诺修复缺陷，避免无迁移说明的破坏性变更                |
| `experimental`  | 允许根据试用反馈调整 API，文档已明确标识                         |
| `compatibility` | 仅为历史兼容保留，不推荐新项目使用（如 `Lnglat`，请用 `LngLat`） |
| `internal`      | 不应从公共入口导出，文档仅作实现说明                             |

## 生命周期约定

所有挂载对象（Layer / Interaction / Control / Popup / Source）遵循同一协议：

- `remove()` —— 解除挂载，对象可再次通过 `addXxx()` 重新挂载，适合临时隐藏或复用。
- `dispose()` —— 永久释放：解绑事件、内部 OpenLayers listener 与 Overlay，`isDisposed()` 返回 `true`。重复调用安全，释放后不可再挂载。

`map.dispose()` 会统一释放其托管的全部对象，销毁后同一 DOM 容器可重新创建地图。完整对照见 [core / 生命周期](./core.md)，路由切换写法见 [示例：销毁与路由切换](../examples/lifecycle.md)。

## 类型与签名

API 正文直接承载精确成员签名。发布包的 `index.d.ts` 为最终依据，并由 TypeScript 消费者冒烟测试校验；泛型（如 `BasicFeature<T, P>`、`BaseLayer<T, P>`）用于把业务属性结构一路带到 `getProperties()`。

原生 OpenLayers 对象与 OMap wrapper 的转换统一经 resolver：**不要**直接用原生 Feature 构造几何 wrapper，请走 Format、VectorSource 或 `createBaseFeatureByOlFeature` 等入口。
