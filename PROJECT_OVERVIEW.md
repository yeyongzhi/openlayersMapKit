# openlayersMapKit 项目整体说明

## 1. 项目简介

openlayersMapKit（包名 `openlayers-map-kit`，简称 OMap）是基于 OpenLayers 的 TypeScript 地图应用开发 SDK。项目通过面向对象的包装层统一地图、图层、数据源、空间要素、交互和控件的使用方式，降低业务项目直接组合 OpenLayers 原生 API 的成本。

当前版本为 `0.1.0-beta.1`，处于预发布阶段。代码采用 MIT 许可证，要求 Node.js 20 或更高版本，项目固定使用 pnpm 10.4.1。

项目主要目标：

- 提供类型安全、语义清晰且相对稳定的地图开发 API。
- 封装 OpenLayers 对象，同时保留必要的原生对象访问能力。
- 统一 Feature、Layer、Source、Interaction、Control 和事件的管理方式。
- 提供高德、天地图、XYZ、WMS、WMTS 等常见地图服务的快捷接入能力。
- 同时支持 ESM 与 CommonJS/UMD 消费，并输出 TypeScript 类型声明。
- 通过 API 基线、单元测试、浏览器测试和独立消费者测试保护发布质量。

## 2. 技术栈与运行环境

| 类别       | 选型                                                       |
| ---------- | ---------------------------------------------------------- |
| 开发语言   | TypeScript 5.9，严格模式                                   |
| 地图引擎   | OpenLayers 10.6.1                                          |
| 构建工具   | Vite 6.3.5 / Rollup                                        |
| 包管理器   | pnpm 10.4.1                                                |
| Node.js    | 20 及以上，CI 使用 Node.js 22                              |
| 单元测试   | Vitest 4 + happy-dom                                       |
| 浏览器测试 | Playwright / Chromium                                      |
| 文档站点   | VitePress 1.6                                              |
| 代码质量   | TypeScript、ESLint、Prettier、publint、Are the Types Wrong |
| 持续集成   | GitHub Actions                                             |

`ol` 被声明为 peer dependency。使用 ESM 构建时，OpenLayers 保持外部依赖；UMD/CJS 构建则将其打入产物，以满足独立加载和 `require` 场景。

## 3. 总体架构

项目采用“门面类 + 领域模块 + OpenLayers 适配层”的结构。顶层入口 `src/index.ts` 聚合所有公开模块，`Map` 是业务侧组织地图能力的主要门面。

```text
业务应用
   │
   ▼
公开入口 src/index.ts
   │
   ├── core         Map / Projection / Feature
   ├── layer        地图图层及图层组
   ├── source       矢量、影像、瓦片等数据源
   ├── interaction  绘制、修改、选择、测量等交互
   ├── control      缩放、全屏等控件
   ├── basic        坐标、范围、样式、弹窗等值对象
   └── util         投影、格式、事件、Token 等工具
          │
          ▼
OpenLayers 原生对象与 API
```

核心设计关系如下：

- `Map` 统一管理 View、Layer、LayerGroup、Interaction、Control 和 Popup。
- `VectorSource` 是矢量 Feature 的主要状态容器；`VectorLayer` 和交互模块通过统一解析逻辑取得 OMap Feature 包装对象。
- Layer 通常组合 Source；Interaction 可绑定地图或矢量图层，并通过事件对外反馈状态。
- OMap 类内部持有对应的 OpenLayers 实例，生命周期结束时应释放监听器、DOM、Overlay、定时器和缓存。
- 公共错误统一使用 `OMapError` 与 `OMapErrorCode` 表达。

## 4. 核心模块

### 4.1 Core

路径：`src/module/core/`

- `Map`：地图主门面，负责图层、交互、控件、弹窗、事件、视图、坐标换算和要素查询。
- `Projection`：投影定义和投影相关能力。
- `Feature`：空间要素体系，包括 `Point`、`LineString`、`Polygon`、`Circle`、`LinearRing` 以及对应的 Multi 类型。
- `Map` 内部进一步拆分为 controller、manager、adapter 和 query，分别承载视图控制、资源管理、事件适配及要素查询逻辑。

