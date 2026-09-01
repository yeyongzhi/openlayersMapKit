# OMap UMD 案例中心

这个示例不使用 ESM import，而是通过普通 `<script>` 标签加载包含 OpenLayers 的 UMD 产物，并从全局变量 `window.OMap` 调用 API。

## 启动

先在仓库根目录构建 SDK，再启动示例：

```bash
pnpm build
pnpm example:html:dev
```

启动或构建前，脚本会把最新 UMD 文件、OpenLayers 样式和共享案例样式复制到被忽略的 `vendor/`，避免提交重复构建产物。

生产构建：

```bash
pnpm example:html:build
```
