# Select

> 稳定性：`stable-beta`

选择交互，在地图上拾取要素并维护选中集合。

## 引入

```ts
import { Select } from 'openlayers-map-kit'
```

源码：`src/module/interaction/Select/index.ts`

## 构造

```ts
new Select(params?: OMapSelectParamsType)
```

## 属性

| 属性                                                   | 说明                                                                                                        |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `deselected: BasicFeature<Geometry, PropertiesType>[]` | 最近一次选择变化中**被取消选中**的要素（增量）。                                                            |
| `events: Event<OMapSelectEventMap>`                    | 收窄交互事件总线类型（构造器中以具体事件映射实例化）                                                        |
| `selected: BasicFeature<Geometry, PropertiesType>[]`   | 最近一次选择变化中**新增选中**的要素（增量，非当前全量）。 当前全量选中集合请用 {@link Select.getSelection} |

## 方法

| 方法                                                                                                                                 | 说明                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| `clearSelection(): void`                                                                                                             | 清空当前选中集合，并把原选中要素记入取消增量                                  |
| `deselect(features: BasicFeature<Geometry, PropertiesType> \| BasicFeature<Geometry, PropertiesType>[]): void`                       | 主动取消一个或多个 Feature 的选择状态，并同步取消增量                         |
| `getDeselected(): BasicFeature<Geometry, PropertiesType>[]`                                                                          | 获取最近一次选择变化中被取消选中的要素（增量）                                |
| `getFeatures(): BasicFeature<Geometry, PropertiesType>[]`                                                                            | 获取候选白名单（构造时 `features` 选项指定的可选要素集合）                    |
| `getFeaturesCollection(): Collection<Feature<Geometry>>`                                                                             | 访问 OpenLayers Select 使用的原生 Feature collection                          |
| `getSelected(): BasicFeature<Geometry, PropertiesType>[]`                                                                            | 获取最近一次选择变化中新增选中的要素（增量）                                  |
| `getSelection(): BasicFeature<Geometry, PropertiesType>[]`                                                                           | 获取当前全部选中的 OMap Feature（以原生 collection 为唯一数据源）             |
| `on(type: "change" \| "error" \| "propertychange" \| "change:active" \| "select", callback: (e: OMapSelectEvent) => void): string`   | —                                                                             |
| `once(type: "change" \| "error" \| "propertychange" \| "change:active" \| "select", callback: (e: OMapSelectEvent) => void): string` | —                                                                             |
| `select(features: BasicFeature<Geometry, PropertiesType> \| BasicFeature<Geometry, PropertiesType>[]): void`                         | 主动选择一个或多个 Feature（幂等，不重复加入原生 collection），并同步选中增量 |
| `setFeatures(features: BasicFeature<Geometry, PropertiesType> \| BasicFeature<Geometry, PropertiesType>[]): void`                    | 设置候选白名单，替换原有集合                                                  |
| `un(id: string): void`                                                                                                               | —                                                                             |

## 继承成员

继承链：Select → Interaction

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

- 可通过 `layers` 选项限定参与拾取的图层，或通过 `filter` 对要素做进一步过滤。
- 拾取到的原生要素会经库内部 resolver 统一转换为 OMap wrapper，保证与从图层取到的 wrapper 身份一致。
- 选中集合可读取用于批量操作。

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
