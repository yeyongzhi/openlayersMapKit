# Core

Core 包含地图门面、投影和几何 Feature 体系。`Map` 是对外唯一门面，复杂职责下沉到 manager / controller / query / adapter；Feature 是 OpenLayers 几何的强类型包装。

```ts
import { Map, Point, Polygon, Projection, LngLat } from 'omap'
```

> **稳定性**：Core 模块当前为 `stable-beta`。公开 API 在 `0.x` 阶段可能仍有调整，但 major 版本前会保持兼容。

## Map

地图门面。负责图层、交互、控件、弹窗、视图状态与像素/坐标换算，并把所有挂载对象（Layer / Interaction / Control / Popup）的生命周期统一管理。

### 构造

```ts
new Map(element: HTMLElement | string, options?: OMapOptionsType)
```

- `element`：挂载容器（DOM 元素或 id）。必填。
- `options.view`：视图配置，至少包含 `center` 与 `zoom`；`projection` 默认 `EPSG:3857`。
- 其余 `layers` / `controls` / `interactions` / `popups` 字段为 OMap wrapper 数组，**由 Map 经对应 addXxx 方法转换后挂载**（不要直接喂原生实例）。

### 图层管理

| 方法                                                       | 签名                             | 说明                 |
| ---------------------------------------------------------- | -------------------------------- | -------------------- |
| `addLayer`                                                 | `(layer: BaseLayer) => void`     | 添加单个图层         |
| `addLayers`                                                | `(layers: BaseLayer[]) => void`  | 批量添加             |
| `getLayerById`                                             | `(id) => BaseLayer \| undefined` | 按 id 查询           |
| `removeLayer`                                              | `(layer: Base Layer) => void`    | 解除挂载（可重挂载） |
| `removeLayerById`                                          | `(id) => void`                   | 按 id 解除挂载       |
| `getAllLayers`                                             | `() => BaseLayer[]`              | 所有图层             |
| `addLayerGroup` / `removeLayerGroup` / `getLayerGroupById` | —                                | 图层组管理           |

### 交互管理

| 方法                 | 签名                                 | 说明       |
| -------------------- | ------------------------------------ | ---------- |
| `addInteraction`     | `(interaction: Interaction) => void` | 添加交互   |
| `getInteractions`    | `() => Interaction[]`                | 所有交互   |
| `getInteractionById` | `(id) => Interaction \| null`        | 按 id 查询 |
| `removeInteraction`  | `(interaction: Interaction) => void` | 解除挂载   |

### 控件管理

| 方法             | 签名                         | 说明       |
| ---------------- | ---------------------------- | ---------- |
| `addControl`     | `(control: Control) => void` | 添加控件   |
| `getControls`    | `() => Control[]`            | 所有控件   |
| `getControlById` | `(id) => Control \| null`    | 按 id 查询 |
| `removeControl`  | `(control: Control) => void` | 解除挂载   |

### 弹窗管理

| 方法                   | 签名                                                  | 说明       |
| ---------------------- | ----------------------------------------------------- | ---------- |
| `addPopup`             | `(popup: Popup) => void`                              | 添加弹窗   |
| `getPopupById`         | `(id) => Popup \| null`                               | 按 id 查询 |
| `getPopupByProperties` | `(filter: (p: PropertiesType) => boolean) => Popup[]` | 按属性筛选 |
| `getPopups`            | `() => Popup[]`                                       | 所有弹窗   |
| `removePopup`          | `(popup: Popup) => void`                              | 解除挂载   |

### 视图与几何

- `getCenter()` / `setCenter(coord)`、`getZoom()` / `setZoom(zoom)`、`getResolution()` / `setResolution(r)`、`getRotation()` / `setRotation(r)`。
- `zoomIn(delta?)` / `zoomOut(delta?)`、`adjustCenter` / `adjustZoom` / `adjustResolution` / `adjustRotation`。
- `animate(options: OMapViewAnimateOptionsType)`、`fit(featureOrExtent, options?)`、`calculateExtent(size?)`、
  `cancelAnimations()`、`getMaxZoom()` / `setMaxZoom`、`getMinZoom()` / `setMinZoom`。
- `getLength(feature)` / `getArea(feature)`：以当前投影计算长度/面积（单位米）。

### 拾取与坐标换算

| 方法                     | 签名                                  | 说明             |
| ------------------------ | ------------------------------------- | ---------------- |
| `forEachFeatureAtPixel`  | `(pixel, callback, options?) => void` | 遍历像素命中要素 |
| `getFeaturesAtPixel`     | `(pixel, options?) => BaseFeature[]`  | 取像素处要素     |
| `hasFeatureAt. Pixel`    | `(pixel, options?) => boolean`        | 是否有要素       |
| `getCoordinateFromPixel` | `(pixel) => Lnglat \| undefined`      | 像素 → 坐标      |
| `getPixelFromCoordinate` | `(coord) => Pixel`                    | 坐标 → 像素      |
| `getEventCoordinate`     | `(event: MouseEvent) => Lnglat`       | 事件 → 坐标      |
| `getEventPixel`          | `(event: UIEvent) => Pixel`           | 事件 → 像素      |

