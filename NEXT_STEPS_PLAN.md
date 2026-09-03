# OMap 后续产品验收与发布计划

> 项目：`openlayersMapKit` / npm 包：`openlayers-map-kit`  
> 当前版本：`0.1.0-beta.1`（内部预发布版本）  
> 建立日期：2026-08-28  
> 依据：[REFACTOR_PLAN.md](./REFACTOR_PLAN.md) 当前执行结果及项目实测  
> 目标：将当前“核心链路基本可用”的内部 Beta，推进为经过逐类验收、真实浏览器验证、真实项目试用并可公开发布的 Beta。

## 1. 当前真实状态

项目已经完成主要工程化改造和核心架构重构：

- TypeScript、ESLint、Prettier、Vitest、覆盖率、构建、文档构建和包检查链路已经建立。
- Map 已拆分为 manager、controller、query 和 adapter。
- Layer、Source、Interaction、Control、Popup 已建立统一生命周期协议。
- VectorSource、Feature resolver、WeakMap registry 和 Geometry factory 主链路已经建立。
- Draw、Modify、Select、Measure 等核心交互具备回归测试。
- ESM、CJS/UMD 和 TypeScript 声明消费验证通过。
- `npm publish --dry-run` 已通过，尚未真实发布。
- 当前共有 22 个测试文件、107 个测试用例；全局行覆盖率为 73.96%。

当前仍属于内部 Beta，不能将全部公开类统一视为稳定 API：

- 不同模块和类的测试深度不一致。
- Playwright 真实浏览器矩阵尚未建立。
- properties 泛型、部分回调和未知输入边界尚未完全收敛。
- `defaultValue` 仍是 Map、Format、Layer、Interaction 之间的历史兼容类型边界。
- VitePress 已具备站点和导航骨架；模块级 API 页与 69 个逐类 API 页均已就位（逐类页由脚本从源码提取签名生成）。
- GitHub Pages、分支保护、npm Trusted Publishing 和真实项目试用尚未完成。

## 2. 执行原则

1. 不再进行无验收目标的大范围重构。
2. 先建立公开 API 验收清单，再按清单修复和补测。
3. 行为修改前先建立测试基线，行为正确后再收紧类型。
4. 覆盖率用于发现未验证的公开路径，不为提高数字测试无意义实现细节。
5. 公开类只有同时具备实现、类型、测试、文档和必要示例，才可标记为已验收。
6. 真实 npm 发布必须晚于真实浏览器验证和真实项目试用。
7. `defaultValue` 必须逐调用点迁移，禁止仅修改 helper 签名制造表面类型安全。

## 3. 第一阶段：校准原重构计划

目标：让 `REFACTOR_PLAN.md` 与当前项目事实一致，避免继续依赖失真的完成率。

- [x] 将“文档与 Vue 示例已完成”调整为“站点骨架完成，逐类内容待补”。
- [x] 将 2026-08-28 设置为最近校准日期。
- [x] 将本地 `npm publish --dry-run` 从组合发布任务中拆出并标记完成。
- [x] 合并 Playwright、覆盖率、类型收敛和发布配置等重复待办。
- [x] 区分公开 Beta 必需项、可延期项和外部权限项。
- [x] 重新计算独立任务数量和实际完成率。
- [x] 处理 `.agents` 对全仓 `format:check` 的影响，避免非 SDK 文件阻断质量门禁。

执行记录（2026-08-28）：

- `REFACTOR_PLAN.md` 总览更新为 **103/119（86.6%）**，并说明本轮校准合并 6 项重复待办、拆分覆盖率项、新增 Trusted Publishing 独立任务。
- 阶段 8 状态由“已完成”改为“站点骨架完成，逐类内容待补”，新增逐类 API 文档、稳定性标记、`remove`/`dispose` 说明与 XYZ/WMS/WMTS/Control/销毁示例共 4 项待办。
- 阶段 7 覆盖率待办拆分为：全局 70% 门槛（已完成）+ core/basic/util 85% 目标（待完成）；Playwright 待办细化为具体矩阵并接入 CI。
- 阶段 9 新增：本地 dry-run（已完成）、Trusted Publishing/OIDC、工作流演练、tarball 复核共 4 项。
- 批次 E 中与阶段 7/8/9 重复的 Playwright、覆盖率、文档、示例、发布配置改为交叉引用，不重复计数。
- 第 7 节门禁新增“所有根入口公开类进入验收矩阵”“逐类 API 文档”“tarball 复核”3 项，并将“API 文档/示例”由已完成改为未完成。
- `.agents` 已加入 `.prettierignore`，避免非 SDK 文件阻断全仓 `format:check`。

