# BasicFeature

> 稳定性：`internal` — 基类，不直接从包入口导出

要素基类，封装几何、属性字典与事件，是所有几何要素的共同父类。

## 引入

```ts
import { BasicFeature } from 'openlayers-map-kit'
```

## 构造

```ts
new BasicFeature(type: OMapBasicFeatureType, coordinatesOrFeature: Feature<Geometry> | OMapBasicFeatureCoordinatesType, radius?: number)
```

## 属性

| 属性                           | 说明 |
| ------------------------------ | ---- |
| `id: string \| number \| null` | —    |
| `type: OMapBasicFeatureType`   | —    |

## 方法

| 方法                                                                 | 说明                                                                                                            |
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
| `setCoordinates(coordinates: OMapBasicFeatureCoordinatesType): void` | 设置坐标                                                                                                        |
| `setId(id: string \| number): void`                                  | —                                                                                                               |
| `setProperties(properties?: Partial<P>): false \| void`              | 合并写入要素属性。OpenLayers 的 `setProperties` 为合并语义， 因此入参按 `Partial<P>` 处理，允许只更新部分字段。 |
| `setStyle(style?: OMapStyleLike): void`                              | —                                                                                                               |

## 说明与注意点

- 不直接从包入口导出，请使用 [`Point`](./Point.md)、[`LineString`](./LineString.md)、[`Polygon`](./Polygon.md) 等具体几何类。
- 从原生 OpenLayers Feature 构造 wrapper 时请统一走库内部的 resolver，以保证同一要素始终对应同一个 wrapper 实例。
- 属性字典支持泛型：`BasicFeature<T, P>`。`getProperties()` 返回完整属性包，`setProperties()` 为合并语义。

## 相关

- 子类：[Circle](./Circle.md)、[LinearRing](./LinearRing.md)、[LineString](./LineString.md)、[MultiLineString](./MultiLineString.md)、[MultiPoint](./MultiPoint.md)、[MultiPolygon](./MultiPolygon.md)、[Point](./Point.md)、[Polygon](./Polygon.md)

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
