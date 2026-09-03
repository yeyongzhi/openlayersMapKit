# Projection

> 稳定性：`stable-beta`

投影描述对象，封装坐标参考系的编码、单位与有效范围信息。

## 引入

```ts
import { Projection } from 'openlayers-map-kit'
```

源码：`src/module/core/Projection/index.ts`

## 构造

```ts
new Projection(proj: string | Options)
```

## 属性

| 属性                                   | 说明 |
| -------------------------------------- | ---- |
| `resolvedProjectionection: Projection` | —    |

## 方法

| 方法                              | 说明 |
| --------------------------------- | ---- |
| `getAxisOrientation(): string`    | —    |
| `getCode(): string`               | —    |
| `getExtent(): Extent`             | —    |
| `getProjection(): Projection`     | —    |
| `getUnits(): ProjectionUnitsType` | —    |

## 说明与注意点

- 常用实例为 EPSG:4326（经纬度）与 EPSG:3857（Web 墨卡托）。
- 经纬度与投影坐标互转请优先使用 [`ProjUtil`](../util/ProjUtil.md)。

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
