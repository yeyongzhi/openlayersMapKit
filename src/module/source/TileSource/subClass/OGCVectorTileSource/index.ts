import { OlSource } from '../../../../../source/index'
import type { FeatureLike } from 'ol/Feature'
import TileSource from '../../index'
import {
    DEFAULT_OGC_VECTOR_TILE_SOURCE_PARAMS,
    handleGetOGCVectorTileSourceParams,
    type OMapOGCVectorTileSourceParamsType,
    type OMapOGCVectorTileSourceType
} from './type'

export default class OGCVectorTileSource<FeatureType extends FeatureLike = FeatureLike>
    extends TileSource<OMapOGCVectorTileSourceType<FeatureType>> {

    constructor(params: OMapOGCVectorTileSourceParamsType<FeatureType>) {
        super(new OlSource.OGCVectorTile(handleGetOGCVectorTileSourceParams({
            ...DEFAULT_OGC_VECTOR_TILE_SOURCE_PARAMS,
            ...params
        } as OMapOGCVectorTileSourceParamsType<FeatureType>)) as OMapOGCVectorTileSourceType<FeatureType>)
    }

    getOverlaps(): boolean {
        return this._source.getOverlaps();
    }

    setOverlaps(overlaps: boolean) {
        this._source.setOverlaps(overlaps);
    }

}
