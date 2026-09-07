# 仓库管理与发布准备

本轮只准备代码、配置和本地验收；没有推送、创建 tag/Release、运行远端工作流或发布 npm/Pages。

## 分支

- `main`：已验收代码。功能在短期分支开发，PR 到 `dev`，通过验收后由 `dev` PR 到 `main`。
- 修复直接进入 `main` 时，随后同步回 `dev`。`dev` → `main` 使用 merge commit，避免 squash 后两个长期分支持续出现重复提交。
- 本轮本地 `dev` 已快进到 `0fab42d`；远端 `dev` 未改动。工作分支为 `codex/release-readiness`。
- `.github/rulesets/main-dev.json` 是待导入的 GitHub ruleset：要求 PR、GitHub Actions 的 `quality` 检查及解决审查会话，禁止强推和删除；单人维护不强制第二人批准。
- 在 Settings → Rules → Rulesets 导入 JSON；保留已有规则，先检查是否已有等价规则，避免重复添加。GitHub Actions integration id 为 15368。此 JSON 文件本身不会自动修改远端设置。
- 短期分支合并后删除，保留 `main` 与 `dev`。可以开启仓库的自动删除已合并分支选项，受保护的长期分支继续保留。

## 统一检查

安装依赖后：

```sh
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
pnpm check:all
```

`pnpm check` 包含类型、Lint、格式、公开导出名称基线、文档链接、Vitest 覆盖率、发布规则测试、库构建、浏览器夹具类型、示例、ESM/CJS/声明消费、文档构建和包结构检查。

`pnpm check:all` 再执行浏览器及独立 tarball 验收。修改源码后应先构建再单独执行 `pnpm test:browser`，避免测试旧产物。下载 Chromium 受限时，可设置 `PLAYWRIGHT_CHANNEL=chrome` 或 `msedge` 使用已有浏览器；CI 使用下载的 Chromium。

API 基线目前比较公开名称，不会发现全部签名变化，消费者类型负向断言用于补充。浏览器测试使用本地矢量数据，覆盖绘制、修改、选择、测量、Popup 与销毁重建；这不是全部地图服务、浏览器或内存泄漏的完整证明。

`pnpm check:tarball` 需要现有构建。它只生成 `artifacts/` 中的包，在 `.tmp-package-consumer/` 下安装 tarball，并验证 ESM、CJS、类型和 Vite 构建。两个目录均被 Git 忽略；安装需要 npm 网络访问。它不会发布包。

## Pages：只准备，不部署

`pages.yml` 只支持手动触发。默认 `deploy=false`，构建文档并保存 artifact；不要求站点已启用。真正部署还需 `PAGES_DEPLOY_ENABLED=true` 且运行 ref 为 `main`。

原工作流在 `configure-pages` 失败；新配置将该步骤移到真正部署阶段，避免阻塞离线演练。远端当前 Pages 是 Jekyll；这次没有切换发布源，也没有替换站点。

未来获准部署后，先把 Settings → Pages → Source 设置为 GitHub Actions，再核对 `github-pages` environment 只允许 `main`。启用变量并手动选择部署后，验收首页、深层链接刷新、搜索及资源路径。

## npm：只准备，不发布

```sh
pnpm release:dry-run
# 可选：只读确认目标版本在 npm 上尚不存在
pnpm release:check --check-registry
```

演练只校验、测试、打包和安装测试，不执行 `npm publish`。`release.yml` 也只接受手动触发，默认 `publish=false`；校验 job 不受发布开关影响，因此可以真正演练。

未来真实发布需同时满足：

1. 明确授权发布，所有本地及远端验收通过。
2. Git tag 为 `v` 加 package.json 版本，tag 提交在 `origin/main` 历史中，发布 checkout 干净，目标 npm 版本不存在。
3. `NPM_PUBLISH_ENABLED=true`，手动输入 `publish=true`，从匹配的 tag 运行。
4. npm Trusted Publisher 对应用户 `yeyongzhi`、仓库 `openlayersMapKit`、文件 `release.yml`、environment `npm`；允许直接 publish。首次包创建与账号权限需在 npm 侧另行核对。
5. GitHub `npm` environment 应仅允许 `v*` tag，并按维护者协作情况设置审批。

发布 job 使用 Node 22 与 npm 11.5.1，只上传 validate job 检验的同一份 tarball；不重新构建。预发布分别使用 `alpha` / `beta` / `rc` dist-tag，正式版使用 `latest`。两个发布变量均应维持关闭，直到单独授权。

## 仍待外部执行的事项

- 在 GitHub 导入/应用 ruleset、同步远端分支，验证 Linux Actions。
- npm 账号和 Trusted Publisher、环境及变量的实际配置。
- 获准发布后再切换 Pages 发布源、部署文档和发布 npm。
- 选择真实业务项目完成页面切换、业务数据与地图服务试用；独立消费者不能替代这一步。

参考：[GitHub rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/managing-rulesets-for-a-repository)、[Pages 工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)、[npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers/)。
