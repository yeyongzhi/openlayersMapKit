import { OlSource } from '../../../../../source/index'
import TileSource from '../../index'
import {
    DEFAULT_TILE_DEBUG_SOURCE_PARAMS,
    handleGetTileDebugSourceParams,
    type OMapTileDebugSourceParamsType,
    type OMapTileDebugSourceType
} from './type'

export default class TileDebugSource extends TileSource<OMapTileDebugSourceType> {

    constructor(params: OMapTileDebugSourceParamsType = {}) {
        super(new OlSource.TileDebug(handleGetTileDebugSourceParams({
            ...DEFAULT_TILE_DEBUG_SOURCE_PARAMS,
            ...params
        })) as OMapTileDebugSourceType)
    }

}
