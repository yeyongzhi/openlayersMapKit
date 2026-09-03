# LinearRing

> 稳定性：`stable-beta`

线性环，首尾相接的闭合折线，通常作为 Polygon 的环使用。

## 引入

```ts
import { LinearRing } from 'openlayers-map-kit'
```

源码：`src/module/core/Feature/LinearRing/index.ts`

## 构造

```ts
new LinearRing(coordinatesOrFeature: Feature<Geometry> | OMapLinearRingGeometryCoordinatesType, properties?: P)
```

## 方法

| 方法                                                                       | 说明                         |
| -------------------------------------------------------------------------- | ---------------------------- |
| `getCoordinates(): LngLat[]`                                               | 获取LinearRing的坐标         |
| `getFirstCoordinate(): LngLat`                                             | 获取LinearRing的第一个坐标   |
| `getLastCoordinate(): LngLat`                                              | 获取LinearRing的最后一个坐标 |
| `intersectsCoordinate(coordinates: OMapCoordinateType): boolean`           | LinearRing是否包含给定坐标   |
| `intersectsExtent(extent: OMapExtentType): boolean`                        | LinearRing是否与给定范围相交 |
| `setCoordinates(coordinates: OMapLinearRingGeometryCoordinatesType): void` | 设置LinearRing的坐标         |
| `translate(deltaX?: number, deltaY?: number): void`                        | 沿 X/Y 轴平移LinearRing      |

## 继承成员

继承链：LinearRing → BasicFeature

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

- 一般不需要直接构造，构造 [`Polygon`](./Polygon.md) 时会自动处理环。
- 环必须闭合，且不应自相交。

## 相关

- 基类：[BasicFeature](./BasicFeature.md)

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
