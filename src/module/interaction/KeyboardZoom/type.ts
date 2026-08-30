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

export const OMapInteractionKeyboardZoomEventTypes = [...OMapInteractionCommonEventTypes] as const
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

import type KeyboardZoom from './index'
import type { InteractionStateEvent } from '../handle'

/** 用户回调收到的事件 payload */
export type OMapKeyboardZoomEvent = InteractionStateEvent<
  KeyboardZoom,
  OMapInteractionKeyboardZoomEventType
>

/** 事件名 → 用户回调参数映射 */
export type OMapKeyboardZoomEventMap = Record<
  OMapInteractionKeyboardZoomEventType,
  [OMapKeyboardZoomEvent]
>
