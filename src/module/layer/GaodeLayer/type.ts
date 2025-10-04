import Map from '../../core/Map/index'
import type { BaseLayerOptionsType } from '../BaseLayer/type'
import { type OMapSizeType } from '../../basic/Size/type'
import { type OMapProjectionType } from '../../core/Projection/type'
import { type OMapTileSourceTileGrid } from '../../source/TileSource/type'

export const GaodeLayerType = {
    Vec: 'vec',
    Img: 'img',
    Road: 'road',
}
export type GaodeLayerTypeEnum = 'vec' | 'img' | 'road'
export type OMapGaodeLayerParamsType = BaseLayerOptionsType & {
    preload: number;
    cacheSize: number;
    source?: OMapGaodeLayerSourceParamsType; // source参数是必须的
    map?: Map;
}
export const DEFAULT_GAODE_LAYER_PARAMS: OMapGaodeLayerParamsType = {
    preload: 0,
    cacheSize: 512,
}
export type OMapGaodeLayerSourceParamsType = {
    attributions?: string |string[];
    attributionsCollapsible: boolean;
    cacheSize?: number;
    crossOrigin?: string | null;
    interpolate: boolean;
    projection: OMapProjectionType;
    reprojectionErrorThreshold: number;
    maxZoom: number;
    minZoom: number;
    maxResolution?: number;
    tileGrid?: OMapTileSourceTileGrid;
    tilePixelRatio: number;
    tileSize: OMapSizeType;
    gutter: number;
    tileUrlFunction?: any;
    // url?: string;
    // urls?: string[];
    wrapX: boolean;
    transition: number;
    zDirection: number;
}
export const DEFAULT_GAODE_LAYER_SOURCE_PARAMS: OMapGaodeLayerSourceParamsType = {
    attributionsCollapsible: true,
    interpolate: true,
    projection: "EPSG:3857",
    reprojectionErrorThreshold: 0.5,
    maxZoom: 42,
    minZoom: 0,
    tilePixelRatio: 1,
    tileSize: [256, 256],
    gutter: 0,
    wrapX: true,
    transition: 250,
    zDirection: 0
}