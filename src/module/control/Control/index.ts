import { isDefined, isFunction, isString } from '../../../utils/index'
import { warn_, error_, commonMessage, getPackageMessage } from '../../../utils/message'
import { OlEvent } from '../../../source/index'
import type BaseEvent from 'ol/events/Event'
import {
  type OMapControlTypeType,
  type OMapControlIdType,
  type OMapControlCommonType,
  type OMapControlEventType,
  type OMapControlEventMap,
  isOMapControlEventType
} from './type'
import Event from '../../../module/util/Event/index'
import type { EventIdType } from '../../util/Event/type'
import type { PropertiesType } from '../../../utils/type'
import type Map from '../../core/Map/index'
import type { Disposable, Removable } from '../../util/Disposable/type'
import { assertNotDisposed } from '../../util/Disposable/lifecycle'

const PACKAGE_NAME = 'Control'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 */

/**
 * 控件基类。
 *
 * @template T - 原生 OpenLayers Control 类型。
 * @template P - 控件属性字典。默认 {@link PropertiesType}；
 *   传入更具体的结构后，`getProperties()` 会按该结构推导。
 */
export default class Control<
  T extends OMapControlCommonType = OMapControlCommonType,
  P extends PropertiesType = PropertiesType
>
  implements Disposable, Removable
{
  private map: Map | null = null
  private disposed = false
  id: OMapControlIdType = null
  /**
   * 控件类型
   *
   * @type {OMapControlTypeType}
   */
  type!: OMapControlTypeType

  /**
   * 控件实例
   *
   * @type {T}
   */
  _control!: T

  /**
   * 控件事件
   *
   * @type {Event}
   */
  events: Event<OMapControlEventMap> = new Event<OMapControlEventMap>(this)

  constructor(type: OMapControlTypeType) {
    this.type = type
  }

  /**
   * 获取控制实例
   *
   * @returns {T} 原生 OpenLayers 控件实例，类型由泛型 `T` 决定
   */
  getControl(): T {
    this.assertActive('getControl')
    return this._control
  }

  /**
   * 获取控制ID
   *
   * @returns {OMapControlIdType} 控制ID
   */
  getId(): OMapControlIdType {
    return this.id
  }

  /**
   * 设置控制ID
   *
   * @param {OMapControlIdType} id 控制ID
   */
  setId(id: OMapControlIdType) {
    this.assertActive('setId')
    if (!isDefined(id)) {
      warn_(createMessage('setId', commonMessage.paramsNotDefined('id')))
      return
    }
    this.id = id
  }

  /**
   * 订阅控件原生事件。
   *
   * 返回的订阅 id 可用于 {@link un} 精准退订；退订时会自动解绑底层 OpenLayers 监听，
   * {@link dispose} 时统一释放，不会残留监听器。
   *
   * @param {OMapControlEventType} type 事件类型，取值 'change' | 'error'
   * @param {(event: BaseEvent) => void} callback 事件回调
   * @returns {EventIdType} 订阅 id
   */
  on(type: OMapControlEventType, callback: (event: BaseEvent) => void): EventIdType {
    this.assertActive('on')
    this.assertEventParams('on', type, callback)
    const unlisten = OlEvent.listen(this._control, type, (event: unknown) => {
      this.events.emit(type, event as BaseEvent)
    })
    return this.events.on(type, callback, unlisten)
  }

  /**
   * 订阅控件原生事件，回调触发一次后自动退订（含底层 OpenLayers 监听）。
   *
   * @param {OMapControlEventType} type 事件类型，取值 'change' | 'error'
   * @param {(event: BaseEvent) => void} callback 事件回调
   * @returns {EventIdType} 订阅 id
   */
  once(type: OMapControlEventType, callback: (event: BaseEvent) => void): EventIdType {
    this.assertActive('once')
    this.assertEventParams('once', type, callback)
    const unlisten = OlEvent.listen(this._control, type, (event: unknown) => {
      this.events.emit(type, event as BaseEvent)
    })
    return this.events.once(type, callback, unlisten)
  }

  /**
   * 按订阅 id 退订控件事件，并解绑其对应的底层 OpenLayers 监听。
   *
   * @param {EventIdType} id {@link on} / {@link once} 返回的订阅 id
   */
  un(id: EventIdType) {
    if (!isDefined(id)) {
      error_(createMessage('un', commonMessage.paramsNotDefined('id')))
    }
    if (!isString(id)) {
      error_(createMessage('un', commonMessage.paramsInvalidFormat(String(id), 'EventIdType')))
    }
    this.events.remove(id)
  }

  /**
   * 校验事件订阅参数，任一不合法即抛出错误。
   *
   * @param {string} methodName 调用方方法名，用于错误信息定位
   * @param {unknown} type 待校验的事件类型
   * @param {unknown} callback 待校验的回调
   */
  private assertEventParams(methodName: string, type: unknown, callback: unknown): void {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(createMessage(methodName, commonMessage.paramsNotDefined('type or callback')))
    }
    if (!isOMapControlEventType(type)) {
      error_(createMessage(methodName, commonMessage.paramsInvalidEnum(String(type))))
    }
    if (!isFunction(callback)) {
      error_(createMessage(methodName, commonMessage.paramsInvalidFormat('callback', 'function')))
    }
  }

  /**
   * 获取控件属性字典。
   *
   * @returns {P} 属性字典，类型由泛型 `P` 决定
   */
  getProperties(): P {
    return { ...(this._control.getProperties() as P) }
  }

  /**
   * 合并写入控件属性。OpenLayers 的 `setProperties` 为合并语义，
   * 因此入参按 `Partial<P>` 处理，允许只更新部分字段。
   *
   * @param {Partial<P>} properties 待合并的属性
   */
  setProperties(properties: Partial<P>) {
    this.assertActive('setProperties')
    this._control.setProperties(properties as PropertiesType)
  }

  setMap(map: Map | null): void {
    this.assertActive('setMap')
    this.map = map
  }

  /** 从当前地图解除挂载，控件仍可再次添加。 */
  remove(): void {
    this.assertActive('remove')
    this.map?.removeControl(this)
  }

  /** 永久释放控件事件与原生资源。重复调用是安全的。 */
  dispose(): void {
    if (this.disposed) return
    this.remove()
    this.events.dispose()
    this._control.dispose()
    this.disposed = true
  }

  isDisposed(): boolean {
    return this.disposed
  }

  private assertActive(operationName: string): void {
    assertNotDisposed(this.disposed, this.constructor.name || PACKAGE_NAME, operationName)
  }
}
