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

export const OMapInteractionDragPanEventTypes = [...OMapInteractionCommonEventTypes]
export type OMapInteractionDragPanEventType = (typeof OMapInteractionDragPanEventTypes)[number]

export function isOMapInteractionDragPanEventType(
  value: unknown
): value is OMapInteractionDragPanEventType {
  return (
    isString(value) &&
    OMapInteractionDragPanEventTypes.includes(value as OMapInteractionDragPanEventType)
  )
}
