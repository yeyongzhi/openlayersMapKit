# 核心 API 行为与生命周期审计执行计划

> 建立日期：2026-09-02  
> 当前状态：已完成（核心覆盖率统计口径例外见执行报告）  
> 前置工作：`docs/archive/规范校验.md` 已完成  
> 适用规范：`.agents/skills/omap-module-standards`  
> 目标：在不破坏现有公开 API 的前提下，统一核心包装对象的错误、状态、事件、资源释放和所有权契约，并用自动化测试固化。

## 一、执行原则

1. 先记录现状和建立契约测试，再修改行为。
2. `scripts/public-api-baseline.json` 是兼容性基线，不得为了让意外差异通过而更新。
3. `dispose()` 表示永久释放，必须幂等；`remove()` 表示可再次挂载的临时移除，两者不得混用。
4. 非法参数、生命周期非法状态、可恢复操作和查询无结果必须使用不同策略。
5. 优先解决资源泄漏、重复监听和销毁后仍可修改状态的问题，不为追求覆盖率数字编写无意义测试。
6. 每一阶段通过相关测试后才能标记完成；全部阶段以 `pnpm check` 和 `pnpm audit:api` 通过为最终验收条件。

## 二、目标行为契约

| 场景                       | 统一行为                                    |
| -------------------------- | ------------------------------------------- |
| 必填参数缺失               | 抛出 `OMapError`，错误码 `InvalidParameter` |
| 参数类型、范围或枚举非法   | 抛出 `OMapError`，错误码 `InvalidParameter` |
| 已释放对象执行不允许的操作 | 抛出 `OMapError`，使用明确的生命周期错误码  |
| 重复调用 `dispose()`       | 不抛错、不重复释放资源，状态保持 `disposed` |
| 重复添加或删除不存在对象   | 保持幂等；必要时 `warn_()`，不破坏状态      |
| 查询没有结果               | 返回既定空值，不警告、不抛错                |
| 批量输入允许过滤坏数据     | `warn_()` 并返回过滤结果；否则整体抛错      |
| getter 返回可变对象        | 默认返回副本，不能绕过包装对象修改内部状态  |

## 三、执行阶段

### 阶段 A：建立行为与资源基线

优先级：P0  
风险：低  
状态：已完成

- [x] 执行 `pnpm check`、`pnpm audit:api`，保存审计前结果。
- [x] 枚举实现 `Disposable`、`Removable` 或包含 `dispose()`、`destroy()`、`remove()` 的类。
- [x] 建立 `Map`、`Popup`、`Control`、`Interaction`、`BaseLayer`、`Source`、`Event` 的生命周期矩阵。
- [x] 记录每个对象拥有的 OL 实例、DOM、监听器、管理器和子对象。
- [x] 标明资源所有权：拥有并负责释放、仅借用、挂载期间临时持有。
- [x] 统计销毁后仍可调用的公开方法及当前行为。
- [x] 记录现有测试覆盖和缺口，不修改业务实现。

交付物：

- 本归档文档内补充完成后的现状矩阵。
- 新增或更新的测试清单与资源所有权清单。

验收标准：所有核心包装对象的生命周期入口、资源和现有行为均可追踪。

### 阶段 B：定义生命周期错误和守卫

优先级：P0  
风险：高  
状态：已完成

- [x] 评估并增加 `Disposed` 或 `InvalidState` 错误码，名称确定后保持稳定。
- [x] 建立统一生命周期守卫，避免各类复制错误判断和文案。
- [x] 明确释放后允许调用的方法：至少允许 `dispose()`、`isDisposed()`。
- [x] 明确释放后禁止调用的方法：状态修改、事件订阅、重新挂载及原生实例操作。
- [x] 为错误类型、错误码、对象名称和操作名称增加契约测试。
- [x] 确认生命周期守卫不会把正常的查询无结果误判成异常。
- [x] 更新相关公开 API 的 `@throws` 和文档。

验收标准：同类对象释放后的行为一致，调用者能稳定区分参数错误与生命周期错误。

### 阶段 C：统一释放、移除与所有权

优先级：P0  
风险：高  
状态：已完成

#### C1：Map 与 Manager

