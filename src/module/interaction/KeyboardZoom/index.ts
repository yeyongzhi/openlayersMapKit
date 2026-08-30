import { isDefined, isFunction, isString } from '../../../utils/index'
import { error_, getPackageMessage, commonMessage } from '../../../utils/message'
import Interaction from '../Interaction/index'
import Event from '../../util/Event/index'
import { OlInteraction } from '../../../source/index'
import {
  type OMapKeyboardZoomParamsType,
  type OMapKeyboardZoomType,
  type OMapInteractionKeyboardZoomEventType,
  type OMapKeyboardZoomEvent,
  type OMapKeyboardZoomEventMap,
  isOMapInteractionKeyboardZoomEventType
} from './type'
import { type EventIdType } from '../../util/Event/type'
import { handleInteractionKeyboardZoomEvent } from './handle'
import type { InteractionPropertyChangeEvent } from '../handle'

const PACKAGE_NAME = 'KeyboardZoom'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 双击缩放交互类
 * @class KeyboardZoom
 * @classdesc 允许用户通过双击地图来缩放地图
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/20
 * @updateDate 2025/9/20
 */

const defaultKeyboardZoomOptions = {
  duration: 100,
  delta: 1
}

export default class KeyboardZoom extends Interaction<OMapKeyboardZoomType> {
  /** 收窄交互事件总线类型（构造器中以具体事件映射实例化） */
  declare events: Event<OMapKeyboardZoomEventMap>

  constructor(params?: OMapKeyboardZoomParamsType) {
    const { id, active, ...nativeParams } = params ?? {}
    super('KeyboardZoom', { id })
    this._interaction = new OlInteraction.KeyboardZoom(
      Object.assign({}, defaultKeyboardZoomOptions, nativeParams)
    )
    this.initInteractionEvent(active)
    this.events = new Event<OMapKeyboardZoomEventMap>(this)
  }

  on(
    type: OMapInteractionKeyboardZoomEventType,
    callback: (e: OMapKeyboardZoomEvent) => void
  ): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(createMessage('on', commonMessage.paramsNotDefined('type or callback')))
    }
    if (!isOMapInteractionKeyboardZoomEventType(type)) {
      error_(createMessage('on', commonMessage.paramsInvaildEnum(type)))
    }
    if (!isFunction(callback)) {
      error_(createMessage('on', commonMessage.paramsInvaildFormat('callback', 'function')))
    }
    return this.subscribeEvent(type, callback, (e: InteractionPropertyChangeEvent) =>
      handleInteractionKeyboardZoomEvent(this, type, e)
    )
  }

  once(
    type: OMapInteractionKeyboardZoomEventType,
    callback: (e: OMapKeyboardZoomEvent) => void
  ): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(createMessage('once', commonMessage.paramsNotDefined('type or callback')))
    }
    if (!isOMapInteractionKeyboardZoomEventType(type)) {
      error_(createMessage('once', commonMessage.paramsInvaildEnum(type)))
    }
    if (!isFunction(callback)) {
      error_(createMessage('once', commonMessage.paramsInvaildFormat('callback', 'function')))
    }
    return this.subscribeEvent(
      type,
      callback,
      (e: InteractionPropertyChangeEvent) => handleInteractionKeyboardZoomEvent(this, type, e),
      true
    )
  }

  un(id: EventIdType) {
    if (!isDefined(id)) {
      error_(createMessage('un', commonMessage.paramsNotDefined(id)))
    }
    if (!isString(id)) {
      error_(createMessage('un', commonMessage.paramsInvaildFormat(id, 'EventIdType')))
    }
    this.events.remove(id)
  }
}
