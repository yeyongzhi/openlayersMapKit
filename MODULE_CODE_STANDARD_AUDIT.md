# `src/module` 代码规范审计

> 审计日期：2026-09-01  
> 审计范围：`src/module/basic`、`control`、`core`、`interaction`、`layer`、`source`、`util`  
> 审计性质：发布前静态规范审计。本文件记录现状与整改规则，不代表已修改对应实现。

## 1. 审计结论

当前 `src/module` 共包含 **7 个一级模块、204 个 TypeScript 文件、约 70 个导出类**。重构后的 `core`、`interaction`、`layer`、`source` 已形成较清晰的包装层结构，公开 API 也大体遵循 OpenLayers 命名；但新旧代码之间仍存在可辨认的风格断层。

综合结论：**功能结构已接近可发布状态，代码规范尚未完全收口。** 发布前不建议大规模重命名公开 API，但应先固定规则、补充自动校验，再分批处理内部命名和错误语义。

当前最明确的优点：

- 公开类名基本使用 PascalCase，公开方法基本使用 lowerCamelCase。
- Geometry、Layer、Source、Map 的代理方法大多沿用 OL，例如 `getCoordinates`、`setCoordinates`、`getSource`、`setVisible`、`addFeature`。
- 原生 OL 包装实例已经形成 `_map`、`_layer`、`_source`、`_interaction` 等统一倾向。
- 参数错误主要通过 `error_()` 抛出统一的 `OMapError`，没有在 `src/module` 中散落直接 `throw new Error()`。
- 错误文案主要通过 `getPackageMessage()` 和 `commonMessage` 组合，具备统一基础。

需要收口的主要问题：

1. `_` 前缀同时用于原生实例字段、普通字段、局部变量和内部方法，语义不唯一。
2. `isValid*`、`paramsInvalid*`、`validList` 等历史拼写仍大量存在。
3. `LngLat` 与 `LngLat` 并存；虽然已有兼容别名和废弃说明，内部迁移尚未完成。
4. `error_()` 与 `warn_() + return` 的使用边界不统一，同类 API 的失败行为可能不同。
5. ESLint 尚未配置命名、成员可见性、显式返回类型等规则，很多规范只能依靠人工保持。
6. 旧代码仍较多使用 `let`、临时变量 `_params`、`_coordinates`，与重构代码的可读性不一致。

## 2. 建议确立的统一规范

### 2.1 类、类型、常量与文件

| 对象                       | 规范                                          | 示例                                       |
| -------------------------- | --------------------------------------------- | ------------------------------------------ |
| 类、接口、类型别名         | PascalCase                                    | `VectorLayer`、`OMapVectorLayerParamsType` |
| 方法、函数、参数、普通变量 | lowerCamelCase                                | `setCoordinates`、`sourceOptions`          |
| 枚举式常量、默认配置       | UPPER_SNAKE_CASE                              | `DEFAULT_XYZ_SOURCE_PARAMS`                |
| 布尔变量或方法             | `is` / `has` / `can` / `should` 开头          | `isDisposed()`、`hasFeature()`             |
| 类型守卫                   | `isValidXxx`                                  | `isValidCoordinate()`                      |
| 目录和类入口               | 当前结构继续使用 PascalCase 目录 + `index.ts` | `VectorLayer/index.ts`                     |

公开名称一旦发布便属于兼容性契约。修正公开拼写时，应先增加正确名称并保留旧名称为 `@deprecated` 别名，至少跨越一个次版本后再考虑删除。

### 2.2 字段和变量的下划线规则

建议将前导下划线严格限定为：**包装类持有的 OL 原生实例字段**。

推荐字段：

```ts
private _map: OlMap
private _view: OlView
protected _layer: OlLayer
protected _source: OlSource
protected _interaction: OlInteraction
protected _control: OlControl
protected _feature: OlFeature
protected _geometry: OlGeometry
private _popup: OlOverlay
private _style: OlStyle
private _format?: OlFormat
private _projection: OlProjection
```

规则：

