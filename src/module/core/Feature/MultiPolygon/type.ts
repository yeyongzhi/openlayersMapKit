import { OlGeometry } from '../../../../source/index'
import type { OMapCoordinateType } from '../../../basic/Lnglat/type'
import { isArray } from '../../../../utils/dataType'
import { isValidPolygonCoordinates } from '../Polygon/type'

export type OMapMultiPolygonGeometryCoordinatesType = Array<Array<Array<OMapCoordinateType>>>

export type OMapMultiPolygonType = OlGeometry.MultiPolygon
export type OlMultiPolygonGeomInstanceType = InstanceType<typeof OlGeometry.MultiPolygon>

export function isValidMultiPolygonCoordinates(
  value: unknown
): value is OMapMultiPolygonGeometryCoordinatesType {
  return isArray(value) && value.every((item) => isValidPolygonCoordinates(item))
}
