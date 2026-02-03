import { OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import { type OMapInteractionCommonParamsType } from '../Interaction/type'

export type OlKeyboardZoomParamsType = ConstructorParameters<typeof OlInteraction.KeyboardZoom>[0]
type CustOlKeyboardZoomParamsType = ManualOmit<OlKeyboardZoomParamsType, ''>
export type OMapKeyboardZoomParamsType = OMapInteractionCommonParamsType & CustOlKeyboardZoomParamsType & {}
export type OMapKeyboardZoomType = OlInteraction.KeyboardZoom
export type OlInteractionKeyboardZoomInstanceType = InstanceType<typeof OlInteraction.KeyboardZoom>
