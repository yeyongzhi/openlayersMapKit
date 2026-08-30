# Layer 与 Source

Layer 负责渲染与地图层级属性，Source 负责数据与加载状态。层级约束：**`VectorLayer` 的 Feature 由 `VectorSource` 管理，`VectorLayer` 仅提供面向业务的查询与交互门面。**

> 稳定性：`stable-beta`。

## BaseLayer（基类）

所有图层的公共基类，承载 id、名称、透明度、可见性、范围、zoom/resolution 约束、层级与属性。

```ts
new BaseLayer(type: BaseLayerType, options?: BaseLayerOptionsType<P>)
```

| 方法                                                                              | 签名                    | 说明                    |
| --------------------------------------------------------------------------------- | ----------------------- | ----------------------- |
| `getId()` / `setId(id)`                                                           | —                       | 图层 id                 |
| `getName()` / `setName(name)`                                                     | —                       | 图层名                  |
| `getClassName()` / `setClassName(className)`                                      | —                       | CSS class               |
| `getLayer()`                                                                      | `() => T`（原生 Layer） | 原生实例（透传）        |
| `getSource()`                                                                     | `() => OMapSourceType`  | 数据源                  |
| `setOpacity(number)` / `getOpacity()`                                             | —                       | 透明度 [0,1]            |
| `setVisible(bool)` / `getVisible()`                                               | —                       | 可见性                  |
| `setExtent(extent)` / `getExtent()`                                               | —                       | 渲染范围（Extent）      |
| `setMinZoom` / `getMinZoom` · `setMaxZoom` / `getMaxZoom`                         | —                       | zoom 约束               |
| `setMinResolution` / `getMinResolution` · `setMaxResolution` / `getMaxResolution` | —                       | resolution 约束         |
| `setZIndex(zIndex)` / `getZIndex()`                                               | —                       | 图层顺序                |
| `getProperties()` / `setProperties(Partial<P>, silent?)`                          | —                       | 业务属性（合并语义）    |
| `setTarget(map)` / `getTarget()`                                                  | —                       | 挂载地图（`null` 解除） |
| `remove()` / `dispose()` / `isDisposed()`                                         | —                       | 解除挂载 / 永久释放     |

## VectorLayer

```ts
new VectorLayer(options?: OMapVectorLayerOptionsFinalType<P>)
// options: { source?: OMapVectorSourceOptionsFinalType, style?: OMapStyleLike, ... }
```

| 方法                                                                                 | 签名                                                 | 说明           |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------- | -------------- |
| `getVectorSource()`                                                                  | `() => VectorSource`                                 | 底层数据源     |
| `getFeatures()`                                                                      | `() => BaseFeature<Geometry>[]`                      | 当前要素       |
| `getFeatureById(id)`                                                                 | `(id: number \| string) => BaseFeature \| undefined` | 按 id 查要素   |
| `getFeatureByOlFeature(feature)`                                                     | `(OlFeature) => BaseFeature \| undefined`            | 原生 → wrapper |
| `getFeaturesInExtent(extent, projection)`                                            | `(Extent \| tuple, Projection) => BaseFeature[]`     | 范围检索       |
| `getFeaturesAtCoordinate(coordinates)`                                               | `(coord) => BaseFeature[]`                           | 坐标检索       |
| `getClosestFeatureToCoordinate(coord, filter?)`                                      | `() => BaseFeature \| undefined`                     | 最近要素       |
| `addFeature(feature)` / `addFeatures(features)`                                      | —                                                    | 增             |
| `removeFeature(feature)` / `removeFeatures(features)`                                | —                                                    | 删             |
| `clear()`                                                                            | `() => void`                                         | 清空要素       |
| `forEachFeature(cb)` / `forEachFeatureInExtent` / `forEachFeatureIntersectingExtent` | —                                                    | 遍历           |
| `getSourceExtent()`                                                                  | `() => Extent`                                       | 数据源范围     |
| `getStyle()` / `setStyle(OMapStyleLike)`                                             | —                                                    | 图层样式       |
| `setDeclutter(boolean \| string \| number)`                                          | —                                                    | 去重叠         |

## XYZLayer / WMSLayer / WMTSLayer / ImageLayer

瓦片/图片图层的构造统一为「选项驱动」，并自动创建对应 Source：

```ts
new XYZLayer(options?: OMapXYZLayerParamsType<P>)      // urls / url 瓦片
new WMSLayer(options?: OMapWMSLayerParamsType<P>)      // WMS 服务
new WMTSLayer(options?: OMapWMTSLayerParamsType<P>)   // WMTS 服务
new ImageLayer(options?: OMapImageLayerParamsType<P>) // 单张静态影像
```

