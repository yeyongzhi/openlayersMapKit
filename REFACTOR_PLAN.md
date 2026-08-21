# OMap 产品化改造与发布实施计划

> 项目：`openlayersMapKit` / npm 包：`omap`  
> 基线版本：`1.0.0-beta1`（历史未发布版本）  
> 当前开发版本：`0.1.0-beta.1`（内部预发布版本，公开发布前仍需满足下述门禁）  
> 计划建立：2026-08-20  
> 最近校准：2026-08-21  
> 目标：将旧版 OpenLayers 封装整理成可测试、可维护、可发布的 TypeScript SDK，并通过 GitHub Actions 自动部署 VitePress 文档站。

## 1. 总体原则

1. 在测试保护建立前，不进行大范围行为重写。
2. `VectorSource` 是 Vector Feature 的唯一状态源，`VectorLayer` 只提供门面。
3. `Map` 保持对外门面稳定，复杂职责逐步下沉到内部 manager/helper。
4. 内部模块不得反向依赖顶层 `src/index.ts`，避免循环依赖。
5. 新增或修改的公共能力必须同时具备类型、测试、文档、示例和导出。
6. 第一个公开版本从 `0.x` 预发布开始，不直接承诺 `1.0.0` 稳定性。
7. 文档站使用 Vue 3、TypeScript、Composition API 与 VitePress；OpenLayers/OMap 实例在 Vue 中使用 `shallowRef` 保存。

## 2. 建立计划时的基线与当前风险

以下盘点记录的是计划建立时的基线，已完成项以阶段任务勾选状态为准：

- 源码约 199 个文件，其中 TypeScript 文件约 192 个。
- 已具备 Map、Feature、Layer、Source、Interaction、Control、Popup、Format 等主要骨架。
- `src/index.ts` 未导出 source 模块，部分已实现图层仍未公开导出。
- `package.json.main` 指向不存在的根目录 `index.js`，且缺少标准 `exports`。
- Vite 构建不会天然保证声明文件完整生成，当前声明产物缺少可靠构建链路。
- 没有可执行的自动化测试、Lint、格式检查和独立 TypeScript 类型检查。
- `Map/index.ts` 超过 1500 行，职责过多。
- 公共 API 和事件中存在大量 `any`、`Function` 和宽泛属性类型。
- Feature 几何类存在重复构造、校验和坐标转换逻辑。
- Map、Popup、Source 等对象的资源释放协议不统一。
- UMD 对 OpenLayers 子路径的全局变量映射尚未经过自动化浏览器验证。

### 当前执行快照

- 工程质量、npm 包结构、声明文件、CI/Pages/Release 工作流骨架已经建立。
- 当前有 8 个测试文件、30 个测试用例，覆盖 basic 值对象、Event、Feature resolver、VectorSource、Map 生命周期以及 Draw/Modify/Select 关键路径。
- `pnpm check` 当前可以通过；ESLint 仍有约 200 个存量 warning，历史文件尚未全部迁移到 Prettier。
- Vector/Interaction 主链路正在推进；类型系统、Feature factory、Map 拆分、浏览器测试和完整文档仍是后续重点。
- 当前版本仅用于内部联调，不满足公开 Beta 或稳定版发布条件。

## 3. 阶段计划

### 阶段 0：冻结基线与规范化

状态：基础规范已完成，维护文档待补

任务：

- [x] 盘点源码结构、公共入口、构建配置和高风险模块。
- [x] 建立本实施计划。
- [x] 增加 `.editorconfig`、Prettier、ESLint 和统一 UTF-8/LF 规范。
- [ ] 分批迁移历史文件格式后，将 `format:check` 接入 `pnpm check` 和 CI；当前仍有大量旧文件不符合 Prettier。
- [ ] 增加 `CHANGELOG.md`、贡献说明和版本策略。
- [ ] 将旧审计内容迁入维护文档体系，并保留历史上下文。

