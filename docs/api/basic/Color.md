# Color

> 稳定性：`stable-beta`

颜色值对象，在 CSS 颜色字符串与其内部表示之间做转换，供样式配置使用。

## 引入

```ts
import { Color } from 'omap'
```

源码：`src/module/basic/Color/index.ts`

## 构造

```ts
new Color(color: ColorType)
```

## 静态成员

| 成员                                     | 说明 |
| ---------------------------------------- | ---- |
| `from(value: Color \| ColorType): Color` | —    |

## 方法

| 方法                                         | 说明       |
| -------------------------------------------- | ---------- |
| `clone(): Color`                             | —          |
| `equals(color: Color \| ColorType): boolean` | —          |
| `getColor(): string`                         | —          |
| `setColor(color: ColorType): void`           | 设置颜色   |
| `toString(): string`                         | —          |
| `withAlpha(alpha: number): void`             | 设置透明度 |

## 说明与注意点

- 接受 CSS 颜色字符串（如 `#ff0000`、`rgba(255,0,0,.5)`）与既有 `Color` 实例。
- `withAlpha(alpha)` 会改变当前实例；需要保留原值时请先 `clone()`。
- `toString()` 可拿回可用于样式的颜色字符串。

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
