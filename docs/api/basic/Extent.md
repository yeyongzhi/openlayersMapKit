# Extent

> 稳定性：`stable-beta`

范围值对象，表示 `[minX, minY, maxX, maxY]` 的矩形边界，并提供一组静态几何判定工具。

## 引入

```ts
import { Extent } from 'omap'
```

源码：`src/module/basic/Extent/index.ts`

## 构造

```ts
new Extent(minX: number, minY: number, maxX: number, maxY: number)
new Extent(lnglat: number[])
```

## 静态成员

| 成员                                                                                  | 说明                             |
| ------------------------------------------------------------------------------------- | -------------------------------- |
| `boundingExtent(coordinates: OMapCoordinateType[]): Extent`                           | 构建包含所有给定坐标的范围       |
| `containsCoordinate(extent: OMapExtentType, coordinate: OMapCoordinateType): boolean` | 判断边界范围Extent是否包含某个点 |
| `containsExtent(extent1: OMapExtentType, extent2: OMapExtentType): boolean`           | 判断是否某个范围包含另一个范围   |
| `containsXY(extent: OMapExtentType, x: number, y: number): boolean`                   | —                                |
| `createEmpty(): Extent`                                                               | —                                |
| `equals(extent1: OMapExtentType, extent2: OMapExtentType): boolean`                   | —                                |
| `extend(extent1: OMapExtentType, extent2: OMapExtentType): Extent`                    | —                                |
| `from(value: OMapExtentType): Extent`                                                 | —                                |
| `getArea(extent: OMapExtentType): number`                                             | —                                |
| `intersects(extent1: OMapExtentType, extent2: OMapExtentType): boolean`               | 确定一个范围是否与另一个范围相交 |
| `isEmpty(extent: OMapExtentType): boolean`                                            | —                                |

## 方法

| 方法                                      | 说明                           |
| ----------------------------------------- | ------------------------------ |
| `clone(): Extent`                         | —                              |
| `equals(extent: OMapExtentType): boolean` | —                              |
| `getBottomLeft(): Lnglat`                 | 获取边界范围Extent的左下角位置 |
| `getBottomRight(): Lnglat`                | 获取边界范围Extent的右下角位置 |
| `getCenter(): Lnglat`                     | 获取边界范围Extent的中心点位置 |
| `getExtent(): OlExtentType`               | —                              |
| `getHeight(): number`                     | 获取高度信息                   |
| `getSize(): Size`                         | —                              |
| `getTopLeft(): Lnglat`                    | 获取边界范围Extent的左上方位置 |
| `getTopRight(): Lnglat`                   | 获取边界范围Extent的右上方位置 |
| `getWidth(): number`                      | 获取宽度信息                   |
| `toArray(): OlExtentType`                 | —                              |
| `toString(place?: number): string`        | 以字符串的形式输出边界范围     |

## 说明与注意点

- 静态方法（`boundingExtent`、`containsCoordinate`、`containsExtent`、`containsXY` 等）是纯函数，接受数组或 `Extent` 实例，无需先构造对象。
- 实例方法偏向取值与转换：`getCenter()`、`getWidth()`、`getHeight()`、`getSize()`、`toArray()`。
- 范围值处于地图当前投影坐标系，跨 EPSG:4326 与 EPSG:3857 使用时需先做投影换算。

## 示例

```ts
const box = new Extent(116.0, 39.5, 116.9, 40.1)

Extent.containsCoordinate(box, [116.4, 39.9]) // true
box.getCenter() // LngLat
```

## 相关

- 坐标换算：[ProjUtil](../util/ProjUtil.md)

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
