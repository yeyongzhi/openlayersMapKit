---
name: git-commit-push
description: 整理当前 Git 工作区改动，依据项目 script/commit.ts 的提交规范生成“标题 + 编号改动点”message，执行提交并推送当前分支，最后汇报耗时、文件数、增删行数、完整提交内容和目标分支。用户说“帮我提交一下代码”“提交代码”“提交并推送”“执行 pnpm run commit”“帮我 commit/push”时使用。
---

# Git 提交与推送

从检查改动开始计时，完成提交和推送后停止计时。全程保留用户已有改动，不修改业务代码，不使用 `git reset --hard`、`git checkout --` 等破坏性命令。

## 1. 读取项目提交规范

每次执行前完整读取 `script/commit.ts` 和 `package.json` 中的 `commit` script，以当前代码为准，不凭 Skill 中的示例猜测规则。

确认当前分支、上游和工作区状态：

```powershell
git branch --show-current
git status --short
git status --branch --short
```

若处于 detached HEAD、存在未解决冲突、找不到提交脚本或没有任何改动，停止并向用户说明。检查改动中是否含 `.env`、密钥、token、证书或明显生成物；发现疑似敏感信息时先暂停，不得提交或推送。

## 2. 整理改动

同时检查已暂存、未暂存和未跟踪文件：

```powershell
git diff --stat HEAD
git diff --name-status HEAD
git diff HEAD
git ls-files --others --exclude-standard
```

对未跟踪文本文件读取必要内容。按业务含义归纳改动，不把文件名列表直接当成提交说明。由于 `script/commit.ts` 会执行 `git add .`，message 必须覆盖当前工作区将被纳入的全部文件；若存在明显无关的多组改动且无法形成一个合理提交，先请用户确认提交范围。

## 3. 生成 message

从 `script/commit.ts` 当前定义的类型中选择最符合主要改动的一种。若仍采用现有规则，类型映射为：

- `feature`：功能开发、迭代
- `fix`：BUG 修复
- `style`：样式调整
- `refactor`：重构
- `test`：测试
- `build`：架构、依赖
- `perf`：性能优化
- `ci`：CI、脚本
- `docs`：文档
- `chore`：杂项
- `revert`：回滚

传给 `pnpm run commit` 的输入采用以下结构，不手动重复 emoji 和类型前缀：

```text
简洁明确的中文标题
1. 第一个具体改动点
2. 第二个具体改动点
3. 第三个具体改动点
```

标题描述整体结果，编号正文按功能聚合，避免“修改代码”“优化页面”等空泛表述。最终提交信息应由脚本组装成：

```text
✨️ feature: 简洁明确的中文标题

1. 第一个具体改动点
2. 第二个具体改动点
3. 第三个具体改动点
```

提交前在 commentary 中向用户展示准备采用的类型和完整 message。用户已明确要求提交并推送，因此展示后直接继续，不重复索要确认；脚本自身要求的确认仍选择“是”。

## 4. 提交并推送

在支持交互输入的终端运行：

```powershell
pnpm run commit
```

依次选择已确定的提交类型，输入标题和编号正文，以空行结束输入，并确认提交。不得绕过 `script/commit.ts` 或项目 Husky 校验直接调用 `git commit`。

提交成功后记录新提交哈希和最终 message，再推送当前分支：

```powershell
git rev-parse HEAD
git log -1 --format=%B
git push
```

若当前分支尚无上游，使用明确的当前分支名执行 `git push -u origin <branch>`。Push 失败时不得撤销已成功的 commit；保留现场并报告错误和建议处理方式。

## 5. 统计并汇报

以刚创建的提交为统计边界：

```powershell
git show --numstat --format= HEAD
git show --shortstat --format= HEAD
git status --branch --short
```

统计并汇报：

- 从开始检查到 push 完成的总耗时。
- 本次提交文件数。
- 文本内容新增行数、删除行数及变更总行数（新增 + 删除）；二进制文件单独说明，不虚构行数。
- 完整提交 message，保留标题、空行和编号正文。
- commit 短哈希。
- “已提交、推送到 `<branch>` 分支”；只有 push 确实成功时才能这样表述。
- 提交后的工作区是否干净；若仍有改动，列出未提交文件。

最终答复使用中文并保持简洁，示例：

```text
提交并推送完成，用时 1分18秒。

- 分支：feature/example
- Commit：abc1234
- 文件：6 个
- 行数：新增 120 行，删除 35 行，共变更 155 行
- 工作区：干净

本次提交内容：

✨️ feature: 完成巡检打卡接口联调

1. 接入真实定位和打卡接口
2. 补充任务详情中的打卡记录展示
3. 优化打卡弹窗与未打卡拦截交互

已提交、推送到 feature/example 分支。
```
