import type { BaseLayerOptionsType, BaseLayerPropertiesType } from '../BaseLayer/type'
import type VectorTileSource from '../../source/TileSource/subClass/VectorTileSource/index'
import type { OMapVectorTileSourceParamsType } from '../../source/TileSource/subClass/VectorTileSource/type'

export type OMapVectorTileLayerParamsType<
  P extends BaseLayerPropertiesType = BaseLayerPropertiesType
> = BaseLayerOptionsType<P> & {
  preload?: number
  source?: OMapVectorTileSourceParamsType | VectorTileSource
}

export const DEFAULT_VECTOR_TILE_LAYER_PARAMS: OMapVectorTileLayerParamsType = {
  preload: 0
}

export type { OMapVectorTileSourceParamsType }
