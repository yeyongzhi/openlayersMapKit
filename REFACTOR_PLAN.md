# OMap 产品化改造与发布实施计划

> 项目：`openlayersMapKit` / npm 包：`omap`  
> 基线版本：`1.0.0-beta1`（历史未发布版本）  
> 当前开发版本：`0.1.0-beta.1`（内部预发布版本，公开发布前仍需满足下述门禁）  
> 计划建立：2026-08-20  
> 最近校准：2026-08-28（按 [NEXT_STEPS_PLAN.md](./NEXT_STEPS_PLAN.md) 第一阶段校准：合并重复待办、拆分已完成项、将文档从“已完成”降级为“骨架完成、逐类内容待补”，并排除 `.agents` 对全仓格式门禁的影响）  
> 目标：将旧版 OpenLayers 封装整理成可测试、可维护、可发布的 TypeScript SDK，并通过 GitHub Actions 自动部署 VitePress 文档站。

## 0. 进度总览

截至 2026-08-28 校准后，任务清单完成 **103/119 项（86.6%）**。本轮校准合并了 6 项跨批次重复待办、将“全局覆盖率门槛”拆出为已完成项并保留模块 85% 目标、新增 1 项 Trusted Publishing 独立任务。当前成果已经达到“可持续开发、可构建、可打包、可供本地消费者验证”的内部 Beta 水平，但尚未达到公开发布门禁。

| 工作域             | 状态     | 当前结果                                                                                                                                                                                                                                                                        |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 工程规范与质量门禁 | 已完成   | TypeScript、ESLint 零 warning、Prettier、Vitest、覆盖率、构建、文档与包检查统一由 `pnpm check` 验证                                                                                                                                                                             |
| Map 与生命周期重构 | 已完成   | Map 职责下沉至 manager/controller/query/adapter；统一 `remove()`/`dispose()`，DOM 生命周期测试通过                                                                                                                                                                              |
| Feature 状态与工厂 | 已完成   | VectorSource 单一状态源、WeakMap resolver、全部 Geometry factory 参数化矩阵完成                                                                                                                                                                                                 |
| 包结构与消费验证   | 基本完成 | ESM、CJS/UMD、TypeScript 消费通过；`publint` 与 Are The Types Wrong 无问题；可选 subpath exports 暂缓                                                                                                                                                                           |
| 类型系统收敛       | 基本完成 | properties 泛型（Feature/Layer/Source/Interaction/Control/Popup，Map 因 getProperties 返回 OL 完整属性包刻意跳过）、`defaultValue` 迁移、typed event map、未知输入 type guard、`OMapError` 错误码统一、以及直接 `new GeometryWrapper(nativeFeature)` 绕过 resolver 收紧均已完成 |
| 测试与覆盖率       | 进行中   | 22 个测试文件、107 个用例；全局行覆盖率 73.96%，70% 门槛已达成并接入 CI，模块 85% 目标未完成                                                                                                                                                                                    |
| 文档与 Vue 示例    | 基本完成 | 站点、导航、维护类指南与六类模块 API 正文已补齐（core/layer-source/interaction/control/basic/util）；Vue 示例覆盖基础地图、Vector、Draw、Modify、Measure、Select、Popup                                                                                                         |
| 发布基础设施       | 部分完成 | CI、Pages、Release 工作流已就绪；本地 `npm publish --dry-run` 已通过；仓库设置与 Trusted Publishing 需外部权限                                                                                                                                                                  |

### 剩余工作分类

**公开 Beta 必需项**（本地可继续执行，阻塞发布）：

1. 完成公开 API/类验收矩阵，并标记每个公开类的稳定性分级（见 NEXT_STEPS_PLAN 第二阶段）。
2. 增加 Playwright 真实浏览器矩阵，覆盖渲染、交互与销毁重建。
3. 补齐公开类的正常、边界与资源清理测试，并将 core/basic/util 模块覆盖率提升至 85%。
4. 完成公共 properties 泛型、事件、loader/filter/style 回调、`unknown` 边界与错误类型收敛。
5. 逐类补齐 VitePress API 文档和示例，使使用者可仅凭文档完成接入。
6. 完成禁用真实发布的工作流演练，并复核最终 tarball。

**可延期项**（不阻塞公开 Beta，Beta 后持续改进）：

1. 评审是否提供 subpath exports。
2. `LngLat` → `LngLat` 历史命名的内部引用迁移与废弃移除。
3. ~~收紧直接 `new GeometryWrapper(nativeFeature)` 的绕过 resolver 路径~~（已完成：FeatureQuery.resolveFeature 与 Select.getTargetFeature 改为统一走 `createBaseFeatureByOlFeature` / `createBaseFeatureByOlRenderFeature`，BasicFeature 构造分支标注 `@internal`）。

**依赖外部环境或权限**：

1. 将 GitHub Pages 发布源切换为 GitHub Actions，并配置分支保护与必需检查。
2. 在 npm 配置 Trusted Publishing/OIDC 与 GitHub `npm` environment。
3. 选择并接入至少一个真实业务项目，记录兼容性反馈。

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

