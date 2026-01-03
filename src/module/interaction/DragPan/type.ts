import { OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import { OMapInteractionCommonParamsType } from '../Interaction/type'

export type OlDragPanParamsType = ConstructorParameters<typeof OlInteraction.DragPan>[0]
type CustOlDragPanParamsType = ManualOmit<OlDragPanParamsType,
    'onBoxEnd'
>
export type OMapDragPanParamsType = CustOlDragPanParamsType & OMapInteractionCommonParamsType
export type OlDragPanInstanceType = InstanceType<typeof OlInteraction.DragPan>