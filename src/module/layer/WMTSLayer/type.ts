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

export type OMapWMTSLayerParamsType = BaseLayerOptionsType & {
    preload: number;
    cacheSize: number;
    source?: OMapWMTSLayerSourceParamsType; // source参数是必须的
    map?: Map;
}
export const DEFAULT_WMTS_LAYER_PARAMS: OMapWMTSLayerParamsType = {
    preload: 0,
    cacheSize: 512,
}
type OMapWMTSLayerRequestEncodingEnum = 'KVP' | 'REST'
export type OMapWMTSTileGridParamsType = {
    extent?: Extent | OlExtentType;
    origin?: Lnglat | OlCoordinateType;
    origins?: Array<Lnglat | OlCoordinateType>;
    resolutions: number[];
    matrixIds: string[];
    sizes: Array<Size | OlSizeType>
    tileSize?: number | Size | OlSizeType;
    tileSizes?: Array<number | Size | OlSizeType>;
}
export type OMapWMTSLayerSourceParamsType = {
    attributions?: string | string[];
    attributionsCollapsible: boolean;
    crossOrigin?: string | null;
    interpolate: boolean;
    tileGrid?: OMapWMTSTileGridParamsType;
    projection: OMapProjectionType;
    reprojectionErrorThreshold: number;
    requestEncoding: OMapWMTSLayerRequestEncodingEnum;
    layer: string;
    style: string;
    tileClass?: any; // TODO
    tilePixelRatio: number;
    format: string;
    version: string;
    matrixSet: string;
    dimensions?: Record<string, string>;
    url?: string;
    tileLoadFunction?: (imageTile: any, src?: string) => void; // TODO
    urls?: string[];
    wrapX: boolean;
    transition: number;
    zDirection: number;
}
export const DEFAULT_WMTS_LAYER_SOURCE_PARAMS: OMapWMTSLayerSourceParamsType = {
    attributionsCollapsible: true,
    interpolate: true,
    projection: "EPSG:3857",
    reprojectionErrorThreshold: 0.5,
    requestEncoding: 'KVP',
    layer: '',
    style: '',
    tilePixelRatio: 1,
    format: 'image/jpeg',
    version: '1.0.0',
    matrixSet: 'EPSG:3857',
    wrapX: true,
    transition: 250,
    zDirection: 0
}
export type OlwmsSourceInstanceType = InstanceType<typeof OlSource.TileWMS>