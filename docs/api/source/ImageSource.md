# ImageSource

> 稳定性：`stable-beta`

静态影像数据源，按范围与分辨率请求单张影像。

## 引入

```ts
import { ImageSource } from 'openlayers-map-kit'
```

源码：`src/module/source/ImageSource/index.ts`

## 构造

```ts
new ImageSource(params?: OMapImageSourceParamsType | ImageSource)
```

## 方法

| 方法                                                                                                             | 说明 |
| ---------------------------------------------------------------------------------------------------------------- | ---- |
| `getImage(extent: OMapExtentType, resolution: number, pixelRatio: number, projection: Projection): ImageWrapper` | —    |
| `getResolutions(): number[] \| null`                                                                             | —    |
| `onImageLoad(type: ImageSourceEventTypes, listener: OMapImageSourceEventListener): EventsKey`                    | —    |
| `onImageLoadEnd(listener: OMapImageSourceEventListener): EventsKey`                                              | —    |
| `onImageLoadError(listener: OMapImageSourceEventListener): EventsKey`                                            | —    |
| `onImageLoadStart(listener: OMapImageSourceEventListener): EventsKey`                                            | —    |
| `setResolutions(resolutions: number[] \| null): void`                                                            | —    |

## 继承成员

继承链：ImageSource → Source

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

- 提供影像加载生命周期事件：`onImageLoadStart` / `onImageLoadEnd` / `onImageLoadError`。
- 适合叠加单张静态图（如雷达图、历史影像），而非瓦片金字塔。

## 相关

- 基类：[Source](./Source.md)
- 子类：[ImageStaticSource](./ImageStaticSource.md)、[ImageWMSSource](./ImageWMSSource.md)

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