- 原生实例字段使用 `_xxx`，并显式写出 `private` 或 `protected`。
- 普通状态字段不使用 `_`，例如 `disposed`、`properties`、`events`。
- 局部变量不使用 `_`；将 `_params`、`_options`、`_coordinates` 改为 `params`、`resolvedOptions`、`normalizedCoordinates`。
- 仅为满足接口但未使用的参数可以使用 `_param`，并保留当前 ESLint 忽略规则。
- 内部方法仍使用 lowerCamelCase，不建议使用 `_initXxx()`；改用 `initXxx()`、`createFeature()`、`removeInteractionLayer()`。
- 不建议通过字段公开原生实例；统一通过 `getMap()`、`getLayer()`、`getSource()` 等方法返回。

当前符合方向的字段包括 `_map`、`_view`、`_layer`、`_sourceWrapper`、`_source`、`_interaction`、`_control`、`_feature`、`_geometry`、`_popup`、`_style`、`_format`、`_projection`。

当前需要整改的典型位置：

- `basic/Color/index.ts`：`_color` 不是 OL 原生实例，不应使用下划线。
- `basic/Extent`、`LngLat`、`Pixel`、`Size`：底层数组字段是否保留下划线需要统一；若规则仅用于 OL 实例，应改为普通私有字段。
- `core/Feature/BasicFeature/index.ts`：`_init()`、`_initByFeature()`、`_createFeature()` 是方法名例外。
- `interaction/DragBox`、`Modify`：`_initDragBoxEvent()`、`_initModifyEvent()`。
- `layer/BaseLayer/index.ts`：`_packageName`、`_createMessage` 并非原生实例。
- 多个模块局部变量广泛使用 `_options`、`_params`、`_coordinates`、`_source`。

### 2.3 方法命名与 OpenLayers 对齐

当 OMap 方法只是代理 OL 方法时，名称应保持一致：

- OL 是 `getCoordinates()` / `setCoordinates()`，OMap 不应改成 `getLngLat()` / `setLngLat()`。
- OL 是 `addFeature()` / `addFeatures()`，OMap 应保持相同名称和单复数语义。
- OL 是 `getSource()`、`setVisible()`、`getExtent()`，包装层保持同名。
- 包装层特有能力可以增加新名称，例如 `getSourceWrapper()`、`getLayerById()`，但名称必须说明额外语义。

当前整体执行较好：

- `core/Feature` 的 Point、LineString、Polygon、Multi* 基本保持 OL Geometry 方法名。
- `source/VectorSource` 的 `addFeature(s)`、`removeFeature(s)`、`getFeatures*` 基本保持 OL 语义。
- `layer/BaseLayer`、`Map`、`control` 和 `interaction` 的常用 getter/setter 基本对齐。

需要注意的边界：

- `LngLat.setLng()` / `setLat()` 属于 OMap 值对象自身语义，不是 Geometry 的替代方法，可以保留。
- `Circle.setCenter()` 是 OL Circle 的原生语义；额外提供 `setCoordinates()` 时应明确它只是兼容别名。
- `VectorSource.getFeatureByOlFeature()` 暴露了实现细节，建议文档标注为桥接 API，而不是普通查询 API。
- `VectorSource.onVector()` 与 OL 的通用 `on()` 不一致。若用于类型收窄，应说明原因；长期可考虑提供兼容的 `on()` 重载。
- `getMap()`、`getLayer()`、`getSource()` 等应始终表示获取原生实例；获取包装实例应明确使用 `getSourceWrapper()` 等名称。

### 2.4 继承与子类方法规则

子类应遵守以下约束：

1. 父类已有方法时，子类不得用新名称实现同一语义。
2. 重写父类方法必须使用 `override`，参数不能收窄到破坏替换原则，返回值只能协变收窄。
3. 子类访问原生实例时复用父类 `_layer`、`_source`、`_interaction`，不要再创建同义字段。
4. 子类初始化钩子使用统一名称和可见性，例如 `protected initLayerEvent()`。
5. `dispose()`、`remove()`、`setMap()`、`getProperties()` 等生命周期方法保持父类契约。

现状：Layer、Source、Interaction 三条继承链整体较一致；但项目尚未开启 `noImplicitOverride`，也很少显式使用 `override`，编译器无法阻止子类方法因拼写变化而意外脱离父类契约。

建议在完成第一轮整改后开启：

```json
{
  "compilerOptions": {
    "noImplicitOverride": true
  }
}
```

### 2.5 参数缺失、非法参数和错误格式

当前统一错误链路为：

