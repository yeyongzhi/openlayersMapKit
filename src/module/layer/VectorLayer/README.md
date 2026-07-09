# VectorLayer

`VectorLayer` 是 OMap 的矢量图层封装，对应 OpenLayers 的 `ol/layer/Vector`。

当前实现已经将 Feature 状态源收敛到 `VectorSource`：

- `VectorLayer` 持有一个 OMap `VectorSource` 包装实例。
- OpenLayers 图层实际使用 `this.vectorSource.getSource()`。
- OMap Feature 与 OpenLayers Feature 的稳定映射由 `VectorSource.featureCache` 维护。
- `VectorLayer` 不再维护独立的公开 `features` 状态。

## 职责边界

### VectorLayer 负责

- 创建 OpenLayers `VectorLayer` 实例。
- 持有 OMap `VectorSource` 包装实例。
- 处理图层样式，包括普通样式、样式数组和样式函数。
- 为旧交互和业务代码提供图层级 Feature API 门面。
- 在 Draw、Measure 等交互直接向原生 source 添加 Feature 时，通过 `VectorSource` 获取稳定 OMap Feature 包装。

### VectorSource 负责

- 创建和持有 OpenLayers `ol/source/Vector` 实例。
- 将 OMap `BasicFeature[]` 转换为 OpenLayers `Feature[]`。
- 封装 source 层的增删查、范围查询、加载、事件等能力。
- 维护 `featureCache`，保证同一个 OpenLayers Feature 能稳定映射到同一个 OMap `BasicFeature` 包装对象。

## Feature 状态

`VectorLayer` 的 Feature 相关方法都委托给 `VectorSource`：

- `getFeatures()`
- `getFeatureById(id)`
- `getFeatureByOlFeature(feature)`
- `getFeaturesInExtent(extent, projection)`
- `getFeaturesAtCoordinate(coordinates)`
- `getClosestFeatureToCoordinate(coordinates, filter)`
- `forEachFeature(callback)`
- `forEachFeatureInExtent(extent, callback)`
- `forEachFeatureIntersectingExtent(extent, callback)`
- `addFeature(feature)`
- `removeFeature(feature)`
- `clear()`

这样可以避免 `VectorLayer` 和 `VectorSource` 双写 Feature 状态。

## Draw / Measure 同步逻辑

`initVectorLyaerEvent()` 监听底层 source 的 `addfeature` 事件。

当图层作为 `Draw` 或 `Measure` 的目标图层时，OpenLayers 交互可能直接向原生 source 添加 Feature。此时 `VectorLayer` 会调用：

```ts
this.vectorSource.getFeatureByOlFeature(feature)
```

该方法会优先复用 `VectorSource.featureCache`，没有缓存时才创建 OMap Feature 包装。

Draw 场景下还有一个额外处理：

- `addfeature` 事件触发后，才 emit OMap 的 `drawEnd`。
- 用户在 `drawEnd` 回调中读取 `layer.getFeatures()` 时，可以拿到刚刚绘制完成的 Feature。

## 样式逻辑

`initStyle(style)` 支持三种输入：

- `Style` 实例。
- `Style[]` 数组。
- 样式函数。

当传入样式函数时，OpenLayers 回调给到的是原生 Feature。`VectorLayer` 会通过 `VectorSource` 获取对应的 OMap Feature，再把它传给用户的样式函数。

## 迁移建议

后续如果继续优化，应优先：

1. 将交互模块中仍扫描 `layer.getFeatures()` 的逻辑替换为更直接的 Feature resolver。
2. 为 `VectorSource.featureCache` 增加针对 add/remove/clear 原生事件的完整同步策略。
3. 为 `VectorLayer` 与 `VectorSource` 增加单元测试，覆盖 Draw、Modify、Select、style callback 等路径。