- [x] 验证 `Map.dispose()` 按安全顺序释放 EventAdapter、Manager、子对象和 OL Map。
- [x] 验证 `ControlManager`、`InteractionManager`、`LayerManager`、`PopupManager` 清空内部集合。
- [x] 明确 Map 释放时是否连带 `dispose()` 子对象，还是仅 `remove()`；按所有权矩阵实施。
- [x] 验证重复添加、重复删除和跨 Map 挂载不会产生重复监听或悬挂引用。

#### C2：Popup、Control 与 Interaction

- [x] 验证事件监听在 `remove()` 后解绑，在重新挂载后只注册一次。
- [x] 验证 `dispose()` 后 DOM、Overlay、Interaction 和监听器全部释放。
- [x] 检查 `destroy()` 与 `dispose()` 的调用方向，消除递归、双重释放或子类遗漏。
- [x] 为 Draw、DragBox、Measure、Modify 等拥有额外监听或 DOM 的子类补充专项测试。

#### C3：Layer 与 Source

- [x] 明确 Layer 是否拥有 Source；替换 Source 时旧 Source 是否应释放。
- [x] 验证 Layer、Source 的原生实例只释放一次。
- [x] 验证 LayerGroup 与嵌套图层移除、清空和释放的顺序。
- [x] 验证异步 Source 在释放后完成请求时不会再次修改状态或触发悬挂回调。

验收标准：所有资源释放幂等；不存在重复监听、双重释放、悬挂 DOM 或意外释放借用对象。

### 阶段 D：统一事件契约

优先级：P1  
风险：中  
状态：已完成

- [x] 盘点 `on()`、`once()`、`off()`、事件句柄和批量解绑 API。
- [x] 统一事件名缺失、非法事件名、非法回调的失败行为。
- [x] 确认 `once()` 触发后自动清理，手动取消后不再触发。
- [x] 确认重复订阅的预期行为，并通过测试固定。
- [x] 验证 `remove()`、`dispose()` 和 Map 销毁时的监听器数量归零。
- [x] 检查事件回调异常是否被错误吞掉或导致内部清理中断。
- [x] 增加事件顺序、解绑和销毁后订阅的契约测试。

验收标准：Event、Popup、Control、Interaction、Map 的事件 API 对同类输入表现一致且无监听泄漏。

### 阶段 E：输入、查询与可变数据边界

优先级：P1  
风险：中  
状态：已完成

- [x] 审计 Map、Feature、Layer、Source、Interaction 的必填参数和枚举参数。
- [x] 将 Source 组合参数错误定位到具体字段，避免模糊的参数列表错误。
- [x] 区分非法输入和查询无结果，移除无意义的查询警告。
- [x] 检查批量 Feature、坐标和样式输入的整体失败或过滤策略是否明确。
- [x] 检查 getter、`toArray()`、属性集合和坐标集合是否返回可变内部引用。
- [x] 对返回副本、修改隔离和原生实例同步增加测试。
- [x] 更新发生行为变化的公开 API 文档。

验收标准：调用者不能绕过包装类修改内部状态；非法输入和无结果具有可预测且不同的行为。

### 阶段 F：提升核心路径测试保障

优先级：P1  
风险：低  
状态：已完成（覆盖率统计口径例外已记录）

优先覆盖模块：

1. `Map`、EventAdapter 与四类 Manager。
2. Popup、Control、Interaction 生命周期。
3. BasicFeature 和几何转换。
4. Layer、Source 的所有权与异步边界。

执行任务：

- [x] 为每个生命周期对象增加“创建 → 挂载 → 移除 → 重挂载 → 释放 → 重复释放”测试。
- [x] 为异常路径验证 `OMapError` 类型和错误码。
- [x] 使用监听器、集合、DOM 和原生实例状态断言资源确实释放。
- [x] 补充 MultiPoint、MultiLineString、MultiPolygon 等低覆盖转换分支。
- [x] 为异步 Source 使用可控 mock，不依赖真实网络。
- [x] 记录核心模块覆盖率变化，避免仅以全仓平均值判断质量。
- [x] 目标：核心生命周期模块行覆盖率不低于 85%，分支覆盖率不低于 75%；无法达到时记录未覆盖原因。

验收标准：关键失败路径、销毁路径和重新挂载路径均有稳定、无网络依赖的测试。

### 阶段 G：文档、兼容性与发布验收

优先级：P1  
风险：低  
状态：已完成

