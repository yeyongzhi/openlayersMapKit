# API 模块总览

| 模块 | 主要公开能力 |
| --- | --- |
| Core | `Map`、`Projection`、各类 Feature |
| Layer | `VectorLayer`、`TileLayer`、`XYZLayer`、`WMSLayer`、`WMTSLayer` 等 |
| Source | `VectorSource`、`ImageSource`、`TileSource` 及瓦片子类 |
| Interaction | `Draw`、`Modify`、`Measure`、`Select`、拖拽和缩放 |
| Control | `Zoom`、`FullScreen` |
| Basic | `Lnglat`、`Extent`、`Pixel`、`Size`、`Color`、`Style`、`Popup` |
| Util | `Event`、`Format`、`ProjUtil`、`MapToken` |

API 页面目前处于第一阶段：先维护稳定的模块入口，后续由 TypeScript 声明/JSDoc 自动生成详细成员文档。