- 构造均校验 `source` 参数（XYZ/WMS/WMTS/Image 各自对应数据源必填）。
- 均继承 `BaseLayer`，拥有其全部属性/方法；数据源通过 `getSource()` 获取。
- `ImageLayer` 需注意：地图来源参数为静态影像数据源（`ImageSource`），非 `imageExtent`（历史误用已修正）。

## LayerGroup

```ts
new LayerGroup(layers: BaseLayer[])
new LayerGroup(id: string | null, layers: BaseLayer[])
```

| 方法                              | 签名                | 说明         |
| --------------------------------- | ------------------- | ------------ |
| `add(layer)` / `remove(layer)`    | —                   | 组内增删     |
| `removeById(id)`                  | —                   | 按 id 移除   |
| `clear()`                         | —                   | 清空组内图层 |
| `getAllLayers()` / `getAll()`     | `() => BaseLayer[]` | 组内图层     |
| `getId()` / `setMap(map \| null)` | —                   | 组 id / 挂载 |

## Source（基类）

`Source<T, P>` 提供所有数据源通用能力，并遵循 `Disposable`。

```ts
new Source(... )  // 抽象类，不直接实例化；使用 VectorSource / TileSource / ImageSource
```

| 方法                                                            | 签名         | 说明                |
| --------------------------------------------------------------- | ------------ | ------------------- |
| `getSource()`                                                   | `() => T`    | 原生 Source（透传） |
| `getProperties()` / `setProperties(Partial<P>, silent?)`        | —            | 业务属性            |
| `get(key)` / `set(key, value, silent?)` / `unset(key, silent?)` | —            | 原生属性            |
| `getProjection()` / `getState()` / `getRevision()`              | —            | 元数据              |
| `refresh()`                                                     | `() => void` | 强制刷新            |
| `setAttributions(...)` / `getAttributions()`                    | —            | 版权信息            |
| `dispose()` / `isDis  posed()`                                  | —            | 永久释放原生资源    |

## VectorSource

```ts
new VectorSource(params?: OMapVectorSourceParamsType)
```

| 方法                                                                             | 签名                                                         | 说明           |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------ | -------------- |
| `addFeature(f)` / `addFeatures(f[])`                                             | —                                                            | 增             |
| `removeFeature(f)` / `removeFeatures(f[])`                                       | —                                                            | 删             |
| `clear(fast?)`                                                                   | `() => void`                                                 | 清空并清缓存   |
| `getFeatures()`                                                                  | `() => OMapVectorSourceFeature[]`                            | 全部要素       |
| `getFeatureById(id)`                                                             | `(string \| number) => OMapVectorSourceFeature \| undefined` | 按 id          |
| `getFeatureByOlFeature(f)`                                                       | `(OlFeature) => OMapVectorSourceFeature \| undefined`        | 原生 → wrapper |
| `getFeaturesInExtent(extent, projection?)`                                       | —                                                            | 范围检索       |
| `getFeaturesAtCoordinate(coord)`                                                 | —                                                            | 坐标检索       |
| `getClosestFeatureToCoordinate(coord, filter?)`                                  | —                                                            | 最近要素       |
| `forEachFeature` / `forEachFeatureInExtent` / `forEachFeatureIntersectingExtent` | —                                                            | 遍历           |
| `getExtent(extent?)`                                                             | `() => Extent`                                               | 数据源范围     |
| `isEmpty()` / `hasFeature(f)`                                                    | —                                                            | 判断           |
| `setLoader(loader)` / `setUrl(url)`                                              | —                                                            | 远程加载       |
| `loadFeatures(extent, resolution, projection)`                                   | —                                                            | 触发加载       |
| `onAddFeature` / `onRemoveFeature` / `onClear` / `onFeaturesLoadStart            | End                                                          | Error`         | `(listener) => EventsKey` | 事件 |

## TileSource / ImageSource

瓦片与图片数据源基类（及其实例），承载网格、瓦片获取、缓存刷新与加载事件：

```ts
new ImageSource(params?: OMapImageSourceParamsType)
```

| 方法                                                                                   | 说明                             |
| -------------------------------------------------------------------------------------- | -------------------------------- |
| `getTile / getTileGrid / getTilePixelSize / getTileCoordForTileUrlFunction`            | 瓦片网格与坐标换算（TileSource） |
| `getImage(extent, resolution, pixelRatio, projection)`                                 | 取影像（ImageSource）            |
| `onTileLoadStart` / `onTileLoadEnd` / `onTileLoadError` · `onImageLoadStart/End/Error` | 加载事件                         |
| `clear()` / `getKey()`                                                                 | 清缓存 / 缓存键                  |

> 由 VectorSource、Format、Style 回调及 Layer 接收的原生 Feature 均经统一 resolver，保证同一原生要素对应同一 OMap wrapper。
