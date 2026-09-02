import { isDefined, isFunction, isString } from '../../../utils/index'
import { error_, getPackageMessage, commonMessage } from '../../../utils/message'
import Interaction from '../Interaction/index'
import Event from '../../util/Event/index'
import { OlInteraction } from '../../../source/index'
import {
  type OMapDoubleClickZoomParamsType,
  type OMapDoubleClickZoomType,
  type OMapInteractionDoubleClickZoomEventType,
  type OMapDoubleClickZoomEvent,
  type OMapDoubleClickZoomEventMap,
  isOMapInteractionDoubleClickZoomEventType
} from './type'
import { type EventIdType } from '../../util/Event/type'
import { handleInteractionDoubleClickZoomEvent } from './handle'
import type { InteractionPropertyChangeEvent } from '../handle'

const PACKAGE_NAME = 'DoubleClickZoom'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 双击缩放交互类
 *
 */

const defaultDoubleClickZoomOptions = {
  duration: 250,
  delta: 1
}

export default class DoubleClickZoom extends Interaction<OMapDoubleClickZoomType> {
  /** 收窄交互事件总线类型（构造器中以具体事件映射实例化） */
  declare events: Event<OMapDoubleClickZoomEventMap>

  constructor(params?: OMapDoubleClickZoomParamsType) {
    const { id, active, ...nativeParams } = params ?? {}
    super('DoubleClickZoom', { id })
    // 注意 defaultDoubleClickZoomOptions 必须作为独立对象合并：
    // 若把它（或模块级默认参数常量）当作 Object.assign 的第一个参数，
    // 用户参数会被写回常量本身，污染后续所有实例。
    this._interaction = new OlInteraction.DoubleClickZoom(
      Object.assign({}, defaultDoubleClickZoomOptions, nativeParams)
    )
    this.initInteractionEvent(active)
    this.events = new Event<OMapDoubleClickZoomEventMap>(this)
  }

  on(
    type: OMapInteractionDoubleClickZoomEventType,
    callback: (e: OMapDoubleClickZoomEvent) => void
  ): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(createMessage('on', commonMessage.paramsNotDefined('type or callback')))
    }
    if (!isOMapInteractionDoubleClickZoomEventType(type)) {
      error_(createMessage('on', commonMessage.paramsInvalidEnum(type)))
    }
    if (!isFunction(callback)) {
      error_(createMessage('on', commonMessage.paramsInvalidFormat('callback', 'function')))
    }
    return this.subscribeEvent(type, callback, (e: InteractionPropertyChangeEvent) =>
      handleInteractionDoubleClickZoomEvent(this, type, e)
    )
  }

  once(
    type: OMapInteractionDoubleClickZoomEventType,
    callback: (e: OMapDoubleClickZoomEvent) => void
  ): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(createMessage('once', commonMessage.paramsNotDefined('type or callback')))
    }
    if (!isOMapInteractionDoubleClickZoomEventType(type)) {
      error_(createMessage('once', commonMessage.paramsInvalidEnum(type)))
    }
    if (!isFunction(callback)) {
      error_(createMessage('once', commonMessage.paramsInvalidFormat('callback', 'function')))
    }
    return this.subscribeEvent(
      type,
      callback,
      (e: InteractionPropertyChangeEvent) => handleInteractionDoubleClickZoomEvent(this, type, e),
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
