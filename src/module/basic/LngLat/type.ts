import LngLat from './index'
import { isCoordinatesType } from '../../../utils/dataType'

export type OlCoordinateType = [number, number]
export type OMapCoordinateType = OlCoordinateType | LngLat

/**
 * 类型谓词：判断是否为有效坐标（支持 [x, y] 或 LngLat 实例）
 */
export function isValidCoordinate(value: unknown): value is OlCoordinateType | LngLat {
  if (value instanceof LngLat) {
    return true
  }
  return isCoordinatesType(value)
}
