import { type OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import {
  type OMapInteractionCommonParamsType,
  OMapInteractionCommonEventTypes
} from '../Interaction/type'
import { isString } from '../../../utils/dataType'

export type OlDragZoomParamsType = ConstructorParameters<typeof OlInteraction.DragZoom>[0]
type CustOlDragZoomParamsType = ManualOmit<OlDragZoomParamsType, ''>
export type OMapDragZoomParamsType = OMapInteractionCommonParamsType & CustOlDragZoomParamsType

export const defaultDragZoomOptions: OMapDragZoomParamsType = {
  className: 'omap-dragzoom',
  condition: undefined,
  duration: 200,
  out: false,
  minArea: 64
}

export type OMapDragZoomType = OlInteraction.DragZoom
export type OlDragZoomInstanceType = InstanceType<typeof OlInteraction.DragZoom>

export const OMapInteractionDragZoomEventTypes = [...OMapInteractionCommonEventTypes] as const
export type OMapInteractionDragZoomEventType = (typeof OMapInteractionDragZoomEventTypes)[number]

export function isOMapInteractionDragZoomEventType(
  value: unknown
): value is OMapInteractionDragZoomEventType {
  return (
    isString(value) &&
    OMapInteractionDragZoomEventTypes.includes(value as OMapInteractionDragZoomEventType)
  )
}

import type DragZoom from './index'
import type { InteractionStateEvent } from '../handle'

/** 用户回调收到的事件 payload */
export type OMapDragZoomEvent = InteractionStateEvent<DragZoom, OMapInteractionDragZoomEventType>

/** 事件名 → 用户回调参数映射 */
export type OMapDragZoomEventMap = Record<OMapInteractionDragZoomEventType, [OMapDragZoomEvent]>
