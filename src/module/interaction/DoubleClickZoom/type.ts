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

export const OMapInteractionDoubleClickZoomEventTypes = [
  ...OMapInteractionCommonEventTypes
] as const
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

import type DoubleClickZoom from './index'
import type { InteractionStateEvent } from '../handle'

/** 用户回调收到的事件 payload */
export type OMapDoubleClickZoomEvent = InteractionStateEvent<
  DoubleClickZoom,
  OMapInteractionDoubleClickZoomEventType
>

/** 事件名 → 用户回调参数映射 */
export type OMapDoubleClickZoomEventMap = Record<
  OMapInteractionDoubleClickZoomEventType,
  [OMapDoubleClickZoomEvent]
>