完成条件：原计划总览、阶段状态、待办和发布门禁互相一致。

## 4. 第二阶段：建立公开 API/类验收矩阵

目标：逐个确认公开类是否真正达到可用和可维护标准。

### 4.1 模块范围

| 模块        | 重点验收对象                                                                                                                        |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Core        | Map、Projection、Point、LineString、Polygon、MultiPoint、MultiLineString、MultiPolygon、Circle、LinearRing                          |
| Layer       | BaseLayer、VectorLayer、TileLayer、ImageLayer、WMSLayer、WMTSLayer、XYZLayer、TdtLayer、GaodeLayer、LayerGroup                      |
| Source      | Source、VectorSource、ImageSource、TileSource 及所有公开子类                                                                        |
| Interaction | Interaction、Draw、Modify、Select、Measure、DragBox、DragPan、DragZoom、Extent、Link、KeyboardZoom、MouseWheelZoom、DoubleClickZoom |
| Control     | Control、Zoom、FullScreen                                                                                                           |
| Basic       | LngLat/Lnglat、Pixel、Size、Extent、Color、Style、Popup                                                                             |
| Util        | Event、Format、MapToken、ProjUtil、LngLatUnit、错误类型及公开工具函数                                                               |

执行结果（2026-08-28，已完成）：

产出 [API_ACCEPTANCE_MATRIX.md](./API_ACCEPTANCE_MATRIX.md)，并新增可复跑的审计脚本 `scripts/audit-public-api.mjs`。

### 4.2 每个公开类的验收字段

- [x] 可从约定的公开入口导入。
- [x] 构造参数、默认值和可选值类型准确。
- [x] 正常功能具有自动化测试。
- [x] 无效输入和边界条件具有自动化测试。
- [x] 生命周期和资源释放经过验证。
- [x] loader、filter、style 和事件 payload 类型准确。
- [x] OpenLayers 原生对象与 OMap wrapper 的转换规则明确。
- [x] 至少有一份最小使用文档。
- [x] 核心或复杂类具有可运行示例。
- [x] 需要 DOM 或交互环境的能力经过真实浏览器验证。

以上 10 个字段已固化为矩阵的列，逐类填写，状态使用 `Y` / `P` / `N` / `-`。

### 4.3 稳定性分级

每个公开类必须标记为以下一种状态：

- [x] `stable-beta`：Beta 期间承诺修复缺陷，避免无迁移说明的破坏性变更。
- [x] `experimental`：允许根据试用反馈调整 API，文档必须明确标识。
- [x] `compatibility`：仅为历史兼容保留，不推荐新项目使用。
- [x] `internal`：不应从公共入口导出。

分级结果：58 个公开类全部完成标记；另识别出 29 个内部 helper 导出（16 个 `handleGet*Params` helper 函数 + 13 个 `DEFAULT_*_PARAMS` 常量，因新增 `ImageStaticSource` 较最初 27 多 2 个），均已显式标记 `@internal` 并从公开 API 审计中排除；`TILE_SOURCE_EVENT_TYPES` 待确认是否为公共契约（暂留公共）。这些符号原本即经 `export type *` 仅类型透传，未进入公共入口（审计脚本 `getExportsOfModule` 对 `export type *` 的误报已修正）。

### 4.4 本阶段实测发现

