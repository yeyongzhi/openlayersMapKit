# TileWMSSource

> 稳定性：`stable-beta`

WMS 瓦片数据源，以瓦片方式请求 OGC WMS 服务。

## 引入

```ts
import { TileWMSSource } from 'openlayers-map-kit'
```

源码：`src/module/source/TileSource/subClass/TileWMSSource/index.ts`

## 构造

```ts
new TileWMSSource(params?: OMapTileWMSSourceParamsType)
```

## 方法

| 方法                                                                                                                                        | 说明 |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| `getFeatureInfoUrl(coordinate: OMapCoordinateType, resolution: number, projection: Projection, params: OMapWMSParams): string \| undefined` | —    |
| `getLegendUrl(resolution?: number, params?: OMapWMSParams): string \| undefined`                                                            | —    |
| `getParams(): any`                                                                                                                          | —    |
| `setParams(params: OMapWMSParams): void`                                                                                                    | —    |
| `updateParams(params: OMapWMSParams): void`                                                                                                 | —    |

## 继承成员

继承链：TileWMSSource → TileSource → Source

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

- `getFeatureInfoUrl()` 用于构造 GetFeatureInfo 请求地址，实现点击查询要素属性。
- `getLegendUrl()` 可取回图例地址。
- 参数可运行时更新：`setParams()` 为整体替换，`updateParams()` 为合并更新。

## 相关

- 基类：[TileSource](./TileSource.md)

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
