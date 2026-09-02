import { isDefined, isFunction, isString } from '../../../utils/index'
import { error_, getPackageMessage, commonMessage } from '../../../utils/message'
import Interaction from '../Interaction/index'
import LngLat from '../../basic/LngLat/index'
import Extent from '../../basic/Extent/index'
import Event from '../../util/Event/index'
import { type EventIdType } from '../../util/Event/type'
import { OlInteraction } from '../../../source/index'
import {
  type OMapDragBoxParamsType,
  type OMapInteractionDragBoxEventType,
  type OMapDragBoxType,
  type OMapDragBoxEvent,
  type OMapDragBoxEventMap,
  type OlDragBoxEventPayloadType,
  isOMapInteractionDragBoxEventType
} from './type'
import { handleInteractionDragBoxEvent, createDragBoxParamsBoxEndHandle } from './handle'
import type { DragBoxEndEventHandler } from './handle'

const PACKAGE_NAME = 'DragBox'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 拖动选框类
 *
 */

export default class DragBox extends Interaction<OMapDragBoxType> {
  /** 收窄交互事件总线类型（构造器中以具体事件映射实例化） */
  declare events: Event<OMapDragBoxEventMap>
  extent: Extent | null = null
  /** 本实例私有的 onBoxEnd 回调持有者，避免与其他 DragBox 实例互相覆盖 */
  protected boxEndHandle: DragBoxEndEventHandler = createDragBoxParamsBoxEndHandle()

  constructor(params?: OMapDragBoxParamsType) {
    // onBoxEnd 是 OMap 自有回调（payload 为 DragBoxEndEvent），
    // 由 boxEndHandle 在 boxend 时统一触发，不能透传给 OpenLayers，
    // 否则回调会被调用两次，其中一次收到的是原生 MapBrowserEvent。
    const { onBoxEnd, id, active, ...nativeParams } = params ?? {}
    super('DragBox', { id })
    if (isDefined(onBoxEnd) && isFunction(onBoxEnd)) {
      this.boxEndHandle.initFunction(onBoxEnd)
    }
    this._interaction = new OlInteraction.DragBox(nativeParams)
    // 注册事件
    this.initInteractionEvent(active)
    this.initDragBoxEvent()
    this.events = new Event<OMapDragBoxEventMap>(this)
  }

  private initDragBoxEvent() {
    this._interaction.on('boxend', (e) => {
      const extent = this._interaction.getGeometry().getExtent()
      this.extent = isDefined(extent) ? new Extent(extent) : null
      this.boxEndHandle.emit({
        coordinate: new LngLat(e.coordinate),
        target: this,
        extent: this.extent
      })
    })
  }

  on(type: OMapInteractionDragBoxEventType, callback: (e: OMapDragBoxEvent) => void): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(createMessage('on', commonMessage.paramsNotDefined('type or callback')))
    }
    if (!isOMapInteractionDragBoxEventType(type)) {
      error_(createMessage('on', commonMessage.paramsInvalidEnum(type)))
    }
    if (!isFunction(callback)) {
      error_(createMessage('on', commonMessage.paramsInvalidFormat('callback', 'function')))
    }
    return this.subscribeEvent(type, callback, (e) =>
      handleInteractionDragBoxEvent(this, type, e as OlDragBoxEventPayloadType)
    )
  }

  once(
    type: OMapInteractionDragBoxEventType,
    callback: (e: OMapDragBoxEvent) => void
  ): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(createMessage('once', commonMessage.paramsNotDefined('type or callback')))
    }
    if (!isOMapInteractionDragBoxEventType(type)) {
      error_(createMessage('once', commonMessage.paramsInvalidEnum(type)))
    }
    if (!isFunction(callback)) {
      error_(createMessage('once', commonMessage.paramsInvalidFormat('callback', 'function')))
    }
    return this.subscribeEvent(
      type,
      callback,
      (e) => handleInteractionDragBoxEvent(this, type, e as OlDragBoxEventPayloadType),
      true
    )
  }

  un(id: EventIdType) {
    if (!isDefined(id)) {
      error_(createMessage('un', commonMessage.paramsNotDefined(id)))
    }
    if (!isString(id)) {
      error_(createMessage('un', commonMessage.paramsInvalidFormat(id, 'EventIdType')))
    }
    this.events.remove(id)
  }

  protected override destroy() {
    this.boxEndHandle.destroy()
    super.destroy()
  }
}
