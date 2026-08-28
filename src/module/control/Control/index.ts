import {
  type OMapControlTypeType,
  type OMapControlIdType,
  type OMapControlCommonType
} from './type'
import Event from '../../../module/util/Event/index'
import type { PropertiesType } from '../../../utils/type'
import type Map from '../../core/Map/index'
import type { Disposable, Removable } from '../../util/Disposable/type'

/**
 * @class Control
 * @classdesc 控制类
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/10/9
 * @updateDate 2025/10/10
 */

export default class Control<T extends OMapControlCommonType = OMapControlCommonType>
  implements Disposable, Removable
{
  private map: Map | null = null
  private disposed = false
  id: OMapControlIdType = null
  /**
   * 交互类型
   * @type {OMapControlTypeType}
   */
  type!: OMapControlTypeType

  /**
   * 交互实例
   * @type {T}
   */
  _control!: T

  /**
   * 交互事件
   * @type {Event}
   */
  events: Event = new Event()

  constructor(type: OMapControlTypeType) {
    this.type = type
  }

  /**
   * 获取控制实例
   */
  getControl(): OMapControlCommonType {
    return this._control
  }

  /**
   * 获取控制ID
   * @returns {OMapControlIdType} 控制ID
   */
  getId(): OMapControlIdType {
    return this.id
  }

  /**
   * 获取控制属性
   * @returns {PropertiesType} 控制属性
   */
  getProperties(): PropertiesType {
    return this._control.getProperties()
  }

  /**
   * 设置控制属性
   * @param properties 控制属性
   */
  setProperties(properties: PropertiesType) {
    this._control.setProperties(properties)
  }

  setMap(map: Map | null): void {
    this.map = map
  }

  /** 从当前地图解除挂载，控件仍可再次添加。 */
  remove(): void {
    this.map?.removeControl(this)
  }

  /** 永久释放控件事件与原生资源。重复调用是安全的。 */
  dispose(): void {
    if (this.disposed) return
    this.disposed = true
    this.events.dispose()
    this.remove()
    this._control.dispose()
  }

  isDisposed(): boolean {
    return this.disposed
  }
}