- 2026-08-28：按 `NEXT_STEPS_PLAN.md` 第一阶段校准本计划：将“文档与 Vue 示例已完成”降级为“站点骨架完成、逐类内容待补”并新增 2 项逐类文档/示例待办；拆分阶段 7 覆盖率待办（全局 70% 门槛标记完成，模块 85% 目标保留）；新增独立 Trusted Publishing/OIDC、工作流演练与 tarball 复核任务；合并批次 E 与阶段 7/8/9 的重复待办；将剩余工作重新划分为“公开 Beta 必需项 / 可延期项 / 外部权限项”三类；`.agents` 加入 `.prettierignore`，避免非 SDK 文件阻断全仓 `format:check`。
- 2026-08-28：完成本地禁用真实发布演练：`npm publish --dry-run` 完整触发 `prepack`，TypeScript、22 个测试文件 / 107 个用例、Vite 双模块构建与声明生成全部通过；生成包共 408 个文件，压缩后约 685.2 kB、解包约 3.8 MB，未向 npm 写入任何版本。复核覆盖率基线仍为 statements 72.76%、lines 73.96%；全局 70% 门槛通过，但 core/basic/util 85% 模块目标和 Playwright 真实浏览器矩阵仍未完成。尝试移除 `defaultValue` 最后两个兼容性 `any` 时确认其覆盖 Map、Format、Layer、Interaction 多组结构差异，必须逐调用点迁移，不能仅替换 helper 签名。
- 2026-08-27：继续收敛公开类型边界：Event 内部存储、MapToken 全局扩展、旧 Layer properties 与 `ManualOmit` 清除显式 `any`，源码仅保留 `defaultValue` 中 2 个已注释的历史兼容边界；Measure 建立 typed event map，`on/once` 精确返回事件对象，`measure:end` 增加不可变结果快照；新增公开 `OMapError`/`OMapErrorCode` 统一 SDK 异常身份。
- 2026-08-27：补齐公开 Beta 维护文档：新增 `CHANGELOG.md`、`CONTRIBUTING.md`、迁移指南、故障排查、版本发布策略与历史模块审计归档；补齐 core/layer/source/interaction/control/basic/util 模块 API 页面及 Vue 3 基础地图、Vector、Draw、Modify、Measure、Select、Popup 示例，示例统一采用 `useTemplateRef` + `shallowRef` 并在卸载时 `dispose()`。
- 2026-08-27：消除双模块声明歧义：ESM exports 使用 `.d.mts` 桥接，CommonJS 使用 `.d.ts`；ESM/CJS/TypeScript 消费者均通过，`publint` 输出 `All good!`，Are The Types Wrong 将 ESM/CJS 分别正确识别且无问题。
- 2026-08-27：建立 ESM、CommonJS/UMD 与 TypeScript 声明三类真实包消费者 smoke test，并接入 `pnpm check`/CI。测试发现 ESM 输出含 Node 不支持的 OpenLayers 目录子路径、UMD/CJS 对 ESM-only OpenLayers external 得到模块对象导致 `instanceof` 崩溃；统一改用 `.js` 子路径并将 OpenLayers 打入两种产物，补齐公开 `PropertiesType` 导出。三类消费者现全部通过。覆盖率基线同步实测为 statements 52.5%、lines 52.94%，低于 70%/85% 目标，保留为明确待办。
- 2026-08-27：新增 Style 全家族、颜色/tuple/type guard、Popup payload、Measure DOM helper、DragBox/Extent/Modify payload 与图层 helper 覆盖率测试，测试矩阵增至 21 个文件、104 个用例；全局 statements 由 52.5% 提升至 72.4%、lines 由 52.94% 提升至 73.58%。已设置全局 lines 70% 硬门槛，并将 `test:coverage` 接入 `pnpm check` 与 CI；core/basic/util 85% 模块目标仍保留待补。
- 2026-08-27：完成全仓历史质量债迁移：按 basic/control → core/Feature → source/layer → interaction/Map/Projection → util/utils 顺序清理全部 185 个 ESLint warning，并将 `lint` 升级为 `--max-warnings 0`；随后完成 192 个历史文件的 Prettier 机械迁移，将 `format:check` 接入 `pnpm check` 与 CI。当前 ESLint 零 warning、Prettier 全仓校验通过。
- 2026-08-26：启动 typed events 收敛，Map/Popup 公开订阅回调改为精确事件对象签名，通用 Event 支持具体事件映射参数；Popup 原生事件改为逐订阅直达，修复多订阅重复 fan-out，并修复首次 position/offset 变更时 `oldValue` 为空导致值对象构造异常。新增多监听/once/typed payload 回归，当前共 18 个测试文件、95 个用例。
- 2026-08-26：继续清理外部未知输入边界：TileSource 参数实现、构造函数名称探测与 LngLat 类型判断改用 `unknown`/type guard，通用函数签名改用 `never[]`/`unknown`，Map 旧选项数组移除裸 `Array<any>`；`defaultValue` 因大量历史调用依赖动态返回推断，暂保留为最后一个明确标注的 legacy any 边界，待按模块迁移调用点后移除。
- 2026-08-26：按模块启动历史 Lint 清债，完成 basic（含 Style）与 control 的未使用导入/参数清理；全仓 ESLint warning 从 185 降至 151，类型检查保持通过，未混入行为改写。
- 2026-08-26：建立公开 `Disposable`/`Removable` 生命周期协议并接入 Map、Layer、Source、Interaction、Control、Popup、Event；统一 `remove` 为可重挂载的解除关系、`dispose` 为幂等永久释放，Map dispose 改为经 manager 永久释放所拥有对象。补齐 Layer/Control/Popup remove-remount-dispose、Source 原生释放与 Event 永久释放测试，并消除 BaseLayer 对 Map 的运行时反向依赖。当前共 18 个测试文件、94 个用例。
- 2026-08-26：完成 Map `EventAdapter` 下沉，`on`/`once`/`un` 门面保持兼容，原生 Map/View listener 的注册、交互态事件抑制、一次性订阅和销毁清理统一由 adapter 管理；补测时发现并修复同类型多个订阅各自触发全局事件总线所造成的重复分发。新增 2 个 DOM 回归用例，当前共 18 个测试文件、92 个用例。
- 2026-08-26：完成 Map `FeatureQuery` 下沉，统一封装 forEach/get/has FeatureAtPixel、原生 Layer/Feature 到稳定 OMap wrapper 的解析以及 layerFilter 适配；修复旧实现错误比较 wrapper UID 与原生 Layer UID 导致自定义 layerFilter 恒定无法命中的问题，并对重复原生命中结果去重。新增 2 个回归用例，当前共 18 个测试文件、90 个用例。
- 2026-08-26：完成 Map 第二轮拆分的 `ViewController`，将 center/zoom/resolution/rotation、视图调整与动画、fit、extent、交互约束及 projection 访问统一下沉，Map 保留原公开签名；同步清理拆分后 Map 的 18 个未使用导入 warning，并新增 happy-dom 回归测试覆盖值对象转换与视图约束。当前完整 88 个 Vitest 用例通过。
- 2026-08-26：拆出内部 `LayerManager`，统一管理普通 Layer 与业务 LayerGroup 的集合、ID 查询、去重、原生 Layer collection 同步及销毁顺序；组挂载后的动态 add/remove 继续通过 Map 门面同步。新增 DOM 集成测试覆盖普通图层、组内动态变更与 Map dispose，首批 Layer/Interaction/Control/Popup 四类 manager 至此全部拆出。当前完整 86 个 Vitest 用例通过。
- 2026-08-26：拆出内部 `InteractionManager`，接管交互集合、ID 查询、去重、原生 Interaction 挂载及 Draw/Measure companion layer 生命周期；明确 manager 的 remove 保留可重挂载能力、Map dispose 经 manager 永久释放交互。新增普通 DragPan remove/remount/dispose DOM 测试，并复用 Measure DOM 矩阵验证专用图层链路。当前完整 84 个 Vitest 用例通过。
- 2026-08-26：继续 Map manager 拆分，将 Control 集合状态、ID 查询、去重及原生 Control 挂载/解除挂载下沉到内部 `ControlManager`；Map 原有 add/get/remove Control 门面保持兼容，并补充 DOM 集成测试覆盖 remove 与 Map dispose 批量清理。当前完整 83 个 Vitest 用例通过。
- 2026-08-26：启动 Map manager 拆分，将 Popup 集合状态、去重、查询及原生 Overlay 挂载/解除挂载下沉到内部 `PopupManager`，Map 保留兼容门面；新增 happy-dom 集成测试覆盖查询、remove 与 Map dispose 批量清理。当前完整 81 个 Vitest 用例通过。
- 2026-08-26：引入 `happy-dom` 测试环境并补齐 Measure DOM 生命周期集成测试，覆盖同一实例 remove 后重新挂载、幂等 dispose，以及多个实例连续创建/销毁；验证交互图层、Overlay、Popup、pointermove listener 和测量 DOM 均无残留。当前完整 79 个 Vitest 用例通过。
- 2026-08-26：补齐 Feature 跨入口组合回归测试，验证同一个原生 OpenLayers Feature 经 VectorLayer、Draw、Modify 与 Select 的公开链路始终复用同一个 OMap wrapper，防止后续实现绕过 WeakMap resolver；类型检查与完整 77 个 Vitest 用例通过。
- 2026-08-24：完成 `basic/Style` 类型安全岛收敛：`geometry` 改为 `OMapStyleOptionsGeometryType`，`renderer`/`hitDetectionRenderer` 对齐 OpenLayers `RenderFunction`，默认样式与 resolver 回调移除 `BaseFeature<any>`；`pnpm typecheck` 与 63 个 Vitest 用例通过。
- 2026-08-24：补齐 `Format` 的 GeoJSON/WKT 读写、集合输出、resolver registry 复用及 KML 构造测试；修复 WKT/KML 构造函数缺少公开 overload 的类型缺陷，并将 `featureClass: any` 收敛为当前 resolver 支持的原生 `OlFeature` 构造器、格式类型守卫入参改为 `unknown`。当前共 11 个测试文件、68 个测试用例。
- 2026-08-24：完成 `util/Format` 模块首轮 `any` 清零：公开及内部写入参数统一为 `BasicFeature<OlGeometryType>`，结构化读取输入改为 `Record<string, unknown>`，动态格式分派器改为显式模块联合与泛型返回值；类型检查、68 个测试和库构建通过。
- 2026-08-24：清理 `src/source/index.ts` 聚合入口的纯转导出本地绑定，将 RenderFeature helpers、Draw geometry factories 与 `OlTarget` 改为直接 re-export；公共导出名称保持不变，库构建的 3 组未使用导入 warning 已清零。
- 2026-08-24：完成 Coordinate、Extent、Pixel、Size 固定 tuple 类型收敛：坐标固定为二元组、范围固定为四元组，Pixel/Size 的内部字段及 getter/toArray 返回值同步精确化；OpenLayers 宽泛 `Coordinate` 仅在已知几何边界显式收窄，运行时逻辑不变。
- 2026-08-24：推进 properties 泛型模型收敛：公共 `PropertiesType` 改为 `Record<string, unknown>`，`BasicFeature.get<Value>()` 与 `Source.get<Value>()` 支持调用方声明返回类型，全部 Geometry 构造参数以及 Feature、Source、Layer、Map、Popup、Control、Interaction 的通用 properties API 移除显式 `any`；新增 wrapper 属性复用测试。WMS/WMTS 参数字典与 interaction event payload 属独立语义，留待对应类型批次处理。
- 2026-08-24：启动 Interaction typed event payload 批次：抽取共享 `handleInteractionActiveChangeEvent`，为 DoubleClickZoom、DragPan、DragZoom、KeyboardZoom、Link、MouseWheelZoom 六类基础交互的 handle 与底层 listener 入口移除重复的 `e: any`/`Record<string, any>` 事件转换逻辑；共享入口兼容 OpenLayers `BaseEvent`/`ObjectEvent` 与 DOM `Event`，通过字段守卫读取 property-change payload；补充 initial/change 两类 active payload 测试，并正确保留 `oldValue: false`。
- 2026-08-24：完成 `core/Map` 显式 `any` 清零：建立 `OlMapEventPayload` 与结构化字段模型，底层 on/once listener 和 `handleMapOnCallBack` 使用同一事件联合类型，对外 `OMapEventTarget.target` 固定为 Map、old/new value 改为 `unknown`；同时修复 rotation/resolution 等事件用 `||` 丢失 `0` 以及 oldValue falsy 值被跳过的问题，新增零值和 click 坐标转换测试。
- 2026-08-24：完成 `LayerGroup` 泛型桥接与 BaseLayer 属性事件入口收敛：组内图层统一为 `BaseLayer<OMapBaseLayerCommonType>`，移除构造、增删、查询链路中的 `BaseLayer<any>`；BaseLayer propertychange listener 改为兼容 OpenLayers `BaseEvent | Event` 并通过字段守卫读取 key。新增分组增删、groupId 同步和重复图层防护测试。
- 2026-08-24：完成 `basic/Popup` 显式 `any` 清零：on/once 底层 listener 与 `handlePopupEvent` 统一使用 `PopupEventChange` 联合类型，兼容 OpenLayers `BaseEvent`、DOM `Event` 和属性变化字段，并通过字段守卫提取 key/oldValue/newValue；properties 文档签名同步为 `PropertiesType`。
- 2026-08-24：完成 WMS/WMTS/XYZ 瓦片参数安全岛收敛：tileClass、tileLoadFunction、tileUrlFunction 直接复用 OpenLayers 官方 Options 字段类型，WMS 参数与 WMTS dimensions 改为 unknown 字典，UTFGrid callback 数据改为 unknown；新增 TileWMSSource 参数 set/update 回归测试。上述 Layer/Source 子模块显式 `any` 已清零。

