import { type OlGeometry } from '../../../../source/index'
import { isValidCoordinate, type OMapCoordinateType } from '../../../basic/LngLat/type'
import { isArray } from '../../../../utils/dataType'

export type OMapLineStringGeometryCoordinatesType = Array<OMapCoordinateType>

export type OMapLineStringType = OlGeometry.LineString
export type OlLineStringGeomInstanceType = InstanceType<typeof OlGeometry.LineString>

/**
 * 类型谓词：判断是否为有效坐标（支持 [x, y] 或 LngLat 实例）
 */
export function isValidLineStringCoordinates(
  value: unknown
): value is OMapLineStringGeometryCoordinatesType {
  return isArray(value) && value.every((item) => isValidCoordinate(item))
}
