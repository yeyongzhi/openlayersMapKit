import { OlSource, OlLayer, OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import { Style, VectorLayer } from '../../../index'
import type { OMapStyleLike } from '../../basic/Style/type'

export type OlDrawType = 'Point' | 'LineString' | 'Polygon' | 'LinearRing' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon' | 'GeometryCollection' | 'Circle'

export type OMapDrawMode = 'Point' | 'LineString' | 'Polygon' | 'Rectangle' | 'Circle'

/**
 * 绘制模式
 * @enum {OMapDrawMode}
 */
export const DrawMode = {
    /** 点 */
    Point: 'Point',
    /** 线 */
    LineString: 'LineString',
    /** 面 */
    Polygon: 'Polygon',
    /** 矩形 */
    Rectangle: 'Rectangle',
    /** 圆 */
    Circle: 'Circle',
}

type OlDrawParamsType = ConstructorParameters<typeof OlInteraction.Draw>[0]
type CustOlDrawParamsType = ManualOmit<OlDrawParamsType,
    'type' | 'source' | 'features' | 'finishCondition' | 'style' |'geometryFunction'
>
export type OMapDrawParamsType = CustOlDrawParamsType & {
    layer?: VectorLayer;
    /** 样式 */
    style?: OMapStyleLike;
}

export const DRAW_DEFAULT_PARAMS = {
    clickTolerance: 6,
    dragVertexDelay: 500,
    snapTolerance: 12,
    stopClick: false
}