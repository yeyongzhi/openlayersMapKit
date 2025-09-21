import { OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'

export type OlMouseWheelZoomParamsType = ConstructorParameters<typeof OlInteraction.MouseWheelZoom>[0]
type CustOlMouseWheelZoomParamsType = ManualOmit<OlMouseWheelZoomParamsType, ''>
export type OMapMouseWheelZoomParamsType = CustOlMouseWheelZoomParamsType & {
    
}
export type OlInteractionMouseWheelZoomInstanceType = InstanceType<typeof OlInteraction.MouseWheelZoom>