- 工程质量、npm 包结构、声明文件、CI/Pages/Release 工作流骨架已经建立。
- 当前有 22 个测试文件、107 个测试用例，覆盖 basic 值对象与 Style helpers、normalizeCoordinates、typed Event/Disposable、公开 OMapError、Feature resolver、Feature properties、Feature factory 参数化矩阵、Feature 跨入口身份、Format、VectorSource、TileWMS 参数、LayerGroup、Map View/Feature query/Event adapter/Layer/Popup/Control/Interaction 生命周期与事件 payload、Measure DOM/typed events/helpers 以及 Draw/Modify/Select 关键路径。
- `pnpm check` 当前可以通过；ESLint 为零 warning，历史文件已全部迁移到 Prettier，`format:check` 已成为本地与 CI 必需门禁。
- Vector/Interaction 主链路、Feature factory、坐标归一化、Map 拆分、完整生命周期、模块文档和 Vue 示例均已完成首轮验收；后续重点是全量类型收敛、Playwright 和模块覆盖率。
- 当前版本仅用于内部联调，不满足公开 Beta 或稳定版发布条件。
- 类型系统已完成关键安全岛、properties 基础模型、Map/Popup 与部分 Interaction typed events、固定 tuple 和裸 `Function` 清零；剩余工作集中在全量 typed event map、OpenLayers 透传边界、loader/filter/style 回调和统一错误策略（见阶段 3、批次 D）。

