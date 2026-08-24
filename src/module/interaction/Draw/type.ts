import { OlSource, OlLayer, OlInteraction, OlGeometry, OlFeature } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import { isString } from '../../../utils/dataType'
import type { DrawEvent } from 'ol/interaction/Draw'
import type { ObjectEvent } from 'ol/Object'
import type BaseEvent from 'ol/events/Event'
import type BasicFeature from '../../core/Feature/BasicFeature/index'
import type Draw from './index'
import Style from '../../basic/Style/index'
import VectorLayer from '../../layer/VectorLayer/index'
import type { OMapStyleLike } from '../../basic/Style/type'
import {
  type OMapInteractionCommonParamsType,
  OMapInteractionCommonEventTypes
} from '../Interaction/type'

export type OlDrawType =
  | 'Point'
  | 'LineString'
  | 'Polygon'
  | 'LinearRing'
  | 'MultiPoint'
  | 'MultiLineString'
  | 'MultiPolygon'
  | 'GeometryCollection'
  | 'Circle'

/**
 * 绘制模式
 */
export const DrawMode = {
  /** 点 */
  Point: 'Point',
  /** 线 */
  LineString: 'LineString',
  /** 面 */
  Polygon: 'Polygon',
  /** 矩形 */
  Rectangle: 'Rectangle',
  /** 圆 */
  Circle: 'Circle'
} as const

export type OMapDrawModeType = (typeof DrawMode)[keyof typeof DrawMode]

export function isVaildDrawMode(mode: OMapDrawModeType): mode is OMapDrawModeType {
  return Object.values(DrawMode).includes(mode)
}

type OlDrawParamsType = ConstructorParameters<typeof OlInteraction.Draw>[0]
export type OMapDrawType = OlInteraction.Draw
export type OlDrawInstanceType = InstanceType<typeof OlInteraction.Draw>
type CustOlDrawParamsType = ManualOmit<
  OlDrawParamsType,
  'type' | 'source' | 'features' | 'finishCondition' | 'style' | 'geometryFunction'
>
export type OMapDrawParamsType = OMapInteractionCommonParamsType &
  CustOlDrawParamsType & {
    layer?: VectorLayer
    /** 样式 */
    style?: OMapStyleLike
  }

export const OMAP_DRAW_DEFAULT_PARAMS = {
  clickTolerance: 6,
  dragVertexDelay: 500,
  snapTolerance: 12,
  stopClick: false
}

/**
 * 测量事件类型
 */
export const DrawEventType = {
  drawStart: 'drawstart',
  drawEnd: 'drawend',
  drawAbort: 'drawabort'
} as const
export const OMapInteractionDrawEventTypes = [
  ...OMapInteractionCommonEventTypes,
  ...Object.values(DrawEventType)
] as const
export type OMapInteractionDrawEventType = (typeof OMapInteractionDrawEventTypes)[number]

/**
 * OL 原生事件 payload：
 * drawstart/drawend/drawabort 为 `DrawEvent`，change/change:active/propertychange 为 `ObjectEvent`，error 为 `BaseEvent`
 */
export type OlDrawEventPayloadType =
  | DrawEvent
  | ObjectEvent
  | BaseEvent
  /**
   * VectorLayer 在 addfeature 之后合成 drawEnd 事件时构造的最小 payload（仅含 feature）
   */
  | { feature: OlFeature<OlGeometry.Geometry> }

/**
 * OMap 用户回调收到的事件 payload
 */
export interface OMapDrawEvent {
  /** 事件类型 */
  type: OMapInteractionDrawEventType
  /** 触发事件的 Draw 实例 */
  target: Draw
  /** 绘制图层当前的全部 Feature */
  features: BasicFeature<OlGeometry.Geometry>[]
  /** 本事件关联的 Feature（drawend 时为新完成的 Feature，其余事件可能为 null） */
  feature: BasicFeature<OlGeometry.Geometry> | null
}

/** 事件名 → 用户回调参数映射 */
export type OMapDrawEventMap = Record<OMapInteractionDrawEventType, [OMapDrawEvent]>

// 类型守卫函数
export function isOMapInteractionDrawEventType(
  value: unknown
): value is OMapInteractionDrawEventType {
  return (
    isString(value) && OMapInteractionDrawEventTypes.includes(value as OMapInteractionDrawEventType)
  )
}
