import type { BaseLayerOptionsType, ManualOmit } from '../../../utils/type'
import { OlSource, OlLayer } from '../../../source/index'
import { Map } from '../../../index'
import BaseFeature from '../../core/Feature/BasicFeature/index'


/** --------------------------- */
/** VectorLayer */
/** --------------------------- */
export type BaseVectorLayerOptionsType = {
    renderOrder?: () => number;
    renderBuffer?: number;
    source?: OMapVectorSourceOptionsFinalType;
    map?: Map;
    declutter?: boolean | string | number;
    style?: any; // TODO
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

type OlVectorSourceOptionsType = ConstructorParameters<typeof OlSource.Vector>[0]
type CustOlVectorSourceOptionsType = ManualOmit<OlVectorSourceOptionsType, 'features'>; // 去掉 projection类型
export type OMapVectorSourceOptionsFinalType = CustOlVectorSourceOptionsType & {
    features?: BaseFeature[];
}


export type OlVectorLayerInstanceType = InstanceType<typeof OlLayer.Vector>
export type OlVectorSourceInstanceType = InstanceType<typeof OlSource.Vector>