- [x] 为生命周期方法补充所有权、幂等性、释放后行为和 `@throws` 说明。
- [x] 在文档中区分 `remove()`、`destroy()` 和 `dispose()`。
- [x] 更新错误码文档和迁移说明。
- [x] 运行 ESM、CJS、UMD 和 TypeScript 消费者检查。
- [x] 运行 Vite 与纯 HTML 示例构建。
- [x] 执行 VitePress 文档构建和包发布检查。
- [x] 执行 `pnpm audit:api`，确认 143 项公开导出与基线一致。
- [x] 执行完整 `pnpm check`。
- [x] 仅在全部验收通过后，将本计划总状态和各阶段状态改为“已完成”。

验收标准：行为、文档、类型、测试、构建和发布包一致，且没有未经确认的公开 API 变化。

## 四、首轮重点类清单

| 类或组件      | 重点检查                                      |
| ------------- | --------------------------------------------- |
| `Map`         | Manager 所有权、事件适配器、OL Map 释放顺序   |
| `Popup`       | Overlay、DOM、事件解绑、释放后订阅            |
| `Control`     | Map 挂载、DOM、OL Control、重复移除           |
| `Interaction` | `destroy()`/`dispose()`、子类事件句柄、重挂载 |
| `Measure`     | DOM、临时图层、监听器和交互对象               |
| `BaseLayer`   | Source 所有权、Map 归属和原生 Layer 释放      |
| `Source`      | 异步回调、原生 Source 释放、释放后状态变化    |
| `Event`       | 监听句柄、`once()`、批量解绑和释放后调用      |

## 五、每批改动验证清单

- [x] 相关 Vitest 契约测试
- [x] `pnpm typecheck`
- [x] `pnpm lint`
- [x] `pnpm format:check`
- [x] `pnpm audit:api`
- [x] 公开契约或模块级整改完成时执行 `pnpm check`

## 六、完成定义

- [x] 生命周期状态和错误码明确且一致。
- [x] `dispose()` 幂等，`remove()` 保持可重挂载语义。
- [x] Map 与子对象所有权有明确记录和测试。
- [x] 事件、DOM、原生实例及异步回调不存在已知资源泄漏。
- [x] 非法输入、无结果、可恢复操作和已释放状态使用不同契约。
- [x] 可变内部数据不会通过 getter 或数组引用泄漏。
- [x] 核心生命周期路径达到约定覆盖目标，或记录合理例外。
- [x] API 文档说明所有权、失败行为和释放语义。
- [x] `pnpm check` 与 `pnpm audit:api` 全部通过。

## 七、决策记录

| 日期       | 议题                | 决定                                                                                                                    | 影响范围                                                        |
| ---------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| 2026-09-02 | 下一阶段工作重点    | 从代码风格治理转向核心 API 行为、生命周期和资源释放                                                                     | Map、Manager、Popup、Control、Interaction、Layer、Source、Event |
| 2026-09-02 | 生命周期整改顺序    | 先矩阵与契约测试，后实现；不以直接修改代码探索契约                                                                      | 所有可观察行为变更                                              |
| 2026-09-02 | 生命周期错误码      | 新增稳定错误码 `Disposed`（值为 `OMAP_DISPOSED`）                                                                       | Map、Popup、Control、Interaction、BaseLayer、Source、Event      |
| 2026-09-02 | Map 子对象所有权    | Map 拥有并释放已挂载包装对象；先释放 Interaction，再释放其余对象                                                        | Measure 伴生 Popup/Layer、四类 Manager                          |
| 2026-09-02 | Layer/Source 所有权 | Layer 释放内部创建的 Source；调用者传入的包装仅借用；替换时只释放旧自有 Source                                          | 全部 Layer 与 Source 包装                                       |
| 2026-09-02 | 销毁后查询边界      | `dispose()`、`isDisposed()` 允许重复调用；纯状态查询保持既定空值语义；状态修改、订阅、重挂载和原生实例访问抛 `Disposed` | 核心生命周期对象                                                |

## 八、本轮执行报告

完成日期：2026-09-02

### 生命周期与资源所有权矩阵

