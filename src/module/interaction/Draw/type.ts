import { OlSource, OlLayer, OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import { isString } from '../../../utils/dataType'
import { Style, VectorLayer } from '../../../index'
import type { OMapStyleLike } from '../../basic/Style/type'
import { type OMapInteractionCommonParamsType, OMapInteractionCommonEventTypes } from '../Interaction/type'

export type OlDrawType = 'Point' | 'LineString' | 'Polygon' | 'LinearRing' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon' | 'GeometryCollection' | 'Circle'

/**
 * 绘制模式
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
} as const

export type OMapDrawModeType = typeof DrawMode[keyof typeof DrawMode];

export function isVaildDrawMode(mode: OMapDrawModeType): mode is OMapDrawModeType {
    return Object.values(DrawMode).includes(mode)
}

type OlDrawParamsType = ConstructorParameters<typeof OlInteraction.Draw>[0]
export type OMapDrawType = OlInteraction.Draw
export type OlDrawInstanceType = InstanceType<typeof OlInteraction.Draw>
type CustOlDrawParamsType = ManualOmit<OlDrawParamsType,
    'type' | 'source' | 'features' | 'finishCondition' | 'style' | 'geometryFunction'
>
export type OMapDrawParamsType = OMapInteractionCommonParamsType & CustOlDrawParamsType & {
    layer?: VectorLayer;
    /** 样式 */
    style?: OMapStyleLike;
}

export const OMAP_DRAW_DEFAULT_PARAMS = {
    clickTolerance: 6,
    dragVertexDelay: 500,
    snapTolerance: 12,
    stopClick: false
}

/**
 * 测量事件类型
 */
export const DrawEventType = {
    drawStart: "drawstart",
    drawEnd: "drawend",
    drawAbort: "drawabort",
} as const
export const OMapInteractionDrawEventTypes = [...OMapInteractionCommonEventTypes, ...Object.values(DrawEventType)] as const
export type OMapInteractionDrawEventType = (typeof OMapInteractionDrawEventTypes)[number]

// 类型守卫函数
export function isOMapInteractionDrawEventType(
    value: unknown
): value is OMapInteractionDrawEventType {
    return (
        isString(value) &&
        OMapInteractionDrawEventTypes.includes(value as OMapInteractionDrawEventType)
    );
}