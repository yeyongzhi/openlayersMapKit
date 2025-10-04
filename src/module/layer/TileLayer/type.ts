import type { BaseLayerCommonParamsType, BaseLayerOptionsType } from '../BaseLayer/type'
import { type OMapTileSourceParamsType } from '../../source/TileSource/type'
import Map from '../../core/Map/index'
import { OlSource } from '../../../source/index'

export type OMapTileLayerParamsType = BaseLayerOptionsType & {
    preload: number;
    useInterimTilesOnError: boolean;
    cacheSize: number;
    source: OMapTileSourceParamsType; // source参数是必须的
    map?: Map;
}
export const DEFAULT_TILE_LAYER_PARAMS = {
    preload: 0,
    useInterimTilesOnError: true,
    cacheSize: 512
}

export type OlImageTileSourceInstanceType = InstanceType<typeof OlSource.ImageTile>
/**
 * 子类：
BingMaps
Google
IIIF
OGCMapTile
TileArcGISRest
TileJSON
TileWMS
WMTS
XYZ
Zoomify
 */
export type OlUrlTileSourceInstanceType = InstanceType<typeof OlSource.UrlTile> // 已废弃
export type OlVectorTileSourceInstanceType = InstanceType<typeof OlSource.VectorTile>
export type OlDataTileSourceInstanceType = InstanceType<typeof OlSource.DataTile>
