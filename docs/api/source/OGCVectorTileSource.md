# OGCVectorTileSource

> 稳定性：`stable-beta`

OGC 矢量瓦片数据源，按 OGC 矢量瓦片规范请求数据。

## 引入

```ts
import { OGCVectorTileSource } from 'omap'
```

源码：`src/module/source/TileSource/subClass/OGCVectorTileSource/index.ts`

## 构造

```ts
new OGCVectorTileSource(params: OMapOGCVectorTileSourceParamsType<FeatureType>)
```

## 方法

| 方法                                   | 说明 |
| -------------------------------------- | ---- |
| `getOverlaps(): boolean`               | —    |
| `setOverlaps(overlaps: boolean): void` | —    |

## 继承成员

继承链：OGCVectorTileSource → TileSource → Source

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

- 适用于遵循 OGC API - Tiles / Vector Tiles 规范的服务。

## 相关

- 基类：[TileSource](./TileSource.md)

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
