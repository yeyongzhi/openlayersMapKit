# Size

> 稳定性：`stable-beta`

尺寸值对象，表示以像素为单位的宽高，常用于视口尺寸、图标尺寸与偏移计算。

## 引入

```ts
import { Size } from 'omap'
```

源码：`src/module/basic/Size/index.ts`

## 构造

```ts
new Size(x: number, y: number)
new Size(pixel: number[])
```

## 静态成员

| 成员                              | 说明 |
| --------------------------------- | ---- |
| `from(value: OMapSizeType): Size` | —    |

## 方法

| 方法                                  | 说明                   |
| ------------------------------------- | ---------------------- |
| `clone(): Size`                       | —                      |
| `equals(size: OMapSizeType): boolean` | 判断两个尺寸是否相等   |
| `getHeight(): number`                 | 获取Size的height       |
| `getSize(): OlSizeType`               | 获取size               |
| `getWidth(): number`                  | 获取Size的width        |
| `setHeight(height: number): void`     | 设置Size的height       |
| `setSize(size: OMapSizeType): void`   | 设置size               |
| `setWidth(width: number): void`       | 设置Size的width        |
| `toArray(): OlSizeType`               | 转换为数组             |
| `toString(): string`                  | 以字符串的形式输出尺寸 |

## 说明与注意点

- 构造支持 `(width, height)`、数组 `[width, height]` 与复制既有实例三种重载。
- 数值为纯像素语义，不随地图缩放变化；需要地图容器的当前尺寸请用 `Map.getSize()`。

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
