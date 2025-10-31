import { OlSource } from '../../../source/index'
import Map from '../../core/Map/index'
import Extent from '../../basic/Extent/index'
import { type OlExtentType } from '../../basic/Extent/type'
import Lnglat from '../../basic/Lnglat/index'
import { type OlCoordinateType } from '../../basic/Lnglat/type'
import Size from '../../basic/Size/index'
import { type OlSizeType } from '../../basic/Size/type'
import { type OMapProjectionType } from '../../core/Projection/type'
import type { BaseLayerCommonParamsType, BaseLayerOptionsType } from '../BaseLayer/type'

export type OMapImageLayerParamsType = BaseLayerOptionsType & {
    source?: OMapImageLayerSourceParamsType; // source参数是必须的
}
export const DEFAULT_IMAGE_LAYER_PARAMS: OMapImageLayerParamsType = {}

export type OMapImageLayerSourceStateType = 'undefined' | 'loading' | 'ready' | 'error'
/**
 * source类型
 */
export type OMapImageLayerSourceParamsType = {
    attributions?: string | string[];
    interpolate: boolean;
    loader?: (extent: OlExtentType, resolution: number, pixelRatio: number) => void;
    projection?: OMapProjectionType;
    resolutions?: number[];
    state?: OMapImageLayerSourceStateType;
}
export const DEFAULT_IMAGE_LAYER_SOURCE_PARAMS: OMapImageLayerSourceParamsType = {
    interpolate: true,
}
export type OlImageSourceInstanceType = InstanceType<typeof OlSource.Image>