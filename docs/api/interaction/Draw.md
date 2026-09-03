# Draw

> 稳定性：`stable-beta`

绘制交互，在地图上交互式创建点、线、面等要素。

## 引入

```ts
import { Draw } from 'openlayers-map-kit'
```

源码：`src/module/interaction/Draw/index.ts`

## 构造

```ts
new Draw(mode: OMapDrawModeType, params?: OMapDrawParamsType)
```

## 属性

| 属性                              | 说明                                                 |
| --------------------------------- | ---------------------------------------------------- |
| `events: Event<OMapDrawEventMap>` | 收窄交互事件总线类型（构造器中以具体事件映射实例化） |

## 方法

| 方法                                                                                                                                                              | 说明                                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `abort(): void`                                                                                                                                                   | 仅中止当前草图；已完成并进入 VectorSource 的 Feature 会保留。 |
| `appendCoordinates(coordinates: OMapCoordinateType[]): void`                                                                                                      | 追加坐标                                                      |
| `cancel(): void`                                                                                                                                                  | 取消绘制，并结束当前未完成的绘制                              |
| `clearFeatures(): void`                                                                                                                                           | 清空绘制图层中已经完成的 Feature。                            |
| `finish(): void`                                                                                                                                                  | 结束当前未完成的绘制（并自动补全图形）                        |
| `getFeatures(): BasicFeature<Geometry, PropertiesType>[]`                                                                                                         | 获取当前绘制的所有特征                                        |
| `on(type: "change" \| "error" \| "propertychange" \| "change:active" \| "drawstart" \| "drawend" \| "drawabort", callback: (e: OMapDrawEvent) => void): string`   | —                                                             |
| `once(type: "change" \| "error" \| "propertychange" \| "change:active" \| "drawstart" \| "drawend" \| "drawabort", callback: (e: OMapDrawEvent) => void): string` | —                                                             |
| `revoke(): void`                                                                                                                                                  | 撤销操作（会删除最后一个已经绘制的点位）                      |
| `un(id: string): void`                                                                                                                                            | —                                                             |

## 继承成员

继承链：Draw → Interaction

### 继承自 Interaction

| 成员                                                | 说明                                                                                                                    |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `active: boolean`                                   | 交互是否激活                                                                                                            |
| `dispose(): void`                                   | 永久释放交互及其事件监听。重复调用是安全的。                                                                            |
| `events: Event<Record<string, readonly unknown[]>>` | 交互事件                                                                                                                |
| `getActive(): boolean`                              | 返回当前交互是否处于激活状态                                                                                            |
| `getId(): OMapInteractionIdType`                    | 获取交互实例id                                                                                                          |
| `getInteraction(): T`                               | 获取交互实例                                                                                                            |
| `getLayer(): VectorLayer<PropertiesType> \| null`   | 返回交互中涉及的当前指针数，例如，当使用两个手指时为 2。                                                                |
| `getProperties(): P`                                | 获取交互属性                                                                                                            |
| `id: OMapInteractionIdType`                         | 交互实例id                                                                                                              |
| `isDisposed(): boolean`                             | Reports whether permanent release has already happened.                                                                 |
| `map: Map \| null`                                  | —                                                                                                                       |
| `properties: P`                                     | 交互属性。运行期默认值为空对象，泛型 P 描述其最终形态。                                                                 |
| `remove(): void`                                    | 从当前地图解除挂载，交互实例仍可再次添加。                                                                              |
| `setActive(active: boolean): void`                  | 设置当前交互是否处于激活状态                                                                                            |
| `setId(id: OMapInteractionIdType): void`            | —                                                                                                                       |
| `setMap(map: Map \| null): void`                    | —                                                                                                                       |
| `setProperties(properties: Partial<P>): void`       | 合并写入交互属性。OpenLayers 的 `setProperties` 为合并语义， 本地缓存同样按合并处理，避免多次调用后只剩最后一次的属性。 |
| `type: OMapInteractionTypeEnum \| null`             | 交互类型                                                                                                                |

## 说明与注意点

- 绘制类型见 [`DrawMode`](./DrawMode.md)。
- 交互需通过 `Map.addInteraction()` 挂载；不再使用时先 `remove()`，彻底释放用 `dispose()`。
- 绘制完成的要素通常通过事件回调获取。

## 示例

```ts
const draw = new Draw({ mode: DrawMode.Polygon })

map.addInteraction(draw)
draw.on('drawend', (feature) => {
  vectorLayer.addFeature(feature)
})
```

## 相关

- 承载要素：[VectorLayer](../layer/VectorLayer.md)

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