验收：完成历史格式迁移后，全仓可通过格式检查，且迁移过程不存在无意义的大面积行尾 diff。

### 阶段 1：工程质量门禁

状态：已建立基线，持续扩充测试

任务：

- [x] 直接安装并锁定 `typescript`。
- [x] 引入 Vitest 和覆盖率工具。
- [x] 增加 `typecheck`、`lint`、`format:check`、`test`、`test:coverage`、`check` 脚本。
- [x] 创建测试配置与测试目录。
- [x] 为 basic、Event、VectorSource、Map 生命周期和 Draw/Modify/Select 建立首批单元测试；Feature factory、Format 与浏览器测试待补。
- [x] CI 中使用 `pnpm install --frozen-lockfile`。
- [ ] 分批清理历史未使用导入与参数；当前 ESLint 无错误，但仍有存量 warning。

验收：全新环境执行 `pnpm check` 可以复现，并作为 PR 必需检查。

### 阶段 2：包结构与公共 API

状态：本轮完成基础入口，subpath exports 待后续评审

任务：

- [x] 修复 source 模块缺失导出。
- [x] 审核并公开 LayerGroup、WMSLayer、WMTSLayer、ImageLayer。
- [ ] 建立稳定的根入口和可选 subpath exports。
- [x] 配置可靠的 `.d.ts` 生成。
- [x] 补齐 `repository`、`homepage`、`bugs`、`engines`、`packageManager`、`publishConfig`。
- [x] 使用 `publint` 和 Are The Types Wrong 验证 npm 包；暂时记录并忽略双入口共享声明的 `false-cjs` 提示。
- [x] 使用 `pnpm pack` 检查最终文件，确认发布包仅包含 `dist`、`README.md`、`LICENSE` 与包元数据。
- [x] 移除内部模块对 `src/index.ts` 的反向依赖。

验收：临时消费项目可分别使用根入口与允许的子路径入口，IDE 类型提示完整。

### 阶段 3：类型系统收敛

状态：尚未系统执行，已在事件和回调处局部收敛

任务：

- [ ] 将可确定的 `any` 替换为 OpenLayers 具体类型。
- [ ] 外部未知输入使用 `unknown` 并通过 type guard 收窄。
- [ ] Feature/Source/Layer properties 改为泛型属性模型。
- [ ] 建立 typed event map，精确推导所有回调 payload。
- [ ] 用精确函数签名替换 `Function`。
- [ ] 坐标与范围使用固定 tuple 类型。
- [ ] 统一公开错误类型和参数错误策略。

验收：公共声明文件不再暴露无意义的 `any`，严格类型检查通过。

### 阶段 4：Feature 与 basic 重构

状态：已完成 basic 值对象首轮改造和 Feature resolver/registry，Geometry 初始化去重待执行

任务：

- [ ] 抽取 `normalizeCoordinates`。
- [ ] 抽取 `initByCoordinates`、`initByOlFeature` 或等价 factory。
- [x] 建立原生 Geometry 类型到 OMap Feature wrapper 构造器的统一映射，并使用 WeakMap registry 复用解析结果。
- [x] 保证同一原生 Feature 经 factory、Format、Style 回调及 VectorSource 等受支持入口解析时对应稳定 OMap wrapper。
- [ ] 收紧直接重复 `new GeometryWrapper(nativeFeature)` 的使用方式；当前 registry 不覆盖绕过 resolver 的重复直接构造。
- [x] 为 Lnglat、Pixel、Size、Extent、Color 补齐首轮 `from/clone/equals/toArray/toString`；命名兼容和不可变策略待继续收敛。
- [ ] 决定值对象是否不可变，并统一 setter 语义。
- [ ] 兼容性处理 `Lnglat` → `LngLat` 等历史命名。

验收：新增 Geometry wrapper 不再复制大量初始化代码；基础值对象 API 一致。