1. 根入口共 **145 个公开导出**：58 class、15 function、23 const、2 interface、47 type。
2. **27 个公开类完全未被任何测试引用**：`DataTileSource`、`DoubleClickZoom`、`DragZoom`、`FullScreen`、`ImageLayer`、`ImageSource`、`ImageTileSource`、`InteractionExtent`、`KeyboardZoom`、`Link`、`MouseWheelZoom`、`OGCVectorTileSource`、`Projection`、`ProjUtil`、`Source`、`TdtLayer`、`TileDebugSource`、`TileImageSource`、`TileLayer`、`UrlTileSource`、`UTFGridSource`、`VectorTileSource`、`WMSLayer`、`WMTSLayer`、`WMTSSource`、`XYZLayer`、`XYZSource`。
3. 计划 4.1 中的 `BaseLayer`、`Interaction`、`Control`、`Event`、`LngLatUnit` 实际**未从根入口导出**，属内部基类，不单独验收，能力随子类覆盖。
4. 全部公开类的“浏览器验证”字段均为空，需第三阶段 Playwright 补齐。

完成条件：所有根入口公开导出均进入验收矩阵，不存在“已经导出但成熟度未知”的类。

## 5. 第三阶段：建立 Playwright 真实浏览器矩阵

目标：验证 happy-dom 无法覆盖的 OpenLayers 渲染、指针事件和浏览器生命周期。

- [ ] 安装并配置 Playwright，使用稳定、可重复的本地地图资源，避免依赖生产密钥。
- [ ] 验证地图创建、目标容器尺寸和基础渲染。
- [ ] 验证 Vector Feature 显示和坐标定位。
- [ ] 验证 Draw 完成、取消和清理。
- [ ] 验证 Modify 修改及状态恢复。
- [ ] 验证 Select 选择、取消和事件 payload。
- [ ] 验证 Measure 测量结果、Overlay 和清理。
- [ ] 验证 Popup 定位、更新、移除和重新挂载。
- [ ] 验证 Map dispose 后同一容器重新创建地图。
- [ ] 将 Playwright 接入 CI，并保留失败截图、trace 或视频。

完成条件：核心地图和交互路径在真实 Chromium 中稳定通过，销毁重建后无 DOM、Overlay、listener 或 timer 残留。

## 6. 第四阶段：按验收矩阵补测试与缺陷

目标：优先验证公开行为，补齐核心模块覆盖盲区。

建议顺序：

1. Map、ViewController 和各 manager。
2. Feature factory、resolver 和直接构造边界。
3. VectorSource、VectorLayer 和 LayerGroup。
4. Popup、Control 和普通 Interaction。
5. Format、Projection 和公开工具。
6. Tile、Image、XYZ、WMS、WMTS、Tdt、Gaode 等 Source/Layer。

具体任务：

- [ ] 补齐坐标转换和全部 Geometry 边界测试。
- [ ] 补齐 Map manager/controller 未覆盖的查询、失败和清理路径。
- [ ] 补齐 Popup、Zoom、FullScreen 的完整生命周期测试。
- [ ] 补齐普通 Interaction 的启用、事件、移除和销毁测试。
- [ ] 补齐常用 Tile/Image/WMS/WMTS/XYZ Source 和 Layer 测试。
- [ ] 补齐 Format 的 KML/WKT/GeoJSON 错误输入和选项矩阵。
- [ ] 将 core、basic、util 的有效公开路径覆盖率提升至约定目标。
- [ ] 根据测试发现修复真实行为缺陷，并记录兼容性影响。

完成条件：公开 Beta 核心类均具备正常、边界和资源清理测试；覆盖率门禁反映真实公开 API 风险。

## 7. 第五阶段：完成类型系统收敛

目标：在行为受到测试保护后，消除剩余历史类型边界。

