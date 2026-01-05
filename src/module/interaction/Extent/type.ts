import { OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import { type OMapInteractionCommonParamsType, type OMapInteractionEventType, OMapInteractionEventTypes } from '../Interaction/type'

export type OlInteractionExtentParamsType = ConstructorParameters<typeof OlInteraction.Extent>[0]
type CustOlExtentParamsType = ManualOmit<OlInteractionExtentParamsType,
    ''
>
export type OMapExtentParamsType = CustOlExtentParamsType & OMapInteractionCommonParamsType
export type OlInteractionExtentInstanceType = InstanceType<typeof OlInteraction.Extent>

export const OMapInteractionExtentEventTypes = [...OMapInteractionEventTypes, "extentchanged"] as const
export type OMapInteractionExtentEventType = typeof OMapInteractionExtentEventTypes[number] extends infer T
    ? T extends string
    ? T
    : never
    : never;

// 类型守卫函数
export function isOMapInteractionExtentEventType(
    value: unknown
): value is OMapInteractionExtentEventType {
    return (
        typeof value === 'string' &&
        OMapInteractionExtentEventTypes.includes(value as any)
    );
}
