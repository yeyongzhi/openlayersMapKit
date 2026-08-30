import { isDefined, isBoolean, isObject, isNumber, isString } from '../../../utils/index'
import { commonMessage } from '../../../utils/message'
import { error_, getPackageMessage, isVaildOpacity } from '../../../utils/index'
import { type OMapExtentType } from '../../basic/Extent/type'
import { type OlSource } from '../../../source/index'
import type Source from '../../source/Source/index'
import type { OMapSourceType } from '../../source/Source/type'
import Extent from '../../basic/Extent/index'
import { isValidExtent } from '../../basic/Extent/type'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import type Map from '../../core/Map/index'
import {
  type BaseLayerType,
  type BaseLayerIdType,
  type BaseLayerOptionsType,
  type BaseLayerPropertiesType,
  type OMapBaseLayerCommonType,
  type OMapLayerTarget
} from './type'

import { type LayerGroupIdType } from '../LayerGroup/type'
import type { Disposable, Removable } from '../../util/Disposable/type'
import type BaseEvent from 'ol/events/Event'

/**
 * OMap 图层基类
 * @class
 * @classdesc 所有图层的基类，提供了一些通用的方法和属性。
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/5
 * @updateDate 2026/2/2
 */

const DEFAULT_LAYER_OPACITY: number = 1.0
const DEFAULT_LAYER_VISIBLE: boolean = true
const DEFAULT_LAYER_MIN_ZOOM: number = 0
const DEFAULT_LAYER_MAX_ZOOM: number = 22
const DEFAULT_LAYER_MIN_RESOLUTION: number = 0
const DEFAULT_LAYER_MAX_RESOLUTION: number = Infinity
/**
 * 图层基类。
 *
 * @typeParam T - 原生 OpenLayers 图层类型。
 * @typeParam P - 图层属性字典。默认 {@link BaseLayerPropertiesType}；
 *   传入更具体的结构后，`getProperties()` 与 `setProperties()` 会按该结构推导。
 */
export default class BaseLayer<
  T extends OMapBaseLayerCommonType = OMapBaseLayerCommonType,
  P extends BaseLayerPropertiesType = BaseLayerPropertiesType
