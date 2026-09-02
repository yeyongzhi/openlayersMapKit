import { isDefined, isFunction } from '../../../utils/index'
import { error_, getPackageMessage, commonMessage } from '../../../utils/message'
import Interaction from '../Interaction/index'
import Extent from '../../basic/Extent/index'
import { isValidExtent, type OMapExtentType } from '../../basic/Extent/type'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import { handleGetStyleValue } from '../../basic/Style/handle'
import { OlInteraction } from '../../../source/index'
import {
  type OMapExtentParamsType,
  type OMapInteractionExtentEventType,
  type OMapExtentEvent,
  type OMapExtentEventMap,
  type OlExtentEventPayloadType,
  isOMapInteractionExtentEventType,
  type OMapInteractionExtentType,
  type OlExtentResolvedParamsType,
  OMAP_EXTENT_DEFAULT_PARAMS
} from './type'
import Event from '../../util/Event/index'
import type { EventIdType } from '../../util/Event/type'
import { handleInteractionExtentEvent } from './handle'

const PACKAGE_NAME = 'InteractionExtent'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 拖动地图类
 *
 */

export default class InteractionExtent extends Interaction<OMapInteractionExtentType> {
  /** 收窄交互事件总线类型（构造器中以具体事件映射实例化） */
  declare events: Event<OMapExtentEventMap>

  constructor(params?: OMapExtentParamsType) {
    const { id, active, ...restParams } = params ?? {}
    super('InteractionExtent', { id })
    // OMap 样式（Style wrapper）必须先转换为 OpenLayers 原生样式，
    // 否则 OpenLayers 拿不到可渲染的样式实例。
    const resolvedParams: OlExtentResolvedParamsType = Object.assign(
      {},
      OMAP_EXTENT_DEFAULT_PARAMS,
      restParams,
      {
        boxStyle: handleGetStyleValue(restParams.boxStyle),
        pointerStyle: handleGetStyleValue(restParams.pointerStyle)
      }
    )
    this._interaction = new OlInteraction.Extent(resolvedParams)
    // 注册事件
    this.initInteractionEvent(active)
    this.events = new Event<OMapExtentEventMap>(this)
  }

  /**
   * 获取当前选框范围
   *
   * @returns {Extent} 当前选框范围
   */
  getExtent(): Extent {
    const extent = this._interaction.getExtent()
    return new Extent(extent)
  }

  /**
   * 设置当前选框范围
   *
   * @param {OMapExtentType} extent 选框范围
   */
  setExtent(extent: OMapExtentType) {
    if (!isDefined(extent)) {
      error_(createMessage('setExtent', commonMessage.paramsNotDefined('extent')))
    }
    if (!isValidExtent(extent)) {
      error_(
        createMessage(
          'setExtent',
          commonMessage.paramsInvalidFormat('extent', 'OMap.Extent 或者 Extent数组')
        )
      )
    }
    const extentValue = handleGetExtentValue(extent)
    this._interaction.setExtent(extentValue)
  }

  on(type: OMapInteractionExtentEventType, callback: (e: OMapExtentEvent) => void): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(createMessage('on', commonMessage.paramsNotDefined('type or callback')))
    }
    if (!isOMapInteractionExtentEventType(type)) {
      error_(createMessage('on', commonMessage.paramsInvalidEnum(type)))
    }
    if (!isFunction(callback)) {
      error_(createMessage('on', commonMessage.paramsInvalidFormat('callback', 'function')))
    }
    return this.subscribeEvent(type, callback, (e) =>
      handleInteractionExtentEvent(this, type, e as OlExtentEventPayloadType)
    )
  }

  once(type: OMapInteractionExtentEventType, callback: (e: OMapExtentEvent) => void): EventIdType {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(createMessage('once', commonMessage.paramsNotDefined('type or callback')))
    }
    if (!isOMapInteractionExtentEventType(type)) {
      error_(createMessage('once', commonMessage.paramsInvalidEnum(type)))
    }
    if (!isFunction(callback)) {
      error_(createMessage('once', commonMessage.paramsInvalidFormat('callback', 'function')))
    }
    return this.subscribeEvent(
      type,
      callback,
      (e) => handleInteractionExtentEvent(this, type, e as OlExtentEventPayloadType),
      true
    )
  }

  un(id: EventIdType) {
    if (!isDefined(id)) {
      error_(createMessage('un', commonMessage.paramsNotDefined(id)))
    }
    this.events.remove(id)
  }
}