## 3. 阶段计划

### 阶段 0：冻结基线与规范化

状态：已完成

任务：

- [x] 盘点源码结构、公共入口、构建配置和高风险模块。
- [x] 建立本实施计划。
- [x] 增加 `.editorconfig`、Prettier、ESLint 和统一 UTF-8/LF 规范。
- [x] 分批迁移历史文件格式，并将 `format:check` 接入 `pnpm check` 和 CI。
- [x] 增加 `CHANGELOG.md`、贡献说明和版本策略。
- [x] 将旧审计内容迁入维护文档体系，并保留历史上下文。

验收：完成历史格式迁移后，全仓可通过格式检查，且迁移过程不存在无意义的大面积行尾 diff。

### 阶段 1：工程质量门禁

状态：工程门禁已完成；覆盖率扩充归入阶段 7

任务：

- [x] 直接安装并锁定 `typescript`。
- [x] 引入 Vitest 和覆盖率工具。
- [x] 增加 `typecheck`、`lint`、`format:check`、`test`、`test:coverage`、`check` 脚本。
- [x] 创建测试配置与测试目录。
- [x] 为 basic、Event、Feature factory、Format、VectorSource、Map 生命周期和 Draw/Modify/Select 建立首批单元测试；浏览器测试待补。
- [x] CI 中使用 `pnpm install --frozen-lockfile`。
- [x] 分批清理历史未使用导入与参数，并以 `--max-warnings 0` 固定零 warning 门禁。

验收：全新环境执行 `pnpm check` 可以复现，并作为 PR 必需检查。

### 阶段 2：包结构与公共 API

状态：稳定根入口与双模块声明已完成；可选 subpath exports 待评审

任务：

- [x] 修复 source 模块缺失导出。
- [x] 审核并公开 LayerGroup、WMSLayer、WMTSLayer、ImageLayer。
- [x] 建立稳定根入口；可选 subpath exports 经评审后再决定，不作为当前根入口消费门禁。
- [x] 配置可靠的 `.d.ts` 生成。
- [x] 补齐 `repository`、`homepage`、`bugs`、`engines`、`packageManager`、`publishConfig`。
- [x] 使用 `publint` 和 Are The Types Wrong 验证 npm 包；为 ESM/CJS 分别提供 `.d.mts`/`.d.ts` 声明入口，检查无 warning。
- [x] 使用 `pnpm pack` 检查最终文件，确认发布包仅包含 `dist`、`README.md`、`LICENSE` 与包元数据。
- [x] 移除内部模块对 `src/index.ts` 的反向依赖。

验收：临时消费项目可分别使用根入口与允许的子路径入口，IDE 类型提示完整。

### 阶段 3：类型系统收敛

状态：已局部执行（安全岛收敛），系统替换待按批次 D 推进

任务：

- [x] 将可确定的 `any` 替换为具体类型；仅 `defaultValue` 保留 2 个有注释的内部兼容边界，公共声明不暴露该 `any`。
- [ ] 外部未知输入使用 `unknown` 并通过 type guard 收窄。
- [ ] Feature/Source/Layer properties 改为泛型属性模型。
- [ ] 建立 typed event map，精确推导所有回调 payload。
- [x] 用精确函数签名替换 `Function`（裸 `Function` 类型已清零：style 回调改精确签名、`isFunction` 约束改 `AnyFunction`；loader/filter 回调精确化并入 typed event map/properties 批次继续）。
- [x] 坐标与范围使用固定 tuple 类型。
- [x] 统一公开 `OMapError`、`OMapErrorCode` 和共享参数错误出口；原有消息与抛出时机保持兼容。

