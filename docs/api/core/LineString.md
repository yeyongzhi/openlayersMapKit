# LineString

> 稳定性：`stable-beta`

线要素，由按顺序排列的坐标序列定义。

## 引入

```ts
import { LineString } from 'openlayers-map-kit'
```

源码：`src/module/core/Feature/LineString/index.ts`

## 构造

```ts
new LineString(args: OMapLineStringGeometryCoordinatesType, properties?: P)
new LineString(args: Feature<Geometry>)
```

## 方法

| 方法                                                                          | 说明                     |
| ----------------------------------------------------------------------------- | ------------------------ |
| `appendCoordinate(coordinates: OMapCoordinateType): void`                     | 追加坐标                 |
| `getCoordinateAt(fraction: number, dest: OlCoordinateType \| LngLat): LngLat` | 获取线段指定位置的坐标点 |
| `getCoordinateAtM(m: number, extrapolate?: boolean): LngLat \| null`          | —                        |
| `getCoordinates(): LngLat[]`                                                  | 获取线的坐标             |
| `getFirstCoordinate(): LngLat`                                                | 获取线的第一个坐标       |
| `getLastCoordinate(): LngLat`                                                 | 获取线的最后一个坐标     |
| `getLength(): number`                                                         | —                        |
| `intersectsCoordinate(coordinates: OMapCoordinateType): boolean`              | —                        |
| `intersectsExtent(extent: OMapExtentType): boolean`                           | 线是否在extent范围内     |
| `setCoordinates(coordinates: OMapLineStringGeometryCoordinatesType): void`    | 设置线的坐标             |
| `simplify(tolerance?: number): LineString<P>`                                 | —                        |
| `transform(source: string, destination: string): void`                        | —                        |
| `translate(deltaX?: number, deltaY?: number): void`                           | —                        |

## 继承成员

继承链：LineString → BasicFeature

### 继承自 BasicFeature

| 成员                                                                 | 说明                                                                                                            |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `changed(): void`                                                    | —                                                                                                               |
| `clone(): this`                                                      | —                                                                                                               |
| `dispatchEvent(event: string \| BaseEvent): boolean \| undefined`    | —                                                                                                               |
| `get(key: string): Value`                                            | —                                                                                                               |
| `getCoordinates(): void \| OMapBasicFeatureCoordinatesType`          | 获取坐标                                                                                                        |
| `getExtent(): Extent`                                                | 获取要素的范围                                                                                                  |
| `getFeature(): Feature<Geometry>`                                    | 获取原生的Openlayers Feature对象                                                                                |
| `getGeometry(): T`                                                   | 获取原生的Openlayers Geometry对象                                                                               |
| `getGeometryName(): string`                                          | —                                                                                                               |
| `getId(): string \| number \| null`                                  | —                                                                                                               |
| `getKeys(): string[]`                                                | —                                                                                                               |
| `getProperties(): P`                                                 | 获取要素属性字典。                                                                                              |
| `getStyle(): OMapStyleLike`                                          | —                                                                                                               |
| `getType(): OMapBasicFeatureType`                                    | —                                                                                                               |
| `id: string \| number \| null`                                       | —                                                                                                               |
| `setCoordinates(coordinates: OMapBasicFeatureCoordinatesType): void` | 设置坐标                                                                                                        |
| `setId(id: string \| number): void`                                  | —                                                                                                               |
| `setProperties(properties?: Partial<P>): false \| void`              | 合并写入要素属性。OpenLayers 的 `setProperties` 为合并语义， 因此入参按 `Partial<P>` 处理，允许只更新部分字段。 |
| `setStyle(style?: OMapStyleLike): void`                              | —                                                                                                               |
| `type: OMapBasicFeatureType`                                         | —                                                                                                               |

## 说明与注意点

- 坐标为坐标数组：`[[lng, lat], [lng, lat], ...]`，顺序即折线的走向。
- 长度量算在投影坐标系下进行，EPSG:3857 下结果为投影单位（近似米）。

## 相关

- 基类：[BasicFeature](./BasicFeature.md)

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
