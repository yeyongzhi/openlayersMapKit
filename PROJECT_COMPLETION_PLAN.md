# openlayersMapKit 完整交付计划

## 1. 最终目标

将 openlayersMapKit 从当前的 `0.1.0-beta.1` 预发布状态推进为一个能够稳定维护、公开安装和持续发布的开源 TypeScript 地图 SDK，最终完成以下四项交付：

- 代码与公共 API 达到可发布状态。
- `openlayers-map-kit` 成功发布到 npm，并能被真实项目安装使用。
- VitePress 文档站内容完整、导航清晰、示例可运行。
- 文档站通过 GitHub Pages 正式上线，并建立后续自动维护流程。

本文是执行清单。阶段必须按顺序推进；每个阶段的验收条件全部满足后，再进入下一阶段。

## 2. 当前基础与待处理事项

### 2.1 已具备的基础

- TypeScript 严格模式和 `noImplicitOverride` 已开启。
- 已实现 ESM、CommonJS/UMD 和类型声明构建。
- 已配置 Vitest、覆盖率门槛和 Playwright 浏览器测试。
- 已有 ESM、CJS、TypeScript、Vite 独立消费者测试。
- 已有公开 API 基线审计脚本。
- 已有 VitePress 站点结构、指南、示例和逐类 API 文档。
- GitHub Actions 已包含 CI、Pages 演练和 npm 发布演练。
- npm 发布工作流已设计为上传并发布同一份已验证 tarball。
- Pages 与 npm 的真实发布开关默认关闭，当前不会被误触发。

### 2.2 已完成的文档整理（2026-09-09）

已完成以下处理：

- 已恢复并重写长期维护所需的 `CHANGELOG.md`。
- 已恢复并重写开源协作所需的 `CONTRIBUTING.md`。
- 已确认 README 对上述两个文件的入口继续有效。
- 已将项目架构、开发命令和维护重点沉淀到 `PROJECT_OVERVIEW.md`。
- 已将分支、Pages、npm Trusted Publishing 和完整发布流程沉淀到本文。
- `API_ACCEPTANCE_MATRIX.md`、`MODULE_CODE_STANDARD_AUDIT.md`、`NEXT_STEPS_PLAN.md`、`REFACTOR_PLAN.md` 和 `REPOSITORY_SETUP.md` 保持删除，作为已完成或已迁移的阶段性文档处理。

后续维护原则：

- `CHANGELOG.md` 持续记录面向使用者的版本变化。
- `CONTRIBUTING.md` 持续记录开发、测试和协作约定。
- 阶段性审计结论应进入代码、测试、Issue 或长期文档，避免再次在根目录累积临时计划文件。
- 后续删除或改名文档前，先检查 README、VitePress、PR 模板和其他 Markdown 的引用。

## 3. 总体里程碑

| 里程碑       | 结果                               | 发布阻断条件                                 |
| ------------ | ---------------------------------- | -------------------------------------------- |
| M0：仓库整理 | 工作区、文档和分支策略清晰         | 存在误删、死链接或未分类计划文件             |
| M1：代码稳定 | 公共 API、行为和生命周期稳定       | 类型、Lint、测试或 API 审计失败              |
| M2：文档完成 | VitePress 内容完整且本地验收通过   | 导航、示例、API 或构建失败                   |
| M3：包验收   | tarball 可被多种消费者正确使用     | 包结构、类型或真实消费失败                   |
| M4：远端就绪 | GitHub、npm、Pages 权限配置完成    | 分支保护、Trusted Publishing 或 Pages 未配置 |
| M5：预发布   | npm beta 与 Pages 正式可访问       | 安装验证或线上站点验证失败                   |
| M6：稳定发布 | 首个 stable 版本发布并形成维护闭环 | 仍有破坏性问题或升级说明缺失                 |

## 4. 阶段 0：整理仓库与确定发布边界

### 4.1 清理并确认文件

- [x] 审核上述已删除 Markdown 文件，按“必须恢复”和“可永久删除”分类。
- [x] 恢复并重写 `CHANGELOG.md` 与 `CONTRIBUTING.md`。
- [x] 检查 README 和 docs 中已删除文件的链接。
- [x] 保留源码、测试、脚本、示例、文档站和 GitHub 工作流。
- [x] 确认 `dist`、`coverage`、`artifacts`、测试报告及 `.tmp-*` 目录继续由 `.gitignore` 管理。
- [x] 确认 `node_modules`、`.pnpm-store` 不会提交。
- [x] 将根目录长期信息收敛到项目说明、贡献指南、更新日志和执行计划。

### 4.2 明确首发范围

- [ ] 确认首个公开版本是继续发布 `0.1.0-beta.x`，还是直接准备 `0.1.0`。
- [ ] 建议先发布新的 beta，完成真实业务接入后再发布 stable。
- [ ] 列出首发必须稳定的模块：Map、Feature、Layer、Source、Interaction、Control、Basic、Util。
- [ ] 将非首发必需、行为仍不确定的能力明确标记为 experimental，或推迟到后续版本。
- [ ] 确认浏览器支持范围、Node.js 支持范围和 OpenLayers peer dependency 范围。
- [ ] 明确哪些历史拼写属于公开兼容 API，例如 `Lnglat`，不得在首发整理中直接删除。

