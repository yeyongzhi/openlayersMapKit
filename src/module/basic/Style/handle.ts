import type {
    OMapStyleType,
    OMapFillStyleOptionsType,
    OMapStrokeStyleOptionsType,
    OlFillStyleInstanceType,
    OlStrokeStyleInstanceType,
    OMapCircleStyleOptionsType,
    OMapIconStyleOptionsType,
    OMapRegularShapeStyleOptionsType
} from './type'
import { OlStyle } from '../../../source/index'
import { Color } from '../../../index'
import { isDefined, isNumber } from '../../../utils/index'

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
        offset: isDefined(options.offset) ? options.offset.getPixel() : [0, 0] ,
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