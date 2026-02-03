import { OlSource, OlLayer, OlInteraction, OlGeometry } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import { isString } from '../../../utils/dataType'
import VectorLayer from '../../layer/VectorLayer/index'
import BasicFeature from '../../core/Feature/BasicFeature/index'
import type { OMapPointGeometryCoordinatesType } from '../../core/Feature/Point/type'
import type { OMapLineStringGeometryCoordinatesType } from '../../core/Feature/LineString/type'
import type { OMapPolygonGeometryCoordinatesType } from '../../core/Feature/Polygon/type'
import { type OMapInteractionCommonParamsType, OMapInteractionCommonEventTypes } from '../Interaction/type'

export type OlModifyParamsType = ConstructorParameters<typeof OlInteraction.Modify>[0]
type CustOlModifyParamsType = ManualOmit<OlModifyParamsType,
    'source'
>
export type OMapModifyParamsType = CustOlModifyParamsType & {
    layer: VectorLayer;
} & OMapInteractionCommonParamsType

export type OMapModifyType = OlInteraction.Modify
export type OlModifyInstanceType = InstanceType<typeof OlInteraction.Modify>
export const OMapInteractionModifyEventTypes = [...OMapInteractionCommonEventTypes, 'modifystart', 'modifyend'] as const
export type OMapInteractionModifyEventType = typeof OMapInteractionModifyEventTypes[number] extends infer T
    ? T extends string
    ? T
    : never
    : never;

export function isOMapInteractionModifyEventType(
    value: unknown
): value is OMapInteractionModifyEventType {
    return (
        isString(value) &&
        OMapInteractionModifyEventTypes.includes(value as any)
    );
}

export interface SampleRecordItem {
    /**
     * 要素id
     */
    id: number | string | undefined | null;
    /**
     * 原始要素id
     */
    originFeatureId: string | undefined | null;
    /**
     * 要素类型
     */
    type: string | undefined | null;
    /**
     * 要素坐标
     * 针对Modify，目前只考虑修改坐标的情况
     * TODO：后续可以接入修改样式Style、修改属性Properties
     */
    coordinates: OMapPointGeometryCoordinatesType |OMapLineStringGeometryCoordinatesType | OMapPolygonGeometryCoordinatesType;
}

export interface ModifyRecordItem {
    /**
     * 修改时间
     */
    time: string;
    /**
     * 要素集合
     */
    features: Array<BasicFeature<OlGeometry.Geometry> | SampleRecordItem>;
    /** 
     * 修改版本
     */
    version: number;
}