import { isDefined, isFunction, isString } from '../../../utils/index'
import { error_, getPackageMessage, commonMessage } from '../../../utils/message'
import Interaction from '../Interaction/index'
import Event from '../../util/Event/index'
import { OlInteraction } from '../../../source/index'
import {
  type OMapMouseWheelZoomParamsType,
  type OMapMouseWheelZoomType,
  type OMapInteractionMouseWheelZoomEventType,
  type OMapMouseWheelZoomEvent,
  type OMapMouseWheelZoomEventMap,
  isOMapInteractionMouseWheelZoomEventType
} from './type'
import { handleInteractionMouseWheelZoomEvent } from './handle'
import { type EventIdType } from '../../util/Event/type'
import type { InteractionPropertyChangeEvent } from '../handle'

const PACKAGE_NAME = 'MouseWheelZoom'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 鼠标滚轮缩放交互类
 *
 */

const defaultMouseWheelZoomOptions: OMapMouseWheelZoomParamsType = {
  condition: undefined,
  onFocusOnly: false,
  maxDelta: 1,
  duration: 250,
  timeout: 80,
  useAnchor: true,
  constrainResolution: false
}

export default class MouseWheelZoom extends Interaction<OMapMouseWheelZoomType> {
  /** 收窄交互事件总线类型（构造器中以具体事件映射实例化） */
  declare events: Event<OMapMouseWheelZoomEventMap>

  constructor(params?: OMapMouseWheelZoomParamsType) {
    const { id, active, ...nativeParams } = params ?? {}
    super('MouseWheelZoom', { id })
    // 注意 defaultMouseWheelZoomOptions 必须作为独立对象合并：
    // 若把它（或模块级默认参数常量）当作 Object.assign 的第一个参数，
    // 用户参数会被写回常量本身，污染后续所有实例。
    this._interaction = new OlInteraction.MouseWheelZoom(
      Object.assign({}, defaultMouseWheelZoomOptions, nativeParams)
    )
    this.initInteractionEvent(active)
    this.events = new Event<OMapMouseWheelZoomEventMap>(this)
  }

  on(
    type: OMapInteractionMouseWheelZoomEventType,
    callback: (e: OMapMouseWheelZoomEvent) => void
  ): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(createMessage('on', commonMessage.paramsNotDefined('type or callback')))
    }
    if (!isOMapInteractionMouseWheelZoomEventType(type)) {
      error_(createMessage('on', commonMessage.paramsInvalidEnum(type)))
    }
    if (!isFunction(callback)) {
      error_(createMessage('on', commonMessage.paramsInvalidFormat('callback', 'function')))
    }
    return this.subscribeEvent(type, callback, (e: InteractionPropertyChangeEvent) =>
      handleInteractionMouseWheelZoomEvent(this, type, e)
    )
  }

  once(
    type: OMapInteractionMouseWheelZoomEventType,
    callback: (e: OMapMouseWheelZoomEvent) => void
  ): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(createMessage('once', commonMessage.paramsNotDefined('type or callback')))
    }
    if (!isOMapInteractionMouseWheelZoomEventType(type)) {
      error_(createMessage('once', commonMessage.paramsInvalidEnum(type)))
    }
    if (!isFunction(callback)) {
      error_(createMessage('once', commonMessage.paramsInvalidFormat('callback', 'function')))
    }
    return this.subscribeEvent(
      type,
      callback,
      (e: InteractionPropertyChangeEvent) => handleInteractionMouseWheelZoomEvent(this, type, e),
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
