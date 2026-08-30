# MultiPolygon

> 稳定性：`stable-beta`

多面要素，由多个多边形组成的集合。

## 引入

```ts
import { MultiPolygon } from 'omap'
```

源码：`src/module/core/Feature/MultiPolygon/index.ts`

## 构造

```ts
new MultiPolygon(args: OMapMultiPolygonGeometryCoordinatesType, properties?: P)
new MultiPolygon(args: Feature<Geometry>)
```

## 方法

| 方法                                                                         | 说明                             |
| ---------------------------------------------------------------------------- | -------------------------------- |
| `getArea(): number`                                                          | 返回多个多边形的投影平面面积之和 |
| `getCoordinates(): OMapMultiPolygonGeometryCoordinatesType`                  | 获取多个多边形的坐标             |
| `getFirstCoordinate(): Lnglat`                                               | 获取多个多边形的第一个坐标       |
| `getLastCoordinate(): Lnglat`                                                | 获取多个多边形的最后一个坐标     |
| `intersectsCoordinate(coordinates: OMapCoordinateType): boolean`             | 多多边形是否包含给定坐标         |
| `intersectsExtent(extent: OMapExtentType): boolean`                          | 多多边形是否与给定范围相交       |
| `setCoordinates(coordinates: OMapMultiPolygonGeometryCoordinatesType): void` | 设置多个多边形的坐标             |
| `translate(deltaX?: number, deltaY?: number): void`                          | 沿 X/Y 轴平移多多边形            |

## 继承成员

继承链：MultiPolygon → BasicFeature

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

- 坐标为四层嵌套数组，每个元素是一个完整的多边形（含其内环）。

## 相关

- 基类：[BasicFeature](./BasicFeature.md)

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
