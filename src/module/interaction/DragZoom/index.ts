import { isDefined, isFunction, isString } from '../../../utils/index'
import { error_, getPackageMessage, commonMessage } from '../../../utils/message'
import Interaction from '../Interaction/index'
import Event from '../../util/Event/index'
import { OlInteraction } from '../../../source/index'
import {
  type OMapDragZoomParamsType,
  defaultDragZoomOptions,
  type OMapDragZoomType,
  type OMapInteractionDragZoomEventType,
  type OMapDragZoomEvent,
  type OMapDragZoomEventMap,
  isOMapInteractionDragZoomEventType
} from './type'
import { handleInteractionDragZoomEvent } from './handle'
import type { InteractionPropertyChangeEvent } from '../handle'
import { type EventIdType } from '../../util/Event/type'

const PACKAGE_NAME = 'DragZoom'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 拖动缩放类
 *
 */

export default class DragZoom extends Interaction<OMapDragZoomType> {
  /** 收窄交互事件总线类型（构造器中以具体事件映射实例化） */
  declare events: Event<OMapDragZoomEventMap>

  constructor(params?: OMapDragZoomParamsType) {
    const { id, active, ...nativeParams } = params ?? {}
    super('DragZoom', { id })
    this._interaction = new OlInteraction.DragZoom(
      Object.assign({}, defaultDragZoomOptions, nativeParams)
    )
    this.initInteractionEvent(active)
    this.events = new Event<OMapDragZoomEventMap>(this)
  }

  on(
    type: OMapInteractionDragZoomEventType,
    callback: (e: OMapDragZoomEvent) => void
  ): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(createMessage('on', commonMessage.paramsNotDefined('type or callback')))
    }
    if (!isOMapInteractionDragZoomEventType(type)) {
      error_(createMessage('on', commonMessage.paramsInvalidEnum(type)))
    }
    if (!isFunction(callback)) {
      error_(createMessage('on', commonMessage.paramsInvalidFormat('callback', 'function')))
    }
    return this.subscribeEvent(type, callback, (e: InteractionPropertyChangeEvent) =>
      handleInteractionDragZoomEvent(this, type, e)
    )
  }

  once(
    type: OMapInteractionDragZoomEventType,
    callback: (e: OMapDragZoomEvent) => void
  ): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(createMessage('once', commonMessage.paramsNotDefined('type or callback')))
    }
    if (!isOMapInteractionDragZoomEventType(type)) {
      error_(createMessage('once', commonMessage.paramsInvalidEnum(type)))
    }
    if (!isFunction(callback)) {
      error_(createMessage('once', commonMessage.paramsInvalidFormat('callback', 'function')))
    }
    return this.subscribeEvent(
      type,
      callback,
      (e: InteractionPropertyChangeEvent) => handleInteractionDragZoomEvent(this, type, e),
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
