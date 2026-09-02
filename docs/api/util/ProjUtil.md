# ProjUtil

> 稳定性：`stable-beta`

投影换算工具，提供经纬度与地图投影坐标之间的静态方法。

## 引入

```ts
import { ProjUtil } from 'omap'
```

源码：`src/module/util/ProjUtil/index.ts`

## 静态成员

| 成员                                                                            | 说明 |
| ------------------------------------------------------------------------------- | ---- |
| `fromLonLat(coordinate: number[] \| LngLat, projection?: OMapProjType): LngLat` | —    |
| `toLonLat(coordinate: number[] \| LngLat, projection?: OMapProjType): LngLat`   | —    |

## 说明与注意点

- `fromLonLat` 把经纬度转为投影坐标，`toLonLat` 把投影坐标转回经纬度。
- 第二个参数可指定目标投影，默认使用地图的常规投影（EPSG:3857）。
- 传入坐标既可以是 `[lng, lat]` 数组，也可以是 [`LngLat`](../basic/LngLat.md) 实例；缺少坐标或坐标格式非法时抛出 `OMapError`。

## 示例

```ts
const xy = ProjUtil.fromLonLat([116.397, 39.909])
const lonlat = ProjUtil.toLonLat(xy)
```

## 相关

- 经纬度：[LngLat](../basic/LngLat.md)

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
