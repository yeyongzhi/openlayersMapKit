# TdtLayerType

> 稳定性：`stable-beta` — 常量枚举（只读对象）

天地图底图类型常量，用于 [`TdtLayer`](./TdtLayer.md)。

## 引入

```ts
import { TdtLayerType } from 'omap'
```

源码：`src/module/layer/TdtLayer/type.ts`

## 成员

| 常量               | 值      | 说明     |
| ------------------ | ------- | -------- |
| `TdtLayerType.Vec` | `'vec'` | 矢量底图 |
| `TdtLayerType.Img` | `'img'` | 影像底图 |
| `TdtLayerType.Ter` | `'ter'` | 地形底图 |
| `TdtLayerType.Cva` | `'cva'` | 矢量注记 |
| `TdtLayerType.Cia` | `'cia'` | 影像注记 |
| `TdtLayerType.Cta` | `'cta'` | 地形注记 |

## 说明与注意点

- `Vec` / `Img` / `Ter` 为底图，`Cva` / `Cia` / `Cta` 为对应的注记层。
- 注记层通常叠加在对应底图之上使用。

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