### 4.3 仓库元信息

- [ ] 核对 `package.json` 中的 name、version、description、author、license、repository、homepage、bugs 和 keywords。
- [ ] 核对 README 中的版本、安装方式、浏览器支持和发布状态。
- [ ] 增加或确认 GitHub 仓库描述、Topics、License 展示和 Issues 开关。
- [ ] 确定分支策略：`dev` 日常开发，`main` 稳定发布。
- [ ] 将 M0 整理结果作为独立提交，确保后续代码改动容易审查。

### 阶段验收

```bash
git status --short
pnpm docs:check
pnpm format:check
```

验收标准：文档删除均为明确决定，不存在指向已删除文件的链接，工作区变化可以逐项解释。

## 5. 阶段 1：完成代码与公共 API

### 5.1 建立功能完成清单

对每个公开模块逐项检查：

- [ ] 构造参数和默认值符合文档。
- [ ] 所有公开方法的参数、返回值、异常和副作用明确。
- [ ] 必填参数缺失或非法时抛出统一的 `OMapError`。
- [ ] 可恢复的重复操作不会破坏内部状态。
- [ ] 查询无结果时的 `undefined`、`null` 或空数组返回约定一致。
- [ ] 可变数组和对象不会意外暴露内部引用。
- [ ] 能访问必要的 OpenLayers 原生实例，但不会绕过 OMap 生命周期管理。
- [ ] 公开类和关键方法具有有效 JSDoc。
- [ ] 废弃 API 使用 `@deprecated` 指明替代方案。

### 5.2 检查核心模块

#### Map

- [ ] 验证创建、挂载、重建和多次 `dispose()`。
- [ ] 验证 Layer、LayerGroup、Interaction、Control、Popup 的增删查。
- [ ] 验证 View 的 center、zoom、fit、animate 等操作。
- [ ] 验证像素与坐标转换、Feature 查询和地图事件。
- [ ] 确认销毁时释放 OpenLayers listener、DOM、Overlay、timer 和 manager 缓存。

#### Feature

- [ ] 检查 Point、LineString、Polygon、Circle、LinearRing 和 Multi 类型。
- [ ] 验证 geometry、style、properties、extent 和原生 Feature 的同步。
- [ ] 确认统一 resolver 为同一原生 Feature 返回稳定的 OMap wrapper。
- [ ] 测试非法坐标、空几何、重复坐标和投影转换边界。

#### Layer 与 Source

- [ ] 检查继承链、泛型参数和原生 Layer/Source 的复用。
- [ ] 验证 Vector、Tile、Image、Heatmap、VectorTile、VectorImage 和 LayerGroup。
- [ ] 验证 XYZ、WMS、WMTS、OSM、高德、天地图及其他已公开数据源。
- [ ] 对需要 Token 或外部服务的模块说明配置和错误行为。
- [ ] 网络服务测试不得成为本地单元测试的随机依赖；使用稳定 fixture 或 mock。

#### Interaction 与 Control

- [ ] 验证 Draw、Modify、Measure、Select、Extent 和导航交互。
- [ ] 验证 active 状态、图层绑定、事件桥接和重复移除。
- [ ] 验证 DOM 提示、Overlay 和临时 Feature 在结束或销毁后被清理。
- [ ] 验证 Zoom、FullScreen 控件在地图切换和销毁后的行为。

#### Basic 与 Util

- [ ] 验证所有值对象的输入归一化、复制语义和边界校验。
- [ ] 验证 Popup DOM 生命周期与定位。
- [ ] 验证 GeoJSON、WKT、KML 的读写与错误输入。
- [ ] 验证 ProjUtil、Event、MapToken 和 Disposable 契约。

### 5.3 公共 API 稳定性

- [ ] 运行 API 审计并检查差异，而不是直接覆盖基线。
- [ ] 对预期新增 API 补齐实现、类型、测试、文档和更新日志。
- [ ] 对预期删除或改名 API 提供兼容别名和迁移说明。
- [ ] 确认 `src/index.ts` 只导出希望长期支持的公共能力。
- [ ] 确认内部 helper、manager、adapter 和 OpenLayers 映射类型没有意外暴露。
- [ ] 在 API 已确认后才更新 `scripts/public-api-baseline.json`。

```bash
pnpm typecheck
pnpm lint
pnpm audit:api
```

### 5.4 测试完善

- [ ] 为所有修复补充回归测试。
- [ ] 每个核心 API 至少覆盖正常路径、非法输入和清理路径。
- [ ] 检查全局覆盖率及核心文件级覆盖率门槛是否合理。
- [ ] 不通过降低覆盖率门槛来掩盖未测试的重要行为。
- [ ] 使用 Playwright 覆盖必须依赖真实 DOM 和 OpenLayers 渲染的流程。
- [ ] 在 Chromium 之外至少手工验证一个本机主流浏览器。
- [ ] 验证内存和事件不会随重复创建/销毁明显增长。

