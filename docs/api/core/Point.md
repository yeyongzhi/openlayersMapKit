# Point

> 稳定性：`stable-beta`

点要素，由单个经纬度坐标定义。

## 引入

```ts
import { Point } from 'omap'
```

源码：`src/module/core/Feature/Point/index.ts`

## 构造

```ts
new Point(args: OMapCoordinateType, properties?: P)
new Point(args: Feature<Geometry>)
```

## 方法

| 方法                                                             | 说明                                       |
| ---------------------------------------------------------------- | ------------------------------------------ |
| `getCoordinates(): Lnglat`                                       | 获取点的坐标                               |
| `getFirstCoordinate(): Lnglat`                                   | 获取点的第一个坐标                         |
| `getLastCoordinate(): Lnglat`                                    | 获取点的最后一个坐标                       |
| `intersectsCoordinate(coordinates: OMapCoordinateType): boolean` | 点是否与给定坐标相交（即是否落在同一坐标） |
| `intersectsExtent(extent: Extent): boolean`                      | 点是否在extent范围内                       |
| `setCoordinates(coordinates: OMapCoordinateType): void`          | 设置点的坐标                               |

## 继承成员

继承链：Point → BasicFeature

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

- 坐标顺序为 `[经度, 纬度]`。
- 支持坐标数组、`LngLat` 与复制既有要素等多种构造重载。

## 示例

```ts
const marker = new Point([116.397, 39.909], { name: '天安门' })

vectorLayer.addFeature(marker)
```

## 相关

- 基类：[BasicFeature](./BasicFeature.md)

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
