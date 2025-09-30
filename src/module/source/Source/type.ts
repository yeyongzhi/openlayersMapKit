import { OlSource } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import Projection from '../../core/Projection/index'

export type OlSourceParamsType = ConstructorParameters<typeof OlSource.Source>[0]
export type CustOlSourceParamsType = ManualOmit<OlSourceParamsType, 'attributions' | 'projection'>
export type OMapSourceParamsType = CustOlSourceParamsType & {
    attributions: string | string[];
    projection?: Projection;
}
export const DEFAULT_SOURCE_PARAMS: OMapSourceParamsType = {
    attributions: "",
    attributionsCollapsible: true,
    state: "ready",
    wrapX: false,
    interpolate: false
}
export type OMapSourceParamsCommonKey = "attributions" | "attributionsCollapsible" | "projection" | "state" | "wrapX" | "interpolate"

export type OlSourceTileSourceInstanceType = InstanceType<typeof OlSource.Tile>

export type OMapSourceInstanceType = OlSourceTileSourceInstanceType