```bash
pnpm test
pnpm test:coverage
pnpm build
pnpm test:browser
```

### 阶段验收

```bash
pnpm check
```

验收标准：所有检查通过，API 差异均有明确意图，已知问题有记录且不阻断预发布使用。

### 阶段执行记录（2026-09-09）

- [x] `pnpm check` 完整通过。
- [x] TypeScript、ESLint、Prettier 和文档链接检查通过。
- [x] 143 个公开导出与 `scripts/public-api-baseline.json` 一致。
- [x] 69 个公开类均被测试引用。
- [x] 41 个 Vitest 文件、323 项测试全部通过。
- [x] 全局行覆盖率 67.48%、分支覆盖率 53.25%，达到当前门槛。
- [x] ESM 与 UMD/CJS 构建、浏览器类型检查和两个示例构建通过。
- [x] ESM、CJS、TypeScript 声明和 Vite 消费者检查通过。
- [x] VitePress 构建、publint 和 Are the Types Wrong 检查通过。
- [x] 7 项 Playwright 地图交互断言全部通过；本机使用已安装的 Chromium channel 验证。
- [x] tarball 的 ESM、CJS、类型和 Vite 隔离消费全部通过。
- [ ] 在 GitHub Actions 的 Linux 环境再次运行 `pnpm check:all`，作为阶段 1 的最终远端确认。

本机默认的 Playwright headless shell 下载曾因网络连接重置未完成，因此本次浏览器验证使用 `PLAYWRIGHT_CHANNEL=chromium`。这不影响 CI；CI 会通过 `playwright install --with-deps chromium` 安装固定版本浏览器。

## 6. 阶段 2：完善 VitePress 文档站

### 6.1 信息架构

建议保持四层内容：

1. 首页：项目价值、主要能力、安装命令、最小示例和入口链接。
2. 指南：快速开始、核心概念、架构、生命周期、迁移和故障排查。
3. 示例：基础地图、矢量要素、图层服务、交互、控件、Vue 集成。
4. API：模块总览、逐类 API、枚举、类型和废弃项。

执行事项：

- [ ] 检查 `docs/index.md` 是否能在一分钟内说明项目用途和使用入口。
- [ ] 检查顶部导航与侧边栏名称、顺序和链接。
- [ ] 将历史审计页面移入 archive 或移除，不占用使用者主导航。
- [ ] 增加清晰的“版本与兼容性”页面。
- [ ] 增加完整的生命周期和资源释放说明。
- [ ] 增加常见错误、Token、跨域、容器尺寸和投影问题排查。
- [ ] 添加 GitHub、npm 和更新日志入口。

### 6.2 快速开始

- [ ] 明确安装 `openlayers-map-kit` 与 `ol`。
- [ ] 明确导入 `ol/ol.css`。
- [ ] 给出具有宽高的地图容器。
- [ ] 提供可复制运行的 TypeScript 最小示例。
- [ ] 展示添加底图、矢量图层、Feature 和交互。
- [ ] 展示组件卸载或页面切换时调用 `dispose()`。
- [ ] 分别说明原生 HTML、Vite 和 Vue 的使用方式。

### 6.3 API 文档

- [ ] 运行 `pnpm docs:api`，确保内容来自当前声明文件。
- [ ] 检查每个公开类都出现在 API 侧边栏。
- [ ] 检查构造器、参数、返回值、事件、异常和示例是否完整。
- [ ] 标记 experimental、deprecated 和 legacy API。
- [ ] 为枚举和仅类型导出提供可发现入口。
- [ ] 检查生成文档中是否存在乱码、无效锚点或内部类型泄露。
- [ ] 不直接修改下一次生成会被覆盖的内容；必要说明写入生成脚本的 notes 配置。

```bash
pnpm docs:api
pnpm docs:check
```

### 6.4 示例质量

- [ ] 确保文档代码与 `examples/vite`、`examples/html` 保持一致。
- [ ] 每个示例声明必要 CSS、容器尺寸、Token 和网络前提。
- [ ] 外部地图服务不可用时给出清楚提示或替代示例。
- [ ] 为核心示例增加效果截图，截图使用稳定数据和统一尺寸。
- [ ] 所有示例在销毁时释放地图实例。
- [ ] 构建两个独立示例项目，避免文档示例只在 Markdown 中看似正确。

```bash
pnpm example:build
```

### 6.5 站点体验与元信息

- [ ] 设置站点标题、描述、语言、logo、favicon 和主题颜色。
- [x] 配置 GitHub 社交链接和“编辑此页”链接。
- [x] 配置本地搜索。
- [x] 配置 footer、最后更新时间和版本标识。
- [ ] 增加 Open Graph、description、canonical 等基础 SEO 信息。
- [x] 确认 `cleanUrls` 下刷新指南和深层 API 路径正常。
- [x] 确认 Pages 子路径 base 为 `/openlayersMapKit/`。
- [ ] 如果未来使用自定义域名，再将 base、CNAME 和 canonical 一并调整。
- [x] 检查桌面端和移动端导航、代码块和长 API 页面。

