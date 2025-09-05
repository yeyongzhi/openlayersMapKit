import { OlSource, OlLayer, OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import { Style, VectorLayer } from '../../../index'
import type { OMapStyleLike } from '../../basic/Style/type'

export type OlDrawType = 'Point' | 'LineString' | 'Polygon' | 'LinearRing' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon' | 'GeometryCollection' | 'Circle'

export type OMapMeasureMode = 'Distance' | 'Area'

/**
 * 绘制模式
 * @enum {OMapMeasureMode}
 */
export const MeasureMode = {
    Distance: 'Distance',
    Area: 'Area',
}

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