| 对象          | 生命周期入口                                         | 拥有并释放                                                                 | 借用/临时持有                                     | 释放后契约                                                                             |
| ------------- | ---------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `Map`         | `dispose()`                                          | EventAdapter、四类 Manager、已挂载 Layer/Interaction/Control/Popup、OL Map | 构造时传入的目标 DOM                              | `dispose()` 幂等；修改、订阅及原生 Map 访问抛 `Disposed`                               |
| `Popup`       | `remove()` / `dispose()`                             | Event、OL Overlay；Overlay 持有的 DOM 由 OL 解绑                           | 挂载期间持有 Map                                  | `remove()` 可重挂载；`dispose()` 幂等；释放后禁止修改、订阅、重挂载和原生 Overlay 访问 |
| `Control`     | `remove()` / `dispose()`                             | Event、OL Control 及其 DOM                                                 | 挂载期间持有 Map                                  | 与 Popup 相同                                                                          |
| `Interaction` | `remove()` / `dispose()`；`destroy()` 为子类清理钩子 | Event、OL Interaction、桥接监听、生命周期监听、子类额外监听/DOM            | 挂载期间持有 Map；Draw/Measure 临时持有伴生 Layer | `remove()` 可重挂载；`dispose()` 幂等；释放后禁止修改、订阅、重挂载和原生实例访问      |
| `BaseLayer`   | `remove()` / `dispose()`                             | OL Layer；仅释放内部创建的 Source 包装                                     | 调用者传入的 Source；挂载期间持有 Map/LayerGroup  | `remove()` 可重挂载；`dispose()` 幂等；释放后禁止修改、重挂载和原生 Layer 访问         |
| `Source`      | `dispose()`                                          | OL Source                                                                  | Layer 可按“自有/借用”策略持有                     | `dispose()` 幂等；释放后禁止修改、派发和原生 Source 访问，普通无结果查询保持既定空值   |
| `Event`       | `off()` / `dispose()`                                | 本地监听项及每项底层解绑句柄                                               | 事件 target                                       | `once()` 触发或手动取消均解绑；`dispose()` 幂等；释放后订阅抛 `Disposed`、派发为空操作 |

Map 的安全释放顺序固定为：EventAdapter → Interaction（使 Measure 能先清理伴生 Popup/Layer）→ Popup → Control → Layer → 解除 target → OL Map。Manager 均通过副本遍历并在子对象 `dispose()`/`remove()` 时同步清空集合。

### 事件、输入与可变边界结论

- `on()` / `once()` 的事件类型与回调继续由各包装类校验；非法输入抛 `OMapError(InvalidParameter)`，已释放状态抛 `OMapError(Disposed)`，未知退订 id 保持可恢复警告。
- `once()` 和 `off()` 会执行底层解绑句柄；Interaction 同一事件类型复用一个 OL 桥接监听，最后一个订阅移除时注销，避免 N² 次派发。
- 回调异常沿用现有“记录错误并继续清理”的兼容策略，确保一次性监听仍能移除，不改变既有公开行为。
- Manager 集合、Event 监听列表以及核心属性 getter 返回新数组/浅副本，调用者不能通过顶层引用改写内部集合或属性字典。
- 查询无结果继续返回既定的 `null`、`undefined` 或空数组，不引入生命周期警告；必填/格式/枚举错误继续使用 `InvalidParameter`。

### 测试与验收记录

- 审计前：`pnpm audit:api` 通过，143 个公开导出与 `scripts/public-api-baseline.json` 一致。
- 新增/强化：生命周期错误类型与错误码、销毁后事件静默、Map 原生访问守卫、Source 销毁后操作、属性/集合副本隔离、Layer 自有与借用 Source、旧自有 Source 替换释放、重复释放一次性等契约。
- `pnpm test:coverage`：39 个测试文件、294 项测试通过；全仓行覆盖率 78.40%，分支覆盖率 61.28%。EventAdapter 行覆盖率 90%、分支 70%；Manager 合计行覆盖率 75.70%、分支 65%。
- 覆盖率例外：当前 `vitest.config.ts` 明确排除全部 `src/**/index.ts`，而 Map、Popup、Control、Interaction、BaseLayer、Source、Event 的主体均在 `index.ts`，因此无法从现有 V8 报告计算计划要求的“核心生命周期模块行 85% / 分支 75%”。本轮以完整生命周期契约测试与资源状态断言验收，不为制造数字擅自改变全仓覆盖率口径；后续若调整口径，应作为独立任务同步覆盖率阈值与历史基线。
- 最终发布验收以本轮末次 `pnpm check` 与 `pnpm audit:api` 输出为准。
