# LngLat

> 稳定性：`stable-beta`

经纬度值对象，描述 `[经度, 纬度]` 顺序的地理坐标，是全库坐标输入与输出的统一形态。

## 引入

```ts
import { LngLat } from 'openlayers-map-kit'
```

源码：`src/module/basic/LngLat/index.ts`

## 构造

```ts
new LngLat(lng: number, lat: number)
new LngLat(lnglat: number[])
```

## 静态成员

| 成员                                      | 说明 |
| ----------------------------------------- | ---- |
| `from(value: OMapCoordinateType): LngLat` | —    |

## 方法

| 方法                                          | 说明                     |
| --------------------------------------------- | ------------------------ |
| `clone(): LngLat`                             | —                        |
| `equals(lnglat: OMapCoordinateType): boolean` | 判断两个经纬度是否相等   |
| `getLat(): number`                            | 获取纬度                 |
| `getLng(): number`                            | 获取经度                 |
| `setLat(lat: number): void`                   | 设置纬度                 |
| `setLng(lng: number): void`                   | 设置经度                 |
| `toArray(): OlCoordinateType`                 | 以数组形式输出经纬度     |
| `toString(place?: number): string`            | 以字符串的形式输出经纬度 |

## 说明与注意点

- 构造顺序为 `(lng, lat)`，先经度后纬度，与 GeoJSON 一致。
- 值对象是可变的，需要独立副本时调用 `clone()`。
- 经纬度与地图投影坐标互转请使用 [`ProjUtil`](../util/ProjUtil.md)。

## 示例

```ts
const p = new LngLat(116.397, 39.909)
const copy = p.clone()
copy.setLng(121.474)

// 转投影坐标（EPSG:3857）
const projected = ProjUtil.fromLonLat(p)
```

## 相关

- 投影换算：[ProjUtil](../util/ProjUtil.md)

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
