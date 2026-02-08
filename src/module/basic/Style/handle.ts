import {
    type OMapStyleType,
    type OMapFillStyleOptionsType,
    type OMapStrokeStyleOptionsType,
    OlFillStyleInstanceType,
    OlStrokeStyleInstanceType,
    OMapCircleStyleOptionsType,
    OMapIconStyleOptionsType,
    OMapRegularShapeStyleOptionsType,
    OlStyleLike,
    OMapStyleLike,
    OMapTextStyleOptionsType,
    isVaildStyle,
    isVaildArrayStyle,
    isVaildFunctionStyle,
} from './type'
import { OlStyle } from '../../../source/index'
import { Color } from '../../../index'
import Style from './index'
import BaseFeature from '../../core/Feature/BasicFeature/index'
import { OlFeatureLike, OlFeatureInstanceType } from '../../core/Feature/BasicFeature/type'
import { createBaseFeatureByOlFeature } from '../../core/Feature/BasicFeature/handle'
import { isDefined, isFunction, isNumber } from '../../../utils/index'
import { handleGetColorValue } from '../Color/handle'
import Size from '../../basic/Size/index'

export function getOlFillSingleStyle(options: OMapFillStyleOptionsType | undefined) {
    if (!isDefined(options)) {
        return undefined
    }
    const { color } = (options as OMapFillStyleOptionsType)
    if (isDefined(color)) {
        return new OlStyle.Fill({
            ...options,
            color: (color instanceof Color) ? color.getColor() : (color as string)
        })
    }
    return undefined
}

export function getOlStrokeSingleStyle(options: OMapStrokeStyleOptionsType | undefined) {
    if (!isDefined(options)) {
        return undefined
    }
    const { color } = (options as OMapStrokeStyleOptionsType)
    if (isDefined(color)) {
        return new OlStyle.Stroke({
            ...options,
            color: (color instanceof Color) ? color.getColor() : (color as string)
        })
    }
    return undefined
}

export function getOlCircleSingleStyle(options: OMapCircleStyleOptionsType | undefined) {
    if (!isDefined(options)) {
        return undefined
    }
    const { fill, stroke } = (options as OMapCircleStyleOptionsType)
    let _style = new OlStyle.Circle({
        ...options,
        fill: undefined,
        stroke: undefined
    })
    if (isDefined(fill)) {
        _style.setFill(new OlStyle.Fill({
            color: (fill.color instanceof Color) ? fill.color.getColor() : (fill.color as string)
        }))
    }
    if (isDefined(stroke)) {
        _style.setStroke(new OlStyle.Stroke({
            color: (stroke.color instanceof Color) ? stroke.color.getColor() : (stroke.color as string)
        }))
    }
    return _style
}

export function getOlIconSingleStyle(options: OMapIconStyleOptionsType | undefined) {
    if (!isDefined(options)) {
        return undefined
    }
    let _style = new OlStyle.Icon({
        ...options,
        color: options.color ? (options.color instanceof Color) ? options.color.getColor() : (options.color as string) : undefined,
        offset: isDefined(options.offset) ? options.offset.getPixel() : [0, 0],
        size: isDefined(options.size) ? options.size.getSize() : undefined
    })
    return _style
}

export function getOlRegularShapeSingleStyle(options: OMapRegularShapeStyleOptionsType | undefined) {
    if (!isDefined(options)) {
        return undefined
    }
    let _style = new OlStyle.RegularShape({
        ...options,
        fill: undefined,
        stroke: undefined
    })
    const { fill, stroke } = options
    if (isDefined(fill)) {
        _style.setFill(new OlStyle.Fill({
            color: (fill.color instanceof Color) ? fill.color.getColor() : (fill.color as string)
        }))
    }
    if (isDefined(stroke)) {
        _style.setStroke(new OlStyle.Stroke({
            color: (stroke.color instanceof Color) ? stroke.color.getColor() : (stroke.color as string)
        }))
    }
    return _style
}

/**
 * 矢量图层的默认样式
 */
export const DEFAULT_STYLE = (feature: BaseFeature<any>, resolution: number): undefined | Style => {
    if(!isDefined(feature)) return undefined
    if (feature.getType() === 'Point') {
        return new Style({
            circle: {
                fill: {
                    color: 'red'
                },
                radius: 10
            }
        })
    } else if (feature.getType() === 'LineString') {
        return new Style({
            stroke: {
                color: 'red',
                width: 5
            }
        })
    } else if (feature.getType() === 'Polygon' || feature.getType() === 'Circle') {
        return new Style({
            stroke: {
                color: 'red',
                width: 2
            },
            fill: {
                color: new Color({
                    color: '#FFFFFF',
                    opacity: 0.5
                })
            },
        })
    }
    return undefined
}

export function handleGetStyleValue(style?: OMapStyleLike): OlStyleLike | undefined {
    if(!isDefined(style)) {
        return undefined
    }
    if (isVaildStyle(style)) {
        return style.getStyle()
    } else if (isVaildArrayStyle(style)) {
        return style.map(item => item.getStyle())
    } else if (isVaildFunctionStyle(style)) {
        return (feature: OlFeatureLike, resolution: number) => {
            const _feature = createBaseFeatureByOlFeature(feature as OlFeatureInstanceType)
            const _style = style(_feature, resolution)
            if(isVaildArrayStyle(_style)) {
                return _style.map(item => item.getStyle())
            } else if (isVaildStyle(_style)) {
                return _style.getStyle()
            }
            return undefined
        }
    }
}

export function getOlTextSingleStyle(options: OMapTextStyleOptionsType | undefined) {
    if (!isDefined(options)) {
        return undefined
    }
    let _style = new OlStyle.Text({
        ...options,
        fill: undefined,
        stroke: undefined,
        backgroundFill: undefined,
        backgroundStroke: undefined,
        scale: undefined
    })
    const { fill, scale, stroke, backgroundFill, backgroundStroke } = (options as OMapTextStyleOptionsType)
    if (isDefined(fill)) {
        _style.setFill(new OlStyle.Fill({
            color: handleGetColorValue(fill.color)
        }))
    }
    if (isDefined(stroke)) {
        _style.setStroke(new OlStyle.Stroke({
            ...stroke,
            color: handleGetColorValue(stroke.color),
        }))
    }
    if (isDefined(backgroundFill)) {
        _style.setBackgroundFill(new OlStyle.Fill({
            color: handleGetColorValue(backgroundFill.color)
        }))
    }
    if (isDefined(backgroundStroke)) {
        _style.setBackgroundStroke(new OlStyle.Stroke({
            ...backgroundStroke,
            color: handleGetColorValue(backgroundStroke.color),
        }))
    }
    if (isDefined(scale)) {
        _style.setScale(scale instanceof Size ? scale.getSize() : scale)
    }
    return _style
}