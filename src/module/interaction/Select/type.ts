import { OlGeometry, OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import { isString } from '../../../utils/dataType'
import VectorLayer from '../../layer/VectorLayer/index'
import BaseFeature from '../../core/Feature/BasicFeature/index'
import { type OMapStyleLike } from '../../basic/Style/type'
import { type OMapInteractionCommonParamsType, OMapInteractionCommonEventTypes } from '../Interaction/type'

export type OlInteractionSelectParamsType = ConstructorParameters<typeof OlInteraction.Select>[0]
type CustOlSelectParamsType = ManualOmit<OlInteractionSelectParamsType,
    'layers' | 'style' | 'features' | 'filter'
>
export type OMapSelectParamsType = OMapInteractionCommonParamsType & CustOlSelectParamsType & {
    layers?: VectorLayer[];
    style?: OMapStyleLike;
    features?: BaseFeature<OlGeometry.Geometry>[];
    filter?: (feature: BaseFeature<OlGeometry.Geometry>, layer: VectorLayer) => boolean;
}

export type OMapSelectType = OlInteraction.Select
export type OlInteractionSelectInstanceType = InstanceType<typeof OlInteraction.Select>

/**
 * 选择交互事件类型
 * 这里的select类型，其实是包含了select和deselect两种动作
 */

export const OMapInteractionSelectEventTypes = [
  ...OMapInteractionCommonEventTypes,
  'select',
];
export type OMapInteractionSelectEventType =
  (typeof OMapInteractionSelectEventTypes)[number];


export function isOMapInteractionSelectEventType(
  value: unknown,
): value is OMapInteractionSelectEventType {
  return (
    isString(value) && OMapInteractionSelectEventTypes.includes(value as OMapInteractionSelectEventType)
  );
}