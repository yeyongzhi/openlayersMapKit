import { OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import { isString } from '../../../utils/dataType'
import type { OMapStyleLike } from '../../basic/Style/type'
import { OMapInteractionCommonEventTypes, type OMapInteractionCommonParamsType } from '../Interaction/type'

/**
 * 绘制模式
 * @enum {OMapMeasureMode}
 */
export const MeasureMode = {
    Distance: 'Distance',
    Area: 'Area'
} as const
export type OMapMeasureMode = (typeof MeasureMode)[keyof typeof MeasureMode]

type OlDrawParamsType = ConstructorParameters<typeof OlInteraction.Draw>[0]
export type OMapMeasureType = OlInteraction.Draw
export type OlDrawInstanceType = InstanceType<typeof OlInteraction.Draw>
type CustOlDrawParamsType = ManualOmit<OlDrawParamsType,
    'type' | 'source' | 'features' | 'finishCondition' | 'style' |'geometryFunction'
>
export type OMapMeasureParamsType = OMapInteractionCommonParamsType & CustOlDrawParamsType & {
    /** 样式 */
    style?: OMapStyleLike;
}

export const DRAW_DEFAULT_PARAMS = {
    clickTolerance: 6,
    dragVertexDelay: 500,
    snapTolerance: 12,
    stopClick: false
}

/**
 * 测量事件类型
 */
export const MeasureEventType = {
    measureStart: "measure:start",
    measureEnd: "measure:end",
} as const

export const OMapInteractionMeasureEventTypes = [...OMapInteractionCommonEventTypes, ...Object.values(MeasureEventType)] as const
export type OMapInteractionMeasureEventType = typeof OMapInteractionMeasureEventTypes[number] extends infer T
    ? T extends string
    ? T
    : never
    : never;
export function isOMapInteractionMeasureEventType(
    value: unknown
): value is OMapInteractionMeasureEventType {
    return (
        isString(value) &&
        OMapInteractionMeasureEventTypes.includes(value as any)
    );
}

export interface OMapMeasureResult {
    value: number;
    unit: string;
}