- [x] 为 Feature、Source、Layer、Interaction、Control 和 Popup 建立可扩展 properties 泛型（Map 因 `getProperties` 返回 OL 完整属性包，刻意跳过以避免表面类型安全）。
- [x] 精确声明 loader、filter、style 和事件回调（`OMapStyleFunction`/`OMapStyleLike`、各 Filter 回调、`OMapEventCallBack` 已落地）。
- [x] 补齐 typed event map（Select/Draw/Modify/Extent/DragBox/Popup 已用具体事件映射）。
- [x] 外部未知输入统一使用 `unknown`，通过 `isXxx` type guard 收窄（`isBoolean` 等已为类型谓词）。
- [x] 逐模块迁移 `defaultValue` 调用点：Map → Format → Layer → Interaction → 其他模块（仅注释残留，无实际调用）。
- [x] 明确直接 `new GeometryWrapper(nativeFeature)` 与 resolver/registry 的规则：FeatureQuery.resolveFeature 与 Select.getTargetFeature 改为统一经 `createBaseFeatureByOlFeature` / `createBaseFeatureByOlRenderFeature`，BasicFeature 构造接收原生 Feature 的分支标注 `@internal`，消除绕过 resolver 的重复直接构造。
- [x] 统一公开错误类型、错误码和无效输入策略（`extractRGBValues`/`extractRGBAValues` 已改用 `OMapError`+`OMapErrorCode`；`ColorhexToRGB` 静默回退 `[0,0,0]` 属有意的 best-effort 约定，测试已锁定）。
- [ ] 使用消费者类型测试验证泛型推导和错误调用（依赖测试环境，用户暂缓）。

完成条件：公共声明不暴露无意义的 `any` 或宽泛回调；类型行为与运行时校验一致。

### 7.1 本阶段实测发现（2026-08-29）

- `src` 中 `any` 已基本清零（仅文档注释命中），核心路径 `tsc --noEmit` 与 `eslint`（0 warning）通过。
- `defaultValue` 已全部迁移为 `a ?? b` 或具体默认值；最后一处定义已从 `src/utils/define.ts` 删除。
- 错误抛出统一收敛到 `error_`（抛 `OMapError`）或显式 `throw new OMapError(...)`；不再存在裸 `throw new Error`。
- Popup `events` 显式使用 `OMapPopupEventMap`，事件 payload 类型贯通到 `getEventById`/`get`/`listenerCount`。
- 阻塞项：Playwright 与 happy-dom 测试环境未安装（`node_modules/vitest/dist` 缺失），`pnpm test` 当前无法启动；用户已决定暂缓测试/发布相关任务。

剩余本地可继续项：第四阶段补测试、第八阶段文档与发布（依赖外部/测试环境）。直接 `new GeometryWrapper` 绕过 resolver 的收紧已完成（见 7.2）。

## 8. 第六阶段：完善 VitePress 产品文档

目标：将当前站点骨架扩展为用户可以独立完成接入和排障的 SDK 文档。

### 8.1 文档结构

- [x] 安装、快速开始和最小地图（`guide/getting-started.md`）。
- [x] 核心概念：Map、View、Feature、Layer、Source、Interaction、Control、Popup（`guide/core-concepts.md`）。
- [x] 为公开验收矩阵中的每个主要类建立独立 API 页面：69 个逐类页面已生成于 `docs/api/<group>/`（Core 11、Layer 12、Source 15、Interaction 15、Basic 9、Control 3、Util 5，含 `MapToken` 手工页），签名由 `scripts/gen-api-docs.mjs` 从 `src` 自动提取。
- [x] 记录构造参数、默认值、属性、方法、返回值、事件和错误（6 个 API 页均已包含）。
- [x] 记录 remove、dispose、可重新挂载和永久释放的区别（`api/index.md` 与 `core.md` 生命周期章节）。
- [x] 标记 stable-beta、experimental、compatibility 和 internal 状态（各 API 页页首与 `api/index.md` 分级表）。
- [x] 补充迁移、故障排查、版本策略和发布状态（`guide/` 下各自独立页面）。

### 8.2 示例结构

- [x] 基础地图（`basic-map.md`）。
- [x] Vector 与全部常用 Geometry（`vector-geometry.md`，覆盖 Point / LineString / Polygon / Multi* / Circle）。
- [x] XYZ、WMS 和 WMTS 图层（`tile-layers.md`）。
- [x] Draw、Modify、Select、Measure、Popup（`vue-map-toolkit.md` 综合示例）。
- [x] Control（`controls.md`）。
- [x] 地图销毁和路由切换（`lifecycle.md`）。

Vue 示例继续遵守以下规则：

- 使用 Vue 3、TypeScript、Composition API 和 `<script setup>`。
- 使用 `useTemplateRef()` 获取地图容器。
- 使用 `shallowRef()` 保存 OpenLayers/OMap class 实例。
- 仅在挂载阶段创建地图，在卸载阶段调用 `dispose()`。
- 示例不得包含生产地图服务密钥。

