# Interaction

目前已封装：

- Draw
- Modify
- Measure
- Select
- DragBox、DragPan、DragZoom
- MouseWheelZoom、DoubleClickZoom、KeyboardZoom
- Extent、Link

交互对象从 Map 移除后应解除监听；后续版本将统一公开 `dispose()` 生命周期协议。