### 4.2 Layer

路径：`src/module/layer/`

以 `BaseLayer` 为基础，提供：

- 矢量类：`VectorLayer`、`VectorImageLayer`、`VectorTileLayer`、`HeatmapLayer`。
- 瓦片与服务类：`TileLayer`、`XYZLayer`、`WMSLayer`、`WMTSLayer`。
- 影像类：`ImageLayer`。
- 国内地图服务：`GaodeLayer`、`TdtLayer`。
- 组合管理：`LayerGroup`。

### 4.3 Source

路径：`src/module/source/`

数据源体系以 `Source` 为基础，覆盖：

- `VectorSource`、`ClusterSource`。
- `ImageSource`、`ImageStaticSource`、`ImageWMSSource`。
- `TileSource` 及其子类：XYZ、OSM、Bing Maps、ArcGIS REST、TileJSON、TileWMS、WMTS、VectorTile、OGC Vector Tile、UTFGrid、调试瓦片等。
- `TileImageSource`、`UrlTileSource` 位于 legacy 子目录，用于保留兼容关系。

### 4.4 Interaction

路径：`src/module/interaction/`

交互体系包含：

- 编辑类：`Draw`、`Modify`、`Select`、`Measure`、`InteractionExtent`。
- 导航类：`DragPan`、`DragZoom`、`DragBox`、`MouseWheelZoom`、`DoubleClickZoom`、`KeyboardZoom`。
- 状态同步：`Link`。

其中 `InteractionExtent` 是对 Extent 交互的公开命名，用于避免与基础值对象 `Extent` 冲突。

### 4.5 Control

路径：`src/module/control/`

提供基础控件抽象及 `Zoom`、`FullScreen` 控件，统一控件的添加、移除和生命周期管理。

### 4.6 Basic

路径：`src/module/basic/`

- `LngLat`：经纬度坐标值对象；保留 `Lnglat` 兼容别名。
- `Extent`：`[minX, minY, maxX, maxY]` 范围值对象。
- `Pixel`、`Size`：像素位置与尺寸值对象。
- `Color`、`Style`：颜色和 OpenLayers 样式包装。
- `Popup`：基于 Overlay 的地图弹窗。

### 4.7 Util

路径：`src/module/util/`

- `ProjUtil`：经纬度与投影坐标转换。
- `Format`：GeoJSON、WKT、KML 等格式读写与 Feature 转换。
- `Event`：事件订阅、单次订阅、触发与取消订阅。
- `MapToken`：天地图等服务 Token 的集中管理。
- `Disposable`：可释放资源的生命周期契约。

## 5. 目录结构

```text
openlayersMapKit/
├── .github/                 # CI、文档构建及发布演练工作流
├── docs/                    # VitePress 指南、示例和生成的 API 文档
├── examples/
│   ├── vite/                # TypeScript + Vite 消费示例
│   └── html/                # UMD/普通 HTML 消费示例
├── scripts/                 # 构建、API 审计、文档、发布与包验收脚本
├── src/
│   ├── index.ts             # npm 包公开入口
│   ├── error.ts             # 公共错误类型与错误码
│   ├── module/              # 七个领域模块
│   ├── source/              # OpenLayers 原始依赖的集中导出层
│   └── utils/               # 内部类型、转换、校验和消息工具
├── tests/
│   ├── browser/             # Playwright 浏览器行为测试
│   ├── consumer/            # ESM、CJS、类型消费者冒烟测试
│   ├── release/             # 发布规则测试
│   └── */                   # 按模块划分的 Vitest 测试
├── dist/                    # 构建产物，不应手工修改
├── artifacts/               # tarball 发布演练产物
├── package.json             # 包元数据、依赖和任务入口
├── vite.config.ts           # 双格式库构建配置
├── vitest.config.ts         # 单元测试及覆盖率门槛
└── playwright.config.ts     # Chromium 端到端测试配置
```