### 6.6 本地预览验收

```bash
pnpm docs:check
pnpm docs:build
pnpm docs:preview
```

重点访问：

- [x] 首页。
- [x] 快速开始。
- [x] 所有顶部导航入口。
- [x] 至少一个深层 API 页面。
- [ ] 每类示例页面。
- [x] 站内搜索结果。
- [x] 刷新深层 URL。
- [x] 404 页面。

### 阶段验收

文档链接检查、构建和本地预览全部通过；首次使用者只依赖文档即可安装、创建地图并正确销毁实例。

### 阶段执行记录（2026-09-09）

- [x] 扩展首页能力介绍、使用入口和项目链接。
- [x] 新增环境与兼容性页面，说明 Node.js、OpenLayers、模块格式、SSR 和 UI 框架边界。
- [x] 完善快速开始的源码联调、矢量要素和资源释放说明。
- [x] 为站点增加本地搜索、GitHub 编辑入口、社交链接、页脚、页面大纲和更新时间文案。
- [x] 增加 Open Graph 基础元信息、主题色和 sitemap。
- [x] 更新发布状态页并移除对已删除旧文档的依赖。
- [x] 修复 `GaodeLayerType.VEC` 错误示例，统一使用真实公开成员 `GaodeLayerType.Vec`。
- [x] 修复坐标文档与实现不一致的问题，明确 Geometry/View 使用投影坐标并通过 `ProjUtil` 显式转换经纬度。
- [x] `pnpm docs:check` 通过：106 个 Markdown 文件、343 条站内链接有效。
- [x] `pnpm docs:build` 通过，页面渲染及 sitemap 生成成功。
- [ ] 增加正式 logo、favicon 和稳定截图资源。
- [x] 增加可复用的 OMap SVG 站点标识和 favicon；稳定功能截图仍待补充。
- [x] 启动 `pnpm docs:preview`，完成首页、兼容性页和深层 Map API 页的桌面端/移动端视觉验收。
- [x] GitHub Pages 部署后验证深层 URL 刷新、搜索、404 和线上资源路径；搜索 `Map` 返回 16 条结果。

## 7. 阶段 3：npm 包与真实消费者验收

### 7.1 包元数据和导出

- [x] 核对 `main`、`module`、`types` 和 `exports`。
- [x] 确认 ESM 类型使用 `index.d.mts`，CJS 类型使用 `index.d.ts`。
- [x] 确认 `sideEffects: false` 不会错误移除必要初始化代码。
- [x] 确认 `ol` 的 peer dependency 范围与真实兼容范围一致；首个 beta 固定验证 `^10.6.1`。
- [x] 确认发布包只包含 `dist`、README、LICENSE 和 package.json。
- [x] 将 README 中发布后需要访问的链接改为 npm、GitHub 和 Pages 绝对地址。
- [x] 确认 sourcemap 策略：发布声明映射，不发布 JavaScript sourcemap。

### 7.2 构建和静态包检查

```bash
pnpm build
pnpm check:consumers
pnpm check:package
```

- [x] 检查 ESM 构建保持 `ol` 为 peer dependency，可由宿主 bundler tree-shake。
- [x] 检查 `require()` 能加载 CJS/UMD 构建。
- [x] 检查 TypeScript NodeNext 和 bundler resolution。
- [x] 使用 publint 检查 package.json 与包结构。
- [x] 使用 Are the Types Wrong 检查类型入口。
- [x] 记录 bundle 基线：ESM 306.45 kB / gzip 53.10 kB；UMD 2,050.79 kB / gzip 365.20 kB。ESM 未重复打包 OpenLayers，UMD 按独立脚本加载目标内置 OpenLayers。

### 7.3 tarball 验收

```bash
pnpm check:tarball
```

该命令会生成 `artifacts/openlayers-map-kit-<version>.tgz`，并在隔离目录中安装 tarball、OpenLayers、TypeScript 和 Vite。

- [x] 检查 tarball 文件列表：448 项，仅包含 `dist`、README、LICENSE 和 package.json。
- [x] 验证 tarball ESM 导入。
- [x] 验证 tarball CommonJS 加载。
- [x] 验证 tarball 类型检查。
- [x] 验证 tarball Vite 生产构建。
- [ ] 手工新建一个最小业务项目，使用 tarball 渲染真实地图。
- [ ] 在该项目中测试开发构建、生产构建和页面销毁。

### 7.4 版本与变更日志

- [x] 按 SemVer 确定目标版本为 `0.1.0-beta.1`，npm dist-tag 为 `beta`。
- [x] 版本符合 `x.y.z-beta.n` 预发布格式。
- [x] `package.json` 已使用目标版本；当前 lockfile 不记录根包版本，无需修改。
- [x] `CHANGELOG.md` 已按 Added、Changed、Fixed、Deprecated、Removed 和 Breaking Changes 维护。
- [x] 当前目标版本无新增破坏性变化，无需迁移说明。
- [x] README 与文档站均标明 `0.1.0-beta.1` 预发布状态。
- [x] registry 检查通过，`openlayers-map-kit@0.1.0-beta.1` 尚未存在。

