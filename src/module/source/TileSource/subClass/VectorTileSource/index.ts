import { OlSource } from '../../../../../source/index'
import type { FeatureLike } from 'ol/Feature'
import TileSource from '../../index'
import {
    DEFAULT_VECTOR_TILE_SOURCE_PARAMS,
    handleGetVectorTileSourceParams,
    type OMapVectorTileSourceParamsType,
    type OMapVectorTileSourceType
} from './type'

export default class VectorTileSource<FeatureType extends FeatureLike = FeatureLike>
    extends TileSource<OMapVectorTileSourceType<FeatureType>> {

    constructor(params: OMapVectorTileSourceParamsType<FeatureType>) {
        super(new OlSource.VectorTile(handleGetVectorTileSourceParams({
            ...DEFAULT_VECTOR_TILE_SOURCE_PARAMS,
            ...params
        } as OMapVectorTileSourceParamsType<FeatureType>)))
    }

    getOverlaps(): boolean {
        return this._source.getOverlaps();
    }

    setOverlaps(overlaps: boolean) {
        this._source.setOverlaps(overlaps);
    }

}