完成条件：不了解源码的使用者可以仅通过文档完成安装、创建地图、添加数据、使用核心交互并正确释放资源。

## 9. 第七阶段：真实消费项目试用

目标：验证包在真实业务构建器、页面生命周期和地图服务中的兼容性。

- [ ] 选择至少一个真实业务项目。
- [ ] 通过打包产物或预发布版本安装 `openlayers-map-kit`。
- [ ] 完成基础地图、业务图层、Feature 和至少一种交互接入。
- [ ] 验证页面切换、重复挂载和销毁。
- [ ] 验证目标构建器的 ESM、样式、类型声明和产物体积。
- [ ] 记录安装、类型、运行时、服务兼容性和 API 易用性反馈。
- [ ] 将发现的问题分为发布阻塞、Beta 后修复和长期改进。
- [ ] 将兼容性结论写入文档和 CHANGELOG。

完成条件：至少一个真实项目完成试用，所有发布阻塞问题均已修复或明确规避方案。

## 10. 第八阶段：完成公开 Beta 发布配置

目标：在不使用长期 npm token 的前提下安全发布并部署文档。

- [ ] 将 GitHub Pages 发布源设置为 GitHub Actions。
- [ ] 配置 main 分支保护和必需 CI 检查。
- [ ] 在 npm 配置 Trusted Publishing/OIDC。
- [ ] 配置 GitHub `npm` environment 及必要审批策略。
- [ ] 确认 `NPM_PUBLISH_ENABLED` 默认关闭，发布时显式开启。
- [x] 完成本地 `npm publish --dry-run`。
- [ ] 在 GitHub Actions 中完成一次禁用真实发布的工作流演练。
- [ ] 构建并核对最终 npm tarball 内容、体积和声明文件。
- [ ] 更新 CHANGELOG 和发布说明。
- [ ] 创建 GitHub prerelease 并发布 `0.1.0-beta.1`。
- [ ] 验证 npm 安装、文档站和 Release 页面。

完成条件：CI、Pages 和 Trusted Publishing 全部可用；公开 Beta 可安装、可查阅、可回滚且发布过程不依赖长期 token。

## 11. 推荐执行顺序

1. 校准 `REFACTOR_PLAN.md`。
2. 建立公开 API/类验收矩阵。
3. 建立 Playwright 真实浏览器矩阵。
4. 按验收矩阵补测试并修复缺陷。
5. 收紧 properties、事件、回调和未知输入类型。
6. 完善 VitePress API 文档与独立示例。
7. 在真实业务项目中试用。
8. 配置 GitHub/npm 并发布公开 Beta。

## 12. 公开 Beta 最终门禁

- [ ] 所有根入口公开类已进入验收矩阵并具有稳定性标记。
- [ ] 核心公开类具备正常、边界和资源清理测试。
- [ ] Playwright 核心矩阵通过。
- [ ] ESM、CJS/UMD 和 TypeScript 消费测试通过。
- [ ] 类型、Lint、格式、覆盖率、构建、文档和包检查全部通过。
- [ ] 核心 API 文档和示例可独立指导用户接入（进展：69 个逐类页 + 6 个模块页 + 6 篇示例已就位；**仍待** `docs:build` 实跑与验收矩阵“文档”列核对）。
- [ ] 至少一个真实业务项目完成试用。
- [ ] GitHub Pages、分支保护和 Trusted Publishing 已配置。
- [ ] CHANGELOG、迁移说明和发布说明已更新。
- [ ] `0.1.0-beta.1` 最终 tarball 已复核。

## 13. 本阶段完成定义

任何公开类只有同时满足以下条件，才能在验收矩阵中标记完成：

1. 公开导出路径明确且消费者可正常导入。
2. 类型签名与运行时行为一致。
3. 正常路径、边界条件和清理路径均有自动化测试。
4. 需要浏览器的行为经过 Playwright 验证。
5. 文档包含用途、参数、方法、事件、错误和生命周期。
6. 至少提供一个最小示例；复杂类提供可运行示例。
7. 不新增顶层反向依赖、循环依赖或无意义宽泛类型。
8. `pnpm check` 和对应消费者测试通过。
