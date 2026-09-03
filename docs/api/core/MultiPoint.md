# MultiPoint

> 稳定性：`stable-beta`

多点要素，由多个点坐标组成的集合。

## 引入

```ts
import { MultiPoint } from 'openlayers-map-kit'
```

源码：`src/module/core/Feature/MultiPoint/index.ts`

## 构造

```ts
new MultiPoint(args: OMapMultiPointGeometryCoordinatesType, properties?: P)
new MultiPoint(args: Feature<Geometry>)
```

## 方法

| 方法                                                                                            | 说明             |
| ----------------------------------------------------------------------------------------------- | ---------------- |
| `appendPoint(pointOrpointCoordinates: OMapCoordinateType \| Point<PropertiesType>): void`       | —                |
| `getClosestPoint(pointOrpointCoordinates: OMapCoordinateType \| Point<PropertiesType>): LngLat` | —                |
| `getCoordinates(): LngLat[]`                                                                    | 获取多个点的坐标 |
| `getFirstCoordinate(): LngLat`                                                                  | —                |
| `getLastCoordinate(): LngLat`                                                                   | —                |
| `getPoint(index: number): Point<PropertiesType>`                                                | —                |
| `intersectsCoordinate(coordinate: OMapCoordinateType): boolean`                                 | —                |
| `intersectsExtent(extent: OMapExtentType): boolean`                                             | —                |
| `setCoordinates(coordinates: OMapMultiPointGeometryCoordinatesType): void`                      | 设置多个点的坐标 |

## 继承成员

继承链：MultiPoint → BasicFeature

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

- 坐标为坐标数组的数组：`[[lng, lat], [lng, lat], ...]`。

## 相关

- 基类：[BasicFeature](./BasicFeature.md)

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