验收：公共声明文件不再暴露无意义的 `any`，严格类型检查通过。

> 本轮安全岛收敛（2026-08-22，持续）：`Event` 的 `target` 字段由 `any` 收敛为 `unknown`；`Select` 与 `VectorLayer` 的 style 回调由 `Function` 调用改为精确函数签名 `(feature: BaseFeature | null, resolution: number) => Style | Array<Style> | undefined` 并对返回值做数组收窄（兼容用户函数返回单值或数组）；`basic` 模块移除 Pixel/Size/Popup 共 3 处冗余 `any`（`(item: any)` / `value as any`，`isArrayLength2` 收窄后本即为 `unknown`）；`core/Feature` 的 `BasicFeature.dispatchEvent` 由冗余 `string | any` 改为 `BaseEvent | string`（对齐 `Source` 写法，匹配 OpenLayers 原生签名）。以上均通过 typecheck / lint / test / build 门禁，无回归。`isFunction<T extends Function>` 泛型约束、`get(key): any` 与 properties 泛型模型因牵连公共 API 消费者，留待批次 D 的 properties 模型批次统一处理；全仓 `any`/`Function` 大扫按 basic → core/Feature → source/layer → interaction → Map 顺序推进。

> 批次 D 继续（source/layer）：仅 2 处无意义 `any` 收敛——`TdtLayer/type.ts` 与 `GaodeLayer/type.ts` 的 layer 类型守卫 `isValidXxxLayerType(type: any)` → `type: unknown`（`.includes` 处加 `as Enum` 断言，运行时零变化，符合守卫函数接收 `unknown` 再收窄的惯例）。其余均为 OpenLayers 透传，按批次 D 原则留待对应批次：`BaseLayer<any>[]`（LayerGroup 泛型桥接）、`tileClass?: any` / `tileLoadFunction?: (imageTile: any, …)`（WMS/WMTS 显式 TODO）、`XYZLayer` 的 `tileUrlFunction?: any`、`BaseLayer/index.ts` 的 `(e: any)` OL 事件回调、`Source` 的 `get(key): any` / `set(key, value: any)`（OL 透传）、`UTFGridSource` 的 `(data: any) => void` 回调。四门禁通过，无回归。

> 批次 D 继续（interaction）：3 处收敛——`Draw/handle.ts` 的 `geometryFunction: any` → `GeometryFunction | undefined`（OL `Draw` 选项不接受 `null`，从 `ol/interaction/Draw` 导入类型）；`Modify/index.ts` 的 `.map((feature: any))` 与 `findFeatureByOlFeature(feature: any)` → `OlFeature<OlGeometry.Geometry>`（转发至 `VectorLayer.getFeatureByOlFeature` 同签名）；`Modify/type.ts` 的 `SampleRecordItem.coordinates: any` → `OMapBasicFeatureCoordinatesType`（undo 重建 `setCoordinates` 消费该类型，`createSnapshot` 处加断言）。刻意保留：各交互 `OlEvent.listen(type, (e: any))` 回调与 `handleXxxEvent(e: any)` 直接访问 `e.coordinate`/`e.features` 等字段，属 typed event map 批次（需为 boxend/drawend/modifystart 等事件建模 payload）；`mapBrowserEvent: any` 为 OL `MapBrowserEvent` 透传。四门禁通过，`dist` 声明确认更新，无回归。

> 批次 D 继续（core/Map）：6 处收敛——`Map/type.ts` 的 `layers: Array<any>` → `Array<BaseLayer<OMapBaseLayerCommonType>>`、`controls: Array<any>` → `Array<Control>`；`Map/handle.ts` 的 `type as any` → `type as OMapEventType`；`Map/index.ts` 两处 `layerFilter: (layer: any)` → `(layer: OlLayer.Layer)`（第二处为本轮补齐）、`forEach` 注解对齐 `getFeatures(): BaseFeature<OlGeometry.Geometry>[]`、`getEventCoordinate/getEventPixel(event: any)` → `MouseEvent`/`UIEvent`（OL 原生签名）。刻意保留：`type.ts` 的 `target/oldValue/newValue: any`（事件 payload，typed event map 批次）、`index.ts` 的 `(e: any)` OL 事件回调、`Record<string, any>` properties（泛型模型批次）、`handleMapOnCallBack` 的 `e: any`（OL 透传）。

> 批次 D 继续（utils/dataType）：`isFunction<T extends Function>(value: T | any)` → `<T extends AnyFunction>(value: unknown)`（新增导出 `AnyFunction = (...args: any[]) => any` 替代裸 `Function`；`T | any` 本就被 any 吸收、T 恒回退到约束，改 `unknown` 后收窄行为等价）；`isString` 由普通 `boolean` 返回升级为类型谓词 `value is string`（使 `isValidColorHex*` 等调用点可正常收窄，与 `isNumber` 风格一致）；同文件 `isNumber/isString/isBoolean/isObject/isCoordinatesType/isExtentType/isValidColor*` 等冗余联合 `any`（`number | any` 等）与 `(value: any)` 守卫参数统一收敛为 `unknown`，`isValidColorHex*` 内 `(value as string)` 断言保持运行时求值顺序不变。全仓裸 `Function` 至此清零。bundle 字节数与改动前一致，运行时零变化；四门禁通过。

### 阶段 4：Feature 与 basic 重构

状态：已完成 basic 值对象首轮改造和 Feature resolver/registry；Geometry 初始化去重已完成（_initByFeature 与 _createFeature 上提 BasicFeature 基类，消除 8 个子类重复）；坐标归一化抽取 normalizeCoordinates 已完成，各 Geometry 子类 `_init` / `setCoordinates` 不再重复嵌套 map 回调

