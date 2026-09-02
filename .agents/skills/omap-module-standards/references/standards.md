# OMap 模块规范

## 1. 公开 API 与兼容性

- 修改导出前运行 `pnpm audit:api`，并与 `scripts/public-api-baseline.json` 比较。
- 正确拼写使用 `Valid`、`Invalid`、`LngLat`。已发布的错误拼写仅作为 `@deprecated` 兼容别名保留，并与正确名称共用实现。
- 内部类型、参数、返回值、文件引用和文档统一使用正确拼写。
- 不因重构删除、改名或新增根导出；确需改变公开契约时明确告知用户并单独处理基线。

## 2. 命名与核心承载值

前导下划线 `_xxx` 只表示包装对象的核心承载值，即该类封装、代理或规范化后的主要底层表示，不局限于 OpenLayers 实例。

```ts
private _map: OlMap
private _color: string
private _lngLat: OlCoordinateType
private _extent: OlExtentType
private _pixel: OlPixelType
private _size: OlSizeType
```

- 核心承载字段必须是 `private`，或因继承确有必要时使用 `protected`。
- 使用领域名 `_color`、`_extent`，避免无语义的 `_value`。
- 普通状态、配置、缓存、管理器、事件集合、局部变量和内部方法不使用前导下划线。
- 内部方法使用 lowerCamelCase，例如 `init()`、`createFeature()`、`createMessage()`。
- 未使用的接口参数可以使用前导下划线；方法为兼容外部接口确有需要时可使用尾随下划线。
- 通过 `getMap()`、`getColor()`、`toArray()` 等 API 访问承载值。可变数组或对象默认返回副本。

## 3. 错误与返回值契约

| 场景 | 行为 |
| --- | --- |
| 必填参数缺失 | 抛出 `OMapError`，错误码为 `InvalidParameter` |
| 类型、范围或枚举非法 | 抛出 `OMapError`，错误码为 `InvalidParameter` |
| 可恢复的重复添加或删除不存在对象 | `warn_()`，状态保持不变 |
| 批量输入明确允许跳过坏数据 | `warn_()`，返回过滤后的结果 |
| 查询无结果 | 返回既定的 `undefined`、`null` 或空数组，不警告 |

- 同类事件订阅 API 对缺失事件名、非法事件名和非法回调采用一致失败策略。
- 错误测试至少验证错误类型和错误码；需要时验证参数上下文。
- 不用“警告后返回 `undefined`”处理必填参数错误。
- Source 组合参数错误应定位到具体参数，避免模糊的“参数列表错误”。

## 4. 继承契约

- 项目启用 `noImplicitOverride`；真正重写父类成员必须显式写 `override`。
- 子类参数不能破坏替换原则，返回类型只能合法协变收窄。
- 子类复用父类持有的原生实例，不创建同义字段。
- 初始化和生命周期钩子沿用父类语义、命名和可见性。
- 修改 Layer、Source、Interaction 继承链时检查父类和相邻子类。

## 5. TypeScript 与 ESLint

- 遵守 `eslint.config.mjs` 中的 naming convention、成员可见性、类型导入、变量遮蔽、`prefer-const` 和 JSDoc 规则。
- 类型导入使用 `import type` 或项目配置允许的行内 type import。
- 新代码避免 `any`；确因第三方边界使用时局部化并保留明确类型出口。
- 允许 TypeScript 推断清晰的返回类型；不要为了形式统一给所有方法机械补返回类型。
- `pnpm lint` 以 `--max-warnings 0` 运行，不新增警告或扩大例外范围。

## 6. JSDoc

- 注释说明调用者无法从类型直接推断的语义、约束、异常和示例。
- 使用 `@returns`，不用 `@return`。
- 稳定异常契约使用 `@throws`；兼容名称写明 `@deprecated` 和替代 API。
- 默认不写 `@class`、`@classdesc`、`@author`、类级 `@version`、`@createDate` 或 `@updateDate`。
- 类注释使用简短摘要，可按需增加 `@example`、`@see`、`@throws`、`@remarks`。
- 暂不强制所有导出成员都必须有 JSDoc，但已有 JSDoc 必须通过标签、参数名、返回值和格式校验。

## 7. 验证

开发中至少运行受影响模块测试及：

```sh
pnpm typecheck
pnpm lint
pnpm format:check
pnpm audit:api
```

交付模块级规范整改或公开契约改动前运行：

```sh
pnpm check
pnpm audit:api
```

验收要求：类型、Lint、格式、测试覆盖率、库与示例构建、消费者检查、文档构建、包检查通过，公开 API 与基线一致。不要在验收失败时把计划标记为完成。
