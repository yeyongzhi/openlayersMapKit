# VectorLayer

`VectorLayer` 是 OMap 的矢量图层封装，对应 OpenLayers 的 `ol/layer/Vector`。

当前实现处在“图层层和数据源层逐步拆分”的阶段：底层数据源已经通过 OMap `VectorSource` 创建和管理，但 `VectorLayer` 仍保留一份 `features` 状态，用于兼容绘制、测量、选择、修改、样式回调等既有交互逻辑。

## 职责边界

### VectorLayer 负责

- 创建 OpenLayers `VectorLayer` 实例。
- 持有 OMap `VectorSource` 包装实例。
- 维护 `features: BaseFeature[]`，作为图层级 OMap Feature 状态。
- 处理图层样式，包括普通样式、样式数组和样式函数。
- 为 Draw、Measure 等交互同步新增的 OpenLayers Feature。
- 对外提供图层级 Feature 查询、增删、遍历和样式设置方法。

### VectorSource 负责

- 创建和持有 OpenLayers `ol/source/Vector` 实例。
- 将 OMap `BasicFeature[]` 转换为 OpenLayers `Feature[]`。
- 封装 source 层的增删查、范围查询、加载、事件等能力。
- 维护 `featureCache`，保证同一个 OpenLayers Feature 能稳定映射到同一个 OMap `BasicFeature` 包装对象。

## 构造流程

构造函数接收 `OMapVectorLayerOptionsFinalType`。

核心流程如下：

```ts
const sourceOptions = options.source ?? {}
this.vectorSource = new VectorSource(sourceOptions)
this.features = sourceOptions.features ? [...sourceOptions.features] : []
this._layer = new OlLayer.Vector({
    source: this.vectorSource.getSource()
})
```

这里有两个重要点：

- OpenLayers 图层实际使用的是 `this.vectorSource.getSource()`。
- `this.features` 仍然保留，并以传入的 OMap `BasicFeature[]` 为初始值。

也就是说，`VectorLayer` 当前同时持有：

- `vectorSource`：OMap Source 包装对象。
- `_layer.getSource()`：OpenLayers 原生 source，供旧交互模块继续使用。
- `features`：图层级 OMap Feature 列表，供样式、交互和业务 API 使用。

## Feature 状态同步

### 初始化同步

如果构造参数中传入：

```ts
source: {
    features: [point, line, polygon]
}
```

则：

- `VectorSource` 会把这些 OMap Feature 转成 OpenLayers Feature，并创建底层 source。
- `VectorLayer.features` 会拷贝一份 OMap Feature 引用。

### 手动添加 Feature

`addFeature(feature)` 会做两件事：

- 如果底层 source 中还没有该 Feature，则调用 `this.vectorSource.addFeature(feature)`。
- 如果 `this.features` 中还没有同 uid 的 Feature，则追加到 `this.features`。

这样可以避免 Draw/Measure 或业务代码重复添加同一个 Feature 时造成 `features` 列表重复。

### 手动移除 Feature

`removeFeature(feature)` 会：

- 调用 `this.vectorSource.removeFeature(feature)` 从底层 source 移除。
- 如果 `this.features` 中存在该对象，则从列表中移除。

这里会先判断 `index !== -1`，避免旧逻辑中 `splice(-1, 1)` 误删最后一个 Feature。

### 清空 Feature

`clear()` 会：

- 调用 `this.vectorSource.clear()` 清空底层 source。
- 将 `this.features` 重置为空数组。

## Draw / Measure 同步逻辑

`initVectorLyaerEvent()` 监听底层 source 的 `addfeature` 事件。

当图层作为 `Draw` 或 `Measure` 的目标图层时，OpenLayers 交互可能直接向原生 source 中添加 Feature。此时 `VectorLayer` 需要把这个原生 Feature 转成 OMap `BasicFeature`，并同步到 `this.features`。

同步逻辑：

```ts
const basicFeature = createBaseFeatureByOlFeature(feature)
const uid = OlUtil.getUid(basicFeature.getFeature())
const index = this.features.findIndex(f => OlUtil.getUid(f.getFeature()) === uid)
if (index === -1) {
    this.features.push(basicFeature)
}
```

这里不能 clone 原生 Feature。OMap Feature 和 OpenLayers Feature 必须引用同一个底层对象，否则 Modify、Select、样式函数等逻辑会出现状态不同步。

Draw 场景下还有一个额外处理：

- `addfeature` 事件触发后，才 emit OMap 的 `drawEnd`。
- 这样用户在 `drawEnd` 回调中读取 `layer.getFeatures()` 时，可以拿到刚刚绘制完成的 Feature。

## 样式逻辑

`initStyle(style)` 支持三种输入：

- `Style` 实例。
- `Style[]` 数组。
- 样式函数。

当传入样式函数时，OpenLayers 回调给到的是原生 Feature：

```ts
(feature: OlFeatureLike, resolution: number) => {}
```

`VectorLayer` 会通过 `OlUtil.getUid(feature)` 在 `this.features` 中找到对应的 OMap `BasicFeature`，再把 OMap Feature 传给用户的样式函数。

这也是 `this.features` 目前还不能直接移除的原因之一。

## 查询逻辑

当前部分查询方法仍直接使用 OpenLayers 原生 source，再通过 uid 映射回 `this.features`：

- `getFeaturesInExtent(extent, projection)`
- `getFeaturesAtCoordinate(coordinates)`
- `forEachFeatureInExtent(extent, callback)`
- `forEachFeatureIntersectingExtent(extent, callback)`
- `getClosestFeatureToCoordinate(coordinates, filter)`

这种写法保证返回值仍然是 OMap `BasicFeature`，而不是 OpenLayers 原生 Feature。

后续可以逐步迁移为直接委托给 `this.vectorSource`，因为 `VectorSource` 已经有 `featureCache`，能保证包装对象稳定。

## 对外 API

### Source 访问

- `getSource()`：继承自 `BaseLayer`，返回 OpenLayers 原生 source。现有 Draw、Measure、Modify 依赖这个行为。
- `getVectorSource()`：返回 OMap `VectorSource` 包装实例。新代码优先使用这个方法。

### Feature 管理

- `getFeatures()`
- `getFeatureById(id)`
- `addFeature(feature)`
- `addFeatures(features)`
- `removeFeature(feature)`
- `removeFeatures(features)`
- `clear()`

### Feature 查询

- `getFeaturesInExtent(extent, projection)`
- `getFeaturesAtCoordinate(coordinates)`
- `getClosestFeatureToCoordinate(coordinates, filter)`
- `getSourceExtent()`

### 遍历

- `forEachFeature(callback)`
- `forEachFeatureInExtent(extent, callback)`
- `forEachFeatureIntersectingExtent(extent, callback)`

### 样式

- `getStyle()`
- `setStyle(style)`
- `setDeclutter(declutter)`

## 迁移建议

当前实现已经完成第一步：`VectorLayer` 使用 `VectorSource` 创建底层 source。

后续建议按以下顺序继续迁移：

1. 将查询方法逐步委托给 `this.vectorSource`。
2. 用 `VectorSource.featureCache` 替代 `VectorLayer` 中重复的 uid 映射逻辑。
3. 评估 `this.features` 是否仍需要作为独立状态存在。
4. 如果 `this.features` 继续保留，应明确它是图层级 OMap Feature 快照；如果移除，则 Draw、Measure、Modify、Select、样式函数都需要统一改为从 `VectorSource` 获取稳定 Feature。

不要一次性删除 `this.features`。它目前仍是多个交互模块的状态枢纽。
