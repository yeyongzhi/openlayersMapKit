import type { BaseLayerCommonParamsType } from '../BaseLayer/type'
import Map from '../../core/Map/index'

export type OMapTileLayerParamsType = BaseLayerCommonParamsType & {
    preload: number;
    useInterimTilesOnError: boolean;
    cacheSize: number;
    source?: any;
    map?: Map;
}
export const DEFAULT_TILE_LAYER_PARAMS = {
    preload: 0,
    useInterimTilesOnError: true,
    cacheSize: 512
}