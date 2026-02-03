import { OlSource, OlLayer, OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import type { OlAnimationOptions } from '../../../utils/olType/view'
import { OMapInteractionCommonParamsType, OMapInteractionCommonEventTypes } from '../Interaction/type'

export type OlLinkParamsType = ConstructorParameters<typeof OlInteraction.Link>[0]
type CustOlLinkParamsType = ManualOmit<OlLinkParamsType,
    'animate'
>
export type OMapLinkParamsType = CustOlLinkParamsType & {
    animate?: boolean | OlAnimationOptions
} & OMapInteractionCommonParamsType

export type OMapLinkType = OlInteraction.Link
export type OlInteractionLinkInstanceType = InstanceType<typeof OlInteraction.Link>

export const OMapInteractionLinkEventTypes = [...OMapInteractionCommonEventTypes ] as const
export type OMapInteractionLinkEventType = typeof OMapInteractionLinkEventTypes[number] extends infer T
    ? T extends string
    ? T
    : never
    : never;

export function isOMapInteractionLinkEventType(
    value: unknown
): value is OMapInteractionLinkEventType {
    return (
        typeof value === 'string' &&
        OMapInteractionLinkEventTypes.includes(value as any)
    );
}