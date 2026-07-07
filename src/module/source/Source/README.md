# Source
https://openlayers.org/en/latest/apidoc/module-ol_source_Source-Source.html

`Source` 是所有 OMap Source 的基类，对应 OpenLayers 的 `ol/source/Source`。

## 设计原则

- 基类只封装通用能力：属性、投影、版权信息、状态、刷新、事件。
- 具体数据能力放在子类中实现，例如 `ImageSource`、`TileSource`、`VectorSource`。
- 子类应创建对应的 OpenLayers Source 实例，并通过 `super(params, olSource)` 交给基类管理。

```ts
export default class ImageSource extends Source<OMapImageSourceType> {
    constructor(params: OMapImageSourceParamsType = {}) {
        super(params, new OlSource.Image(handleGetSourceParams(params)))
    }
}
```

## ImageSource

## TileSource

## VectorSource
