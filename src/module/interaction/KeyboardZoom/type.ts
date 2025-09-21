import { OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'

export type OlKeyboardZoomParamsType = ConstructorParameters<typeof OlInteraction.KeyboardZoom>[0]
type CustOlKeyboardZoomParamsType = ManualOmit<OlKeyboardZoomParamsType, ''>
export type OMapKeyboardZoomParamsType = CustOlKeyboardZoomParamsType & {
    
}
export type OlInteractionKeyboardZoomInstanceType = InstanceType<typeof OlInteraction.KeyboardZoom>
