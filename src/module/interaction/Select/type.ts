import { OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import VectorLayer from '../../layer/VectorLayer/index'
import BaseFeature from '../../core/Feature/BasicFeature/index'
import { type OMapStyleLike } from '../../basic/Style/type'

export type OlInteractionSelectParamsType = ConstructorParameters<typeof OlInteraction.Select>[0]
type CustOlSelectParamsType = ManualOmit<OlInteractionSelectParamsType,
    'layers' | 'style' | 'features' | 'filter'
>
export type OMapSelectParamsType = CustOlSelectParamsType & {
    layers?: VectorLayer[];
    style?: OMapStyleLike;
    features?: BaseFeature[];
    filter?: (feature: BaseFeature, layer: VectorLayer) => boolean;
}
export type OlInteractionSelectInstanceType = InstanceType<typeof OlInteraction.Select>

/**
 * 选择交互事件类型
 * 这里的select类型，其实是包含了select和deselect两种动作
 */
export type OMapSelectEventType = 'select'