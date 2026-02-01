import { OlGeometry } from '../../../../source/index'
import type { OMapCoordinateType } from '../../../basic/Lnglat/type'
import { isArray } from '../../../../utils/dataType'
import { isValidLineStringCoordinates } from '../LineString/type'

export type OMapPolygonGeometryCoordinatesType = Array<Array<OMapCoordinateType>>

export type OMapPolygonType = OlGeometry.Polygon
export type OlPolygonGeomInstanceType = InstanceType<typeof OlGeometry.Polygon>

/**
 * 类型谓词：判断是否为有效坐标（支持 [x, y] 或 Lnglat 实例）
 */
export function isValidPolygonCoordinates(
  value: unknown,
): value is OMapPolygonGeometryCoordinatesType {
  return isArray(value) && value.every((item) => isValidLineStringCoordinates(item));
}