# 历史模块审计

本页保留 2026-07-09 `src/module` 审计的维护上下文。执行状态以根目录 `REFACTOR_PLAN.md` 为唯一准绳；审计中已经完成的事项不代表新的待办。

## 当时确认的重点

- `VectorSource` 作为 Feature cache 的唯一状态源，Layer 与 Interaction 应通过统一 resolver 获得相同 wrapper。
- Geometry 子类存在重复构造和坐标归一化逻辑，需要公共 helper 与参数化测试。
- basic 值对象需要统一 `toArray`、`equals`、`clone` 等语义。
- Format、Source、Layer、Interaction、Control 与 Popup 仍有能力扩展空间。
- Map 需要完整销毁能力和挂载对象的批量生命周期管理。

## 已吸收进重构计划的结果

- Feature registry/factory、Geometry 初始化抽取与全类型测试矩阵已经完成。
- VectorSource/VectorLayer 状态源及 Draw、Modify、Select 的 resolver 路径已有回归测试。
- Map 已拆分 manager、controller、query 与 event adapter，并实现统一 Disposable 协议。
- Format、Map、Interaction 与 DOM 生命周期已有首轮测试；覆盖率和真实浏览器矩阵继续推进。

## 保留的长期能力候选

- Format：GPX、GML、MVT、EsriJSON、TopoJSON。
- Layer/Source：VectorTile、Heatmap、Cluster、GeoTIFF、Raster 等。
- Interaction：Snap、Translate、PinchZoom、PinchRotate、DragRotate、KeyboardPan 等。
- Control：ScaleLine、MousePosition、OverviewMap、Rotate、Attribution 与自定义 DOM Control。
- Modify/Draw/Select：redo、删除撤销、绘制提示、主动选择和 selected collection。

这些候选不属于首次公开 Beta 的默认范围；进入开发前应先建立独立 issue、API 设计和验收测试。
