# VectorSource

> 稳定性：`stable-beta`

矢量数据源，提供要素的增删查、范围检索、远程加载与事件能力。

## 引入

```ts
import { VectorSource } from 'omap'
```

源码：`src/module/source/VectorSource/index.ts`

## 构造

```ts
new VectorSource(params?: OMapVectorSourceParamsType)
```

## 方法

| 方法                                                                                                                                                            | 说明 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| `addFeature(feature: OMapVectorSourceFeature): void`                                                                                                            | —    |
| `addFeatures(features: OMapVectorSourceFeature[]): void`                                                                                                        | —    |
| `clear(fast?: boolean): void`                                                                                                                                   | —    |
| `forEachFeature(callback: (feature: OMapVectorSourceFeature) => T): T \| undefined`                                                                             | —    |
| `forEachFeatureInExtent(extent: OMapExtentType, callback: (feature: OMapVectorSourceFeature) => T): T \| undefined`                                             | —    |
| `forEachFeatureIntersectingExtent(extent: OMapExtentType, callback: (feature: OMapVectorSourceFeature) => T): T \| undefined`                                   | —    |
| `getClosestFeatureToCoordinate(coordinate: OMapCoordinateType, filter?: ((feature: OMapVectorSourceFeature) => boolean)): OMapVectorSourceFeature \| undefined` | —    |
| `getExtent(extent?: OMapExtentType): Extent`                                                                                                                    | —    |
| `getFeatureById(id: string \| number): OMapVectorSourceFeature \| undefined`                                                                                    | —    |
| `getFeatureByOlFeature(feature: Feature<Geometry>): OMapVectorSourceFeature \| undefined`                                                                       | —    |
| `getFeatures(): OMapVectorSourceFeature[]`                                                                                                                      | —    |
| `getFeaturesAtCoordinate(coordinate: OMapCoordinateType): OMapVectorSourceFeature[]`                                                                            | —    |
| `getFeaturesCollection(): Collection<Feature<Geometry>> \| null`                                                                                                | —    |
| `getFeaturesInExtent(extent: OMapExtentType, projection?: Projection): OMapVectorSourceFeature[]`                                                               | —    |
| `getFormat(): FeatureFormat<Feature<Geometry>> \| null`                                                                                                         | —    |
| `getOverlaps(): boolean`                                                                                                                                        | —    |
| `getUrl(): string \| FeatureUrlFunction \| undefined`                                                                                                           | —    |
| `hasFeature(feature: OMapVectorSourceFeature): boolean`                                                                                                         | —    |
| `isEmpty(): boolean`                                                                                                                                            | —    |
| `loadFeatures(extent: OMapExtentType, resolution: number, projection: Projection): void`                                                                        | —    |
| `onAddFeature(listener: OMapVectorSourceEventListener): EventsKey`                                                                                              | —    |
| `onChangeFeature(listener: OMapVectorSourceEventListener): EventsKey`                                                                                           | —    |
| `onClear(listener: OMapVectorSourceEventListener): EventsKey`                                                                                                   | —    |
| `onFeaturesLoadEnd(listener: OMapVectorSourceEventListener): EventsKey`                                                                                         | —    |
| `onFeaturesLoadError(listener: OMapVectorSourceEventListener): EventsKey`                                                                                       | —    |
| `onFeaturesLoadStart(listener: OMapVectorSourceEventListener): EventsKey`                                                                                       | —    |
| `onRemoveFeature(listener: OMapVectorSourceEventListener): EventsKey`                                                                                           | —    |
| `onVector(type: VectorSourceEventTypes, listener: OMapVectorSourceEventListener): EventsKey`                                                                    | —    |
| `removeFeature(feature: OMapVectorSourceFeature): void`                                                                                                         | —    |
| `removeFeatures(features: OMapVectorSourceFeature[]): void`                                                                                                     | —    |
| `removeLoadedExtent(extent: OMapExtentType): void`                                                                                                              | —    |
| `setLoader(loader: OMapVectorSourceLoader): void`                                                                                                               | —    |
| `setOverlaps(overlaps: boolean): void`                                                                                                                          | —    |
| `setUrl(url: OMapVectorSourceUrl): void`                                                                                                                        | —    |

## 继承成员

继承链：VectorSource → Source

### 继承自 Source

| 成员                                                                | 说明                                                                                                              |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `changed(): void`                                                   | —                                                                                                                 |
| `dispatchEvent(event: string \| BaseEvent): boolean \| undefined`   | —                                                                                                                 |
| `dispose(): void`                                                   | 永久释放 Source 监听与原生资源。重复调用是安全的。                                                                |
| `get(key: string): Value \| undefined`                              | —                                                                                                                 |
| `getAttributions(): Attribution \| null`                            | —                                                                                                                 |
| `getAttributionsCollapsible(): boolean`                             | —                                                                                                                 |
| `getInterpolate(): boolean`                                         | —                                                                                                                 |
| `getKeys(): string[]`                                               | —                                                                                                                 |
| `getProjection(): Projection \| undefined`                          | —                                                                                                                 |
| `getProperties(): P`                                                | 获取数据源属性字典。                                                                                              |
| `getResolutions(projection?: Projection): number[] \| null`         | —                                                                                                                 |
| `getRevision(): number`                                             | —                                                                                                                 |
| `getSource(): T`                                                    | 获取原生 OpenLayers Source 实例                                                                                   |
| `getState(): State`                                                 | —                                                                                                                 |
| `getView(): Promise<ViewOptions>`                                   | —                                                                                                                 |
| `getWrapX(): boolean \| undefined`                                  | —                                                                                                                 |
| `isDisposed(): boolean`                                             | Reports whether permanent release has already happened.                                                           |
| `refresh(): void`                                                   | —                                                                                                                 |
| `set(key: string, value: unknown, silent?: boolean): void`          | —                                                                                                                 |
| `setAttributions(attributions: AttributionLike \| undefined): void` | —                                                                                                                 |
| `setProperties(properties: Partial<P>, silent?: boolean): void`     | 合并写入数据源属性。OpenLayers 的 `setProperties` 为合并语义， 因此入参按 `Partial<P>` 处理，允许只更新部分字段。 |
| `setState(state: State): void`                                      | —                                                                                                                 |
| `unset(key: string, silent?: boolean): void`                        | —                                                                                                                 |

## 说明与注意点

- 要素的增删改都会触发相应的数据源事件，可用于驱动 UI 同步。
- 从原生要素解析出的 wrapper 经库内部 resolver 统一创建，保证身份一致。

## 相关

- 基类：[Source](./Source.md)

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
