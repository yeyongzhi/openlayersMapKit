# Pixel

> 稳定性：`stable-beta`

屏幕像素坐标值对象，描述相对地图容器的二维坐标，是坐标拾取与像素级命中测试的入参。

## 引入

```ts
import { Pixel } from 'openlayers-map-kit'
```

源码：`src/module/basic/Pixel/index.ts`

## 构造

```ts
new Pixel(x: number, y: number)
new Pixel(pixel: number[])
```

## 静态成员

| 成员                                | 说明 |
| ----------------------------------- | ---- |
| `from(value: OMapPixelType): Pixel` | —    |

## 方法

| 方法                                    | 说明                       |
| --------------------------------------- | -------------------------- |
| `clone(): Pixel`                        | —                          |
| `equals(pixel: OMapPixelType): boolean` | 判断两个像素坐标是否相等   |
| `getPixel(): OlPixelType`               | 获取像素坐标               |
| `getX(): number`                        | 获取像素的 x 坐标          |
| `getY(): number`                        | 获取像素的 y 坐标          |
| `setPixel(pixel: OlPixelType): void`    | 设置像素坐标               |
| `setX(x: number): void`                 | 设置像素的 x 坐标          |
| `setY(y: number): void`                 | 设置像素的 y 坐标          |
| `toArray(): OlPixelType`                | —                          |
| `toString(): string`                    | 以字符串的形式输出像素坐标 |

## 说明与注意点

- 构造重载与 `Size` 类似，支持数值对、数组与复制。
- 坐标以地图容器左上角为原点，向右、向下为正方向。
- 像素坐标与地理坐标互转请使用 `Map` 提供的换算方法，不要手工按分辨率推导。

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
