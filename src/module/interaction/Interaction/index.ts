import { isBoolean, isDefined } from '../../../utils/index'
import { warn_, getPackageMessage, commonMessage } from '../../../utils/message'
import {
  type OMapInteractionCommonParamsType,
  type OMapInteractionTypeEnum,
  type OMapInteractionIdType,
  type OMapInteractionCommonType
} from './type'
import Event from '../../../module/util/Event/index'
import Map from '../../core/Map/index'
import VectorLayer from '../../layer/VectorLayer/index'
import { OlEvent } from '../../../source/index'
import type { EventsKey } from 'ol/events'
import type { ObjectEvent } from 'ol/Object'
import type { PropertiesType } from '../../../utils/type'
import type { EventIdType } from '../../util/Event/type'
import type { Disposable, Removable } from '../../util/Disposable/type'

const PACKAGE_NAME = 'Interaction'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 交互类
 * @class Interaction
 * @classdesc 交互类
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/8/25
 * @updateDate 2026/2/3
 */

/**
 * 交互基类。
 *
 * @typeParam T - 原生 OpenLayers Interaction 类型。
 * @typeParam P - 交互属性字典。默认 {@link PropertiesType}；
 *   传入更具体的结构后，`getProperties()` 与 `setProperties()` 会按该结构推导。
 */
export default class Interaction<
  T extends OMapInteractionCommonType,
  P extends PropertiesType = PropertiesType