### 阶段 5：Map 拆分与生命周期

状态：进行中，生命周期基础已建立，Map 拆分待执行

任务：

- [ ] 拆出 Layer、Interaction、Control、Popup manager。
- [ ] 拆出 View controller、Feature query 和 Event adapter。
- [ ] `Map` 保留轻量门面和组合职责。
- [ ] 建立统一 `Disposable` 协议。
- [ ] 明确 `remove`（解除挂载）与 `dispose`（永久释放）的差别。
- [ ] Map、Layer、Source、Interaction、Control、Popup、Event 全部支持可靠清理。
- [x] 为 `Map` 增加幂等 `dispose()`，释放已挂载资源、事件与原生地图实例。
- [x] 默认 Interaction 改为按 Map 创建，避免多个地图共享交互实例与状态。

验收：反复创建/销毁地图不残留 DOM、Overlay、监听器和缓存；Map 主文件显著缩小。

### 阶段 6：Vector 状态主链路

状态：进行中，核心同步与 Draw/Modify/Select 首轮改造已完成

任务：

- [x] 测试 OMap 与原生 source 的 add/remove/clear 同步。
- [x] 修复 Feature ID 与原生 Feature 不同步导致 `getFeatureById` 查询失败的问题。
- [x] 测试 Draw 完成后 `drawEnd` 返回稳定 wrapper，并修复 `drawend` 回调被跳过的问题。
- [x] 测试 Modify 快照恢复并为 undo/redo 预留 command 模型；修复 ID 为 `0` 和撤销步数越界问题。
- [x] 测试 Select 的 style/filter/select 事件，并修复显式 layers 未挂载 Map 时 filter 收到空 layer 的问题。
- [x] Select 增加主动选择、取消、清空和原生 collection 访问。
- [x] Draw 明确 abort 仅中止当前草图并保留已完成 Feature，另提供 `clearFeatures()` 显式清空。
- [x] Measure 统一清理 tooltip、overlay、geometry/pointer listener 与延迟完成 timer，移除重复 Overlay 删除。
- [ ] 使用 DOM/浏览器测试验证 Measure 重复创建、销毁和重新挂载无残留。
- [x] Source、Format 与样式/交互回调中的原生 Feature 统一经过 resolver；后续新增入口不得自行扫描 Geometry 类型。
- [x] Interaction 增加可重复调用的 `remove()`/`dispose()`，统一释放公开事件与内部 OpenLayers listener。

验收：所有入口观察到同一 Feature wrapper，缓存和交互状态无悬挂引用。

### 阶段 7：测试矩阵

状态：已建立 Vitest 基线，DOM、浏览器和包消费矩阵待执行

任务：

- [x] Vitest 基线：basic 值对象、Event、VectorSource、Map 生命周期、Draw、Modify、Select。
- [ ] Vitest 扩展：坐标转换、Format、Feature factory、全部 Geometry、Measure、Popup、Control。
- [ ] DOM 集成：Map、Layer、Popup、Control、Interaction 生命周期。
- [ ] Playwright：真实浏览器地图、绘制、修改、选择、弹窗和销毁重建。
- [ ] UMD/ESM smoke test。
- [ ] 初始全局行覆盖率目标 70%，core/basic/util 目标 85%。

验收：核心路径具备回归保护，浏览器行为和包消费方式均经过验证。

### 阶段 8：VitePress 文档与示例平台

状态：已完成站点骨架，API 文档与示例待补

任务：

- [x] 创建 VitePress 站点、主题和导航。
- [x] 编写安装、快速开始、核心概念和发布状态指南；迁移和贡献指南待补。
- [ ] 生成 core/layer/source/interaction/control/basic/util API 文档。
- [ ] 创建基础地图、Vector、Draw、Modify、Measure、Popup 示例。
- [ ] 示例仅在浏览器挂载阶段创建 Map，并在卸载阶段 dispose。
- [ ] OpenLayers/OMap class 实例使用 Vue `shallowRef`，不进行深层代理。
- [x] GitHub Pages 子路径通过 VitePress `base` 配置。
- [x] 当前文档不包含生产地图服务密钥。

