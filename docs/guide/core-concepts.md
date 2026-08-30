# 核心概念

这一页解释 OMap 的心智模型。读完后再查 [API 参考](../api/index.md) 与 [示例](../examples/basic-map.md) 会更顺畅。

## 整体模型

`Map` 是唯一对外门面：它持有容器 DOM、视图状态，并统一挂载 Layer、Interaction、Control 和 Popup。复杂职责被下沉到内部的 manager / controller / query / adapter，使用者只需面对 `Map` 的公开方法。

```ts
const map = new OMap(element, {
  view: { center: [116.397, 39.909], zoom: 10 },
  layers: [layer],
  controls: [],
  interactions: []
})
```

**由 `Map` 统一托管的对象，其生命周期也由 `Map` 统一释放**：`map.dispose()` 会释放仍挂载的 Layer、Interaction、Control 与 Popup。

## View（视图）

视图描述"看哪里、看多细"。它不是独立类，而是 `Map` 上的一组状态：

- 位置与缩放：`getCenter()` / `setCenter()`、`getZoom()` / `setZoom()`、`zoomIn()` / `zoomOut()`。
- 更底层的量：`getResolution()` / `setResolution()`、`getRotation()` / `setRotation()`。
- 视野适配：`fit(featureOrExtent, options?)`、`animate(options)`、`calculateExtent()`。
- 边界：`getMinZoom()` / `setMinZoom()`、`getMaxZoom()` / `setMaxZoom()`。
- 投影：默认 `EPSG:3857`，通过 `Projection` 或 `ProjUtil.fromLonLat` / `toLonLat` 换算。

`center` 写经纬度数组即可，内部按视图投影换算。

## Layer 与 Source

**Layer 负责"怎么呈现"，Source 负责"数据从哪来"**——这是最容易被混淆的一对概念。

- `Layer`：`VectorLayer`、`XYZLayer`、`WMSLayer`、`WMTSLayer`、`ImageLayer`、`GaodeLayer`、`TdtLayer` 等，控制 `opacity`、`visible`、`zIndex`、`extent` 等呈现属性。
- `Source`：`VectorSource`、`TileSource`、`ImageSource` 及其子类，控制请求地址、缓存、投影、解析格式等数据属性。

多数图层（XYZ / WMS / WMTS）在构造时**内联** `source` 参数即可，无需单独创建 Source：

```ts
new XYZLayer({ id: 'base', source: { url: 'https://example.com/tiles/{z}/{x}/{y}.png' } })
```

矢量图层 `VectorLayer` 直接管理要素，通常也不必手工操作 `VectorSource`。多个图层可用 `LayerGroup` 成组管理。

## Feature 与 Geometry

`Feature` 是带业务属性的几何对象。几何类型包括 `Point`、`LineString`、`Polygon`、`MultiPoint`、`MultiLineString`、`MultiPolygon`、`LinearRing`、`Circle`。

```ts
const point = new Point([116.397, 39.909], { name: '北京' })
point.setStyle(new Style({ circle: { radius: 6, fill: { color: '#1677ff' } } }))
layer.addFeature(point)
```

要点：

- 坐标统一写**经纬度数组**。`Circle` 的半径是投影单位（`EPSG:3857` 下近似米）。
- 业务属性通过构造第二个参数 `properties` 传入，之后用 `getProperties()` / `setProperties()` 读写（`setProperties` 为合并语义）。
- **同一原生 OpenLayers Feature 始终解析为同一个 OMap wrapper**（内部 resolver + WeakMap）。因此拿到要素后可以持续调用 `setCoordinates()`、`setStyle()` 更新，UI 会同步刷新。
- 反过来，**不要用原生 Feature 直接构造几何 wrapper**；请走 Format、VectorSource 等受控入口。

## Interaction

交互处理指针与键盘输入：`Draw`、`Modify`、`Select`、`Measure`、各类拖拽缩放（`DragBox`、`DragPan`、`DragZoom`、`MouseWheelZoom`、`DoubleClickZoom`、`KeyboardZoom`）以及 `Link`、`InteractionExtent`。

```ts
const draw = new Draw(DrawMode.Point, { layer })
map.addInteraction(draw)
```

交互会争抢同一次指针事件，生产项目应按业务状态只启用其中一个（切换 `active` 状态），不要同时挂载多个互斥交互。

## Control

控件是地图上的常驻 UI，当前内置 `Zoom` 与 `FullScreen`。

```ts
map.addControl(new Zoom({ duration: 200 }))
map.addControl(new FullScreen('main-fullscreen'))
```

构造时传 `controls: []` 可清空默认控件集，随后完全自行管理。控件 DOM 由 OpenLayers 渲染，需要引入 `ol/ol.css`。

## Popup

`Popup` 是绑定坐标的浮层（基于 Overlay）。

```ts
const popup = new Popup({ id: 'tip', element, position: [116.397, 39.909] })
map.addPopup(popup)
popup.setContent('<strong>标注</strong>')
```

`Popup` 是少数同时具备 `remove()` 与 `dispose()` 语义差异的对象：`remove()` 后仍可重新挂载，`dispose()` 永久释放 Overlay。

## 坐标与投影

- 公开 API 统一使用**经纬度**（`[lng, lat]`）。
- 内部默认投影 `EPSG:3857`；需要换算时用 `ProjUtil.fromLonLat()` / `toLonLat()`，或 `new Projection('EPSG:4326')` 显式声明。
- `LngLat`（推荐）与 `Lnglat`（历史兼容别名，已废弃）都表示经纬度值对象。

## 生命周期

所有挂载对象共享同一套协议：

| 操作        | 含义                             | 能否再次使用                        |
| ----------- | -------------------------------- | ----------------------------------- |
| `remove()`  | 解除挂载                         | 可以，通过 `addXxx()` 重新挂载      |
| `dispose()` | 永久释放（解绑事件与原生资源）   | 不可以，`isDisposed()` 返回 `true`  |

`dispose()` 幂等，重复调用安全。`map.dispose()` 之后**同一容器可以重新创建地图**——这是路由切换与 Tab 切换的基础，见 [示例：销毁与路由切换](../examples/lifecycle.md)。
