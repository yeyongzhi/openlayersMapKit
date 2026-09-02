import { isBoolean, isDefined, isFunction, isString } from '../../../utils/index'
import { error_, getPackageMessage, commonMessage } from '../../../utils/message'
import Interaction from '../Interaction/index'
import Event from '../../util/Event/index'
import { OlInteraction } from '../../../source/index'
import {
  type OMapLinkParamsType,
  type OMapLinkType,
  type OMapInteractionLinkEventType,
  type OMapLinkEvent,
  type OMapLinkEventMap,
  type OlLinkResolvedParamsType,
  type OlResolvedAnimationOptions,
  isOMapInteractionLinkEventType
} from './type'
import LngLat from '../../basic/LngLat/index'
import { type EventIdType } from '../../util/Event/type'
import { handleInteractionLinkEvent } from './handle'
import type { InteractionPropertyChangeEvent } from '../handle'

const PACKAGE_NAME = 'Link'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 链接交互类
 *
 */

const defaultLinkOptions: OMapLinkParamsType = {
  animate: true,
  params: ['x', 'y', 'z', 'r', 'l'],
  replace: false,
  prefix: ''
}

export default class Link extends Interaction<OMapLinkType> {
  /** 收窄交互事件总线类型（构造器中以具体事件映射实例化） */
  declare events: Event<OMapLinkEventMap>

  constructor(params?: OMapLinkParamsType) {
    const { id, active, ...rest } = params ?? {}
    super('Link', { id })
    // animate 中的 center 与 anchor 都接受 LngLat，必须转换为 OpenLayers 原生坐标
    const { animate, ...restParams } = rest
    const resolvedAnimate: boolean | OlResolvedAnimationOptions =
      isBoolean(animate) || !isDefined(animate)
        ? (animate ?? true)
        : Object.assign({}, animate, {
            center: animate.center instanceof LngLat ? animate.center.toArray() : animate.center,
            anchor: animate.anchor instanceof LngLat ? animate.anchor.toArray() : animate.anchor
          })
    const resolvedParams: OlLinkResolvedParamsType = Object.assign({}, restParams, {
      animate: resolvedAnimate
    })
    this._interaction = new OlInteraction.Link(
      Object.assign({}, defaultLinkOptions, resolvedParams)
    )
    this.initInteractionEvent(active)
    this.events = new Event<OMapLinkEventMap>(this)
  }

  on(type: OMapInteractionLinkEventType, callback: (e: OMapLinkEvent) => void): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(createMessage('on', commonMessage.paramsNotDefined('type or callback')))
    }
    if (!isOMapInteractionLinkEventType(type)) {
      error_(createMessage('on', commonMessage.paramsInvalidEnum(type)))
    }
    if (!isFunction(callback)) {
      error_(createMessage('on', commonMessage.paramsInvalidFormat('callback', 'function')))
    }
    return this.subscribeEvent(type, callback, (e: InteractionPropertyChangeEvent) =>
      handleInteractionLinkEvent(this, type, e)
    )
  }

  once(type: OMapInteractionLinkEventType, callback: (e: OMapLinkEvent) => void): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(createMessage('once', commonMessage.paramsNotDefined('type or callback')))
    }
    if (!isOMapInteractionLinkEventType(type)) {
      error_(createMessage('once', commonMessage.paramsInvalidEnum(type)))
    }
    if (!isFunction(callback)) {
      error_(createMessage('once', commonMessage.paramsInvalidFormat('callback', 'function')))
    }
    return this.subscribeEvent(
      type,
      callback,
      (e: InteractionPropertyChangeEvent) => handleInteractionLinkEvent(this, type, e),
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
