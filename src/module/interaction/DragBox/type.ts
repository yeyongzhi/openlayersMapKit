import { type OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import { isString } from '../../../utils/dataType'
import type { DragBoxEvent } from 'ol/interaction/DragBox'
import type { ObjectEvent } from 'ol/Object'
import type BaseEvent from 'ol/events/Event'
import type LngLat from '../../basic/LngLat/index'
import type Pixel from '../../basic/Pixel/index'
import type Extent from '../../basic/Extent/index'
import type DragBox from './index'
import {
  OMapInteractionCommonEventTypes,
  type OMapInteractionCommonParamsType
} from '../Interaction/type'

export interface DragBoxEndEvent {
  /** 拖动框结束为止的坐标 */
  coordinate?: LngLat
  /** 拖动框结束为止的像素坐标 */
  pixel?: Pixel
  /** 拖动框结束为止的范围 */
  extent?: Extent | null
  target: DragBox
}

export type OlDragBoxParamsType = ConstructorParameters<typeof OlInteraction.DragBox>[0]
type CustOlDragBoxParamsType = ManualOmit<OlDragBoxParamsType, 'onBoxEnd'>

export type DragBoxEndEventFunctionType = (e: DragBoxEndEvent) => void | null
export type OMapDragBoxParamsType = CustOlDragBoxParamsType & {
  onBoxEnd?: DragBoxEndEventFunctionType
} & OMapInteractionCommonParamsType

export type OMapDragBoxType = OlInteraction.DragBox
export type OlDragBoxInstanceType = InstanceType<typeof OlInteraction.DragBox>

export const OMapInteractionDragBoxEventTypes = [
  ...OMapInteractionCommonEventTypes,
  'boxcancel',
  'boxdrag',
  'boxend',
  'boxstart'
] as const

export type OMapInteractionDragBoxEventType = (typeof OMapInteractionDragBoxEventTypes)[number]

/**
 * OL 原生事件 payload：
 * boxstart/boxdrag/boxend/boxcancel 为 `DragBoxEvent`，change/change:active/propertychange 为 `ObjectEvent`，error 为 `BaseEvent`
 */
export type OlDragBoxEventPayloadType = DragBoxEvent | ObjectEvent | BaseEvent

/**
 * OMap 用户回调收到的事件 payload（pixel/coordinate 仅 box 系列事件有值）
 */
export interface OMapDragBoxEvent {
  /** 触发事件的 DragBox 实例 */
  target: DragBox
  /** 事件类型 */
  type: OMapInteractionDragBoxEventType
  /** 事件像素坐标（取自原生 mapBrowserEvent.pixel，change 系列事件为 undefined） */
  pixel?: Pixel
  /** 事件地理坐标（change 系列事件为 undefined） */
  coordinate?: LngLat
}

/** 事件名 → 用户回调参数映射 */
export type OMapDragBoxEventMap = Record<OMapInteractionDragBoxEventType, [OMapDragBoxEvent]>

export function isOMapInteractionDragBoxEventType(
  value: unknown
): value is OMapInteractionDragBoxEventType {
  return (
    isString(value) &&
    OMapInteractionDragBoxEventTypes.includes(value as OMapInteractionDragBoxEventType)
  )
}
