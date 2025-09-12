import { OlSource, OlLayer, OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import { Style, VectorLayer } from '../../../index'
import type { OMapStyleLike } from '../../basic/Style/type'

export type OlDrawType = 'Point' | 'LineString' | 'Polygon' | 'LinearRing' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon' | 'GeometryCollection' | 'Circle'

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
export type OlDrawInstanceType = InstanceType<typeof OlInteraction.Draw>
type CustOlDrawParamsType = ManualOmit<OlDrawParamsType,
    'type' | 'source' | 'features' | 'finishCondition' | 'style' |'geometryFunction'
>
export type OMapMeasureParamsType = CustOlDrawParamsType & {
    /** 样式 */
    style?: OMapStyleLike;
}

export const DRAW_DEFAULT_PARAMS = {
    clickTolerance: 6,
    dragVertexDelay: 500,
    snapTolerance: 12,
    stopClick: false
}

export const MeasureEventType = {
    measureStart: "measure:start",
    measureEnd: "measure:end",
} as const

export type OMapMeasureEventType = (typeof MeasureEventType)[keyof typeof MeasureEventType]
