# 贡献指南

## 开发环境

- Node.js 20 或更高版本
- pnpm 10.4.1（以 `packageManager` 字段为准）

安装依赖后，使用 `pnpm check:all` 运行提交前的完整门禁。该命令包含类型检查、Lint、格式检查、覆盖率测试、库构建、消费者冒烟、文档构建和发布包检查。

## 修改原则

- 公共 API 变更必须同步类型、测试、文档和更新日志。
- 新资源必须提供可重复调用的 `remove()` 或 `dispose()`，并验证 DOM、Overlay、listener、timer 与缓存均被释放。
- 外部未知输入使用 `unknown` 和 type guard；避免在公共声明中新增无意义的 `any` 或 `Function`。
- OpenLayers 原生 Feature 必须通过统一 resolver 转换，不能自行重复构造 wrapper。
- 机械格式调整与行为变更尽量分开提交，保留易审查的变更历史。

## 测试与提交

1. 为正常路径、边界条件和清理路径增加测试。
2. 执行 `pnpm check:all`。
3. 在 `CHANGELOG.md` 的 `Unreleased` 中记录面向使用者的变化。
4. 提交信息应简洁说明模块与行为，例如 `fix(map): release native listeners on dispose`。

浏览器行为应使用 Playwright 验证；无需真实浏览器的模块逻辑优先使用 Vitest 与 happy-dom。

## 发布

维护者按 `alpha → beta → rc → stable` 推进版本。GitHub Actions 负责完整门禁与打包；npm 发布使用 Trusted Publishing，不在仓库保存长期 token。真实发布默认关闭，详情见文档站的版本与发布策略。

## 分支与发布边界

功能分支 PR 到 `dev`，验收后 `dev` PR 到 `main`；紧急修复合入 `main` 后同步回 `dev`。详见 [仓库管理与发布准备](REPOSITORY_SETUP.md)。

首次运行完整检查前执行 `pnpm exec playwright install chromium`。`pnpm check:all` 还包括公开 API 基线、文档链接、浏览器与独立 tarball 消费者检查。

Pages/npm 工作流默认只演练。发布需单独授权并开启对应变量及手动输入。
