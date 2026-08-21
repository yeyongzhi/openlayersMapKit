# Layer 与 Source

Layer 负责渲染和地图层级属性，Source 负责数据与加载状态。

矢量数据遵循单一状态源约束：Feature 由 `VectorSource` 管理，`VectorLayer` 提供面向地图业务的查询和交互门面。
