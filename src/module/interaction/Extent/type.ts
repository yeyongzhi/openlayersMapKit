import { OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'

export type OlInteractionExtentParamsType = ConstructorParameters<typeof OlInteraction.Extent>[0]
type CustOlExtentParamsType = ManualOmit<OlInteractionExtentParamsType,
    ''
>
export type OMapExtentParamsType = CustOlExtentParamsType & {}
export type OlInteractionExtentInstanceType = InstanceType<typeof OlInteraction.Extent>