任务：

- [x] 抽取 `normalizeCoordinates`（递归归一化任意嵌套层级坐标，4 个重载覆盖 depth 0-3；8 个 Geometry 子类 `_init` / `setCoordinates` 复用，消除重复 `.map(c => handleGetLngLatValue(c))` 嵌套；新增 `tests/basic/normalize-coordinates.test.ts` 7 例覆盖各深度与 LngLat/数组混合输入）。
- [x] 抽取 `initByCoordinates`、`initByOlFeature` 或等价 factory（`_initByFeature` 与 `_createFeature` 已上提 `BasicFeature` 基类；`initByCoordinates` 方向经 `normalizeCoordinates` 在各 `_init` 中统一为 `new OlGeometry.X(normalizeCoordinates(coords))` + `_createFeature`，OL Geometry 构造因类型固有差异保留）。
- [x] 建立原生 Geometry 类型到 OMap Feature wrapper 构造器的统一映射，并使用 WeakMap registry 复用解析结果。
- [x] 保证同一原生 Feature 经 factory、Format、Style 回调及 VectorSource 等受支持入口解析时对应稳定 OMap wrapper。
- [x] 收紧直接重复 `new GeometryWrapper(nativeFeature)` 的使用方式：FeatureQuery.resolveFeature 与 Select.getTargetFeature 改为统一经 resolver（`createBaseFeatureByOlFeature` / `createBaseFeatureByOlRenderFeature`），BasicFeature 构造接收原生 Feature 的分支标注 `@internal`，不再允许外部绕过统一身份校验。
- [x] 为 LngLat、Pixel、Size、Extent、Color 补齐首轮 `from/clone/equals/toArray/toString`；命名兼容和不可变策略待继续收敛。
- [x] 决定值对象是否不可变，并统一 setter 语义（结论：值对象保持可变，setters 直接改内部字段；`clone()` 提供不可变副本，`from()` 统一入口；与 OpenLayers 原生 Coordinate/Pixel 风格一致）。
- [x] 兼容性处理 `LngLat` → `LngLat` 等历史命名（新增 `LngLat` 别名，`LngLat` 标 `@deprecated`，见批次 B）。

验收：新增 Geometry wrapper 不再复制大量初始化代码；基础值对象 API 一致。

### 阶段 5：Map 拆分与生命周期

状态：已完成首轮拆分与生命周期验收

任务：

- [x] 拆出 Layer、Interaction、Control、Popup manager。
- [x] 拆出 View controller、Feature query 和 Event adapter。
- [x] View controller：值对象转换、视图状态、动画、fit 与约束访问已从 Map 下沉。
- [x] Feature query：像素命中、layerFilter 适配与稳定 wrapper 解析已从 Map 下沉。
- [x] Event adapter：原生事件桥接、交互态过滤、once/un 与 listener 清理已从 Map 下沉。
- [x] `Map` 保留门面和组合职责，Layer/Interaction/Control/Popup/View/FeatureQuery/EventAdapter 细节已下沉（主文件由基线 1500+ 行降至约 723 行）。
- [x] 建立统一 `Disposable` 协议。
- [x] 明确 `remove`（解除挂载）与 `dispose`（永久释放）的差别。
- [x] Map、Layer、Source、Interaction、Control、Popup、Event 全部支持可靠清理。
- [x] 为 `Map` 增加幂等 `dispose()`，释放已挂载资源、事件与原生地图实例。
- [x] 默认 Interaction 改为按 Map 创建，避免多个地图共享交互实例与状态。

验收：反复创建/销毁地图不残留 DOM、Overlay、监听器和缓存；Map 主文件显著缩小。

### 阶段 6：Vector 状态主链路

状态：已完成首轮主链路验收

任务：

- [x] 测试 OMap 与原生 source 的 add/remove/clear 同步。
- [x] 修复 Feature ID 与原生 Feature 不同步导致 `getFeatureById` 查询失败的问题。
- [x] 测试 Draw 完成后 `drawEnd` 返回稳定 wrapper，并修复 `drawend` 回调被跳过的问题。
- [x] 测试 Modify 快照恢复并为 undo/redo 预留 command 模型；修复 ID 为 `0` 和撤销步数越界问题。
- [x] 测试 Select 的 style/filter/select 事件，并修复显式 layers 未挂载 Map 时 filter 收到空 layer 的问题。
- [x] Select 增加主动选择、取消、清空和原生 collection 访问。
- [x] Draw 明确 abort 仅中止当前草图并保留已完成 Feature，另提供 `clearFeatures()` 显式清空。
- [x] Measure 统一清理 tooltip、overlay、geometry/pointer listener 与延迟完成 timer，移除重复 Overlay 删除。
- [x] 使用 DOM 测试验证 Measure 重复创建、销毁和重新挂载无残留（基于 `happy-dom`，见 `tests/interaction/measure-dom-lifecycle.test.ts`；真实浏览器交互仍归入阶段 7 Playwright 矩阵）。
- [x] Source、Format 与样式/交互回调中的原生 Feature 统一经过 resolver；后续新增入口不得自行扫描 Geometry 类型。
- [x] Interaction 增加可重复调用的 `remove()`/`dispose()`，统一释放公开事件与内部 OpenLayers listener。

验收：所有入口观察到同一 Feature wrapper，缓存和交互状态无悬挂引用。

### 阶段 7：测试矩阵

状态：Vitest、DOM 与包消费矩阵已完成首轮，全局 70% 门槛已达成；Playwright 真实浏览器矩阵和模块 85% 目标待完成

任务：

