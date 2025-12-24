import type { ManualOmit } from '../../../utils/type'
import { OlSource, OlLayer, OlFeature, OlGeometry } from '../../../source/index'
import { Map, Style } from '../../../index'
import type { OMapStyleLike } from '../../basic/Style/type'
import BaseFeature from '../../core/Feature/BasicFeature/index'
import type { BaseLayerOptionsType } from '../BaseLayer/type'

export type BaseVectorLayerOptionsType = {
    renderOrder?: () => number;
    renderBuffer?: number;
    source?: OMapVectorSourceOptionsFinalType;
    map?: Map;
    declutter?: boolean | string | number;
    style?: OMapStyleLike;
    updateWhileAnimating?: boolean;
    updateWhileInteracting?: boolean;
}
export const OlBaseVectorLayerDefaultOptions: BaseVectorLayerOptionsType = {
    renderBuffer: 100,
    declutter: false,
    updateWhileAnimating: false,
    updateWhileInteracting: false
}
export type OMapVectorLayerOptionsFinalType = BaseLayerOptionsType & BaseVectorLayerOptionsType

type OlVectorSourceOptionsType = ConstructorParameters<typeof OlSource.Vector<OlFeature<OlGeometry.Geometry>>>[0]
type CustOlVectorSourceOptionsType = ManualOmit<OlVectorSourceOptionsType, 'features'>; // 去掉 projection类型
export type OMapVectorSourceOptionsFinalType = CustOlVectorSourceOptionsType & {
    features?: BaseFeature[];
}

export type OlVectorLayerInstanceType = InstanceType<typeof OlLayer.Vector>
export type OlVectorSourceInstanceType = InstanceType<typeof OlSource.Vector<OlFeature<OlGeometry.Geometry>>>

export type OMapVectorLayerStyleType = OMapStyleLike
