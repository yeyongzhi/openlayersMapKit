import { type OlSource } from '../../../../../source/index'
import type { FeatureLike } from 'ol/Feature'
import type { Options as OlOGCVectorTileSourceOptions } from 'ol/source/OGCVectorTile'
import { handleGetProjectionValue } from '../../../../core/Projection/handle'
import type { OMapProjectionType } from '../../../../core/Projection/type'

export type OMapOGCVectorTileSourceType<FeatureType extends FeatureLike = FeatureLike> =
  OlSource.OGCVectorTile<FeatureType>

export type OMapOGCVectorTileSourceParamsType<FeatureType extends FeatureLike = FeatureLike> = Omit<
  OlOGCVectorTileSourceOptions<FeatureType>,
  'projection'
> & {
  projection?: OMapProjectionType
}

/** @internal */
export const DEFAULT_OGC_VECTOR_TILE_SOURCE_PARAMS: Partial<OMapOGCVectorTileSourceParamsType> = {
  attributionsCollapsible: true,
  overlaps: true,
  wrapX: true,
  zDirection: 1
}

/** @internal */
export function handleGetOGCVectorTileSourceParams<FeatureType extends FeatureLike = FeatureLike>(
  params: OMapOGCVectorTileSourceParamsType<FeatureType>
) {
  return {
    ...params,
    projection: handleGetProjectionValue(params.projection)
  }
}