验收：`pnpm docs:build` 通过，核心 API 可检索，示例可在 Pages 中运行。

### 阶段 9：GitHub Actions 与发布

状态：工作流文件已完成，GitHub 仓库设置待推送后启用

任务：

- [x] `ci.yml`：Lint、类型、测试、库构建、文档构建、包验证。
- [x] `pages.yml`：构建并部署 `docs/.vitepress/dist`。
- [x] `release.yml`：GitHub Release 发布或手动触发，预留 npm Trusted Publishing/OIDC；默认由仓库变量关闭真实发布。
- [ ] 配置 GitHub Pages 发布源为 GitHub Actions。
- [ ] 配置分支保护和必需检查。
- [ ] 建立 alpha → beta → rc → stable 发布节奏。

验收：main 自动更新文档站；发布任务必须经过完整检查且不依赖长期 npm token。

## 4. 推荐版本节奏

1. `0.1.0-alpha.1`：工程链路和包结构可用（当前改造分支已跨过该内部里程碑，未公开发布）。
2. `0.1.0-beta.1`：当前内部预发布版本；完成核心 API、测试和文档后方可公开发布。
3. `0.1.0-rc.1`：真实项目试用后的候选版。
4. `0.1.0`：首个公开稳定版本。
5. `1.0.0`：API 经真实业务验证并承诺长期兼容后发布。

## 5. 后续执行顺序

后续按以下批次推进。每个批次必须先补测试或建立可验证基线，再修改行为；前一批次达到验收条件后再进入下一批次。

### 批次 A：完成 Vector/Interaction 主链路

目标：完成当前已经启动的阶段 6，形成稳定的 Feature 状态入口和可靠的交互清理协议。

- [x] 测试 Select 的 style、filter 和 select/deselect 事件 payload。
- [x] 明确 Draw `abort` 后草图、已完成 Feature 和内部图层的保留/清理规则。
- [x] 清理 Measure 的 tooltip、Overlay、geometry/pointer listener 和延迟 timer。
- [ ] 在 DOM/Playwright 环境验证 Measure 重复创建、销毁和重新挂载。
- [x] 抽取统一 Feature resolver/WeakMap registry，现有 Source、Format 与样式/交互回调统一复用该入口。
- [x] 验证 factory 与多个 Source 对同一个原生 Feature 返回同一个 wrapper；Layer、Draw、Modify、Select 当前复用 Source/resolver 链路。
- [ ] 增加 Layer、Draw、Modify、Select 跨入口组合测试，防止后续实现绕过 resolver。

完成条件：阶段 6 剩余任务全部勾选，交互销毁后无 listener、Overlay、临时 Feature 或缓存悬挂。

### 批次 B：Feature factory 与类型基础

目标：先消除 Geometry wrapper 重复初始化，再扩大类型收敛范围，避免在重复代码上反复修类型。

- [x] 设计并测试原生 Feature → OMap Feature wrapper WeakMap registry/factory。
- [ ] 抽取坐标归一化、原生 Feature 初始化和 OMap Feature 初始化逻辑。
- [ ] 为 Point、LineString、Polygon、Multi*、Circle、LinearRing 建立参数化测试矩阵。
- [ ] 确定值对象可变性、clone 和 setter 语义。
- [ ] 确定 `Lnglat` → `LngLat` 的兼容别名与废弃周期。
- [ ] 将 factory、Source、Layer 和 Interaction 的公开回调改为 typed event map。

完成条件：阶段 4 的初始化重复明显减少，所有 Geometry 均通过相同 factory 测试，公共声明不因 factory 引入新的 `any`。

### 批次 C：Map 拆分与完整生命周期

