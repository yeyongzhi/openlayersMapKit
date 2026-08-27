# Interaction

目前已封装：

- Draw
- Modify
- Measure
- Select
- DragBox、DragPan、DragZoom
- MouseWheelZoom、DoubleClickZoom、KeyboardZoom
- Extent、Link

所有交互对象均实现可重复调用的 `remove()`/`dispose()`；从 Map 移除或销毁后会解除公开事件与内部 OpenLayers listener。Draw 与 Measure 的 companion layer 也由 Map 的 Interaction manager 统一管理。
