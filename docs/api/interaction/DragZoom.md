# DragZoom

> 稳定性：`stable-beta`

拖拽缩放交互，拖拽出一个矩形并缩放到该范围。

## 引入

```ts
import { DragZoom } from 'omap'
```

源码：`src/module/interaction/DragZoom/index.ts`

## 构造

```ts
new DragZoom(params?: (OMapInteractionCommonParamsType & ManualOmit<Options, "">))
```

## 属性

| 属性                                  | 说明                                                 |
| ------------------------------------- | ---------------------------------------------------- |
| `events: Event<OMapDragZoomEventMap>` | 收窄交互事件总线类型（构造器中以具体事件映射实例化） |

## 方法

| 方法                                                                                                                       | 说明 |
| -------------------------------------------------------------------------------------------------------------------------- | ---- |
| `on(type: "change" \| "error" \| "propertychange" \| "change:active", callback: (e: OMapDragZoomEvent) => void): string`   | —    |
| `once(type: "change" \| "error" \| "propertychange" \| "change:active", callback: (e: OMapDragZoomEvent) => void): string` | —    |
| `un(id: string): void`                                                                                                     | —    |

## 继承成员

继承链：DragZoom → Interaction

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

- 多数情况下需要配合修饰键（如 Shift）触发，避免与拖拽平移冲突。

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
