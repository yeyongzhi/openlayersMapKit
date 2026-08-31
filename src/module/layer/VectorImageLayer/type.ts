import type { BaseLayerOptionsType, BaseLayerPropertiesType } from '../BaseLayer/type'
import type VectorSource from '../../source/VectorSource/index'
import type { OMapVectorSourceParamsType } from '../../source/VectorSource/type'

export type OMapVectorImageLayerParamsType<P extends BaseLayerPropertiesType = BaseLayerPropertiesType> =
  BaseLayerOptionsType<P> & {
    source?: OMapVectorSourceParamsType | VectorSource
  }

export const DEFAULT_VECTOR_IMAGE_LAYER_PARAMS: OMapVectorImageLayerParamsType = {}
