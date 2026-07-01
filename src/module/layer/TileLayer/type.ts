import type { BaseLayerCommonParamsType, BaseLayerOptionsType } from '../BaseLayer/type'
import { type OMapTileSourceParamsType } from '../../source/TileSource/type'
import { OlLayer } from '../../../source/index'

export type OMapTileLayerType = OlLayer.Tile

export type OMapTileLayerParamsType = BaseLayerOptionsType & {
    preload: number;
    useInterimTilesOnError: boolean;
    cacheSize: number;
    source: OMapTileSourceParamsType;
}
export const DEFAULT_TILE_LAYER_PARAMS = {
    preload: 0,
    useInterimTilesOnError: true,
    cacheSize: 512
}