`coverage/`、`playwright-report/`、`test-results/`、`.tmp-api-audit/` 和 `.tmp-package-consumer/` 都是检查过程产生的临时或报告目录，不属于业务源码。

## 6. 公开入口与构建产物

源码入口为 `src/index.ts`，发布后只开放包根入口：

| 消费方式      | 文件                              |
| ------------- | --------------------------------- |
| ESM           | `dist/openlayers-map-kit.es.mjs`  |
| CommonJS/UMD  | `dist/openlayers-map-kit.umd.cjs` |
| CommonJS 类型 | `dist/index.d.ts`                 |
| ESM 类型      | `dist/index.d.mts`                |

构建命令会依次执行 ESM 构建、UMD 构建并同步声明文件：

```bash
pnpm build
```

项目另提供混淆构建：

```bash
pnpm build:obf
```

发布包只包含 `dist`、`README.md` 和 `LICENSE`。不要直接编辑 `dist`，应修改 `src` 后重新构建。

## 7. 本地开发与使用

### 7.1 安装依赖

```bash
pnpm install --frozen-lockfile
```

首次执行完整浏览器验收前安装 Chromium：

```bash
pnpm exec playwright install chromium
```

### 7.2 常用开发命令

```bash
pnpm dev                  # 启动 Vite 开发环境
pnpm build                # 构建 SDK
pnpm test                 # 运行 Vitest 单元测试
pnpm test:watch           # 监听模式运行测试
pnpm test:coverage        # 运行覆盖率检查
pnpm test:browser         # 运行 Playwright 浏览器测试
pnpm typecheck            # TypeScript 类型检查
pnpm lint                 # ESLint 检查，禁止 warning
pnpm format:check         # Prettier 格式检查
pnpm audit:api            # 对照基线检查公开导出名称
```

### 7.3 示例与文档

```bash
pnpm example:vite:dev     # 启动 Vite 示例
pnpm example:html:dev     # 启动普通 HTML/UMD 示例
pnpm example:build        # 构建全部示例
pnpm docs:dev             # 启动 VitePress 文档站
pnpm docs:api             # 重新生成逐类 API 文档
pnpm docs:build           # 构建文档站
pnpm docs:check           # 检查文档内部链接
```

### 7.4 最小使用示例

```ts
import 'ol/ol.css'
import { GaodeLayer, GaodeLayerType, Map } from 'openlayers-map-kit'

const map = new Map('map', {
  view: {
    center: [116.397428, 39.90923],
    zoom: 10
  }
})

map.addLayer(new GaodeLayer(GaodeLayerType.VEC))
```

页面必须提供具有明确宽高的地图容器：

```html
<div id="map" style="width: 100%; height: 480px"></div>
```

组件卸载、路由切换或地图重建时，应调用相应对象的 `remove()` 或 `dispose()`，避免遗留 DOM、Overlay 和事件监听器。

## 8. 测试与质量保障

项目当前包含 43 个测试/规格文件，测试分为四层：

1. Vitest 模块测试：覆盖基础值对象、地图门面、图层、数据源、交互、控件和工具。
2. Playwright 浏览器测试：验证真实浏览器中的地图绘制、修改、选择、测量、弹窗及销毁重建行为。
3. 消费者测试：分别验证 ESM、CJS、声明文件和 Vite 消费。
4. 发布测试：验证构建输出、包结构、版本规则和 tarball 安装。

全局覆盖率最低门槛为行覆盖率 67%、分支覆盖率 52%；Map、BaseLayer、Source、Control、Interaction、Popup 和 Event 等基础类还设置了更高的文件级门槛。

日常提交前的完整检查：

```bash
pnpm check:all
```

