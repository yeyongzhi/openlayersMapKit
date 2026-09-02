import { isDefined, isFunction, isString } from '../../../utils/index'
import { error_, getPackageMessage, commonMessage } from '../../../utils/message'
import Interaction from '../Interaction/index'
import Event from '../../util/Event/index'
import { OlInteraction } from '../../../source/index'
import {
  type OMapDragPanParamsType,
  type OMapDragPanType,
  isOMapInteractionDragPanEventType,
  type OMapInteractionDragPanEventType,
  type OMapDragPanEvent,
  type OMapDragPanEventMap
} from './type'
import { handleInteractionDragPanEvent } from './handle'
import type { InteractionPropertyChangeEvent } from '../handle'
import { type EventIdType } from '../../util/Event/type'

const PACKAGE_NAME = 'DragPan'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 拖动地图类
 *
 */

const defaultDragPanOptions = {
  onFocusOnly: false,
  kinetic: undefined
}

export default class DragPan extends Interaction<OMapDragPanType> {
  /** 收窄交互事件总线类型（构造器中以具体事件映射实例化） */
  declare events: Event<OMapDragPanEventMap>

  constructor(params?: OMapDragPanParamsType) {
    const { id, active, ...nativeParams } = params ?? {}
    super('DragPan', { id })
    this._interaction = new OlInteraction.DragPan(
      Object.assign({}, defaultDragPanOptions, nativeParams)
    )
    this.initInteractionEvent(active)
    this.events = new Event<OMapDragPanEventMap>(this)
  }

  on(type: OMapInteractionDragPanEventType, callback: (e: OMapDragPanEvent) => void): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(createMessage('on', commonMessage.paramsNotDefined('type or callback')))
    }
    if (!isOMapInteractionDragPanEventType(type)) {
      error_(createMessage('on', commonMessage.paramsInvalidEnum(type)))
    }
    if (!isFunction(callback)) {
      error_(createMessage('on', commonMessage.paramsInvalidFormat('callback', 'function')))
    }
    return this.subscribeEvent(type, callback, (e: InteractionPropertyChangeEvent) =>
      handleInteractionDragPanEvent(this, type, e)
    )
  }

  once(
    type: OMapInteractionDragPanEventType,
    callback: (e: OMapDragPanEvent) => void
  ): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(createMessage('once', commonMessage.paramsNotDefined('type or callback')))
    }
    if (!isOMapInteractionDragPanEventType(type)) {
      error_(createMessage('once', commonMessage.paramsInvalidEnum(type)))
    }
    if (!isFunction(callback)) {
      error_(createMessage('once', commonMessage.paramsInvalidFormat('callback', 'function')))
    }
    return this.subscribeEvent(
      type,
      callback,
      (e: InteractionPropertyChangeEvent) => handleInteractionDragPanEvent(this, type, e),
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
}
