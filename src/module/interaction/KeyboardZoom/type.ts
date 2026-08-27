import { OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import { isString } from '../../../utils/dataType'
import {
  type OMapInteractionCommonParamsType,
  OMapInteractionCommonEventTypes
} from '../Interaction/type'

export type OlKeyboardZoomParamsType = ConstructorParameters<typeof OlInteraction.KeyboardZoom>[0]
type CustOlKeyboardZoomParamsType = ManualOmit<OlKeyboardZoomParamsType, ''>
export type OMapKeyboardZoomParamsType = OMapInteractionCommonParamsType &
  CustOlKeyboardZoomParamsType & {}

export type OMapKeyboardZoomType = OlInteraction.KeyboardZoom
export type OlInteractionKeyboardZoomInstanceType = InstanceType<typeof OlInteraction.KeyboardZoom>

export const OMapInteractionKeyboardZoomEventTypes = [...OMapInteractionCommonEventTypes]
export type OMapInteractionKeyboardZoomEventType =
  (typeof OMapInteractionKeyboardZoomEventTypes)[number]

export function isOMapInteractionKeyboardZoomEventType(
  value: unknown
): value is OMapInteractionKeyboardZoomEventType {
  return (
    isString(value) &&
    OMapInteractionKeyboardZoomEventTypes.includes(value as OMapInteractionKeyboardZoomEventType)
  )
}