```ts
const PACKAGE_NAME = 'Point'
const createMessage = getPackageMessage(PACKAGE_NAME)

if (!isDefined(coordinates)) {
  error_(createMessage('setCoordinates', commonMessage.paramsNotDefined('coordinates')))
}
if (!isValidCoordinate(coordinates)) {
  error_(createMessage('setCoordinates', commonMessage.paramsInvalidFormat('coordinates')))
}
```

最终错误大致为：

```text
⚠️OMap Error 📦Point【setCoordinates】: 参数coordinates不能为空
```

扫描结果：

- `error_()` 调用约 **344** 处。
- `warn_()` 调用约 **63** 处。
- `createMessage()` 调用约 **407** 处。
- `paramsNotDefined()` 调用约 **134** 处。
- `paramsInvalidFormat()` 调用约 **119** 处。
- `src/module` 内没有直接 `throw new Error()`，集中式错误机制执行良好。

建议固定为以下语义：

| 场景                                   | 行为                                        |
| -------------------------------------- | ------------------------------------------- |
| 必填参数缺失                           | 抛出 `OMapError`，错误码 `InvalidParameter` |
| 参数类型、范围、枚举非法               | 抛出 `OMapError`，错误码 `InvalidParameter` |
| 对象已释放后继续调用                   | 抛出 `OMapError`，使用明确的生命周期错误码  |
| 重复添加、删除不存在对象等可恢复操作   | `warn_()` 并保持状态不变                    |
| 批量输入中存在个别坏数据且设计允许过滤 | `warn_()`，返回过滤后的结果                 |
| 查询没有结果                           | 返回 `undefined` / `null` / 空数组，不警告  |

当前不一致：

- `Popup.on()` / `once()` 对非法事件或回调使用 `warn_()` 并返回 `undefined`，而 Control、Interaction 的同类方法会抛出错误。
- `ProjUtil.fromLonLat()` / `toLonLat()` 对缺失坐标使用警告并返回 `undefined`；其他大多数必填参数 API 会抛错。
- 部分 Source 方法把多个参数合并成一次通用格式错误，无法准确指出具体参数。
- 错误辅助函数自身存在 `Invalid` 拼写，导致新代码持续复制错误名称。

建议先统一事件订阅 API 和 Util API 的失败策略，再更名错误辅助函数：

```ts
paramsInvalidFormat()
paramsInvalidEnum()
paramsListInvalidFormat()
haveInvalidDataItem()
```

旧函数可暂时作为废弃别名保留，避免内部一次性大改和潜在外部导入破坏。

## 3. 小驼峰扫描结论

公开实例方法没有发现明确的 snake_case 命名，整体符合 lowerCamelCase。以下名称虽然包含大写缩写，仍符合项目领域惯例：

- `getFeatureByOlFeature()`
- `createFromWMTSTemplate()`
- `OMap*` 类型名
- `WMSLayer`、`WMTSLayer`、`XYZLayer`、`OSMSource`

建议约定：

- 方法名中的品牌或协议缩写，除非处于名称开头，否则允许保留全大写，如 `createFromWMTSTemplate`。
- 普通单词必须小驼峰，禁止 `get_feature`、`GetFeature`。
- `OL` 在变量和方法中统一写作 `Ol`，与项目现有 `OlMap`、`OlSource` 类型前缀一致。

## 4. 拼写与术语问题

### P1：应优先处理

- `Valid` 应为 `Valid`：`isValidColorRGB`、`isValidPopup`、`isValidControl`、`isValidInteraction`、`isValidFormatType` 等。
- `Invalid` 应为 `Invalid`：所有 `paramsInvalid*`、`haveInvalidDataItem`。
- `validList` 应为 `validList`。
- `LngLat` 应逐步迁移为 `LngLat`；项目已经提供兼容别名，应继续完成内部引用迁移。
- `pointOrpointCoordinates` 应为 `pointOrCoordinates` 或 `pointOrPointCoordinates`。
- `isValidInteraction` 除拼写外，建议更名为 `isValidInteraction`。

### P2：文档和元数据

- JSDoc 同时存在 `@createDate` / `@updateDate` 与 `@CreateDate` / `@LastUpdateDate`。
- 作者名同时出现 `Aurora`、`yyz`，应明确是否保留历史作者信息。
- `@returns`、`@return`、缺失返回类型并存。
- 中文格式说明存在 `number类型`、`object`、`coordinates` 等多种表达，应统一术语。

## 5. 各模块审计摘要

