# MultiLineString

> 稳定性：`stable-beta`

多线要素，由多条折线组成的集合。

## 引入

```ts
import { MultiLineString } from 'openlayers-map-kit'
```

源码：`src/module/core/Feature/MultiLineString/index.ts`

## 构造

```ts
new MultiLineString(args: OMapMultiLineStringGeometryCoordinatesType, properties?: P)
new MultiLineString(args: Feature<Geometry>)
```

## 方法

| 方法                                                                            | 说明                           |
| ------------------------------------------------------------------------------- | ------------------------------ |
| `getCoordinates(): LngLat[][]`                                                  | 获取多个线串的坐标             |
| `getFirstCoordinate(): LngLat`                                                  | 获取多个线串的第一个坐标       |
| `getLastCoordinate(): LngLat`                                                   | 获取多个线串的最后一个坐标     |
| `getLength(): number`                                                           | 返回多个线串的投影平面长度之和 |
| `intersectsCoordinate(coordinates: OMapCoordinateType): boolean`                | 多线串是否包含给定坐标         |
| `intersectsExtent(extent: OMapExtentType): boolean`                             | 多线串是否与给定范围相交       |
| `setCoordinates(coordinates: OMapMultiLineStringGeometryCoordinatesType): void` | 设置多个线串的坐标             |
| `translate(deltaX?: number, deltaY?: number): void`                             | 沿 X/Y 轴平移多线串            |

## 继承成员

继承链：MultiLineString → BasicFeature

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

- 坐标为三层嵌套数组，每个元素是一条完整的折线。

## 相关

- 基类：[BasicFeature](./BasicFeature.md)

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
