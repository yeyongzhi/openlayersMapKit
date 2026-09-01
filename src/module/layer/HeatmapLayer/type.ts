import type { BaseLayerOptionsType, BaseLayerPropertiesType } from '../BaseLayer/type'
import type VectorSource from '../../source/VectorSource/index'
import type { OMapVectorSourceParamsType } from '../../source/VectorSource/type'

export type OMapHeatmapLayerParamsType<
  P extends BaseLayerPropertiesType = BaseLayerPropertiesType
> = BaseLayerOptionsType<P> & {
  preload?: number
  source?: OMapVectorSourceParamsType | VectorSource
  radius?: number
  blur?: number
  gradient?: string[]
  weight?: string | ((feature: unknown) => number)
}

export const DEFAULT_HEATMAP_LAYER_PARAMS: OMapHeatmapLayerParamsType = {
  preload: 0
}