目标：在已有 `Map.dispose()` 基础上缩小 Map 门面，完成所有挂载对象的 remove/dispose 语义。

- [ ] 先拆出 Layer、Interaction、Control、Popup manager。
- [ ] 再拆出 View controller、Feature query 和 Event adapter。
- [ ] 为 Layer、Source、Control、Popup 建立统一 `Disposable` 接口或等价协议。
- [ ] 增加 Map/Popup/Control/Interaction 的 DOM 生命周期集成测试。
- [ ] 验证重复创建、销毁和重新挂载不会残留 DOM、Overlay、listener 或缓存。

完成条件：Map 主文件显著缩小，对外 API 保持兼容，生命周期集成测试通过。

### 批次 D：类型系统和历史质量债

目标：收紧公共声明，同时分批处理格式和 Lint，不制造一次性大面积 diff。

- [ ] 按 basic → core/Feature → source/layer → interaction → Map 的顺序替换无意义 `any` 和 `Function`。
- [ ] 为 properties、事件和 loader/filter/style 回调建立泛型或精确签名。
- [ ] 外部未知输入统一使用 `unknown` 与 type guard。
- [ ] 固定 Coordinate、Extent、Pixel、Size tuple 类型。
- [ ] 每次只迁移一个模块的 Prettier 和未使用导入，避免格式修改掩盖行为 diff。
- [ ] 全仓格式迁移完成后，将 `format:check` 接入 `pnpm check` 和 CI。

完成条件：公开声明不暴露无意义 `any`，ESLint warning 清零或建立明确豁免，`format:check` 成为必需门禁。

### 批次 E：消费验证、文档与发布

目标：以真实消费者视角完成公开 Beta 前验收。

- [ ] 建立 ESM、CJS/UMD 和 TypeScript 临时消费项目 smoke test。
- [ ] 使用 Playwright 覆盖地图、绘制、修改、选择、量测、Popup 和销毁重建。
- [ ] 达到约定覆盖率阈值并将覆盖率检查接入 CI。
- [ ] 补齐 core/layer/source/interaction/control/basic/util API 文档。
- [ ] 补齐 Vue 3 基础地图、Vector、Draw、Modify、Measure、Select、Popup 示例。
- [ ] 补齐迁移、贡献、故障排查和发布说明。
- [ ] 配置 GitHub Pages、分支保护、npm Trusted Publishing，并完成一次禁用真实发布的演练。

完成条件：公开 Beta 门禁全部通过，文档示例可运行，包可被目标模块系统正确消费。

## 6. 单项任务完成定义

任何公共 API 新增或行为修改，只有同时满足以下条件才可勾选完成：

1. 实现已合入正确模块，没有新增顶层反向依赖或不必要循环依赖。
2. TypeScript 类型与运行时校验一致，公共签名不使用无意义的 `any`/`Function`。
3. 至少包含正常路径、边界条件和资源清理测试。
4. `pnpm typecheck`、`pnpm lint`、`pnpm test`、`pnpm build`、`pnpm docs:build`、`pnpm check:package` 通过。
5. 对外行为、生命周期、兼容性或迁移影响已写入文档和示例。
6. 新增资源在 remove/dispose 后不存在 DOM、Overlay、listener、timer 或缓存悬挂。

## 7. 公开 Beta 发布门禁

`0.1.0-beta.1` 对外发布前至少满足：

- [ ] 阶段 3～6 的公开 API 和核心状态链路达到各自验收标准。
- [ ] DOM 集成、Playwright 和 ESM/CJS/UMD smoke test 通过。
- [ ] 覆盖率达到约定阈值，CI 无错误且不存在未说明的 warning。
- [ ] API 文档、Vue 示例、迁移指南、贡献指南和 CHANGELOG 可用。
- [ ] GitHub Pages、分支保护、Trusted Publishing 和发布演练完成。
- [ ] 至少一个真实消费项目完成试用并记录兼容性反馈。
