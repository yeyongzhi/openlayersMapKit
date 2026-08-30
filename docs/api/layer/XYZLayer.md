# XYZLayer

> 稳定性：`stable-beta`

XYZ 瓦片图层，按 `{z}/{x}/{y}` 模板加载栅格瓦片。

## 引入

```ts
import { XYZLayer } from 'omap'
```

源码：`src/module/layer/XYZLayer/index.ts`

## 构造

```ts
new XYZLayer(options?: OMapXYZLayerParamsType<P>)
```

## 方法

| 方法                                | 说明                                 |
| ----------------------------------- | ------------------------------------ |
| `getXYZSource(): XYZSource \| null` | 获取图层关联的 OMap XYZ 数据源包装。 |

## 继承成员

继承链：XYZLayer → BaseLayer

### 继承自 BaseLayer

| 成员                                                            | 说明                                                                                                                                                                                       |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `className: string`                                             | —                                                                                                                                                                                          |
| `dispose(): void`                                               | 永久释放图层及其原生资源。重复调用是安全的。                                                                                                                                               |
| `extent: Extent \| undefined`                                   | —                                                                                                                                                                                          |
| `getClassName(): string`                                        | 获取图层样式类名                                                                                                                                                                           |
| `getExtent(): Extent \| undefined`                              | 获取图层的范围                                                                                                                                                                             |
| `getId(): BaseLayerIdType`                                      | 获取图层id                                                                                                                                                                                 |
| `getLayer(): T`                                                 | 获取图层实例对象                                                                                                                                                                           |
| `getMaxResolution(): number`                                    | —                                                                                                                                                                                          |
| `getMaxZoom(): number`                                          | —                                                                                                                                                                                          |
| `getMinResolution(): number`                                    | —                                                                                                                                                                                          |
| `getMinZoom(): number`                                          | —                                                                                                                                                                                          |
| `getName(): string`                                             | 获取图层名称                                                                                                                                                                               |
| `getOpacity(): number`                                          | 获取图层透明度                                                                                                                                                                             |
| `getProperties(): P \| undefined`                               | 获取图层属性字典。                                                                                                                                                                         |
| `getSource(): Source \| null`                                   | 获取图层数据源（原生 OpenLayers 数据源实例）。                                                                                                                                             |
| `getSourceWrapper(): Source<Source, PropertiesType> \| null`    | 获取图层关联的 OMap 数据源包装实例。 与 {@link getSource} 的区别：后者返回 OpenLayers 原生对象，本方法返回 OMap 封装 （可用 `refresh()`、`getProjection()`、瓦片事件等 OMap 语义的方法）。 |
| `getTarget(): Map \| OMapLayerTarget \| null`                   | 获取图层当前的对象                                                                                                                                                                         |
| `getVisible(): boolean`                                         | 获取图层可见性                                                                                                                                                                             |
| `getZIndex(): number \| undefined`                              | —                                                                                                                                                                                          |
| `groupId: LayerGroupIdType \| null`                             | 图层所属的图层组id，由 LayerGroup 管理                                                                                                                                                     |
| `isDisposed(): boolean`                                         | Reports whether permanent release has already happened.                                                                                                                                    |
| `map: Map \| null`                                              | 图层所属的地图对象                                                                                                                                                                         |
| `maxResolution: number`                                         | —                                                                                                                                                                                          |
| `maxZoom: number`                                               | —                                                                                                                                                                                          |
| `minResolution: number`                                         | —                                                                                                                                                                                          |
| `minZoom: number`                                               | —                                                                                                                                                                                          |
| `name: string`                                                  | 图层名称，用于显示在图层控制栏中                                                                                                                                                           |
| `opacity: number`                                               | —                                                                                                                                                                                          |
| `properties: P`                                                 | —                                                                                                                                                                                          |
| `remove(): void`                                                | 从当前地图解除挂载，图层仍可再次添加。                                                                                                                                                     |
| `setClassName(className: string): void`                         | 设置图层样式类名                                                                                                                                                                           |
| `setExtent(extent: OMapExtentType): void`                       | 设置图层的范围                                                                                                                                                                             |
| `setId(id: BaseLayerIdType): void`                              | 设置图层id                                                                                                                                                                                 |
| `setMaxResolution(maxResolution: number): void`                 | —                                                                                                                                                                                          |
| `setMaxZoom(maxZoom: number): void`                             | —                                                                                                                                                                                          |
| `setMinResolution(minResolution: number): void`                 | —                                                                                                                                                                                          |
| `setMinZoom(minZoom: number): void`                             | —                                                                                                                                                                                          |
| `setName(name: string): void`                                   | 设置图层名称                                                                                                                                                                               |
| `setOpacity(opacity: number): void`                             | 设置图层透明度                                                                                                                                                                             |
| `setProperties(properties: Partial<P>, silent?: boolean): void` | 合并写入图层属性。OpenLayers 的 `setProperties` 为合并语义， 因此入参按 `Partial<P>` 处理，允许只更新部分字段。                                                                            |
| `setTarget(target: Map \| OMapLayerTarget \| null): void`       | 设置图层当前的对象                                                                                                                                                                         |
| `setVisible(visible: boolean): void`                            | 设置图层可见性                                                                                                                                                                             |
| `setZIndex(zIndex: number): void`                               | —                                                                                                                                                                                          |
| `target: Map \| OMapLayerTarget \| null`                        | 图层所属的对象                                                                                                                                                                             |
| `visible: boolean`                                              | —                                                                                                                                                                                          |
| `zIndex: number \| undefined`                                   | —                                                                                                                                                                                          |

## 说明与注意点

- `source` 为必填项，缺失时构造即抛出错误。
- 可直接传入参数对象，也可传入 [`XYZSource`](../source/XYZSource.md) 实例。
- URL 模板中的占位符由数据源负责替换，不要在图层侧手工拼接。

## 相关

- 基类：[BaseLayer](./BaseLayer.md)
- 示例：[瓦片图层](/examples/tile-layers)

<!-- 本页由 scripts/gen-api-docs.mjs 从源码签名自动生成，请勿手工编辑签名表 -->
