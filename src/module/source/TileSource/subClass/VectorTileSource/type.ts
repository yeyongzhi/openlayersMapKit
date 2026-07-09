import { OlSource } from '../../../../../source/index'
import type { FeatureLike } from 'ol/Feature'
import type { Options as OlVectorTileSourceOptions } from 'ol/source/VectorTile'
import { handleGetExtentValue } from '../../../../basic/Extent/handle'
import type { OMapExtentType } from '../../../../basic/Extent/type'
import { handleGetSizeValue } from '../../../../basic/Size/handle'
import type { OMapSizeType } from '../../../../basic/Size/type'
import { DEFAULT_TILE_SOURCE_PARAMS, handleGetTileSourceParams, type OMapTileSourceTileGrid, type OMapTileSourceTileGridInstance } from '../../type'
import type { OMapProjectionType } from '../../../../core/Projection/type'

export type OMapVectorTileSourceType<FeatureType extends FeatureLike = FeatureLike> = OlSource.VectorTile<FeatureType>

export type OMapVectorTileSourceParamsType<FeatureType extends FeatureLike = FeatureLike> = Omit<
    OlVectorTileSourceOptions<FeatureType>,
    'projection' | 'tileGrid' | 'tileSize' | 'extent'
> & {
    projection?: OMapProjectionType;
    tileGrid?: OMapTileSourceTileGrid | OMapTileSourceTileGridInstance;
    tileSize?: number | OMapSizeType;
    extent?: OMapExtentType;
}

export const DEFAULT_VECTOR_TILE_SOURCE_PARAMS: OMapVectorTileSourceParamsType = {
    ...DEFAULT_TILE_SOURCE_PARAMS,
    attributionsCollapsible: true,
    overlaps: true,
    maxZoom: 22,
    tileSize: 512,
    wrapX: true,
    zDirection: 1
}

export function handleGetVectorTileSourceParams<FeatureType extends FeatureLike = FeatureLike>(
    params: OMapVectorTileSourceParamsType<FeatureType>
) {
    return {
        ...handleGetTileSourceParams(params),
        extent: params.extent ? handleGetExtentValue(params.extent) : undefined,
        tileSize: typeof params.tileSize === 'number'
            ? params.tileSize
            : params.tileSize
                ? handleGetSizeValue(params.tileSize)
                : undefined
    }
}
