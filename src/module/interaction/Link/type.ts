import { type OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import type { OlAnimationOptions } from '../../../utils/olType/view'
import { type OlCoordinateType } from '../../basic/LngLat/type'
import {
  type OMapInteractionCommonParamsType,
  OMapInteractionCommonEventTypes
} from '../Interaction/type'

export type OlLinkParamsType = ConstructorParameters<typeof OlInteraction.Link>[0]
type CustOlLinkParamsType = ManualOmit<OlLinkParamsType, 'animate'>
export type OMapLinkParamsType = CustOlLinkParamsType & {
  animate?: boolean | OlAnimationOptions
} & OMapInteractionCommonParamsType

/**
 * 坐标字段已由 `LngLat` 转换为 OpenLayers 原生坐标后的动画选项。
 * `center` 与 `anchor` 都接受 `LngLat`，两者都必须转换后再交给 OpenLayers。
 */
export type OlResolvedAnimationOptions = ManualOmit<OlAnimationOptions, 'center' | 'anchor'> & {
  center?: OlCoordinateType
  anchor?: OlCoordinateType
}

/** 可直接交给 OpenLayers `Link` 交互的参数。 */
export type OlLinkResolvedParamsType = CustOlLinkParamsType & {
  animate?: boolean | OlResolvedAnimationOptions
} & OMapInteractionCommonParamsType

export type OMapLinkType = OlInteraction.Link
export type OlInteractionLinkInstanceType = InstanceType<typeof OlInteraction.Link>

export const OMapInteractionLinkEventTypes = [...OMapInteractionCommonEventTypes] as const
export type OMapInteractionLinkEventType = (typeof OMapInteractionLinkEventTypes)[number]

export function isOMapInteractionLinkEventType(
  value: unknown
): value is OMapInteractionLinkEventType {
  return (
    typeof value === 'string' &&
    OMapInteractionLinkEventTypes.includes(value as OMapInteractionLinkEventType)
  )
}

import type Link from './index'
import type { InteractionStateEvent } from '../handle'

/** 用户回调收到的事件 payload */
export type OMapLinkEvent = InteractionStateEvent<Link, OMapInteractionLinkEventType>

/** 事件名 → 用户回调参数映射 */
export type OMapLinkEventMap = Record<OMapInteractionLinkEventType, [OMapLinkEvent]>
