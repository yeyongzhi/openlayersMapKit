import { OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import { isString } from '../../../utils/dataType'
import { type OMapInteractionCommonParamsType, OMapInteractionCommonEventTypes } from '../Interaction/type'

export type OlMouseWheelZoomParamsType = ConstructorParameters<typeof OlInteraction.MouseWheelZoom>[0]
type CustOlMouseWheelZoomParamsType = ManualOmit<OlMouseWheelZoomParamsType, ''>
export type OMapMouseWheelZoomParamsType = CustOlMouseWheelZoomParamsType & OMapInteractionCommonParamsType

export type OMapMouseWheelZoomType = OlInteraction.MouseWheelZoom
export type OlInteractionMouseWheelZoomInstanceType = InstanceType<typeof OlInteraction.MouseWheelZoom>

export const OMapInteractionMouseWheelZoomEventTypes = [
  ...OMapInteractionCommonEventTypes,
];
export type OMapInteractionMouseWheelZoomEventType =
  (typeof OMapInteractionMouseWheelZoomEventTypes)[number];


export function isOMapInteractionMouseWheelZoomEventType(
  value: unknown,
): value is OMapInteractionMouseWheelZoomEventType {
  return (
    isString(value) && OMapInteractionMouseWheelZoomEventTypes.includes(value as OMapInteractionMouseWheelZoomEventType)
  );
}