```bash
pnpm release:check --check-registry
```

### 阶段验收

```bash
pnpm check:all
pnpm release:check --check-registry
```

验收标准：完整门禁通过，tarball 能被真实应用安装，目标版本未被占用。

### 7.5 本轮执行记录（2026-09-09）

- `pnpm build`、`pnpm check:consumers`、`pnpm check:package`、`pnpm check:tarball` 全部通过。
- publint 无问题；Are the Types Wrong 的 Node 10、Node 16 CJS、Node 16 ESM 和 bundler 四类入口全部为绿色。
- 生成 tarball `artifacts/openlayers-map-kit-0.1.0-beta.1.tgz`，大小 519,068 bytes（506.90 KiB）；隔离安装后的 ESM、CJS、类型检查和 Vite 生产构建均通过。
- npm registry 已确认目标版本可用；检查仅验证状态，没有执行发布。
- tarball 验收产生的 `.tmp-package-consumer` 已清理，保留 tarball 供人工业务项目验收。
- 阶段 3 尚余两项需要浏览器人工观察的真实地图验收：开发构建/生产构建中的地图渲染与页面销毁。完整 `pnpm check:all` 的 Linux CI 结果仍归阶段 4 远端演练确认。

## 8. 阶段 4：配置 GitHub 远端能力

仓库内配置已准备完成；标记为“远端”的步骤仍需要仓库管理员在 GitHub 或 npm 网页执行。

### 8.0 仓库内发布配置

- [x] 配置 `ci.yml`：`main`、`dev` push 和 PR 均执行完整质量门禁。
- [x] 配置 `pages.yml`：默认仅构建 Pages artifact，只有 `main`、显式 `deploy=true` 且仓库变量开启时才部署。
- [x] 配置 `release.yml`：默认仅校验和打包，只有版本标签、显式 `publish=true` 且仓库变量开启时才发布。
- [x] 发布 job 使用 GitHub-hosted runner 和最小 `contents: read`、`id-token: write` 权限，不读取长期 npm token。
- [x] 发布 job 只发布校验阶段输出版本对应的唯一 tarball，不使用包文件通配符。
- [x] 准备 `.github/rulesets/main-dev.json`，包含 PR、`quality` 状态检查、会话解决、禁止删除与 force push 规则。

### 8.1 分支保护

- [x] 为 `main` 配置 ruleset；PR #2 已实际通过该规则合并。
- [x] 要求通过 PR 合并到 `main`。
- [x] 要求 `quality` CI 检查通过。
- [x] 要求所有审查会话已解决；PR #2 合并时未再被该条件阻止。
- [ ] 禁止 force push 和删除 `main`。
- [ ] 根据团队人数决定是否要求额外批准人；单人维护时可不强制第二人批准。
- [x] 确认工作流配置中 `dev` 推送和 PR 同样触发 CI。

### 8.2 GitHub Pages

- [x] 本地执行 `pnpm docs:check` 与 `pnpm docs:build`，106 个 Markdown、343 条站内链接及 VitePress 构建全部通过。
- [x] 确认 Pages 基础路径为 `/openlayersMapKit/`，站点地址和 sitemap hostname 为 `https://yeyongzhi.github.io/openlayersMapKit/`。
- [x] 确认构建产物包含首页、404、sitemap、指南和 API 页面，静态资源 URL 均带仓库基础路径。
- [x] 在 Settings → Pages 中将 Source 设为 GitHub Actions（GitHub 后台截图已核实）。
- [x] 确认 `github-pages` environment 存在（GitHub 后台截图已核实，当前显示 1 条 protection rule）。
- [ ] 将 environment 部署分支限制为 `main`。
- [ ] 新建仓库变量 `PAGES_DEPLOY_ENABLED=true`。
- [x] 首次上线前已使用 `deploy=false` 运行 Documentation rehearsal，仅构建 artifact。
- [x] 构建 artifact 检查通过后再以 `deploy=true` 完成真实部署。

GitHub 后台配置顺序：

1. 先将 `dev` 上当前新版 `pages.yml` 通过 PR 合并到 `main`；本地跟踪的 `origin/main` 仍是旧版 push 自动部署配置，不应直接沿用。
2. 打开仓库 `Settings → Pages`，在 `Build and deployment` 中将 Source 选择为 `GitHub Actions`。
3. 打开 `Settings → Environments → github-pages`；若 Pages 尚未自动创建该 environment，则手动新建。
4. 在 `Deployment branches and tags` 中选择 `Selected branches and tags`，添加分支规则 `main`。
5. 打开 `Settings → Secrets and variables → Actions → Variables`，新建变量 `PAGES_DEPLOY_ENABLED`，首次演练先填 `false`。
6. 打开 `Actions → Documentation rehearsal → Run workflow`，选择 `main`，保持 `deploy=false`；下载并检查 `github-pages` artifact。
7. 演练通过后把 `PAGES_DEPLOY_ENABLED` 改为 `true`，再次运行工作流并将 `deploy=true`，完成首次部署。
8. 访问 `https://yeyongzhi.github.io/openlayersMapKit/`，检查首页、指南、API、刷新深层路由、移动端和资源加载。

