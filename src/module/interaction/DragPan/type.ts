import { OlSource, OlLayer, OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import Lnglat from '../../basic/Lnglat/index'
import Pixel from '../../basic/Pixel/index'
import Extent from '../../basic/Extent/index'

export type OlDragPanParamsType = ConstructorParameters<typeof OlInteraction.DragPan>[0]
type CustOlDragPanParamsType = ManualOmit<OlDragPanParamsType,
    'onBoxEnd'
>
export type OMapDragPanParamsType = CustOlDragPanParamsType & {}
export type OlDragPanInstanceType = InstanceType<typeof OlInteraction.DragPan>