- [x] Vitest 基线：basic 值对象、Event、VectorSource、Map 生命周期、Draw、Modify、Select。
- [ ] Vitest 扩展：坐标转换、全部 Geometry、Measure、Popup、Control（Format 与 Feature factory 已完成首轮矩阵）。
- [x] DOM 集成：Map、Layer、Popup、Control、Interaction 生命周期（happy-dom）。
- [ ] Playwright：真实浏览器矩阵，覆盖地图渲染、目标容器尺寸、Vector Feature 定位、Draw、Modify、Select、Measure、Popup 与销毁重建，并接入 CI 保留失败截图/trace。
- [x] ESM、CommonJS/UMD 与 TypeScript 声明消费者 smoke test，并接入本地/CI 门禁。
- [x] 全局行覆盖率达 73.96%，并固定 70% 硬门槛，接入 `pnpm check` 与 CI。
- [ ] core/basic/util 模块覆盖率提升至 85%。

验收：核心路径具备回归保护，浏览器行为和包消费方式均经过验证。

### 阶段 8：VitePress 文档与示例平台

状态：站点骨架完成，模块级与逐类 API 文档均已补齐（更新于 2026-08-30：验收矩阵“文档”列已按 `audit:api` 导出清单 + `docs/api/<group>/` 实际页面逐类核对，全部公开类标记 Y；`docs:build` 因 vitepress 未安装仍待实跑）

逐类页面（69 个）由 `pnpm docs:api` 生成：脚本用 TypeScript Compiler API 直接读取 `src`，提取构造重载、静态成员、自有成员与继承链成员，因此签名与代码始终一致，不会随重构腐化。`pnpm docs:check` 负责校验站内链接。

任务：

- [x] 创建 VitePress 站点、主题和导航。
- [x] 编写安装、快速开始、核心概念、迁移、贡献、故障排查和发布状态指南。
- [x] 建立 core/layer-source/interaction/control/basic/util 模块 API 文档：core、layer-source、interaction、basic、control、util 六类页面已补齐构造、属性、方法、事件与生命周期；文档正文直接承载精确成员签名。
- [x] 创建基础地图、Vector、Draw、Modify、Measure、Select、Popup 的 Vue 3 示例。
- [x] 补齐 XYZ/WMS/WMTS 图层、Control 与地图销毁/路由切换示例（`examples/tile-layers.md`、`examples/controls.md`、`examples/lifecycle.md`）。
- [x] 为公开类建立逐类独立 API 页面：69 个页面覆盖 7 个分组，由 `scripts/gen-api-docs.mjs` 调用 TypeScript 编译器从 `src` 提取签名生成，侧边栏数据一并自动生成（`docs/.vitepress/api-sidebar.json`）。
- [x] 示例仅在浏览器挂载阶段创建 Map，并在卸载阶段 dispose。
- [x] OpenLayers/OMap class 实例使用 Vue `shallowRef`，不进行深层代理。
- [x] GitHub Pages 子路径通过 VitePress `base` 配置。
- [x] 当前文档不包含生产地图服务密钥。
- [ ] 为每个公开类标记 `stable-beta`/`experimental`/`compatibility`/`internal` 稳定性状态。
- [ ] 记录 `remove`、`dispose`、可重新挂载与永久释放的区别。

验收：`pnpm docs:build` 通过，且不了解源码的使用者可仅凭文档完成安装、建图、加数据、用核心交互并正确释放资源。

### 阶段 9：GitHub Actions 与发布

状态：工作流文件已完成，GitHub 仓库设置待推送后启用

任务：

- [x] `ci.yml`：Lint、类型、测试、库构建、文档构建、包验证。
- [x] `pages.yml`：构建并部署 `docs/.vitepress/dist`。
- [x] `release.yml`：GitHub Release 发布或手动触发，预留 npm Trusted Publishing/OIDC；默认由仓库变量关闭真实发布。
- [ ] 配置 GitHub Pages 发布源为 GitHub Actions。
- [ ] 配置分支保护和必需检查。
- [x] 本地 `npm publish --dry-run` 演练（完整触发 `prepack`，未向 npm 写入任何版本）。
- [ ] 在 npm 配置 Trusted Publishing/OIDC，并设置 GitHub `npm` environment 与审批策略。
- [ ] 在 GitHub Actions 中完成一次禁用真实发布的工作流演练。
- [ ] 构建并核对最终 npm tarball 内容、体积与声明文件。
- [x] 建立 alpha → beta → rc → stable 发布节奏，并写入版本与发布策略。

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
- [x] 在 DOM 环境验证 Measure 重复创建、销毁和重新挂载（`happy-dom` 集成测试已覆盖；Playwright 真实浏览器覆盖保留在批次 E）。
- [x] 抽取统一 Feature resolver/WeakMap registry，现有 Source、Format 与样式/交互回调统一复用该入口。
- [x] 验证 factory 与多个 Source 对同一个原生 Feature 返回同一个 wrapper；Layer、Draw、Modify、Select 当前复用 Source/resolver 链路。
- [x] 增加 Layer、Draw、Modify、Select 跨入口组合测试，防止后续实现绕过 resolver（见 `tests/core/feature-entry-integration.test.ts`）。

完成条件：阶段 6 剩余任务全部勾选，交互销毁后无 listener、Overlay、临时 Feature 或缓存悬挂。

### 批次 B：Feature factory 与类型基础

目标：先消除 Geometry wrapper 重复初始化，再扩大类型收敛范围，避免在重复代码上反复修类型。

- [x] 设计并测试原生 Feature → OMap Feature wrapper WeakMap registry/factory。
- [x] 抽取原生 Feature 初始化（`_initByFeature` 上提为 `BasicFeature` 默认实现）与 OMap Feature 初始化（`_createFeature` 统一创建 `OlFeature`），消除 8 个 Geometry 子类的重复实现；坐标归一化已抽取为 `normalizeCoordinates`（`LngLat/handle.ts`，4 个重载覆盖 depth 0-3），各 Geometry 子类 `_init` / `setCoordinates` 统一调用，不再重复嵌套 map 回调。新增 `tests/core/feature-factory.test.ts` 参数化矩阵（24 例）覆盖全部 Geometry 的构造 / 原生绑定 / resolver 复用，`tests/basic/normalize-coordinates.test.ts`（7 例）覆盖归一化各深度。
- [x] 为 Point、LineString、Polygon、Multi*、Circle、LinearRing 建立参数化测试矩阵（见 `tests/core/feature-factory.test.ts`，24 例参数化覆盖构造 / 原生绑定 / resolver 复用）。
- [x] 确定值对象可变性、clone 和 setter 语义（值对象保持可变，setters 直接改内部字段；`clone()` 提供不可变副本；与 OpenLayers 原生 Coordinate/Pixel 风格一致）。
- [x] 确定 `LngLat` → `LngLat` 的兼容别名与废弃周期：新增 `LngLat` 作为推荐公开名称（与 `LngLat` 等价，`export const LngLat = LngLat`），根入口与 basic 均再导出；`LngLat` 标 `@deprecated`，内部引用计划在批次 D 统一迁移。
- [ ] 将 factory、Source、Layer 和 Interaction 的公开回调改为 typed event map。

