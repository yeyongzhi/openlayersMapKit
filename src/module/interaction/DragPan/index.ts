import { isDefined, isFunction, isString } from '../../../utils/index'
import { error_, getPackageMessage, commonMessage } from '../../../utils/message'
import Interaction from '../Interaction/index'
import { OlInteraction, OlEvent } from '../../../source/index'
import {
  type OMapDragPanParamsType,
  type OMapDragPanType,
  isOMapInteractionDragPanEventType,
  type OMapInteractionDragPanEventType
} from './type'
import { handleInteractionDragPanEvent } from './handle'
import type { InteractionPropertyChangeEvent } from '../handle'
import { type EventIdType } from '../../util/Event/type'

const PACKAGE_NAME = 'DragPan'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 拖动地图类
 * @class DragPan
 * @classdesc 允许用户通过拖动地图来平移地图
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/2
 * @updateDate 2025/9/2
 */

const defaultDragPanOptions = {
  onFocusOnly: false,
  kinetic: undefined
}

export default class DragPan extends Interaction<OMapDragPanType> {
  constructor(params?: OMapDragPanParamsType) {
    super('DragPan', { id: params?.id })
    this._interaction = new OlInteraction.DragPan(
      Object.assign({}, defaultDragPanOptions, params || {})
    )
    this.initInteractionEvent()
  }

  on(type: OMapInteractionDragPanEventType, callback: () => void): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(createMessage('on', commonMessage.paramsNotDefined('type or callback')))
    }
    if (!isOMapInteractionDragPanEventType(type)) {
      error_(createMessage('on', commonMessage.paramsInvaildEnum(type)))
    }
    if (!isFunction(callback)) {
      error_(createMessage('on', commonMessage.paramsInvaildFormat('callback', 'function')))
    }
    const unlisten = OlEvent.listen(
      this._interaction,
      type,
      (e: InteractionPropertyChangeEvent) => {
        this.events.emit(type, handleInteractionDragPanEvent(this, type, e))
      }
    )
    const id = this.events.on(type, callback, unlisten)
    return id
  }

  once(type: OMapInteractionDragPanEventType, callback: () => void): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(createMessage('once', commonMessage.paramsNotDefined('type or callback')))
    }
    if (!isOMapInteractionDragPanEventType(type)) {
      error_(createMessage('once', commonMessage.paramsInvaildEnum(type)))
    }
    if (!isFunction(callback)) {
      error_(createMessage('once', commonMessage.paramsInvaildFormat('callback', 'function')))
    }
    const unlisten = OlEvent.listen(
      this._interaction,
      type,
      (e: InteractionPropertyChangeEvent) => {
        this.events.emit(type, handleInteractionDragPanEvent(this, type, e))
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
