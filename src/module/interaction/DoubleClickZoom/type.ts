import { isString } from '../../../utils/dataType'
import { OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import {
  OMapInteractionCommonEventTypes,
  type OMapInteractionCommonParamsType
} from '../Interaction/type'

export type OlDoubleClickZoomParamsType = ConstructorParameters<
  typeof OlInteraction.DoubleClickZoom
>[0]
type CustOlDoubleClickZoomParamsType = ManualOmit<OlDoubleClickZoomParamsType, ''>
export type OMapDoubleClickZoomParamsType = CustOlDoubleClickZoomParamsType &
  OMapInteractionCommonParamsType

export type OMapDoubleClickZoomType = OlInteraction.DoubleClickZoom
export type OlInteractionDoubleClickZoomInstanceType = InstanceType<
  typeof OlInteraction.DoubleClickZoom
>

export const OMapInteractionDoubleClickZoomEventTypes = [...OMapInteractionCommonEventTypes]
export type OMapInteractionDoubleClickZoomEventType =
  (typeof OMapInteractionDoubleClickZoomEventTypes)[number]

export function isOMapInteractionDoubleClickZoomEventType(
  value: unknown
): value is OMapInteractionDoubleClickZoomEventType {
  return (
    isString(value) &&
    OMapInteractionDoubleClickZoomEventTypes.includes(
      value as OMapInteractionDoubleClickZoomEventType
    )
  )
}
