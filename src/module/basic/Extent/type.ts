import Extent from './index'
import { isExtentType } from '../../../utils/dataType'

export type OlExtentType = [number, number, number, number]
export type OMapExtentType = OlExtentType | Extent

/**
 * 类型谓词：判断是否为有效坐标（支持 [x, y] 或 Lnglat 实例）
 */
export function isValidExtent(
  value: unknown,
): value is OlExtentType | Extent {
  if (value instanceof Extent) {
    return true;
  }
  return isExtentType(value);
}
