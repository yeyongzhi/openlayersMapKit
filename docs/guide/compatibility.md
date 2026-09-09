# 环境与兼容性

本页说明 OMap 的运行前提、包格式和集成边界。当前版本为 `0.1.0-beta.1`，稳定版发布前仍可能补充兼容范围。

## 运行要求

| 项目       | 当前要求                                               |
| ---------- | ------------------------------------------------------ |
| Node.js    | 20 或更高版本                                          |
| 包管理器   | 推荐 pnpm；npm、yarn 可用于业务项目安装                |
| TypeScript | 发布声明基于 TypeScript 5.9 验证                       |
| OpenLayers | `ol ^10.6.1`，由业务项目安装                           |
| 浏览器     | 支持现代 ES Module、Canvas 与标准 DOM API 的现代浏览器 |
| 服务端渲染 | 只能在浏览器挂载后创建 Map                             |

`ol` 是 peer dependency。业务项目应显式安装它，以便 ESM 构建复用同一个 OpenLayers 实例：

```bash
pnpm add openlayers-map-kit ol
```

## 包格式

| 场景          | 发布入口                          | 验证方式                  |
| ------------- | --------------------------------- | ------------------------- |
| ESM           | `dist/openlayers-map-kit.es.mjs`  | Node ESM 与 Vite 消费测试 |
| CommonJS/UMD  | `dist/openlayers-map-kit.umd.cjs` | Node `require()` 消费测试 |
| ESM 类型      | `dist/index.d.mts`                | NodeNext 类型测试         |
| CommonJS 类型 | `dist/index.d.ts`                 | TypeScript 消费测试       |

业务代码只应从包根导入：

```ts
import { Map, VectorLayer } from 'openlayers-map-kit'
```

不要导入 `src/`、`dist/` 或模块内部路径。这些路径不属于公共版本契约。

## 样式要求

在应用入口加载 OpenLayers CSS：

```ts
import 'ol/ol.css'
```

地图容器必须拥有非零宽高。容器尺寸在创建后发生变化时调用 `map.updateSize()`。

## Vue 与其他 UI 框架

OMap 和 OpenLayers 实例是带内部状态的第三方 class，不适合深层响应式代理。在 Vue 3 中使用 `shallowRef` 保存实例，并在组件卸载时调用 `dispose()`：

```ts
import { onMounted, onUnmounted, shallowRef } from 'vue'
import { Map as OMap } from 'openlayers-map-kit'

const map = shallowRef<OMap>()

onMounted(() => {
  map.value = new OMap('map', { view: { center: [0, 0], zoom: 2 } })
})

onUnmounted(() => {
  map.value?.dispose()
  map.value = undefined
})
```

React、Svelte 和原生页面遵循相同原则：DOM 准备好后创建地图，在组件或页面生命周期结束前释放。

## SSR 注意事项

Map 创建依赖 DOM、Canvas 和浏览器事件。Nuxt、Next.js 或其他 SSR 环境中：

- 不要在模块顶层或服务端渲染阶段创建 Map。
- 在客户端 mounted/effect 生命周期中动态创建。
- 确保地图容器只在客户端可用。
- 页面离开时调用 `dispose()`。

仅导入类型或不访问 DOM 的值对象通常可以在构建阶段使用；具体能力仍应在目标 SSR 框架中验证。

## 坐标与投影

默认视图使用 `EPSG:3857`。公开 API 中不同类对坐标是否自动转换有明确契约；使用前查阅对应 API 页面。需要显式换算时使用 `ProjUtil.fromLonLat()` 与 `ProjUtil.toLonLat()`，不要在同一调用链混用经纬度和投影坐标。

## 当前验证范围

仓库发布门禁覆盖：

- TypeScript 严格模式。
- ESM、CommonJS/UMD 和类型声明消费者。
- Vite 生产构建。
- Chromium 中的矢量渲染、Draw、Modify、Select、Measure、Popup 和销毁重建。
- 独立 tarball 安装。

该范围不等于所有浏览器、地图服务、SSR 框架或真实业务数据均已验证。首次接入预发布版本时，请先在目标环境完成试用，并通过 GitHub Issue 反馈最小复现。
