import { type OlPixelType, type OMapPixelType } from './type'
import Pixel from './index'
import { isDefined } from '../../../utils/define'

export function handleGetPixelValue(pixel?: OMapPixelType): OlPixelType | undefined {
    if(isDefined(pixel)) {
        return pixel instanceof Pixel ? (pixel.toArray() as OlPixelType) : (pixel as OlPixelType)
    }
    return undefined
}