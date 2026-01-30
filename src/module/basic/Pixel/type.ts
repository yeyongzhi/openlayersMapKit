import Pixel from './index'
import { isArrayLength2, isNumber } from '../../../utils/dataType'

export type OlPixelType = [number, number]
export type OMapPixelType = OlPixelType | Pixel

/**
 * 类型谓词：判断是否为有效像素（支持 [x, y] 或 Pixel 实例）
 */
export function isValidPixel(
  value: unknown,
): value is OlPixelType | Pixel {
  if (value instanceof Pixel) {
    return true;
  }
  return isArrayLength2(value) && value.every((item: any) => isNumber(item));
}
