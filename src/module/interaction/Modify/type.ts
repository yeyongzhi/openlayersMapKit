import { type OlInteraction, type OlGeometry } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import { isString } from '../../../utils/dataType'
import type { ModifyEvent } from 'ol/interaction/Modify'
import type { ObjectEvent } from 'ol/Object'
import type BaseEvent from 'ol/events/Event'
import type MapBrowserEvent from 'ol/MapBrowserEvent'
import type Modify from './index'
import type VectorLayer from '../../layer/VectorLayer/index'
import type BasicFeature from '../../core/Feature/BasicFeature/index'
import type { OMapBasicFeatureCoordinatesType } from '../../core/Feature/BasicFeature/type'
import {
  type OMapInteractionCommonParamsType,
  OMapInteractionCommonEventTypes
} from '../Interaction/type'

export type OlModifyParamsType = ConstructorParameters<typeof OlInteraction.Modify>[0]
type CustOlModifyParamsType = ManualOmit<OlModifyParamsType, 'source'>
export type OMapModifyParamsType = CustOlModifyParamsType & {
  layer: VectorLayer
} & OMapInteractionCommonParamsType

export type OMapModifyType = OlInteraction.Modify
export type OlModifyInstanceType = InstanceType<typeof OlInteraction.Modify>
export const OMapInteractionModifyEventTypes = [
  ...OMapInteractionCommonEventTypes,
  'modifystart',
  'modifyend'
] as const
export type OMapInteractionModifyEventType = (typeof OMapInteractionModifyEventTypes)[number]

/**
 * OL 原生事件 payload：
 * modifystart/modifyend 为 `ModifyEvent`，change/change:active/propertychange 为 `ObjectEvent`，error 为 `BaseEvent`
 */
export type OlModifyEventPayloadType = ModifyEvent | ObjectEvent | BaseEvent

/**
 * OMap 用户回调收到的事件 payload
 */
export interface OMapModifyEvent {
  /** 事件类型 */
  type: OMapInteractionModifyEventType
  /** 触发事件的 Modify 实例 */
  target: Modify
  /** 触发修改的原生地图浏览器事件（change 系列事件时为 undefined） */
  mapBrowserEvent: MapBrowserEvent | undefined
}

/** 事件名 → 用户回调参数映射 */
export type OMapModifyEventMap = Record<OMapInteractionModifyEventType, [OMapModifyEvent]>

export function isOMapInteractionModifyEventType(
  value: unknown
): value is OMapInteractionModifyEventType {
  return (
    isString(value) &&
    OMapInteractionModifyEventTypes.includes(value as OMapInteractionModifyEventType)
  )
}

export interface SampleRecordItem {
  /**
   * 要素id
   */
  id: number | string | undefined | null
  /**
   * 原始要素id
   */
  originFeatureId: string | undefined | null
  /**
   * 要素类型
   */
  type: string | undefined | null
  /**
   * 要素坐标
   * 针对Modify，目前只考虑修改坐标的情况
   * TODO：后续可以接入修改样式Style、修改属性Properties
   */
  coordinates: OMapBasicFeatureCoordinatesType
}

export interface ModifyRecordItem {
  /**
   * 修改时间
   */
  time: string
  /**
   * 要素集合
   */
  features: Array<BasicFeature<OlGeometry.Geometry> | SampleRecordItem>
  /**
   * 修改版本
   */
  version: number
}
