import { OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import { isString } from '../../../utils/dataType'
import type { OMapStyleLike } from '../../basic/Style/type'
import { OMapInteractionCommonEventTypes, type OMapInteractionCommonParamsType } from '../Interaction/type'

export const MeasureMode = {
    Distance: 'Distance',
    Area: 'Area'
} as const

export type OMapMeasureMode = (typeof MeasureMode)[keyof typeof MeasureMode]

export function isOMapMeasureMode(value: unknown): value is OMapMeasureMode {
    return isString(value) && Object.values(MeasureMode).includes(value as OMapMeasureMode);
}

type OlDrawParamsType = ConstructorParameters<typeof OlInteraction.Draw>[0]
export type OMapMeasureType = OlInteraction.Draw
export type OlDrawInstanceType = InstanceType<typeof OlInteraction.Draw>
type CustOlDrawParamsType = ManualOmit<
    OlDrawParamsType,
    'type' | 'source' | 'features' | 'finishCondition' | 'style' | 'geometryFunction'
>

export type OMapMeasureParamsType = OMapInteractionCommonParamsType & CustOlDrawParamsType & {
    style?: OMapStyleLike;
}

export const DRAW_DEFAULT_PARAMS = {
    clickTolerance: 6,
    dragVertexDelay: 500,
    snapTolerance: 12,
    stopClick: false
}

export const MeasureEventType = {
    measureStart: 'measure:start',
    measureEnd: 'measure:end'
} as const

export const OMapInteractionMeasureEventTypes = [
    ...OMapInteractionCommonEventTypes,
    ...Object.values(MeasureEventType)
] as const

export type OMapInteractionMeasureEventType = typeof OMapInteractionMeasureEventTypes[number]

export function isOMapInteractionMeasureEventType(value: unknown): value is OMapInteractionMeasureEventType {
    return isString(value) && OMapInteractionMeasureEventTypes.includes(value as OMapInteractionMeasureEventType);
}

export interface OMapMeasureResult {
    value: number;
    unit: string;
}