>
  implements Disposable, Removable
{
  /**
   * 交互实例id
   */
  id: OMapInteractionIdType = null
  /**
   * 交互类型
   * @type {OMapInteractionTypeEnum | null}
   */
  type: OMapInteractionTypeEnum | null = null

  /**
   * 交互实例
   * @type {T}
   */
  protected _interaction!: T

  /**
   * 交互所需要的图层
   * @type {VectorLayer} layer
   */
  protected layer: VectorLayer | null = null
  /**
   * 交互属性。运行期默认值为空对象，泛型 P 描述其最终形态。
   * @type {P}
   */
  properties: P = {} as P

  /**
   * 交互是否激活
   * @param type
   */
  active: boolean = false
  /**
   * 交互事件
   * @type {Event}
   */
  events: Event = new Event()

  map: Map | null = null
  private lifecycleEventKeys: EventsKey[] = []
  /**
   * 事件类型 → 原生监听 key。同一事件类型只向 OpenLayers 注册一个桥接监听。
   */
  private bridgeKeys: Record<string, EventsKey> = {}
  /**
   * 事件类型 → 当前订阅数。归零时注销桥接监听。
   */
  private bridgeSubscribers: Record<string, number> = {}
  private disposed = false

  constructor(type: OMapInteractionTypeEnum, params: OMapInteractionCommonParamsType) {
    this.type = type
    if (isDefined(params) && isDefined(params.id)) {
      this.setId(params.id)
    }
    this.events = new Event(this)
  }

  /**
   * 初始化交互自身的状态监听，并可一并应用初始激活状态。
   * @param {boolean} [active] 初始激活状态；不传则保持 OpenLayers 默认值（true）
   */
  protected initInteractionEvent(active?: boolean) {
    // OpenLayers 交互默认处于激活状态，且其构造参数不接受 `active` 选项，
    // 因此这里先同步一次，避免公开的 active 字段与原生状态不一致。
    if (isDefined(active)) {
      this.setActive(active)
    }
    this.active = this.getActive()
    const key = this.getInteraction().on('change:active', (e: ObjectEvent) => {
      if (e.type === 'change:active') {
        this.active = this.getActive()
      }
    })
    this.lifecycleEventKeys.push(key)
  }

  protected trackLifecycleEvent(key: EventsKey): void {
    this.lifecycleEventKeys.push(key)
  }

  /**
   * 订阅交互事件。
   *
   * 原生监听按**事件类型**复用：同一类型只向 OpenLayers 注册一个桥接监听，
   * 所有订阅者共享它。若每个订阅各建一份监听，N 个订阅会让一次原生事件
   * 触发 N 次 `emit`，每个回调再被执行 N 次（N² 次调用）。
   * 最后一个订阅者解绑、或交互 {@link Interaction.dispose} 时，桥接监听自动注销。
   *
   * @param {string} type 事件类型
   * @param {Function} callback 用户回调，接收 `transform` 转换后的 OMap 事件载荷
   * @param {Function} transform 原生事件载荷 → OMap 事件载荷
   * @param {boolean} [once=false] 是否只触发一次
   * @returns {EventIdType} 订阅 id，可传给子类的 `un()` 取消订阅
   */
  protected subscribeEvent(
    type: string,
    callback: (payload: any) => void,
    transform: (event: any) => any,
    once = false
  ): EventIdType {
    this.ensureBridge(type, transform)
    // 释放函数挂在订阅项上：Event 在 remove/off/once 触发/dispose 时都会调用它，
    // 因此这里只需按订阅数递减即可，无需关心是谁触发的移除。
    const releaseBridge = () => this.releaseBridge(type)
    const id = once
      ? this.events.once(type, callback, releaseBridge)
      : this.events.on(type, callback, releaseBridge)
    this.bridgeSubscribers[type] = (this.bridgeSubscribers[type] ?? 0) + 1
    return id
  }

  /**
   * 首次订阅某事件类型时建立原生监听桥接。
   * @param {string} type 事件类型
   * @param {Function} transform 原生事件载荷 → OMap 事件载荷
   */
  private ensureBridge(type: string, transform: (event: any) => any): void {
    if (isDefined<EventsKey>(this.bridgeKeys[type])) return
    this.bridgeKeys[type] = OlEvent.listen(this._interaction, type, (event) => {
      this.events.emit(type, transform(event))
    })
  }

  /**
   * 释放一次订阅计数，归零时注销该类型的原生桥接监听。
   * @param {string} type 事件类型
   */
  private releaseBridge(type: string): void {
    const remain = (this.bridgeSubscribers[type] ?? 1) - 1
    if (remain > 0) {
      this.bridgeSubscribers[type] = remain
      return
    }
    delete this.bridgeSubscribers[type]
    const key = this.bridgeKeys[type]
    if (isDefined<EventsKey>(key)) {
      OlEvent.unlistenByKey(key)
    }
    delete this.bridgeKeys[type]
  }

  /**
   * 获取交互实例id
   * @returns {OMapInteractionIdType} 交互实例id
   */
  getId(): OMapInteractionIdType {
    return this.id
  }

  setId(id: OMapInteractionIdType) {
    if (!isDefined(id)) {
      warn_(createMessage('_initInteractionId', commonMessage.paramsNotDefined('id')))
      return
    }
    this.id = id
  }

  /**
   * 返回当前交互是否处于激活状态
   * @returns {boolean} 激活状态
   */
  getActive(): boolean {
    return this._interaction.getActive()
  }

  /**
   * 设置当前交互是否处于激活状态
   * @param {boolean} active 激活状态
   */
  setActive(active: boolean) {
    if (!isBoolean(active)) {
      warn_(createMessage('setActive', commonMessage.paramsInvaildFormat('active', 'boolean')))
      return
    }
    this._interaction.setActive(active)
  }

  /**
   * 获取交互实例
   * @returns {T} 交互实例
   */
  getInteraction(): T {
    return this._interaction
  }

  /**
   * 获取交互属性
   * @returns {PropertiesType} 交互属性
   */
  /**
   * 获取交互属性
   * @returns {P} 交互属性
   */
  getProperties(): P {
    return this.properties
  }

  /**
   * 合并写入交互属性。OpenLayers 的 `setProperties` 为合并语义，
   * 本地缓存同样按合并处理，避免多次调用后只剩最后一次的属性。
   * @param {Partial<P>} properties 待合并的属性
   */
  setProperties(properties: Partial<P>): void {
    this._interaction.setProperties(properties as PropertiesType)
    this.properties = Object.assign({}, this.properties, properties) as P
  }

  /**
   * 返回交互中涉及的当前指针数，例如，当使用两个手指时为 2。
   * @returns {number} 指针数
   */
  // getPointerCount(): number {
  //     return this._interaction.getPointerCount()
  // }

  getLayer(): VectorLayer | null {
    return this.layer
  }

  setMap(map: Map | null) {
    this.map = map
  }

  /** 从当前地图解除挂载，交互实例仍可再次添加。 */
  remove(): void {
    this.map?.removeInteraction(this)
  }

  /** 永久释放交互及其事件监听。重复调用是安全的。 */
  dispose(): void {
    if (this.disposed) return
    this.disposed = true
    this.events.dispose()
    this.lifecycleEventKeys.forEach((key) => OlEvent.unlistenByKey(key))
    this.lifecycleEventKeys = []
    Object.values(this.bridgeKeys).forEach((key) => OlEvent.unlistenByKey(key))
    this.bridgeKeys = {}
    this.bridgeSubscribers = {}
    this.remove()
    this._interaction.setActive(false)
    this._interaction.dispose()
  }

  isDisposed(): boolean {
    return this.disposed
  }

  /**
   * 关闭交互(但是不移除图层)
   */
  protected close() {
    this.destroy()
  }

  /**
   * 清空交互图层
   */
  protected clear() {
    const layer = this.getLayer()
    if (isDefined<VectorLayer>(layer)) {
      layer.clear()
    }
  }

  /**
   * 销毁交互(包括交互的图层)
   */
  protected destroy() {
    this.dispose()
  }

  /**
   * 移除交互图层
   */
  protected _removeInteractionLayer() {
    const layer = this.getLayer()
    if (isDefined<VectorLayer>(layer) && isDefined<Map>(this.map)) {
      this.map.removeLayer(layer)
    }
  }
}
