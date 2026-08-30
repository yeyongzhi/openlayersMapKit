# Interaction

所有交互对象均实现可重复调用的 `remove()` / `dispose()`；从 Map 移除或销毁后会解绑公开事件与内部 OpenLayers listener。Draw 与 Measure 的 companion layer 由 Map 的 InteractionManager 统一管理。

> 稳定性：`stable-beta`。

所有交互共有的订阅接口：

```ts
interaction.on(type, callback): EventIdType
interaction.once(type, callback): EventIdType
interaction.un(id: EventIdType): void
```

## Draw

```ts
new Draw(mode: OMapDrawModeType, params?: OMapDrawParamsType)
// mode: 'Point' | 'LineString' | 'Polygon' | 'Circle' | ...
```

| 方法                        | 签名                                       | 说明                            |
| --------------------------- | ------------------------------------------ | ------------------------------- |
| `getFeatures()`             | `() => BaseFeature<Geometry>[]`            | 当前绘制要素                    |
| `appendCoordinates(coords)` | `(Array<OMapCoordinateType>) => void`      | 追加坐标（连续绘制）            |
| `finish()`                  | `() => void`                               | 结束当前绘制并自动补全          |
| `abort()`                   | `() => void`                               | 仅中止当前草图，已完成要素保留  |
| `cancel()`                  | `() => void`                               | 同 `abort()`                    |
| `clearFeatures()`           | `() => void`                               | 清空已完成的要素                |
| `revoke()`                  | `() => void`                               | 撤销最后一点（removeLastPoint） |
| 事件                        | `drawstart` / `drawend`（`OMapDrawEvent`） | 见 typed event map              |

## Measure

```ts
new Measure(mode: OMapMeasureMode, params?: OMapMeasureParamsType)
// mode: 'distance'（测距）| 'area'（测面）
```

| 方法                                | 签名                                                                                 | 说明                                           |
| ----------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------- |
| `result`                            | `{ value: number; unit: string }`                                                    | 实时测量结果（测距结果为米，测面结果为平方米） |
| `finish()` / `abort()` / `revoke()` | —                                                                                    | 同 Draw 草图控制                               |
| 事件                                | `measureStart` / `measureEnd`（`OMapMeasureEvent`，`measureEnd` 携带 `result` 快照） | —                                              |
| `dispose()`                         | `() => void`                                                                         | 释放 tooltip/result/marker 弹窗与 listener     |

> Measure 内部自动创建 companion `VectorLayer` 与多个 `Popup`，`dispose` 会一并清理。

## Modify

```ts
new Modify(params: OMapModifyParamsType)   // params.layer 必填（VectorLayer）
```

| 方法                                        | 签名                                             | 说明                       |
| ------------------------------------------- | ------------------------------------------------ | -------------------------- |
| `revoke(step = 1)`                          | `(step: number) => boolean`                      | 撤销修改（按版本快照回退） |
| `cancel()`                                  | `() => void`                                     | 回到初始状态（records[0]） |
| `insertPoint(coord)` / `removePoint(coord)` | `(OMapCoordinateType) => boolean`                | 插入/删除顶点              |
| `canInsertPoint()` / `canRemovePoint()`     | `() => boolean`                                  | 是否可编辑顶点             |
| `records`                                   | `ModifyRecordItem[]`                             | 修改历史快照               |
| 事件                                        | `modifystart` / `modifyend`（`OMapModifyEvent`） | —                          |

## Select

```ts
new Select(params?: OMapSelectParamsType)
// params: { layers?, features?, filter?, style?, multi?, ... }
// features 是「候选白名单」：限定可从哪些要素中选中，与 layers 正交（两者同时生效）
```

| 方法                      | 签名                                       | 说明                                       |
| ------------------------- | ------------------------------------------ | ------------------------------------------ |
| `getSelected()`           | `() => BaseFeature[]`                      | 最近一次变化中**新增选中**的要素（增量）   |
| `getDeselected()`         | `() => BaseFeature[]`                      | 最近一次变化中**被取消选中**的要素（增量） |
| `getSelection()`          | `() => BaseFeature[]`                      | 当前**全量**选中集合（以 collection 为准） |
| `select(features)`        | `(BaseFeature \| BaseFeature[]) => void`   | 主动选择（去重，并同步 `selected` 增量）   |
| `deselect(features)`      | `(BaseFeature \| BaseFeature[]) => void`   | 取消选择（并同步 `deselected` 增量）       |
| `clearSelection()`        | `() => void`                               | 清空选中集合，原选中项记入 `deselected`    |
| `getFeatures()`           | `() => BaseFeature[]`                      | 读取候选白名单                             |
| `setFeatures(features)`   | `(BaseFeature \| BaseFeature[]) => void`   | 替换候选白名单                             |
| `getFeaturesCollection()` | `() => OlCollection`                       | 原生 collection                            |
| 事件                      | `select` / `deselect`（`OMapSelectEvent`） | —                                          |

## DragBox / DragPan / DragZoom / MouseWheelZoom / DoubleClickZoom / KeyboardZoom

基础地图操控交互，构造均为 `new Xyz(params?: OMapXyzParamsType)`（`id` 可选），并各自暴露 `on/once/un`：

| 类                | 典型事件                                                                     |
| ----------------- | ---------------------------------------------------------------------------- |
| `DragBox`         | `boxstart` / `boxdrag` / `boxend`（`OMapDragBoxEvent`，boxend 携带框选范围） |
| `DragPan`         | `change`                                                                     |
| `DragZoom`        | `change`                                                                     |
| `MouseWheelZoom`  | `change`                                                                     |
| `DoubleClickZoom` | `change`                                                                     |
| `KeyboardZoom`    | `change`                                                                     |

## Link

```ts
new Link(params?: OMapLinkParamsType)   // params: { animate?: boolean, ... }
```

将地图视图状态（center / zoom / rotation）同步到 URL hash。事件：`link:change`（`OMapLinkEvent`）。

## InteractionExtent（Extent 框选）

```ts
new InteractionExtent(params?: OMAPExtentParamsType)
```

| 方法                | 签名                                                                 | 说明         |
| ------------------- | -------------------------------------------------------------------- | ------------ |
| `getExtent()`       | `() => Extent`                                                       | 当前框选范围 |
| `setExtent(extent)` | `(OMapExtentType) => void`                                           | 设置范围     |
| 事件                | `extent:start` / `extent:change` / `extent:end`（`OMapExtentEvent`） | —            |

> 所有交互的回调均经过 typed event map，payload 已精确化（`e.target` 为交互实例，部分事件带 `oldValue`/`newValue`）。
