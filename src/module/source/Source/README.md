# Source
https://openlayers.org/en/latest/apidoc/module-ol_source_Source-Source.html

`Source` 是所有 OMap Source 的基类，对应 OpenLayers 的 `ol/source/Source`。

## 设计原则

- 基类只封装通用能力：属性、投影、版权信息、状态、刷新、事件。
- 具体数据能力放在子类中实现，例如 `ImageSource`、`TileSource`、`VectorSource`。
- 子类应创建对应的 OpenLayers Source 实例，并通过 `super(olSource)` 交给基类管理。
- 对外参数中的 `projection` 统一使用 OMap 自定义 `Projection` 类型，传给 OpenLayers 前由 `handleGetSourceParams` 转换。

```ts
export default class ImageSource extends Source<OMapImageSourceType> {
    constructor(params: OMapImageSourceParamsType = {}) {
        super(new OlSource.Image(handleGetSourceParams(params)))
    }
}
```

## ImageSource

`ImageSource` 对应 OpenLayers 的 `ol/source/Image`，用于提供单张图片数据源能力。

### 参数

- `attributions`：版权信息。
- `interpolate`：重采样时是否插值，默认 `true`。
- `loader`：图片加载函数，可使用自定义 loader，或后续子类/工具中封装的 loader。
- `projection`：统一使用 OMap `Projection`。
- `resolutions`：可用分辨率数组。
- `state`：数据源状态。

### 方法

- `getResolutions()`：获取图片源分辨率数组。
- `setResolutions(resolutions)`：设置图片源分辨率数组。
- `getImage(extent, resolution, pixelRatio, projection)`：获取单张图片。
- `onImageLoad(type, listener)`：监听图片加载事件。
- `onImageLoadStart(listener)`：监听图片开始加载。
- `onImageLoadEnd(listener)`：监听图片加载完成。
- `onImageLoadError(listener)`：监听图片加载失败。

## TileSource

## VectorSource

`VectorSource` 对应 OpenLayers 的 `ol/source/Vector`，用于管理可编辑矢量要素。

### 参数

- `attributions`：版权信息。
- `features`：OMap `BasicFeature` 数组。
- `format`：远程加载时使用的要素格式。
- `loader`：自定义要素加载函数。
- `overlaps`：要素是否可能重叠，默认 `true`。
- `strategy`：加载策略。
- `url`：远程数据地址或 URL 函数。
- `useSpatialIndex`：是否使用空间索引，默认 `true`。
- `wrapX`：是否横向世界包裹，默认 `true`。

### 方法

- `addFeature(feature)` / `addFeatures(features)`：添加要素。
- `removeFeature(feature)` / `removeFeatures(features)`：移除要素。
- `clear(fast)`：清空要素。
- `getFeatures()`：获取所有 OMap 要素。
- `getFeaturesAtCoordinate(coordinate)`：获取指定坐标上的要素。
- `getFeaturesInExtent(extent, projection)`：获取范围内要素。
- `getClosestFeatureToCoordinate(coordinate, filter)`：获取最近要素。
- `getExtent(extent)`：获取数据源范围。
- `getFeatureById(id)`：按 id 获取要素。
- `forEachFeature(callback)`：遍历所有要素。
- `forEachFeatureInExtent(extent, callback)`：遍历范围内要素。
- `forEachFeatureIntersectingExtent(extent, callback)`：遍历与范围几何相交的要素。
- `loadFeatures(extent, resolution, projection)`：触发加载。
- `removeLoadedExtent(extent)`：移除已加载范围，用于重试。
- `setLoader(loader)` / `setUrl(url)` / `setOverlaps(overlaps)`：更新加载器、地址和重叠配置。

### 事件

- `onAddFeature(listener)`：监听要素添加。
- `onChangeFeature(listener)`：监听要素变化。
- `onRemoveFeature(listener)`：监听要素移除。
- `onClear(listener)`：监听清空。
- `onFeaturesLoadStart(listener)`：监听开始加载。
- `onFeaturesLoadEnd(listener)`：监听加载完成。
- `onFeaturesLoadError(listener)`：监听加载失败。
