import { OlGeometry } from '../../../../source/index'
import { type OMapCoordinateType } from '../../../basic/Lnglat/type'
import { isArray } from '../../../../utils/dataType'
import { isValidLineStringCoordinates } from '../LineString/type'

export type OMapMultiLineStringGeometryCoordinatesType = Array<Array<OMapCoordinateType>>

export type OMapMultiLineStringType = OlGeometry.MultiLineString
export type OlMultiLineStringGeomInstanceType = InstanceType<typeof OlGeometry.MultiLineString>

/**
 * 类型谓词：判断是否为有效坐标（支持 [x, y] 或 Lnglat 实例）
 */
export function isValidMultiLineStringCoordinates(
  value: unknown
): value is OMapMultiLineStringGeometryCoordinatesType {
  return isArray(value) && value.every((item) => isValidLineStringCoordinates(item))
}
