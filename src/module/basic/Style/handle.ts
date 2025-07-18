import type {
    OMapStyleType,
    OMapFillStyleOptionsType,
    OMapStrokeStyleOptionsType,
    OlFillStyleInstanceType,
    OlStrokeStyleInstanceType
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
            color: (color instanceof Color) ? color.getColor() : (color as string)
        })
    }
    return undefined
}

export function getOlStrokeSingleStyle(options: OMapStrokeStyleOptionsType | undefined) {
    const { color } = (options as OMapStrokeStyleOptionsType)
    if (isDefined(color)) {
        return new OlStyle.Stroke({
            color: (color instanceof Color) ? color.getColor() : (color as string)
        })
    }
    return undefined
}