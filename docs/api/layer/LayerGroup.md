# LayerGroup

> 稳定性：`stable-beta`

图层组，将多个图层作为一个整体统一管理显隐、顺序与层级。

## 引入

```ts
import { LayerGroup } from 'openlayers-map-kit'
```

源码：`src/module/layer/LayerGroup/index.ts`

## 构造

```ts
new LayerGroup(layers: LayerGroupLayer[])
new LayerGroup(id: LayerGroupIdType | null, layers: LayerGroupLayer[])
```

## 属性

| 属性                           | 说明     |
| ------------------------------ | -------- |
| `id: LayerGroupIdType \| null` | 图层组id |
| `map: Map \| null`             | —        |

## 方法

| 方法                                     | 说明     |
| ---------------------------------------- | -------- |
| `add(layer: LayerGroupLayer): void`      | 添加图层 |
| `clear(): void`                          | —        |
| `getAll(): LayerGroupLayer[]`            | —        |
| `getAllLayers(): LayerGroupLayer[]`      | —        |
| `getId(): LayerGroupIdType \| null`      | —        |
| `remove(layer: LayerGroupLayer): void`   | —        |
| `removeById(id: LayerGroupIdType): void` | —        |
| `setMap(map: Map \| null): void`         | —        |

## 说明与注意点

- 构造支持 `(layers)` 与 `(id, layers)` 两种形式。
- 组内图层通过 `add()` / `remove()` / `removeById()` 维护，`getAllLayers()` 可展平读取全部图层。
- 图层组需通过 `Map.addLayerGroup()` 挂载。

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