### 8.3 npm Trusted Publishing

- [x] 确认 npm 包名和目标版本 `openlayers-map-kit@0.1.0-beta.1` 可用。
- [ ] 确认 npm 账号开启 2FA，维护者权限正确。
- [ ] 在 npm 配置 Trusted Publisher：GitHub 用户/组织 `yeyongzhi`。
- [x] 仓库内元数据已配置为 `yeyongzhi/openlayersMapKit`。
- [x] 仓库内发布工作流文件已固定为 `release.yml`。
- [x] 发布 job 已固定使用 environment `npm`。
- [ ] 在 GitHub 创建 `npm` environment，并限制为 `v*` tag。
- [ ] 新建仓库变量 `NPM_PUBLISH_ENABLED=true`，但在最终批准前可先保持为 `false`。
- [x] 确认工作流发布 job 仅拥有 `contents: read`、`id-token: write`，且不保存长期 npm token。

> 首次发布说明：npm 当前要求包已存在后才能配置 Trusted Publisher。首次发布需要维护者使用短期/细粒度凭据或 npm 网页支持的首次发布流程完成；包建立后立即配置 `yeyongzhi/openlayersMapKit`、`release.yml`、environment `npm` 的 Trusted Publisher，并撤销发布凭据。后续版本只通过 OIDC 工作流发布。

### 8.4 Actions 演练

- [x] PR #2 与合并后的 `main` CI 均已通过。
- [x] 手动运行 Documentation rehearsal，保持 `deploy=false`，build 成功且 deploy 按预期跳过。
- [x] 手动运行 Package rehearsal，保持 `publish=false`；`validate` 用时 2 分 43 秒并成功，`publish` 按预期跳过。
- [ ] 下载并检查两个 workflow 的 artifact；Package rehearsal 已确认生成 1 个 artifact，尚待下载核对文件名与校验值。
- [ ] 对失败日志进行修复，不以跳过步骤或降低门槛作为默认解决方式。

### 阶段验收

GitHub Actions 三条工作流均能成功演练；Pages 和 npm 的权限、environment 与变量已经配置，但尚未执行不可逆的正式发布。

### 8.5 本轮执行记录（2026-09-09）

- 已审计 `ci.yml`、`pages.yml`、`release.yml` 和 ruleset 模板，仓库内配置满足分支门禁、Pages 手动部署及 npm 防误发布要求。
- Pages 本地预检通过：106 个 Markdown、343 条链接有效；首页、404、sitemap、指南和 API 产物齐全，资源基础路径为 `/openlayersMapKit/`。
- 本地跟踪的 `origin/main` 仍使用旧版 main push 自动部署工作流；已将“先合并新版安全工作流”列为 Pages 后台配置的第一步。
- GitHub Pages 已能访问，但当前页面呈现为 GitHub/Jekyll 对 `docs/index.md` 的直接渲染：首页 frontmatter 未生成 VitePress Hero，`::: warning` 以文本显示。由此确认 Pages Source 尚未正确使用 Actions artifact，需在 `Settings → Pages` 切换为 `GitHub Actions` 后重新运行部署。
- GitHub 截图已确认 `github-pages` environment 存在；截图中的 Actions 设置仍停留在 `Secrets` 标签，尚不能确认仓库变量 `PAGES_DEPLOY_ENABLED` 已创建。
- GitHub Pages 后台截图已确认 Source 为 `GitHub Actions`；页面仍显示一周前的旧部署，且后台提示尚无新 workflow deployment，因此需要运行文档工作流生成并部署新的 VitePress artifact。
- PR #2 已合并，远端 `main` 已确认包含新版首页；`quality` 和合并后的 `main` CI 均已通过。用户也已完成一次 Pages 工作流操作，但公网复验仍显示旧 artifact：`compatibility` 返回 404，顶部仍只有“指南 / API / 示例”且无本地搜索。应在 Actions 中新建运行当前 `Documentation rehearsal`（不要对合并前的 `Deploy documentation` 使用 Re-run jobs），选择 `main`、`deploy=true` 后再复验。
- 后续 favicon 修复 PR 已合并并重新部署。最终公网复验确认首页、搜索、兼容性页面与 `/openlayersMapKit/omap.svg` 均返回 200，首页正确引用 SVG favicon。
- 首次 Package rehearsal 已在 `main` 的提交 `3d45b5c` 上运行成功：`validate` 通过并生成 1 个 artifact，`publish=false` 使发布 job 按预期跳过，npm 未发生变更。
- npm 发布工作流已输出并传递精确版本，只发布 `openlayers-map-kit-<version>.tgz`；发布 job 未配置 `NODE_AUTH_TOKEN`。
- GitHub CLI 当前未安装，且本地没有可用于远端管理的已授权会话；因此未擅自修改 GitHub 仓库设置，也未把远端步骤标记完成。
- 下一步需要将当前改动推送到远端，再由管理员执行 ruleset、environment、仓库变量和三条 Actions 演练。

