# InteractionType

> 稳定性：`stable-beta` — 常量枚举（只读对象）

交互类型标识常量，用于区分不同交互实例的类型。

## 引入

```ts
import { InteractionType } from 'omap'
```

源码：`src/module/interaction/constant.ts`

## 成员

| 常量                              | 值                  | 说明 |
| --------------------------------- | ------------------- | ---- |
| `InteractionType.DoubleClickZoom` | `'DoubleClickZoom'` | —    |
| `InteractionType.DragBox`         | `'DragBox'`         | —    |
| `InteractionType.DragPan`         | `'DragPan'`         | —    |
| `InteractionType.DragZoom`        | `'DragZoom'`        | —    |
| `InteractionType.Draw`            | `'Draw'`            | —    |
| `InteractionType.KeyboardZoom`    | `'KeyboardZoom'`    | —    |
| `InteractionType.Select`          | `'Select'`          | —    |
| `InteractionType.Link`            | `'Link'`            | —    |
| `InteractionType.Modify`          | `'Modify'`          | —    |
| `InteractionType.Measure`         | `'Measure'`         | —    |
| `InteractionType.Extent`          | `'Extent'`          | —    |
| `InteractionType.MouseWheelZoom`  | `'MouseWheelZoom'`  | —    |

## 说明与注意点

- 主要供内部与调试使用；业务代码一般直接判断实例类型即可。

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
