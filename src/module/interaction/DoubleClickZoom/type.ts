import { OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import type { OMapInteractionCommonParamsType } from '../Interaction/type'

export type OlDoubleClickZoomParamsType = ConstructorParameters<typeof OlInteraction.DoubleClickZoom>[0]
type CustOlDoubleClickZoomParamsType = ManualOmit<OlDoubleClickZoomParamsType, ''>
export type OMapDoubleClickZoomParamsType = CustOlDoubleClickZoomParamsType & OMapInteractionCommonParamsType
export type OlInteractionDoubleClickZoomInstanceType = InstanceType<typeof OlInteraction.DoubleClickZoom>
