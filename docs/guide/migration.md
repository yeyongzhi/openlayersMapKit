# 迁移指南

## 从早期内部版本迁移

### 使用稳定根入口

所有公开 API 均从 `openlayers-map-kit` 导入，不要依赖 `src/module/**` 或构建产物内部路径：

```ts
import { LngLat, Map, VectorLayer, VectorSource } from 'openlayers-map-kit'
```

### `Lnglat` 更名

推荐名称为 `LngLat`。`Lnglat` 当前仍是同一构造器的兼容别名，但已标记废弃，并计划在下一个主版本移除。

### 生命周期清理

组件或页面卸载时调用 `dispose()`。从 Map 临时移除 Layer、Interaction、Control 或 Popup 时调用对应 `remove()`，之后仍可重新挂载；`dispose()` 是幂等但永久的资源释放。Interaction 的 `destroy()` 是内部清理钩子，不应由业务代码调用。

```ts
const map = new Map(element, { view: { center: [0, 0], zoom: 2 } })

// 页面卸载
map.dispose()
```

从本版本开始，已释放对象上的状态修改、事件订阅、重新挂载和原生 OL 实例访问会抛出 `OMapErrorCode.Disposed`，可与 `InvalidParameter` 明确区分。若旧代码在 `dispose()` 后复用同一包装对象，应改为重新创建；若只需临时卸载，请改用 `remove()`。

### Feature 身份

不要直接用同一个原生 OpenLayers Feature 重复构造不同 OMap wrapper。通过 Source、Layer、Interaction 返回值或公开 factory/resolver 获取 wrapper，以保持对象身份和缓存一致。

### 模块系统

包同时支持 ESM 和 CommonJS。新项目优先使用 ESM；CommonJS 可使用 `require('openlayers-map-kit')`。不要直接引用 `dist` 文件名。