### 事件

```ts
const id = map.on(type: OMapEventType, callback: OMapEventCallBack): EventIdType
map.once(type, callback): EventIdType
map.un(id: EventIdType): void
```

### 生命周期

```ts
map.dispose(): void   // 永久释放，重复调用安全；会释放所有 Layer/Interaction/Control/Popup/PopupManager 与本体
map.isDisposed(): boolean
```

> 详见下方「生命周期：remove 与 dispose」。

## Projection

坐标系封装，统一处理 `EPSG` 代码与投影单位。

```ts
new Projection('EPSG:4326') // 或 new Projection(4326) / new Projection({ code: 'EPSG:4326', units: 'degrees' })
```

| 方法                   | 返回                      | 说明                 |
| ---------------------- | ------------------------- | -------------------- |
| `getCode()`            | `string`                  | 形如 `EPSG:4326`     |
| `getUnits()`           | `'degrees' \| 'm' \| ...` | 投影单位             |
| `getAxisOrientation()` | `string`                  | 轴方向               |
| `getExtent()`          | `number[] \| undefined`   | 投影范围             |
| `getProjection()`      | `OlProjection`            | 原生投影实例（透传） |

## Feature 体系

`BasicFeature<T, P>` 是所有几何要素的抽象基类，`T` 为原生 Geometry 类型，`P` 为业务属性字典（默认 `PropertiesType`，子类 Point/LineString/Polygon/MultiPoint/MultiLineString/MultiPolygon/LinearRing/Circle 均透传）。同一原生 OpenLayers Feature 经 resolver 始终解析为同一 OMap wrapper（见 `src/module/core/Feature/BasicFeature/handle.ts`）。

```ts
import {
  Point,
  LineString,
  Polygon,
  MultiPoint,
  MultiLineString,
  MultiPolygon,
  LinearRing,
  Circle
} from 'omap'

const p = new Point([116.39, 39.9], { name: '北京' })
p.getId() // string | number | null
p.setStyle(style)
p.getCoordinates() // 坐标 tuple
p.setCoordinates([116.4, 39.9])
p.getProperties() // P
p.setProperties({ name: '新Name' }) // 合并写入
p.getExtent() // Extent
```

| 方法                                             | 签名                                    | 说明                            |
| ------------------------------------------------ | --------------------------------------- | ------------------------------- |
| `getFeature()`                                   | `() => OlFeatureInstanceType`           | 原生 Feature                    |
| `getGeometry()`                                  | `() => T`                               | 原生 Geometry                   |
| `getCoordinates()`                               | `() => OMapBasicFeatureCoordinatesType` | 坐标                            |
| `setCoordinates(coordinates)`                    | `void`                                  | 更新坐标（值对象可变）          |
| `getStyle()` / `setStyle(style?: OMapStyleLike)` | —                                       | 样式                            |
| `getExtent()`                                    | `() => Extent`                          | 要素范围                        |
| `getProperties()` / `setProperties(Partial<P>)`  | —                                       | 业务属性（合并语义）            |
| `get(key)` / `set(key, value)`                   | —                                       | 原生属性读写                    |
| `getId()` / `setId(id)`                          | —                                       | 要素 id                         |
| `clone()`                                        | `() => this`                            | 不可变副本（坐标/样式一并复制） |
| `changed()`                                      | `() => void`                            | 触发重绘                        |

> 所有几何子类构造支持「坐标」或「原生 Feature」两种入参；直接以原生 Feature 构造仅限 resolver 内部使用，外部请走 `createBaseFeatureByOlFeature` / Format / VectorSource 等入口。

## 生命周期：remove 与 dispose（核心约定）

OMap 统一生命周期协议 `Disposable`：

- **`remove()`**：从所属容器（Map / LayerGroup / InteractionManager / ControlManager / PopupManager）**解除挂载**，但对象本身仍可再次 `addXxx` 重新挂载。适合「临时隐藏 / 复用」。
- **`dispose()`**：**永久释放** —— 解绑公开事件、内部 OpenLayers listener、Overlay，并使 `isDisposed()` 返回 `true`。重复调用安全；一旦 dispose 不可再挂载。

| 对象        | remove                       | dispose                                                 |
| ----------- | ---------------------------- | ------------------------------------------------------- |
| Layer       | `map.removeLayer(layer)`     | 同 remove（Layer 由 manager 统一在 Map.dispose 时释放） |
| Control     | `map.removeControl(control)` | 同 remove                                               |
| Interaction | `map.removeInteraction(i)`   | 同 remove；Map.dispose 统一释放                         |
| Popup       | `popup.remove()`             | `popup.dispose()` 永久释放 Overlay                      |
| Source      | —                            | `source.dispose()` 释放原生 source                      |
| Map         | —                            | `map.dispose()` 释放全部托管对象                        |
