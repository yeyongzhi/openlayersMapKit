# 架构与模块

OMap 以 `Map` 为对外门面，围绕地图组织以下模块：

- `core`：Map、Projection 和 Feature。
- `layer`：矢量、瓦片、图片及地图服务图层。
- `source`：VectorSource、ImageSource、TileSource 及其子类。
- `interaction`：Draw、Modify、Measure、Select、拖拽和缩放。
- `control`：Zoom、FullScreen 等地图控件。
- `basic`：Lnglat、Extent、Pixel、Size、Color、Style、Popup。
- `util`：Event、Format、ProjUtil 和 MapToken。

当前架构约束是：`VectorSource` 维护 Feature 的唯一状态，`VectorLayer` 和 Interaction 通过统一 resolver 获取稳定的 OMap Feature 包装对象。