>
  implements Disposable, Removable
{
  private disposed = false

  /**
   * 图层类型
   */
  protected type: BaseLayerType | null = null
  /**
   * 包名（用于日志输出）
   */
  protected _packageName: string = 'BaseLayer'
  /**
   * 日志消息生成函数
   */
  protected _createMessage!: (methodName: string, message: string) => string
  /**
   * 图层实例（ol）
   */
  protected _layer!: T // 底层图层对象，由子类实现具体的图层类型
  /**
   * 图层关联的 OMap 数据源包装实例。
   *
   * 各图层在构造时都会把创建（或接收）的 OMap Source 包装登记到这里，之后可通过
   * {@link getSourceWrapper} 取回；若图层是直接用 OpenLayers 原生数据源构造的则为 null。
   */
  protected _sourceWrapper: Source<OMapSourceType> | null = null
  /**
   * 图层id，每个图层的唯一主键，用于区分图层
   */
  protected id: BaseLayerIdType = null
  /**
   * 图层名称，用于显示在图层控制栏中
   */
  name: string = ''
  className: string = '' // 图层样式类名，用于自定义图层样式，默认无
  opacity: number = DEFAULT_LAYER_OPACITY // 图层透明度，默认1
  visible: boolean = DEFAULT_LAYER_VISIBLE // 图层是否可见，默认true
  extent: Extent | undefined = undefined // 图层范围，默认全局
  minZoom: number = DEFAULT_LAYER_MIN_ZOOM // 最小缩放级别，默认0
  maxZoom: number = DEFAULT_LAYER_MAX_ZOOM // 最大缩放级别，默认22
  minResolution: number = DEFAULT_LAYER_MIN_RESOLUTION // 最小分辨率，默认0
  maxResolution: number = DEFAULT_LAYER_MAX_RESOLUTION // 最大分辨率，默认Infinity
  zIndex: number | undefined = undefined // 图层层级
  // 运行期默认值为空对象，泛型 P 描述其最终形态，此处是唯一的收敛断言点。
  properties: P = {} as P // 图层属性，用于存储图层相关信息
  /**
   * 图层所属的图层组id，由 LayerGroup 管理
   */
  groupId: LayerGroupIdType | null = null
  /**
   * 图层所属的地图对象
   */
  map: Map | null = null

  /**
   * 图层所属的对象
   */
  target: Map | OMapLayerTarget | null = null

  constructor(type: BaseLayerType, options?: BaseLayerOptionsType<P>) {
    const _options: BaseLayerOptionsType = options ?? {}
    this.type = type
    // 动态更新包名
    this._packageName = `${type}Layer`
    this._createMessage = getPackageMessage(this._packageName)
    // 图层ID
    this.id = _options.id ?? null
    // 赋值其他属性
    this.name = _options.name ?? ''
    this.className = _options.className ?? ''
    this.opacity = _options.opacity ?? DEFAULT_LAYER_OPACITY
    this.visible = _options.visible ?? DEFAULT_LAYER_VISIBLE
    this.extent = _options.extent
    this.minZoom = _options.minZoom ?? DEFAULT_LAYER_MIN_ZOOM
    this.maxZoom = _options.maxZoom ?? DEFAULT_LAYER_MAX_ZOOM
    this.minResolution = _options.minResolution ?? DEFAULT_LAYER_MIN_RESOLUTION
    this.maxResolution = _options.maxResolution ?? DEFAULT_LAYER_MAX_RESOLUTION
    this.zIndex = _options.zIndex
    this.properties = (_options.properties ?? {}) as P
    this.map = _options.map ?? null
    // 初始化图层组id
    this.groupId = null
  }

  protected _initLayerEvent(): void {
    // 图层属性变化事件，用于监听图层属性变化
    this._layer.on(['propertychange'], (e: BaseEvent | Event) => {
      const key = 'key' in e && typeof e.key === 'string' ? e.key : undefined
      // 8个基础属性
      if (key === 'opacity') {
        this.opacity = this.getOpacity() as number
      } else if (key === 'visible') {
        this.visible = this.getVisible() as boolean
      } else if (key === 'extent') {
        this.extent = this.getExtent() as Extent
      } else if (key === 'minZoom') {
        this.minZoom = this.getMinZoom() as number
      } else if (key === 'maxZoom') {
        this.maxZoom = this.getMaxZoom() as number
      } else if (key === 'minResolution') {
        this.minResolution = this.getMinResolution() as number
      } else if (key === 'maxResolution') {
        this.maxResolution = this.getMaxResolution() as number
      } else if (key === 'zIndex') {
        this.zIndex = this.getZIndex() as number
      }
    })
  }

  /**
   * 获取图层id
   * @returns {BaseLayerIdType} 图层id
   */
  getId(): BaseLayerIdType {
    return this.id
  }

  /**
   * 设置图层id
   * @param {BaseLayerIdType} id 图层id
   */
  setId(id: BaseLayerIdType) {
    this.id = id
  }

  /**
   * 获取图层名称
   * @returns {string} 图层名称
   */
  getName(): string {
    return this.name
  }

  /**
   * 设置图层名称
   * @param {string} name 图层名称
   */
  setName(name: string) {
    if (!isDefined(name)) {
      error_(this._createMessage('setName', commonMessage.paramsNotDefined('name')))
    }
    if (!isString(name)) {
      error_(
        this._createMessage('setName', commonMessage.paramsInvaildFormat('name', 'string类型'))
      )
    }
    this.name = name
  }

  /**
   * 获取图层样式类名
   * @returns {string} 样式类名
   */
  getClassName(): string {
    return this.className
  }

  /**
   * 设置图层样式类名
   * @param {string} className 样式类名
   */
  setClassName(className: string) {
    if (!isDefined(className)) {
      error_(this._createMessage('setClassName', commonMessage.paramsNotDefined('className')))
    }
    if (!isString(className)) {
      error_(
        this._createMessage(
          'setClassName',
          commonMessage.paramsInvaildFormat('className', 'string类型')
        )
      )
    }
    this.className = className
  }

  /**
   * 获取图层实例对象
   * @returns {T} 图层对象
   */
  getLayer(): T {
    return this._layer
  }

  /**
   * 获取图层数据源（原生 OpenLayers 数据源实例）。
   * @returns {OlSource.Source | null} 数据源实例；图层未挂载数据源时为 null
   */
  getSource(): OlSource.Source | null {
    return this._layer.getSource()
  }

  /**
   * 获取图层关联的 OMap 数据源包装实例。
   *
   * 与 {@link getSource} 的区别：后者返回 OpenLayers 原生对象，本方法返回 OMap 封装
   * （可用 `refresh()`、`getProjection()`、瓦片事件等 OMap 语义的方法）。
   *
   * @returns {Source | null} OMap 数据源包装；图层以原生数据源构造时为 null
   */
  getSourceWrapper(): Source<OMapSourceType> | null {
    return this._sourceWrapper
  }

  /**
   * 设置图层透明度
   * @param {number} opacity 透明度，0~1
   */
  setOpacity(opacity: number) {
    if (!isDefined(opacity)) {
      error_(this._createMessage('setOpacity', commonMessage.paramsNotDefined('opacity')))
    }
    if (!isVaildOpacity(opacity)) {
      error_(
        this._createMessage('setOpacity', commonMessage.paramsInvaildFormat('opacity', '0~1的数字'))
      )
    }
    this._layer.setOpacity(opacity)
  }

  /**
   * 获取图层透明度
   * @returns {number} 透明度，0~1
   */
  getOpacity(): number {
    return this._layer.getOpacity()
  }

  /**
   * 设置图层可见性
   * @param {boolean} visible 可见性，true/false
   */
  setVisible(visible: boolean) {
    if (!isDefined(visible)) {
      error_(this._createMessage('setVisible', commonMessage.paramsNotDefined('visible')))
    }
    if (!isBoolean(visible)) {
      error_(
        this._createMessage(
          'setVisible',
          commonMessage.paramsInvaildFormat('visible', 'boolean类型')
        )
      )
    }
    this._layer.setVisible(visible)
  }

  /**
   * 获取图层可见性
   * @returns {boolean} 可见性，true/false
   */
  getVisible(): boolean {
    return this._layer.getVisible()
  }

  /**
   * 获取图层的范围
   * @returns {Extent | undefined} 范围
   */
  getExtent(): Extent | undefined {
    let extent = this._layer.getExtent()
    return isDefined(extent) ? new Extent(extent) : undefined
  }

  /**
   * 设置图层的范围
   * @param {OMapExtentType} extent 范围
   */
  setExtent(extent: OMapExtentType) {
    if (!isDefined(extent)) {
      error_(this._createMessage('setExtent', commonMessage.paramsNotDefined('extent')))
    }
    if (!isValidExtent(extent)) {
      error_(
        this._createMessage('setExtent', commonMessage.paramsInvaildFormat('extent', 'Extent类型'))
      )
    }
    this._layer.setExtent(handleGetExtentValue(extent))
  }

  setMinZoom(minZoom: number) {
    if (!isDefined(minZoom)) {
      error_(this._createMessage('setMinZoom', commonMessage.paramsNotDefined('minZoom')))
    }
    if (!isNumber(minZoom)) {
      error_(
        this._createMessage(
          'setMinZoom',
          commonMessage.paramsInvaildFormat('minZoom', 'number类型')
        )
      )
    }
    this._layer.setMinZoom(minZoom)
  }

  getMinZoom(): number {
    return this._layer.getMinZoom()
  }

  setMaxZoom(maxZoom: number) {
    if (!isDefined(maxZoom)) {
      error_(this._createMessage('setMaxZoom', commonMessage.paramsNotDefined('maxZoom')))
    }
    if (!isNumber(maxZoom)) {
      error_(
        this._createMessage(
          'setMaxZoom',
          commonMessage.paramsInvaildFormat('maxZoom', 'number类型')
        )
      )
    }
    this._layer.setMaxZoom(maxZoom)
  }

  getMaxZoom(): number {
    return this._layer.getMaxZoom()
  }

  setMinResolution(minResolution: number) {
    if (!isDefined(minResolution)) {
      error_(
        this._createMessage('setMinResolution', commonMessage.paramsNotDefined('minResolution'))
      )
    }
    if (!isNumber(minResolution)) {
      error_(
        this._createMessage(
          'setMinResolution',
          commonMessage.paramsInvaildFormat('minResolution', 'number类型')
        )
      )
    }
    this._layer.setMinResolution(minResolution)
  }

  getMinResolution(): number {
    return this._layer.getMinResolution()
  }

  setMaxResolution(maxResolution: number) {
    if (!isDefined(maxResolution)) {
      error_(
        this._createMessage('setMaxResolution', commonMessage.paramsNotDefined('maxResolution'))
      )
    }
    if (!isNumber(maxResolution)) {
      error_(
        this._createMessage(
          'setMaxResolution',
          commonMessage.paramsInvaildFormat('maxResolution', 'number类型')
        )
      )
    }
    this._layer.setMaxResolution(maxResolution)
  }

  getMaxResolution(): number {
    return this._layer.getMaxResolution()
  }

  setZIndex(zIndex: number) {
    if (!isDefined(zIndex)) {
      error_(this._createMessage('setZIndex', commonMessage.paramsNotDefined('zIndex')))
    }
    if (!isNumber(zIndex)) {
      error_(
        this._createMessage('setZIndex', commonMessage.paramsInvaildFormat('zIndex', 'number类型'))
      )
    }
    this._layer.setZIndex(zIndex)
  }

  getZIndex(): number | undefined {
    return this._layer.getZIndex()
  }

  /**
   * 合并写入图层属性。OpenLayers 的 `setProperties` 为合并语义，
   * 因此入参按 `Partial<P>` 处理，允许只更新部分字段。
   * @param {Partial<P>} properties 待合并的属性
   * @param {boolean} silent 是否静默更新（不触发 propertychange）
   */
  setProperties(properties: Partial<P>, silent?: boolean) {
    if (!isDefined(properties)) {
      error_(this._createMessage('setProperties', commonMessage.paramsNotDefined('properties')))
    }
    if (!isObject(properties)) {
      error_(
        this._createMessage(
          'setProperties',
          commonMessage.paramsInvaildFormat('properties', 'object类型')
        )
      )
    }
    const oldProperties = this.properties ?? {}
    const newProperties = Object.assign({}, oldProperties, properties) as P
    this._layer.setProperties(newProperties, silent)
    this.properties = newProperties
  }

  /**
   * 获取图层属性字典。
   * @returns {P | undefined} 属性字典，类型由泛型 `P` 决定
   */
  getProperties(): P | undefined {
    return this._layer.getProperties() as P | undefined
  }

  /**
   * 设置图层当前的对象
   * @param {Map | OMapLayerTarget} target 图层所属的对象
   */
  setTarget(target: Map | OMapLayerTarget | null) {
    this.target = target
  }

  /**
   * 获取图层当前的对象
   * @returns {Map | OMapLayerTarget | null} 图层所属的对象
   */
  getTarget(): Map | OMapLayerTarget | null {
    return this.target
  }

  /** 从当前地图解除挂载，图层仍可再次添加。 */
  remove(): void {
    const target = this.target as
      | (OMapLayerTarget & {
          removeLayer?: (layer: BaseLayer<T>) => void
        })
      | null
    if (target?.removeLayer) {
      target.removeLayer(this)
      return
    }
    this.setTarget(null)
  }

  /** 永久释放图层及其原生资源。重复调用是安全的。 */
  dispose(): void {
    if (this.disposed) return
    this.disposed = true
    this.remove()
    this._layer.dispose()
  }

  isDisposed(): boolean {
    return this.disposed
  }
}
