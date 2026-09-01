# OMap ESM 案例中心

这个独立项目通过 pnpm workspace 连接根包，并使用根包的 `package.json` 与 `dist` 入口消费 OMap，不直接导入 `src`。

## 启动

首次运行时，在仓库根目录安装全部 workspace 依赖并生成最新 SDK 产物：

```bash
pnpm install
pnpm build
```

然后从仓库根目录启动示例：

```bash
pnpm example:vite:dev
```

## 验证内容

- ESM 入口能被 Vite 解析和打包。
- OMap 复用示例项目安装的 OpenLayers peer dependency。
- 高德矢量、影像与道路底图可以切换。
- 点、线、面要素及样式可以正常渲染。
- Zoom、FullScreen 控件和地图视图方法可以使用。
- 地图可以销毁并重新创建。

执行生产构建：

```bash
pnpm example:vite:build
```
