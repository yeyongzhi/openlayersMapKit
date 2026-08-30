import { OlSource, OlLayer, OlFeature, OlGeometry } from '../../../source/index'
import Map from '../../core/Map/index'
import type { OMapStyleLike } from '../../basic/Style/type'
import type { OMapVectorSourceParamsType } from '../../source/VectorSource/type'
import type { BaseLayerOptionsType, BaseLayerPropertiesType } from '../BaseLayer/type'

export type BaseVectorLayerOptionsType = {
  renderOrder?: () => number
  renderBuffer?: number
  source?: OMapVectorSourceOptionsFinalType
  map?: Map
  declutter?: boolean | string | number
  style?: OMapStyleLike
  updateWhileAnimating?: boolean
  updateWhileInteracting?: boolean
}
export type OMapVectorLayerOptionsFinalType<
  P extends BaseLayerPropertiesType = BaseLayerPropertiesType
> = BaseLayerOptionsType<P> & BaseVectorLayerOptionsType

export type OMapVectorSourceOptionsFinalType = OMapVectorSourceParamsType

export type OMapVectorLayerType = OlLayer.Vector
export type OlVectorLayerInstanceType = InstanceType<typeof OlLayer.Vector>
export type OMapVectorSourceType = OlSource.Vector
export type OlVectorSourceInstanceType = InstanceType<
  typeof OlSource.Vector<OlFeature<OlGeometry.Geometry>>
>

export type OMapVectorLayerStyleType = OMapStyleLike
