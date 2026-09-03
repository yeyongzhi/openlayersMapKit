# Style

> 稳定性：`stable-beta`

样式对象，承载要素或图层的渲染样式配置（填充、描边、图标、文本等）。

## 引入

```ts
import { Style } from 'openlayers-map-kit'
```

源码：`src/module/basic/Style/index.ts`

## 构造

```ts
new Style(options: OMapStyleOptionsType)
```

## 方法

| 方法                | 说明 |
| ------------------- | ---- |
| `getStyle(): Style` | —    |

## 说明与注意点

- 通常通过图层或要素的 `setStyle()` 使用，直接 `new Style(...)` 的场景较少。
- `getStyle()` 返回内部 OpenLayers 样式实例，用于与原生 OL 代码互操作。

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
