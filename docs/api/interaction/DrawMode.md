# DrawMode

> 稳定性：`stable-beta` — 常量枚举（只读对象）

绘制模式常量，用于指定 [`Draw`](./Draw.md) 创建的几何类型。

## 引入

```ts
import { DrawMode } from 'omap'
```

源码：`src/module/interaction/Draw/type.ts`

## 成员

| 常量                  | 值             | 说明 |
| --------------------- | -------------- | ---- |
| `DrawMode.Point`      | `'Point'`      | 点   |
| `DrawMode.LineString` | `'LineString'` | 线   |
| `DrawMode.Polygon`    | `'Polygon'`    | 面   |
| `DrawMode.Rectangle`  | `'Rectangle'`  | 矩形 |
| `DrawMode.Circle`     | `'Circle'`     | 圆   |

## 说明与注意点

- 取值为与 OpenLayers 几何类型一致的字符串，可直接与 OL 代码互操作。

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
