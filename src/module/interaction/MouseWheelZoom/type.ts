import { OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import { OMapInteractionCommonParamsType } from '../Interaction/type'

export type OlMouseWheelZoomParamsType = ConstructorParameters<typeof OlInteraction.MouseWheelZoom>[0]
type CustOlMouseWheelZoomParamsType = ManualOmit<OlMouseWheelZoomParamsType, ''>
export type OMapMouseWheelZoomParamsType = CustOlMouseWheelZoomParamsType & OMapInteractionCommonParamsType
export type OlInteractionMouseWheelZoomInstanceType = InstanceType<typeof OlInteraction.MouseWheelZoom>
