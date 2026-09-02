import { isDefined, isFunction } from '../../../utils/index'
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import { commonMessage } from '../../../utils/message'
import type { OMapCoordinateType } from '../../basic/LngLat/type'
import Interaction from '../Interaction/index'
import { OlInteraction, type OlGeometry } from '../../../source/index'
import VectorLayer from '../../layer/VectorLayer/index'
import type BasicFeature from '../../core/Feature/BasicFeature/index'
import { type EventIdType } from '../../util/Event/type'
import {
  type OMapDrawModeType,
  isValidDrawMode,
  type OMapDrawParamsType,
  type OMapInteractionDrawEventType,
  isOMapInteractionDrawEventType,
  OMAP_DRAW_DEFAULT_PARAMS,
  type OMapDrawType,
  type OMapDrawEvent,
  type OMapDrawEventMap,
  type OlDrawEventPayloadType
} from './type'
import Event from '../../util/Event/index'
import type { OlVectorSourceInstanceType, OMapVectorSourceType } from '../../layer/VectorLayer/type'
import { DEFAULT_STYLE } from '../../basic/Style/handle'
import { getOlDrawType, handleInteractionDrawEvent } from './handle'
import { handleGetLngLatValue } from '../../basic/LngLat/handle'

const PACKAGE_NAME = 'Draw'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 绘制类
 *
 */

export default class Draw extends Interaction<OMapDrawType> {
  /** 收窄交互事件总线类型（构造器中以具体事件映射实例化） */
  declare events: Event<OMapDrawEventMap>

  constructor(mode: OMapDrawModeType, params?: OMapDrawParamsType) {
    if (!isDefined(mode)) {
      error_(createMessage('constructor', commonMessage.paramsNotDefined('mode')))
    }
    if (!isValidDrawMode(mode)) {
      error_(createMessage('constructor', commonMessage.paramsInvalidFormat('mode')))
    }
    const resolvedParams: OMapDrawParamsType = params ?? {}
    const { id, active, layer, style, ...drawOptions } = resolvedParams
    super('Draw', { id })
    let drawSource: OMapVectorSourceType | null = null
    if (isDefined<VectorLayer>(layer)) {
      if (layer instanceof VectorLayer) {
        this.layer = layer
        drawSource = layer.getSource() as OMapVectorSourceType
      } else {
        warn_(createMessage('init', commonMessage.paramsInvalidFormat('layer', 'VectorLayer')))
      }
    }
    if (!isDefined(drawSource)) {
      this.layer = new VectorLayer({
        style: style || DEFAULT_STYLE
      })
      drawSource = this.layer.getSource() as OlVectorSourceInstanceType
    }
    const drawParams = Object.assign({}, OMAP_DRAW_DEFAULT_PARAMS, {
      ...drawOptions,
      source: drawSource,
      features: undefined,
      style: undefined
    })
    this._interaction = new OlInteraction.Draw({
      ...getOlDrawType(mode),
      ...drawParams
    })
    // 注册事件
    this.initInteractionEvent(active)
    this.events = new Event<OMapDrawEventMap>(this)
  }

  /**
   * 追加坐标
   *
   * @param coordinates 坐标
   */
  appendCoordinates(coordinates: Array<OMapCoordinateType>) {
    if (!isDefined(coordinates)) {
      error_(createMessage('appendCoordinates', commonMessage.paramsNotDefined('coordinates')))
    }
    const coordinateValues = coordinates.map((c) => {
      return handleGetLngLatValue(c)
    })
    this._interaction.appendCoordinates(coordinateValues)
  }

  /**
   * 取消绘制，并结束当前未完成的绘制
   */
  cancel() {
    this.abort()
  }

  /** 仅中止当前草图；已完成并进入 VectorSource 的 Feature 会保留。 */
  abort() {
    this._interaction.abortDrawing()
  }

  /** 清空绘制图层中已经完成的 Feature。 */
  clearFeatures() {
    this.getLayer()?.clear()
  }

  /**
   * 撤销操作（会删除最后一个已经绘制的点位）
   */
  revoke() {
    this._interaction.removeLastPoint()
  }

  /**
   * 结束当前未完成的绘制（并自动补全图形）
   */
  finish() {
    this._interaction.finishDrawing()
  }

  protected override destroy(destroyLayer: boolean = true) {
    if (destroyLayer && isDefined(this.getLayer())) {
      this.removeInteractionLayer()
    }
    super.destroy()
  }

  /**
   * 获取当前绘制的所有特征
   *
   * @returns 特征数组
   */
  getFeatures(): BasicFeature<OlGeometry.Geometry>[] {
    const layer = this.getLayer()
    if (!isDefined<VectorLayer>(layer)) {
      return []
    }
    return layer.getFeatures() ?? []
  }

  on(type: OMapInteractionDrawEventType, callback: (e: OMapDrawEvent) => void): EventIdType {
    this.validateEvent(type, callback, 'on')
    return this.subscribeEvent(type, callback, (e) =>
      handleInteractionDrawEvent(this, type, e as OlDrawEventPayloadType)
    )
  }

  once(type: OMapInteractionDrawEventType, callback: (e: OMapDrawEvent) => void): EventIdType {
    this.validateEvent(type, callback, 'once')
    return this.subscribeEvent(
      type,
      callback,
      (e) => handleInteractionDrawEvent(this, type, e as OlDrawEventPayloadType),
      true
    )
  }

  protected validateEvent(
    type: OMapInteractionDrawEventType,
    callback: (e: OMapDrawEvent) => void,
    methodName: string
  ) {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(createMessage(methodName, commonMessage.paramsNotDefined('type or callback')))
    }
    if (!isOMapInteractionDrawEventType(type)) {
      error_(createMessage(methodName, commonMessage.paramsInvalidEnum(type)))
    }
    if (!isFunction(callback)) {
      error_(createMessage(methodName, commonMessage.paramsInvalidFormat('callback', 'function')))
    }
  }

  un(id: EventIdType) {
    if (!isDefined(id)) {
      error_(createMessage('un', commonMessage.paramsNotDefined(id)))
    }
    this.events.remove(id)
  }
}
