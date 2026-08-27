# 迁移指南

## 从早期内部版本迁移

### 使用稳定根入口

所有公开 API 均从 `omap` 导入，不要依赖 `src/module/**` 或构建产物内部路径：

```ts
import { LngLat, Map, VectorLayer, VectorSource } from 'omap'
```

### `Lnglat` 更名

推荐名称为 `LngLat`。`Lnglat` 当前仍是同一构造器的兼容别名，但已标记废弃，并计划在下一个主版本移除。

### 生命周期清理

组件或页面卸载时调用 `dispose()`。从 Map 移除 Layer、Interaction、Control 或 Popup 时可调用对应 `remove()`；这些操作可重复调用。

```ts
const map = new Map({ target: element })

// 页面卸载
map.dispose()
```

### Feature 身份

不要直接用同一个原生 OpenLayers Feature 重复构造不同 OMap wrapper。通过 Source、Layer、Interaction 返回值或公开 factory/resolver 获取 wrapper，以保持对象身份和缓存一致。

### 模块系统

包同时支持 ESM 和 CommonJS。新项目优先使用 ESM；CommonJS 可使用 `require('omap')`。不要直接引用 `dist` 文件名。
