# PopupPositioning

> 稳定性：`stable-beta` — 常量枚举（只读对象）

弹窗相对锚点的定位常量集合，共九个方位。

## 引入

```ts
import { PopupPositioning } from 'openlayers-map-kit'
```

源码：`src/module/basic/Popup/type.ts`

## 成员

| 常量                            | 值                | 说明 |
| ------------------------------- | ----------------- | ---- |
| `PopupPositioning.bottomLeft`   | `'bottom-left'`   | —    |
| `PopupPositioning.bottomCenter` | `'bottom-center'` | —    |
| `PopupPositioning.bottomRight`  | `'bottom-right'`  | —    |
| `PopupPositioning.centerLeft`   | `'center-left'`   | —    |
| `PopupPositioning.centerCenter` | `'center-center'` | —    |
| `PopupPositioning.centerRight`  | `'center-right'`  | —    |
| `PopupPositioning.topLeft`      | `'top-left'`      | —    |
| `PopupPositioning.topCenter`    | `'top-center'`    | —    |
| `PopupPositioning.topRight`     | `'top-right'`     | —    |

## 说明与注意点

- 取值为 `'bottom-left'` 这类连字符形式，语义与 CSS 方位一致。
- 通过弹窗选项的 `positioning` 字段传入。

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
