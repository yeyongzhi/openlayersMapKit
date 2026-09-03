# Polygon

> 稳定性：`stable-beta`

面要素，由一个或多个环定义，第一个环为外环，其余为内环（洞）。

## 引入

```ts
import { Polygon } from 'openlayers-map-kit'
```

源码：`src/module/core/Feature/Polygon/index.ts`

## 构造

```ts
new Polygon(args: OMapPolygonGeometryCoordinatesType, properties?: P)
new Polygon(args: Feature<Geometry>)
```

## 方法

| 方法                                                                                                            | 说明                                                                                    |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `appendLinearRing(linearRingParams: OMapLinearRingGeometryCoordinatesType \| LinearRing<PropertiesType>): void` | 向Polygon中添加LinearRing（内环）                                                       |
| `getArea(): number`                                                                                             | 返回投影平面上多边形的面积                                                              |
| `getClosestPoint(point: OMapCoordinateType, _closestPoint?: OMapCoordinateType): LngLat`                        | 将几何图形中距离传递点最近的点作为坐标返回                                              |
| `getCoordinates(rightHanded?: boolean): LngLat[][]`                                                             | 获取多边形的坐标                                                                        |
| `getFirstCoordinate(): LngLat`                                                                                  | 获取多边形的第一个坐标（包含内环）                                                      |
| `getInteriorPoint(): Point<PropertiesType>`                                                                     | 返回多边形的内点                                                                        |
| `getLastCoordinate(): LngLat`                                                                                   | 获取多边形的最后一个坐标（包含内环）                                                    |
| `intersectsCoordinate(coordinates: OMapCoordinateType): boolean`                                                | 如果该几何形状包含指定的坐标，则返回 true。如果坐标位于几何形状的边界上，则返回 false。 |
| `intersectsExtent(extent: Extent): boolean`                                                                     | 线是否在extent范围内                                                                    |
| `setCoordinates(coordinates: OMapPolygonGeometryCoordinatesType): void`                                         | 设置多边形的坐标                                                                        |
| `simplify(tolerance?: number): Polygon<P>`                                                                      | —                                                                                       |
| `transform(source: string, destination: string): void`                                                          | —                                                                                       |
| `translate(deltaX?: number, deltaY?: number): void`                                                             | —                                                                                       |

## 继承成员

继承链：Polygon → BasicFeature

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

- 坐标结构是**环的数组**：`[[[lng, lat], ...], ...]`，比 LineString 多一层嵌套。
- 环应闭合（首尾坐标相同），部分几何计算依赖闭合环。
- 带洞的 Polygon 在第一个环之后追加内环即可。

## 示例

```ts
const area = new Polygon([
  [
    [116.3, 39.85],
    [116.5, 39.85],
    [116.5, 40.0],
    [116.3, 40.0],
    [116.3, 39.85]
  ]
])
```

## 相关

- 基类：[BasicFeature](./BasicFeature.md)

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