其中 `pnpm check` 串联类型、Lint、格式、API 基线、文档链接、覆盖率、发布规则、构建、示例、消费者、文档构建及包规范检查；`check:all` 在此基础上增加浏览器测试和 tarball 验收。tarball 验收需要 npm 网络访问。

## 9. 开发约定

- 模块通常以 `index.ts` 承载类实现，`type.ts` 承载公开类型，`handle.ts` 承载辅助逻辑。
- TypeScript 开启 `strict` 与 `noImplicitOverride`；真正重写父类成员时必须显式使用 `override`。
- 新代码避免 `any`，外部未知输入优先使用 `unknown` 配合类型守卫。
- 必填参数缺失或类型、范围、枚举非法时，统一抛出错误码为 `InvalidParameter` 的 `OMapError`。
- 可恢复的重复添加或删除不存在对象可警告并保持状态不变；查询无结果按契约返回 `undefined`、`null` 或空数组。
- 可变数组和对象不应直接暴露内部引用，默认通过公开 API 返回副本。
- 已发布的错误拼写不能直接删除，应提供正确名称，并将旧名称保留为指向同一实现的 `@deprecated` 别名。
- 公共 API 变更必须同步类型、测试、文档和 `CHANGELOG.md`，并通过 `scripts/public-api-baseline.json` 基线检查。
- 新增持有资源的对象必须提供可重复调用的 `remove()` 或 `dispose()`，并覆盖正常、边界及清理路径测试。

详细贡献要求见 `CONTRIBUTING.md`，模块级代码规范见 `.agents/skills/omap-module-standards/references/standards.md`。

## 10. 文档体系

文档站位于 `docs/`，主要包含：

- `docs/guide/`：入门、核心概念、架构、迁移、故障排查、版本和发布状态。
- `docs/examples/`：基础地图、矢量几何、瓦片服务、Vue、控件和生命周期示例。
- `docs/api/`：按模块和类生成的 API 参考。
- `docs/archive/`：历史规范及审计记录。

API 文档由 `scripts/gen-api-docs.mjs` 根据声明信息生成，侧边栏写入 `docs/.vitepress/api-sidebar.json`。生成文件应通过脚本维护，避免逐页手工修改后被覆盖。

## 11. 分支、CI 与发布

- `dev` 是日常开发分支；`main` 是稳定分支，通常通过 `dev → main` 的 PR 更新。
- 推送到 `main` 或 `dev`、以及任何 PR，都会触发 CI 的 `pnpm check:all`。
- Pages 和 npm 工作流均以手动演练为默认行为，不会自动部署或发布。
- npm 发布采用预发布到稳定版的 `alpha → beta → rc → stable` 路径。
- 真实发布需要匹配版本的 `v*` 标签、完整验收、仓库变量授权以及 npm Trusted Publishing 配置。
- 发布演练可使用 `pnpm release:dry-run`；该命令执行校验和打包，但不会发布 npm 包。

更完整的仓库与发布配置说明见 `REPOSITORY_SETUP.md`，版本变化见 `CHANGELOG.md`。

## 12. 当前维护重点

结合当前仓库结构，后续维护时应优先关注：

- 保持 OMap 包装层与 OpenLayers 10.x 行为及类型的兼容。
- 保护 `Map`、Feature resolver 和各类资源 manager 的生命周期一致性。
- 避免图层、数据源和交互模块各自重复构造同一原生 Feature 的包装对象。
- 修改公开导出前先运行 `pnpm audit:api`，不要为绕过非预期差异随意更新 API 基线。
- 源码变更后先重新构建，再运行浏览器测试，避免测试到旧的 `dist` 产物。
- 将根目录中的审计、计划类文档视为阶段性工程记录；面向使用者的稳定说明应沉淀到 README 和 VitePress 文档站。

---

本文依据当前仓库的源码入口、模块导出、构建配置、测试配置、脚本及 GitHub Actions 工作流整理。版本、命令或目录结构发生变化时，应同步更新本文。
