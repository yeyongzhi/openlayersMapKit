import Color from './index'
import type { OMapColorType, OlColorType } from './type'
import { isDefined } from '../../../utils/define'

export function handleGetColorValue(color?: OMapColorType): OlColorType | undefined {
    if(isDefined(color)) {
        return color instanceof Color ? (color.getColor() as OlColorType) : (color as OlColorType)
    }
    return undefined
}