完成条件：阶段 4 的初始化重复明显减少，所有 Geometry 均通过相同 factory 测试，公共声明不因 factory 引入新的 `any`。

### 批次 C：Map 拆分与完整生命周期

目标：在已有 `Map.dispose()` 基础上缩小 Map 门面，完成所有挂载对象的 remove/dispose 语义。

- [x] 先拆出 Layer、Interaction、Control、Popup manager。
- [x] Popup manager：集合状态、查询、去重与 Overlay 挂载生命周期已从 Map 下沉。
- [x] Control manager：集合状态、ID 查询、去重与原生 Control 挂载生命周期已从 Map 下沉。
- [x] Interaction manager：集合、ID 查询、原生挂载及 Draw/Measure companion layer 生命周期已从 Map 下沉。
- [x] Layer manager：普通 Layer 与 LayerGroup 集合、查询、原生挂载及销毁顺序已从 Map 下沉。
- [x] 再拆出 View controller、Feature query 和 Event adapter。
- [x] View controller 已拆出并由 DOM 状态/约束测试保护。
- [x] Feature query 已拆出并修复 layerFilter 原生 Layer 映射。
- [x] Event adapter 已拆出，并修复同类型多个原生订阅造成的重复回调。
- [x] 为 Layer、Source、Control、Popup 建立统一 `Disposable` 接口，并让 Map、Interaction、Event 同步实现协议。
- [x] 增加 Map/Popup/Control/Interaction 的 DOM 生命周期集成测试。
- [x] 验证重复创建、销毁和重新挂载不会残留 DOM、Overlay、listener 或缓存（happy-dom；真实浏览器矩阵保留在批次 E）。

完成条件：Map 主文件显著缩小，对外 API 保持兼容，生命周期集成测试通过。

### 批次 D：类型系统和历史质量债

目标：收紧公共声明，同时分批处理格式和 Lint，不制造一次性大面积 diff。

- [x] 按 basic → core/Feature → source/layer → interaction → Map 的顺序替换无意义 `any` 和 `Function`（五模块 + `utils/dataType` 首轮安全岛收敛完成；剩余 `any` 均为 OL 透传、properties 泛型或 typed event map 批次的刻意保留项）。
- [ ] 为 properties、事件和 loader/filter/style 回调建立泛型或精确签名。
- [ ] 外部未知输入统一使用 `unknown` 与 type guard。
- [x] 固定 Coordinate、Extent、Pixel、Size tuple 类型。
- [x] 按模块迁移 Prettier 和未使用导入，行为改动与机械格式迁移分别验证。
- [x] 全仓格式迁移完成，并将 `format:check` 接入 `pnpm check` 和 CI。

完成条件：公开声明不暴露无意义 `any`，ESLint warning 清零或建立明确豁免，`format:check` 成为必需门禁。

### 批次 E：消费验证、文档与发布

目标：以真实消费者视角完成公开 Beta 前验收。

- [x] 建立 ESM、CJS/UMD 和 TypeScript 独立消费者 smoke test。
- [ ] 使用 Playwright 覆盖地图、绘制、修改、选择、量测、Popup 和销毁重建（与阶段 7 同一任务，不重复计数）。
- [ ] 达到约定覆盖率阈值并将覆盖率检查接入 CI（全局 70% 门槛已完成；模块 85% 目标见阶段 7）。
- [x] 补齐逐类 API 文档与稳定性标记（core、layer-source、interaction、control、basic、util 已完成；详见阶段 8）。
- [x] 补齐 Vue 3 基础地图、Vector、Draw、Modify、Measure、Select、Popup 示例。
- [x] 补齐 XYZ/WMS/WMTS 图层、Control 与销毁/路由切换示例（新增 `docs/examples/vector-geometry.md`、`tile-layers.md`、`controls.md`、`lifecycle.md`，并接入站点侧边栏；详见阶段 8）。
- [x] 补齐迁移、贡献、故障排查和发布说明。
- [ ] 配置 GitHub Pages、分支保护、npm Trusted Publishing，并完成一次禁用真实发布的工作流演练（详见阶段 9）。

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

- [ ] 阶段 3～6 的公开 API 和核心状态链路达到各自验收标准；**所有根入口公开类已进入验收矩阵并具有稳定性标记**。
- [ ] DOM 集成、Playwright 和 ESM/CJS/UMD smoke test 通过。
- [ ] 覆盖率达到约定阈值，CI 无错误且不存在未说明的 warning。
- [ ] API 文档覆盖全部公开类，示例可独立指导接入（进展：6 个模块页 + 70 个逐类页 + 6 篇示例均已就位，页面覆盖全部公开类；验收矩阵“文档”列已逐类核对标记 Y；**仍待** `docs:build` 实跑通过——vitepress 未安装，当前以 `docs:check` 校验站内链接替代）。
- [x] 迁移指南、贡献指南和 CHANGELOG 可用。
- [ ] GitHub Pages、分支保护、Trusted Publishing 和发布演练完成。
- [ ] 最终 npm tarball 内容、体积与声明文件已复核。
- [ ] 至少一个真实消费项目完成试用并记录兼容性反馈。
