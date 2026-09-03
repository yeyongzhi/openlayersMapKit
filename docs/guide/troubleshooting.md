# 故障排查

## 地图为空白

确认目标元素已挂载且具有非零宽高，并在布局变化后调用地图的 `updateSize()`。在 SSR 或构建阶段不要创建 Map，只在浏览器挂载阶段创建。

## 页面切换后事件重复触发

在卸载阶段调用 `map.dispose()`，并确保自定义订阅也通过返回的移除函数或事件对象释放。不要在每次渲染时重复注册监听器。

## Vue 中对象行为异常

OpenLayers 与 OMap 类实例不适合深层响应式代理。使用 `shallowRef` 保存实例，并在 `onUnmounted` 中释放。

## ESM 或 CommonJS 加载失败

只从包根入口 `openlayers-map-kit` 导入。确认 Node.js 版本不低于 20，并重新安装与 lockfile 一致的依赖。可运行 `pnpm build && pnpm check:consumers` 复现仓库的消费验证。

## 类型与运行时不一致

不要引用 `src` 或 `dist` 内部路径。清理编辑器 TypeScript 缓存后运行 `pnpm typecheck`；若仍有问题，请在 issue 中提供最小复现、TypeScript 版本、模块系统和导入语句。

## 发布包诊断

运行 `pnpm check:package`。ESM 使用 `.d.mts` 声明桥接，CommonJS 使用 `.d.ts`；`publint` 与 Are The Types Wrong 检查均应无错误或警告。
