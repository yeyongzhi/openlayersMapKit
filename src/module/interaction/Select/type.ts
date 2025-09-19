import { OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import VectorLayer from '../../layer/VectorLayer/index'
import BaseFeature from '../../core/Feature/BasicFeature/index'
import { type OMapStyleLike } from '../../basic/Style/type'

export type OlInteractionSelectParamsType = ConstructorParameters<typeof OlInteraction.Select>[0]
type CustOlSelectParamsType = ManualOmit<OlInteractionSelectParamsType,
    'layers' | 'style' | 'features'
>
export type OMapSelectParamsType = CustOlSelectParamsType & {
    layers?: VectorLayer[];
    style?: OMapStyleLike;
    features?: BaseFeature[];
}
export type OlInteractionSelectInstanceType = InstanceType<typeof OlInteraction.Select>