import { OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import { OMapInteractionCommonParamsType } from '../Interaction/type'

export type OlInteractionExtentParamsType = ConstructorParameters<typeof OlInteraction.Extent>[0]
type CustOlExtentParamsType = ManualOmit<OlInteractionExtentParamsType,
    ''
>
export type OMapExtentParamsType = CustOlExtentParamsType & OMapInteractionCommonParamsType
export type OlInteractionExtentInstanceType = InstanceType<typeof OlInteraction.Extent>