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

export default class Interaction<T extends OMapInteractionCommonType> {
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
   * 交互属性
   * @type {Record<string, any>}
   */
  properties: Record<string, any> = {}

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
  private disposed = false

  constructor(type: OMapInteractionTypeEnum, params: OMapInteractionCommonParamsType) {
    this.type = type
    if (isDefined(params) && isDefined(params.id)) {
      this.setId(params.id)
    }
    this.events = new Event(this)
  }

  protected initInteractionEvent() {
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
   * @returns {Record<string, any>} 交互属性
   */
  getProperties(): Record<string, any> {
    return this.properties
  }

  /**
   * 设置交互属性
   * @param properties 交互属性
   */
  setProperties(properties: Record<string, any>): void {
    this._interaction.setProperties(properties)
    this.properties = properties
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
    this.events.off()
    this.lifecycleEventKeys.forEach((key) => OlEvent.unlistenByKey(key))
    this.lifecycleEventKeys = []
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
