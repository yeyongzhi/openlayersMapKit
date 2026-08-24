import Lnglat from './index'
import { isCoordinatesType } from "../../../utils/dataType";

export type OlCoordinateType = [number, number]
export type OMapCoordinateType = OlCoordinateType | Lnglat

/**
 * 类型谓词：判断是否为有效坐标（支持 [x, y] 或 Lnglat 实例）
 */
export function isValidCoordinate(
  value: unknown
): value is OlCoordinateType | Lnglat {
  if (value instanceof Lnglat) {
    return true;
  }
  return isCoordinatesType(value);
}
