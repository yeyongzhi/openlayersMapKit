import { isDefined, defaultValue, isFunction, isString } from '../../../utils/index'
import { error_, getPackageMessage, commonMessage } from '../../../utils/message'
import Interaction from '../Interaction/index'
import { OMAP_INTERACTION_DEFAULT_PARAMS } from '../Interaction/type'
import { OlInteraction, OlEvent } from '../../../source/index'
import {
  type OMapDoubleClickZoomParamsType,
  type OMapDoubleClickZoomType,
  type OMapInteractionDoubleClickZoomEventType,
  isOMapInteractionDoubleClickZoomEventType
} from './type'
import { type EventIdType } from '../../util/Event/type'
import { handleInteractionDoubleClickZoomEvent } from './handle'
import type { InteractionPropertyChangeEvent } from '../handle'

const PACKAGE_NAME = 'DoubleClickZoom'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 双击缩放交互类
 * @class DoubleClickZoom
 * @classdesc 允许用户通过双击地图来缩放地图
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/20
 * @updateDate 2025/2/4
 */

const defaultDoubleClickZoomOptions = {
  duration: 250,
  delta: 1
}

export default class DoubleClickZoom extends Interaction<OMapDoubleClickZoomType> {
  constructor(params?: OMapDoubleClickZoomParamsType) {
    super('DoubleClickZoom', { id: params?.id })
    this._interaction = new OlInteraction.DoubleClickZoom(
      Object.assign(
        OMAP_INTERACTION_DEFAULT_PARAMS,
        defaultDoubleClickZoomOptions,
        defaultValue(params, {})
      )
    )
    this.initInteractionEvent()
  }

  on(type: OMapInteractionDoubleClickZoomEventType, callback: () => void): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(createMessage('on', commonMessage.paramsNotDefined('type or callback')))
    }
    if (!isOMapInteractionDoubleClickZoomEventType(type)) {
      error_(createMessage('on', commonMessage.paramsInvaildEnum(type)))
    }
    if (!isFunction(callback)) {
      error_(createMessage('on', commonMessage.paramsInvaildFormat('callback', 'function')))
    }
    const unlisten = OlEvent.listen(
      this._interaction,
      type,
      (e: InteractionPropertyChangeEvent) => {
        this.events.emit(type, handleInteractionDoubleClickZoomEvent(this, type, e))
      }
    )
    const id = this.events.on(type, callback, unlisten)
    return id
  }

  once(type: OMapInteractionDoubleClickZoomEventType, callback: () => void): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(createMessage('once', commonMessage.paramsNotDefined('type or callback')))
    }
    if (!isOMapInteractionDoubleClickZoomEventType(type)) {
      error_(createMessage('once', commonMessage.paramsInvaildEnum(type)))
    }
    if (!isFunction(callback)) {
      error_(createMessage('once', commonMessage.paramsInvaildFormat('callback', 'function')))
    }
    const unlisten = OlEvent.listen(
      this._interaction,
      type,
      (e: InteractionPropertyChangeEvent) => {
        this.events.emit(type, handleInteractionDoubleClickZoomEvent(this, type, e))
      }
    )
    const id = this.events.once(type, callback, unlisten)
    return id
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
