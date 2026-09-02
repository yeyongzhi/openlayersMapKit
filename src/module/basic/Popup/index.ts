import { isDefined, isFunction, isString } from '../../../utils/index'
import { warn_, error_, getPackageMessage, commonMessage } from '../../../utils/index'
import LngLat from '../../basic/LngLat/index'
import type { OMapCoordinateType } from '../../basic/LngLat/type'
import Pixel from '../../basic/Pixel/index'
import { type OMapPixelType } from '../../basic/Pixel/type'
import type Map from '../../core/Map/index'
import Event from '../../util/Event/index'
import { type EventIdType } from '../../util/Event/type'
import { OlEvent, OlOverlay } from '../../../source/index'
import {
  type OMapPopupType,
  type OMapPopupParamsType,
  type OMapPopupEventMap,
  type OlPopupInstanceType,
  type PopupPositioningType,
  isValidPopupPositioningType,
  DEFAULT_POPUP_PARAMS,
  type OMapPopupIdType
} from './type'
import { type OMapPopupEventType, type OMapPopupEventCallback, isOMapPopupEventType } from './type'
import { createDefaultContentElement, handlePopupEvent, type PopupEventChange } from './handle'
import { handleGetLngLatValue } from '../LngLat/handle'
import type { Disposable, Removable } from '../../util/Disposable/type'
import { handleGetPixelValue } from '../Pixel/handle'
import type { PropertiesType } from '../../../utils/type'
import { assertNotDisposed } from '../../util/Disposable/lifecycle'

const PACKAGE_NAME = 'Popup'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 弹窗类
 *
 */

/**
 * 弹窗类。
 *
 * @template P - 弹窗属性字典。默认 {@link PropertiesType}；
 *   传入更具体的结构后，`getProperties()` 与 `setProperties()` 会按该结构推导。
 */