| 模块          | TS 文件 | 导出类 | 现状                                                                  | 建议优先级 |
| ------------- | ------: | -----: | --------------------------------------------------------------------- | ---------- |
| `basic`       |      23 |      7 | 值对象结构清晰；历史 `_` 局部变量、`LngLat`、`isValid*` 较集中        | P1         |
| `control`     |       7 |      3 | 继承简单、命名统一；需要统一事件错误语义和 `isValidControl`           | P2         |
| `core`        |      40 |     17 | Geometry 方法最接近 OL；内部钩子 `_init*`、旧拼写和个别参数设计需收口 | P1         |
| `interaction` |      41 |     13 | 重构程度较高、父子结构一致；内部初始化方法和错误策略仍有旧风格        | P1         |
| `layer`       |      32 |     13 | `_layer` / `_sourceWrapper` 规则较明确；局部变量和警告比例偏高        | P2         |
| `source`      |      46 |     20 | OL 方法覆盖较完整；包含 `legacy` 子树，参数校验粒度和返回类型需统一   | P1         |
| `util`        |      15 |      4 | 体量小；`ProjUtil` 警告返回策略、Format 拼写与动态调用需重点检查      | P2         |

说明：文件数和类数基于本次静态扫描；类数统计导出类，不包括所有内部辅助类或类型。

## 6. 自动化规则缺口

当前 ESLint 使用 TypeScript 推荐规则，但主动放宽了：

- `no-explicit-any`
- `no-unsafe-function-type`
- `prefer-const`
- `no-useless-assignment`

并且没有配置命名规则。建议不要一次全部设为 error，应分阶段引入：

### 第一阶段：新增代码立即执行

```js
'@typescript-eslint/naming-convention': [
  'error',
  { selector: 'typeLike', format: ['PascalCase'] },
  { selector: ['function', 'method', 'parameter', 'variable'], format: ['camelCase'], leadingUnderscore: 'allow' }
]
```

同时增加：

- `@typescript-eslint/explicit-member-accessibility`
- `@typescript-eslint/consistent-type-imports`
- `@typescript-eslint/no-shadow`
- `no-underscore-dangle` 的定制例外名单

### 第二阶段：清理存量后开启

- `prefer-const`
- `@typescript-eslint/explicit-function-return-type`（可只约束导出函数和类公开方法）
- TypeScript `noImplicitOverride`
- 收紧 `any`，先从公开 API 和新文件开始。

## 7. 推荐整改顺序

1. **冻结公开 API 清单**：区分公开、保护、私有成员，避免规范整改造成破坏性变更。
2. **修正内部拼写**：新增 `isValid*`、`paramsInvalid*` 正确名称，旧公开名称保留废弃别名。
3. **统一错误语义**：重点处理 Popup、Control、Interaction、ProjUtil 的缺参和非法参数行为。
4. **统一原生实例字段**：只允许指定的 `_map`、`_layer`、`_source` 等字段使用下划线，并补齐可见性。
5. **清理局部变量和内部方法**：移除 `_params`、`_coordinates`、`_init*` 等非必要下划线。
6. **核对继承链**：开启 `noImplicitOverride`，逐个确认 Layer、Source、Interaction 子类与父类契约。
7. **补充 ESLint 门禁**：先警告、后错误；存量问题清零后接入 `pnpm check`。
8. **统一 JSDoc**：公开 API 保留说明、参数、返回值、异常；删除价值有限的重复日期元数据。

## 8. 发布前验收标准

- 新增或修改的公开方法均为 lowerCamelCase，并优先沿用 OL 原名。
- 原生 OL 实例字段使用统一 `_xxx` 命名并具有明确可见性。
- 普通局部变量和内部方法不使用无语义的前导下划线。
- 所有必填参数缺失和非法参数使用统一的 `OMapError` 结构。
- 同类事件 API 对非法输入具有一致行为。
- 正确拼写的 API 已存在，旧错误拼写仅作为带 `@deprecated` 的兼容别名。
- 子类重写显式使用 `override`，且通过 `noImplicitOverride`。
- `pnpm typecheck`、`pnpm lint`、`pnpm format:check`、测试和消费者检查通过。

## 9. 本轮审计边界

本轮重点是语法、命名、继承表面契约、参数校验和错误格式；没有逐方法证明业务语义与 OL 完全一致，也没有直接修改上述存量问题。后续如执行整改，应按模块分批提交，并为公开方法行为、错误类型及兼容别名补充测试。
