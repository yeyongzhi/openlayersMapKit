import { OlSource, OlLayer, OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import Lnglat from '../../basic/Lnglat/index'
import Pixel from '../../basic/Pixel/index'
import Extent from '../../basic/Extent/index'

export type OlInteractionExtentParamsType = ConstructorParameters<typeof OlInteraction.Extent>[0]
type CustOlExtentParamsType = ManualOmit<OlInteractionExtentParamsType,
    'onBoxEnd'
>
export type OMapExtentParamsType = CustOlExtentParamsType & {}
export type OlInteractionExtentInstanceType = InstanceType<typeof OlInteraction.Extent>