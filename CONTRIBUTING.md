# 贡献指南

感谢参与 openlayersMapKit。提交修改前，请先阅读 [项目整体说明](PROJECT_OVERVIEW.md)；版本发布和文档上线工作请按[完整交付计划](PROJECT_COMPLETION_PLAN.md)执行。

## 开发环境

- Node.js 20 或更高版本。
- pnpm 10.4.1，以 `package.json` 的 `packageManager` 字段为准。
- 浏览器测试默认使用 Chromium。

```bash
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
```

## 分支流程

- `dev` 用于日常开发。
- `main` 用于稳定发布，通过 `dev → main` 的 Pull Request 更新。
- 功能和修复应优先进入 `dev`；紧急修改 `main` 后必须同步回 `dev`。
- 不要在未经明确授权时发布 npm、创建 Release 或部署 Pages。

## 修改原则

- 公共 API 变更必须同步实现、类型、测试、文档和 `CHANGELOG.md`。
- 修改公开导出前运行 `pnpm audit:api`，检查差异后再决定是否更新 API 基线。
- 已发布的错误拼写应保留为 `@deprecated` 兼容别名，并指向同一实现。
- 新资源必须提供可重复调用的 `remove()` 或 `dispose()`。
- 销毁测试应验证 DOM、Overlay、listener、timer 和缓存均被释放。
- 外部未知输入使用 `unknown` 和类型守卫，避免新增无意义的 `any` 或 `Function`。
- OpenLayers 原生 Feature 必须通过统一 resolver 转换，不能重复构造 wrapper。
- 机械格式调整与行为修改尽量分开，保持变更易于审查。

`src/module` 下的 TypeScript 修改还应遵守 `.agents/skills/omap-module-standards/references/standards.md`。

## 测试要求

为正常路径、非法输入、边界条件和资源清理路径添加测试。无需真实浏览器的逻辑使用 Vitest；依赖 DOM、OpenLayers 渲染或真实交互的行为使用 Playwright。

开发过程中按影响范围运行：

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

提交 Pull Request 前运行完整门禁：

```bash
pnpm check:all
```

该命令包含类型、Lint、格式、API 基线、文档链接、覆盖率、发布规则、构建、示例、消费者、文档站、浏览器及 tarball 验收。tarball 隔离安装需要 npm 网络访问。

## 文档要求

- 用户可观察的变化记录到 `CHANGELOG.md` 的 `Unreleased`。
- 新增或修改公共 API 后运行 `pnpm docs:api`，检查生成的 API 页面和侧边栏。
- 示例代码必须可以复制运行，并说明 CSS、容器尺寸、Token 和网络前提。
- 提交前运行 `pnpm docs:check` 和 `pnpm docs:build`。
- 不要直接维护 `dist`、coverage、测试报告或 VitePress 构建产物。

## 提交与 Pull Request

提交信息应简洁说明类型、模块和行为，例如：

```text
fix(map): release native listeners on dispose
docs(guide): add vector layer example
test(source): cover invalid tile configuration
```

Pull Request 应说明：

- 用户可观察到的变化及原因。
- 公共 API 和兼容性影响。
- 已执行的测试和检查。
- 是否需要版本调整、迁移说明或文档部署。

合并代码不代表授权发布。npm 和 GitHub Pages 工作流默认仅执行演练，真实发布必须单独批准并满足交付计划中的发布条件。
