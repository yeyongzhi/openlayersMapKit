import { isDefined, isFunction, isString } from '../../../utils/index'
import { error_, getPackageMessage, commonMessage } from '../../../utils/message'
import Interaction from '../Interaction/index'
import { OlInteraction, OlEvent } from '../../../source/index'
import {
  type OMapKeyboardZoomParamsType,
  type OMapKeyboardZoomType,
  type OMapInteractionKeyboardZoomEventType,
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
  constructor(params?: OMapKeyboardZoomParamsType) {
    super('KeyboardZoom', { id: params?.id })
    this._interaction = new OlInteraction.KeyboardZoom(
      Object.assign({}, defaultKeyboardZoomOptions, params || {})
    )
    this.initInteractionEvent()
  }

  on(type: OMapInteractionKeyboardZoomEventType, callback: () => void): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(createMessage('on', commonMessage.paramsNotDefined('type or callback')))
    }
    if (!isOMapInteractionKeyboardZoomEventType(type)) {
      error_(createMessage('on', commonMessage.paramsInvaildEnum(type)))
    }
    if (!isFunction(callback)) {
      error_(createMessage('on', commonMessage.paramsInvaildFormat('callback', 'function')))
    }
    const unlisten = OlEvent.listen(
      this._interaction,
      type,
      (e: InteractionPropertyChangeEvent) => {
        this.events.emit(type, handleInteractionKeyboardZoomEvent(this, type, e))
      }
    )
    const id = this.events.on(type, callback, unlisten)
    return id
  }

  once(type: OMapInteractionKeyboardZoomEventType, callback: () => void): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(createMessage('once', commonMessage.paramsNotDefined('type or callback')))
    }
    if (!isOMapInteractionKeyboardZoomEventType(type)) {
      error_(createMessage('once', commonMessage.paramsInvaildEnum(type)))
    }
    if (!isFunction(callback)) {
      error_(createMessage('once', commonMessage.paramsInvaildFormat('callback', 'function')))
    }
    const unlisten = OlEvent.listen(
      this._interaction,
      type,
      (e: InteractionPropertyChangeEvent) => {
        this.events.emit(type, handleInteractionKeyboardZoomEvent(this, type, e))
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
