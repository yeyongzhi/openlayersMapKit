# WMTSSource

> 稳定性：`stable-beta`

WMTS 瓦片数据源，按矩阵集请求 OGC WMTS 瓦片。

## 引入

```ts
import { WMTSSource } from 'openlayers-map-kit'
```

源码：`src/module/source/TileSource/subClass/WMTSSource/index.ts`

## 构造

```ts
new WMTSSource(params: OMapWMTSSourceParamsType)
```

## 方法

| 方法                                                          | 说明 |
| ------------------------------------------------------------- | ---- |
| `createFromWMTSTemplate(template: string): UrlFunction`       | —    |
| `getDimensions(): any`                                        | —    |
| `getFormat(): string`                                         | —    |
| `getLayer(): string`                                          | —    |
| `getMatrixSet(): string`                                      | —    |
| `getRequestEncoding(): RequestEncoding`                       | —    |
| `getStyle(): string`                                          | —    |
| `getVersion(): string`                                        | —    |
| `updateDimensions(dimensions: Record<string, unknown>): void` | —    |

## 继承成员

继承链：WMTSSource → TileSource → Source

### 继承自 TileSource

| 成员                                                                                                 | 说明 |
| ---------------------------------------------------------------------------------------------------- | ---- |
| `clear(): void`                                                                                      | —    |
| `getGutterForProjection(projection: Projection): number`                                             | —    |
| `getKey(): string`                                                                                   | —    |
| `getTile(z: number, x: number, y: number, pixelRatio: number, projection: Projection): Tile \| null` | —    |
| `getTileCoordForTileUrlFunction(tileCoord: TileCoord, projection?: Projection): TileCoord`           | —    |
| `getTileGrid(): TileGrid \| null`                                                                    | —    |
| `getTileGridForProjection(projection: Projection): TileGrid`                                         | —    |
| `getTilePixelRatio(pixelRatio: number): number`                                                      | —    |
| `getTilePixelSize(z: number, pixelRatio: number, projection: Projection): Size`                      | —    |
| `onTile(type: TileSourceEventTypes, listener: OMapTileSourceEventListener): EventsKey`               | —    |
| `onTileLoadEnd(listener: OMapTileSourceEventListener): EventsKey`                                    | —    |
| `onTileLoadError(listener: OMapTileSourceEventListener): EventsKey`                                  | —    |
| `onTileLoadStart(listener: OMapTileSourceEventListener): EventsKey`                                  | —    |

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

- `createFromWMTSTemplate(template)` 可直接使用能力文档中的 URL 模板，省去手工拼接参数。
- 维度参数（如时间维）可用 `updateDimensions()` 动态更新。

## 相关

- 基类：[TileSource](./TileSource.md)
- 承载图层：[WMTSLayer](../layer/WMTSLayer.md)

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