## 9. 阶段 5：首次 npm 预发布

建议先发布 beta 或 rc，不直接将未经真实使用验证的版本标记为 `latest`。

### 9.1 发布前冻结

- [ ] 停止合入非发布必要改动。
- [x] 提交并推送时 `dev` 工作区干净，完整 `pnpm check` 与 PR CI 通过。
- [x] 已创建并合并 `dev → main` PR #2。
- [ ] 在 PR 中列出版本、API 变化、文档、测试、包验收和已知限制。
- [x] 合并后确认 `main` CI 通过。
- [ ] 在本地或 CI 再运行一次 `pnpm release:dry-run`。

```bash
pnpm release:dry-run
```

### 9.2 创建发布标签

- [ ] 标签必须为 `v` 加 package.json 完整版本，例如 `v0.1.0-beta.2`。
- [ ] 标签提交必须位于 `origin/main` 历史中。
- [ ] 推送标签前确认目标 npm 版本不存在。
- [ ] 创建 annotated tag，并推送精确标签。

示例命令，仅在版本确定且全部验收通过后执行：

```bash
git tag -a v0.1.0-beta.2 -m "release: v0.1.0-beta.2"
git push origin v0.1.0-beta.2
```

### 9.3 发布 npm

- [ ] 从匹配版本的 Git tag 手动运行 Package rehearsal。
- [ ] 将 workflow 输入 `publish` 设置为 `true`。
- [ ] 确认 `NPM_PUBLISH_ENABLED=true`。
- [ ] 等待 validate job 完整通过。
- [ ] 确认 publish job 发布的是 validate job 上传的同一 tarball。
- [ ] beta 使用 `beta` dist-tag，rc 使用 `rc`，stable 使用 `latest`。

### 9.4 npm 发布后验证

```bash
npm view openlayers-map-kit version dist-tags peerDependencies
pnpm add openlayers-map-kit@beta ol
```

- [ ] npm 页面展示 README、License、仓库和主页链接。
- [ ] `npm view` 的版本和 dist-tag 正确。
- [ ] 全新目录可以安装，无异常 peer dependency 警告。
- [ ] ESM、CJS 和 TypeScript 项目均能使用。
- [ ] Vite 生产构建成功并可显示地图。
- [ ] 记录 npm 包地址，并加入 README 与文档站。

### 9.5 GitHub Release

- [ ] 使用同一个版本 tag 创建 GitHub Release。
- [ ] 发布说明与 CHANGELOG 一致。
- [ ] 说明安装命令、OpenLayers peer dependency 和已知限制。
- [ ] 预发布版本勾选 Pre-release。
- [ ] 可附加已验证 tarball，但以 npm 包为主要安装来源。

### 阶段验收

npm 上的预发布版本能够被全新项目安装和运行；GitHub Release、CHANGELOG、README 与实际版本一致。

## 10. 阶段 6：GitHub Pages 正式上线

### 10.1 首次部署

- [ ] 确认 main 中的文档对应已发布 npm 版本。
- [x] 确认 VitePress `base` 为 `/openlayersMapKit/`。
- [x] 确认 `PAGES_DEPLOY_ENABLED=true`。
- [x] 已从 `main` 手动运行当前文档部署工作流并成功上线 VitePress。
- [x] 将 workflow 输入 `deploy` 设置为 `true`，build 与 deploy 均成功。
- [x] 记录线上地址：`https://yeyongzhi.github.io/openlayersMapKit/`。

### 10.2 线上验收

预期地址：`https://yeyongzhi.github.io/openlayersMapKit/`

- [x] 当前线上首页正常加载，无 404、白屏和乱码。
- [x] 当前线上 CSS、字体和 JavaScript 资源路径正确。
- [x] 顶部导航和主要侧边栏入口可访问。
- [x] 首页、快速开始、兼容性和深层 `api/core/Map` 均返回 200，直接刷新正常。
- [x] API 深层页面正常加载。
- [x] 站内搜索正常，搜索 `Map` 返回 16 条结果。
- [x] 线上手机端菜单和长代码块横向滚动结构正常。
- [ ] 外部链接指向正确的 GitHub 与 npm 页面。
- [x] 浏览器控制台无关键功能错误；原 favicon 404 已通过带 Pages base 的 `/openlayersMapKit/omap.svg` 修复并完成线上复验。
- [x] README 的文档站链接可访问。

### 10.3 后续部署策略

首次手动部署稳定后，再选择是否自动化：

- [ ] 推荐：main 中 docs 或源码变化且 CI 通过后自动部署 Pages。
- [ ] 保留 `workflow_dispatch` 作为人工重跑入口。
- [ ] 使用 workflow `paths` 限制不相关提交触发文档部署。
- [ ] 确保同一时间只运行一次 Pages 部署。
- [ ] API 变化时在 CI 中验证生成文档是否已同步。
- [ ] 如果保持手动发布，应在每次 npm 发布清单中强制加入 Pages 部署。

### 阶段验收