export default class Popup<P extends PropertiesType = PropertiesType>
  implements Disposable, Removable
{
  private disposed = false
  _popup: OMapPopupType

  /**
   * Popup 的唯一ID
   */
  id: OMapPopupIdType = null

  /**
   * 弹窗所属地图
   */
  map: Map | null = null
  /**
   * 弹窗内容(不一定有)
   */
  content: string = ''
  /**
   * 弹窗属性
   */
  // 运行期默认值为空对象，泛型 P 描述其最终形态，此处是唯一的收敛断言点。
  properties: P = {} as P
  /**
   * 事件对象
   */
  events: Event<OMapPopupEventMap> = new Event<OMapPopupEventMap>(this)

  constructor(params: OMapPopupParamsType<P>) {
    if (isDefined(params.id)) {
      this.id = params.id
    }
    const resolvedParams = Object.assign({}, DEFAULT_POPUP_PARAMS, params)
    delete resolvedParams.id
    // content存在且element不存在的时候才会创建默认的空DOM来渲染content的内容（支持HTML字符串）
    if (
      isDefined(resolvedParams.content) &&
      isString(resolvedParams.content) &&
      !isDefined(resolvedParams.element)
    ) {
      this.content = resolvedParams.content
      resolvedParams.element = createDefaultContentElement(resolvedParams.content)
    }
    if (isDefined(resolvedParams.element)) {
      resolvedParams.element.classList.add('omap-popup-selectable')
    }
    this._popup = new OlOverlay({
      ...resolvedParams,
      offset: isDefined(resolvedParams.offset)
        ? handleGetPixelValue(resolvedParams.offset)
        : undefined,
      position: isDefined(resolvedParams.position)
        ? handleGetLngLatValue(resolvedParams.position)
        : undefined
    })
    this.events = new Event(this)
  }

  /**
   * 获取弹窗位置
   *
   * @returns {LngLat | undefined} 弹窗位置
   */
  getPosition(): LngLat | undefined {
    const coordinates = this._popup.getPosition()
    return isDefined(coordinates) ? new LngLat(coordinates) : undefined
  }

  /**
   * 设置弹窗位置
   *
   * @param {LngLat | OlCoordinateType} coordinates 弹窗位置
   */
  setPosition(coordinates: OMapCoordinateType) {
    this.assertActive('setPosition')
    const coordinateValues = handleGetLngLatValue(coordinates)
    this._popup.setPosition(coordinateValues)
  }

  getPositioning(): PopupPositioningType | undefined {
    return this._popup.getPositioning()
  }

  setPositioning(positioning: PopupPositioningType) {
    this.assertActive('setPositioning')
    if (!isValidPopupPositioningType(positioning)) {
      error_(createMessage('setPositioning', '参数positioning值有误'))
    }
    this._popup.setPositioning(positioning)
  }

  /**
   * 获取弹窗属性
   *
   * @returns {PropertiesType} 弹窗属性
   */
  getProperties(): P {
    return { ...this.properties }
  }

  /**
   * 设置弹窗属性
   *
   * @param {PropertiesType} properties 弹窗属性
   */
  setProperties(properties: Partial<P>) {
    this.assertActive('setProperties')
    if (!isDefined(properties)) {
      error_(createMessage('setProperties', '参数不能为空'))
    }
    this.events.emit(
      'change:properties',
      handlePopupEvent(this, 'change:properties', {
        oldValue: this.getProperties(),
        key: 'properties',
        newValue: Object.assign({}, this.properties, properties)
      })
    )
    this.properties = Object.assign({}, this.properties, properties)
  }

  getElement(): HTMLElement | undefined {
    return this._popup.getElement()
  }

  setElement(element: HTMLElement) {
    this.assertActive('setElement')
    if (!isDefined(element)) {
      error_(createMessage('setElement', '参数不能为空'))
    }
    element.classList.add('omap-popup-selectable')
    return this._popup.setElement(element)
  }

  getContent(): string {
    return this.content
  }

  setContent(content: string): void {
    this.assertActive('setContent')
    this.events.emit(
      'change:content',
      handlePopupEvent(this, 'change:content', {
        oldValue: this.getContent(),
        key: 'content',
        newValue: content
      })
    )
    this.content = content
    this.setElement(createDefaultContentElement(content))
  }

  getOffset(): Pixel {
    const offset = this._popup.getOffset()
    return new Pixel(offset)
  }

  setOffset(offset: OMapPixelType) {
    this.assertActive('setOffset')
    const offsetValue = handleGetPixelValue(offset)
    this._popup.setOffset(offsetValue)
  }

  getId(): OMapPopupIdType {
    return this.id
  }

  setId(id: OMapPopupIdType) {
    this.assertActive('setId')
    this.id = id
  }

  getPopup(): OMapPopupType {
    this.assertActive('getPopup')
    return this._popup
  }

  on(type: OMapPopupEventType, callback: OMapPopupEventCallback): EventIdType {
    this.assertActive('on')
    if (!isDefined(type) || !isDefined(callback)) {
      error_(createMessage('on', commonMessage.paramsListHaveNotDefined('type', 'callback')))
    }
    if (!isOMapPopupEventType(type)) {
      error_(createMessage('on', commonMessage.paramsInvalidEnum('type')))
    }
    if (!isFunction(callback)) {
      error_(createMessage('on', commonMessage.paramsInvalidFormat('callback', 'function')))
    }
    const unlisten = OlEvent.listen(
      this._popup as OlPopupInstanceType,
      type,
      (e: PopupEventChange) => {
        callback.call(this, handlePopupEvent(this, type, e))
      }
    )
    const id = this.events.on(type, callback, unlisten)
    return id
  }

  once(type: OMapPopupEventType, callback: OMapPopupEventCallback): EventIdType {
    this.assertActive('once')
    if (!isDefined(type) || !isDefined(callback)) {
      error_(createMessage('once', commonMessage.paramsListHaveNotDefined('type', 'callback')))
    }
    if (!isOMapPopupEventType(type)) {
      error_(createMessage('once', commonMessage.paramsInvalidEnum('type')))
    }
    if (!isFunction(callback)) {
      error_(createMessage('once', commonMessage.paramsInvalidFormat('callback', 'function')))
    }
    let id: EventIdType | undefined
    const unlisten = OlEvent.listen(
      this._popup as OlPopupInstanceType,
      type,
      (e: PopupEventChange) => {
        callback.call(this, handlePopupEvent(this, type, e))
        if (id) this.events.remove(id)
      },
      this._popup,
      true
    )
    id = this.events.once(type, callback, unlisten)
    return id
  }

  un(id: EventIdType): void {
    if (!isDefined(id)) {
      warn_(createMessage('un', commonMessage.paramsNotDefined('id')))
      return
    }
    this.events.remove(id)
  }

  setMap(map: Map | null) {
    this.assertActive('setMap')
    this.map = map
  }

  /** 从当前地图解除挂载，Popup 仍可再次添加。 */
  remove(): void {
    this.assertActive('remove')
    this.map?.removePopup(this)
  }

  /** 永久释放事件与原生 Overlay。重复调用是安全的。 */
  dispose(): void {
    if (this.disposed) return
    this.remove()
    this.events.dispose()
    this._popup.dispose()
    this.disposed = true
  }

  isDisposed(): boolean {
    return this.disposed
  }

  private assertActive(operationName: string): void {
    assertNotDisposed(this.disposed, PACKAGE_NAME, operationName)
  }
}
