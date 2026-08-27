# API 模块总览

| 模块        | 主要公开能力                                                       |
| ----------- | ------------------------------------------------------------------ |
| Core        | `Map`、`Projection`、各类 Feature                                  |
| Layer       | `VectorLayer`、`TileLayer`、`XYZLayer`、`WMSLayer`、`WMTSLayer` 等 |
| Source      | `VectorSource`、`ImageSource`、`TileSource` 及瓦片子类             |
| Interaction | `Draw`、`Modify`、`Measure`、`Select`、拖拽和缩放                  |
| Control     | `Zoom`、`FullScreen`                                               |
| Basic       | `LngLat`、`Extent`、`Pixel`、`Size`、`Color`、`Style`、`Popup`     |
| Util        | `Event`、`Format`、`ProjUtil`、`MapToken`                          |

API 页面按稳定模块入口维护；精确成员签名以发布包的 `index.d.ts` 为准，并由 TypeScript 消费者冒烟测试校验。
