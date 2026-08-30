import { OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import { isString } from '../../../utils/dataType'
import {
  OMapInteractionCommonEventTypes,
  type OMapInteractionCommonParamsType
} from '../Interaction/type'

export type OlDragPanParamsType = ConstructorParameters<typeof OlInteraction.DragPan>[0]
type CustOlDragPanParamsType = ManualOmit<OlDragPanParamsType, 'onBoxEnd'>
export type OMapDragPanParamsType = CustOlDragPanParamsType & OMapInteractionCommonParamsType
export type OMapDragPanType = OlInteraction.DragPan
export type OlDragPanInstanceType = InstanceType<typeof OlInteraction.DragPan>

export const OMapInteractionDragPanEventTypes = [...OMapInteractionCommonEventTypes] as const
export type OMapInteractionDragPanEventType = (typeof OMapInteractionDragPanEventTypes)[number]

export function isOMapInteractionDragPanEventType(
  value: unknown
): value is OMapInteractionDragPanEventType {
  return (
    isString(value) &&
    OMapInteractionDragPanEventTypes.includes(value as OMapInteractionDragPanEventType)
  )
}

import type DragPan from './index'
import type { InteractionStateEvent } from '../handle'

/** 用户回调收到的事件 payload */
export type OMapDragPanEvent = InteractionStateEvent<DragPan, OMapInteractionDragPanEventType>

/** 事件名 → 用户回调参数映射 */
export type OMapDragPanEventMap = Record<OMapInteractionDragPanEventType, [OMapDragPanEvent]>
