# 版本与发布策略

OMap 遵循语义化版本，并采用以下预发布节奏：

1. `alpha`：工程链路或 API 仍可能显著调整，仅供内部验证。
2. `beta`：核心 API 已形成，允许试用，但兼容性与文档仍可能补充。
3. `rc`：完成真实项目试用后的候选版本，只接受阻塞发布的问题修复。
4. `stable`：公开稳定版本；破坏性变更只进入新的主版本。

每次发布必须通过 `pnpm check:all`。`pnpm release:dry-run` 只校验、测试和打包，不上传 npm。发布工作流默认仅演练；真实发布需单独授权、匹配版本的 tag、`NPM_PUBLISH_ENABLED=true` 及手动输入 `publish=true`，并使用 GitHub OIDC Trusted Publishing。Beta 使用 `beta` dist-tag，只有正式版使用 `latest`。

废弃 API 至少保留一个预发布周期，并在类型声明、迁移指南和 `CHANGELOG.md` 中同时说明替代方案与预计移除版本。
