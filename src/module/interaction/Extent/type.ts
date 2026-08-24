import { OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import type { ExtentEvent } from 'ol/interaction/Extent'
import type { ObjectEvent } from 'ol/Object'
import type BaseEvent from 'ol/events/Event'
import type Extent from '../../basic/Extent/index'
import type InteractionExtent from './index'
import { type OMapInteractionCommonParamsType, OMapInteractionCommonEventTypes } from '../Interaction/type'

export type OlInteractionExtentParamsType = ConstructorParameters<typeof OlInteraction.Extent>[0]
type CustOlExtentParamsType = ManualOmit<OlInteractionExtentParamsType,
    ''
>
export type OMapExtentParamsType = CustOlExtentParamsType & OMapInteractionCommonParamsType

export const OMAP_EXTENT_DEFAULT_PARAMS: OMapExtentParamsType = {
    condition: undefined,
    extent: undefined,
    boxStyle: undefined,
    pixelTolerance: 10,
    pointerStyle: undefined,
    wrapX: false
}

export type OMapInteractionExtentType = OlInteraction.Extent
export type OlInteractionExtentInstanceType = InstanceType<typeof OlInteraction.Extent>

export const OMapInteractionExtentEventTypes = [...OMapInteractionCommonEventTypes, "extentchanged"] as const
export type OMapInteractionExtentEventType = typeof OMapInteractionExtentEventTypes[number]

/**
 * OL 原生事件 payload：
 * extentchanged 为 `ExtentEvent`，change/change:active/propertychange 为 `ObjectEvent`，error 为 `BaseEvent`
 */
export type OlExtentEventPayloadType = ExtentEvent | ObjectEvent | BaseEvent

/**
 * OMap 用户回调收到的事件 payload
 */
export interface OMapExtentEvent {
    /** 事件类型 */
    type: OMapInteractionExtentEventType;
    /** 触发事件的 InteractionExtent 实例 */
    target: InteractionExtent;
    /** 当前选框范围（change 系列事件时为 null） */
    extent: Extent | null;
}

/** 事件名 → 用户回调参数映射 */
export type OMapExtentEventMap = Record<OMapInteractionExtentEventType, [OMapExtentEvent]>

// 类型守卫函数
export function isOMapInteractionExtentEventType(
    value: unknown
): value is OMapInteractionExtentEventType {
    return (
        typeof value === 'string' &&
        OMapInteractionExtentEventTypes.includes(value as OMapInteractionExtentEventType)
    );
}
