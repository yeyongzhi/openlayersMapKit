import { OlSource, OlLayer, OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import type { OlAnimationOptions } from '../../../utils/olType/view'

export type OlLinkParamsType = ConstructorParameters<typeof OlInteraction.Link>[0]
type CustOlLinkParamsType = ManualOmit<OlLinkParamsType,
    'animate'
>
export type OMapDragPanParamsType = CustOlLinkParamsType & {
    animate?: boolean | OlAnimationOptions
}
export type OlInteractionLinkInstanceType = InstanceType<typeof OlInteraction.Link>
