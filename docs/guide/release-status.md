# 发布状态

最近本地验收日期：2026-09-07。当前版本 `0.1.0-beta.1`，本轮仅准备和演练，未执行任何发布。

## 已完成的准备

- 类型、Lint、Vitest、覆盖率、库和示例构建、消费者、文档与包检查均有统一入口。
- 新增 Playwright 浏览器测试，使用本地矢量数据验证渲染、Draw、Modify、Select、Measure、Popup 与销毁重建。
- 增加消费者类型负向断言，验证泛型属性、事件 payload 与非法参数。
- 增加独立 tarball 安装，检查 ESM、CJS、声明及 Vite 构建。
- 修复浏览器验收发现的 Draw 重复完成事件。
- 本地 `dev` 已同步 `main` 的两次修复，准备工作位于独立分支。
- 增加 LF 规则、统一 CI，以及默认关闭的 Pages/npm 手动演练入口。

## 仍需完成

- 将当前一次性 PR 合入 `dev` 后，后续直接在 `dev` 开发；在 GitHub 仅保护 `main`。
- npm Trusted Publishing、GitHub environments 和仓库变量的实际配置。
- 在真实业务项目中完成试用；本地消费者不代表业务验收完成。
- 在单独授权后切换 Pages 发布源并部署 VitePress。当前远端站点仍是 Jekyll。
- 在单独授权后创建版本 tag/Release 并发布 npm Beta。

## 复跑

```sh
pnpm exec playwright install chromium
pnpm release:dry-run
```

下载 Chromium 受限时可通过 `PLAYWRIGHT_CHANNEL=chrome` 使用本机 Chrome。本轮本地浏览器验收使用该方式，CI 配置使用 Chromium；Linux CI 尚未运行。

`release:dry-run` 执行 `release:check` 与 `check:all`，只验证和打包，不调用发布命令。仓库根目录 `REPOSITORY_SETUP.md` 包含完整配置、命令和未应用的远端设置清单。历史计划中的数字与勾选保留为阶段记录，不代表当前验收结果。
