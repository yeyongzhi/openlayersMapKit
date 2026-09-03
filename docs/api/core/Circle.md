# Circle

> 稳定性：`stable-beta`

圆要素，由圆心坐标与半径定义。

## 引入

```ts
import { Circle } from 'openlayers-map-kit'
```

源码：`src/module/core/Feature/Circle/index.ts`

## 构造

```ts
new Circle(centerOrFeature: OMapCoordinateType | Feature<Geometry>, radius?: number, properties?: P)
```

## 方法

| 方法                                                                   | 说明                 |
| ---------------------------------------------------------------------- | -------------------- |
| `getCenter(): LngLat`                                                  | —                    |
| `getCoordinates(): LngLat`                                             | 获取圆的圆心坐标     |
| `getRadius(): number`                                                  | —                    |
| `intersectsCoordinate(coordinates: OMapCoordinateType): boolean`       | 圆是否包含给定坐标   |
| `intersectsExtent(extent: OMapExtentType): boolean`                    | 圆是否与给定范围相交 |
| `setCenter(center: OMapCoordinateType): void`                          | —                    |
| `setCenterAndRadius(center: OMapCoordinateType, radius: number): void` | —                    |
| `setCoordinates(center: OMapCoordinateType): void`                     | 设置圆的圆心坐标     |
| `setRadius(radius: number): void`                                      | —                    |

## 继承成员

继承链：Circle → BasicFeature

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

- **半径为投影单位**：在 EPSG:3857 下近似为米，不是经纬度差值，传入 0.01 级的数值会得到极小的圆。
- 需要按经纬度语义画圆时，请先换算成投影单位，或改用 [`Polygon`](./Polygon.md) 近似。
- EPSG:3857 下高纬度地区的圆会有明显形变，这是投影本身导致的。

## 示例

```ts
// 半径 1000（投影单位，3857 下近似 1000 米）
const circle = new Circle([116.397, 39.909], 1000)
```

## 相关

- 基类：[BasicFeature](./BasicFeature.md)

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
