import Size from './index'
import { isArrayLength2, isNumber } from '../../../utils/dataType'

export type OlSizeType = number[]
export type OMapSizeType = OlSizeType | Size

/**
 * 类型谓词：判断是否为有效大小（支持 [x, y] 或 Size 实例）
 */
export function isValidSize(
  value: unknown,
): value is OlSizeType | Size {
  if (value instanceof Size) {
    return true;
  }
  return isArrayLength2(value) && value.every((item: any) => isNumber(item));
}