GitHub Pages 公网访问稳定，README、npm 和 GitHub Release 均能进入正确的版本文档。

## 11. 阶段 7：从预发布推进到稳定版本

### 11.1 真实业务试用

- [ ] 选择至少一个真实 Vite/TypeScript 项目接入 npm beta。
- [ ] 覆盖地图初始化、底图、矢量数据、绘制、选择、编辑、测量和销毁。
- [ ] 测试真实 WMS、WMTS、XYZ、高德或天地图服务。
- [ ] 测试路由切换、组件反复挂载、窗口尺寸变化和异常网络。
- [ ] 记录易用性、类型提示、包体积、性能和内存问题。
- [ ] 将问题转为 GitHub Issue，并标注 stable blocker 与非 blocker。

### 11.2 RC 与稳定版

- [ ] 处理全部 stable blocker。
- [ ] 发布至少一个 rc，冻结公共 API。
- [ ] rc 阶段只接受 bug、文档和兼容性修复。
- [ ] 再次执行完整代码、文档、tarball、Linux CI 和真实消费者验收。
- [ ] 将版本提升至 `0.1.0`，更新 CHANGELOG 和迁移说明。
- [ ] 创建 `v0.1.0` 标签并通过同一 Trusted Publishing 工作流发布。
- [ ] 确认 npm `latest` 指向稳定版本。
- [ ] 发布正式 GitHub Release 并更新 Pages。

### 阶段验收

`npm install openlayers-map-kit ol` 默认安装稳定版本，公开 API 已冻结，文档站与稳定版本一致。

## 12. 发布后的持续维护

### 12.1 每次提交

```bash
pnpm typecheck
pnpm lint
pnpm test
```

### 12.2 每个 PR

- [ ] 为行为变化增加测试。
- [ ] 为公共 API 变化更新文档和 CHANGELOG。
- [ ] 检查 API 基线差异。
- [ ] CI 完整通过。
- [ ] 不提交构建、覆盖率和临时报告目录。

### 12.3 每次发布

```bash
pnpm docs:api
pnpm check:all
pnpm release:check --check-registry
```

- [ ] 更新版本和 CHANGELOG。
- [ ] 验证独立 tarball。
- [ ] 从 main 中的精确提交打 tag。
- [ ] 发布 npm 与 GitHub Release。
- [ ] 部署并验收 Pages。
- [ ] 在全新项目中安装线上版本。

### 12.4 定期维护

- [ ] 每月检查依赖安全更新和 OpenLayers 新版本。
- [ ] 每季度检查 Node.js、pnpm、TypeScript、Vite 和测试工具支持范围。
- [ ] 记录 bundle 体积与覆盖率趋势。
- [ ] 处理 deprecated API，并只在下一个 major 版本删除。
- [ ] 检查文档死链、线上示例和地图服务可用性。
- [ ] 定期验证 Trusted Publishing 与 Pages environment 未被错误修改。

## 13. 推荐的实际执行顺序

以下顺序可直接作为近期工作队列：

1. 完成 Markdown 删除决策，恢复 CHANGELOG 和 CONTRIBUTING。
2. 运行当前 `pnpm check:all`，建立真实失败清单。
3. 按 Map → Feature → Layer/Source → Interaction → Basic/Util 修复代码与测试。
4. 固化公共 API，并更新 API 基线。
5. 完善 JSDoc，重新生成 API 文档。
6. 完善首页、快速开始、核心指南、示例和故障排查。
7. 本地构建并逐页验收 VitePress。
8. 完成真实 tarball 消费测试。
9. 在 GitHub 完成 main ruleset、Pages 和 npm Trusted Publishing 配置。
10. 运行三条 GitHub Actions 演练，不执行真实发布。
11. 发布新的 npm beta，并创建 GitHub Pre-release。
12. 部署 GitHub Pages，完成线上链接与资源验收。
13. 在真实业务项目中试用 beta，修复 blocker。
14. 发布 rc，冻结 API。
15. 发布 `0.1.0` stable，将 npm dist-tag 更新为 latest，并同步 Pages。

## 14. 最终完成定义

只有同时满足以下条件，项目才算完成首个正式交付：

- [ ] main 分支干净、受保护，CI 持续通过。
- [ ] `pnpm check:all` 在本地和 GitHub Actions 均通过。
- [ ] 公共 API 有基线、类型、测试、JSDoc 和用户文档。
- [ ] npm 上存在可安装的稳定版本，`latest` 指向正确。
- [ ] ESM、CJS、TypeScript 和 Vite 消费均已验证。
- [ ] GitHub Release 与 CHANGELOG 完整。
- [ ] GitHub Pages 可公开访问，深层路由和静态资源正常。
- [ ] README、npm、GitHub Release 和文档站互相链接。
- [ ] 至少一个真实业务项目完成安装和核心流程试用。
- [ ] 已形成可重复执行的后续版本发布清单。

---

计划执行过程中，任何阶段发现前置验收失败，都应先修复并重新执行该阶段检查，不应跳过检查直接进入 npm 或 Pages 正式发布。
