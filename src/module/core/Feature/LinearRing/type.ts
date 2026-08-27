import { isValidCoordinate, type OMapCoordinateType } from '../../../basic/Lnglat/type'
import { OlGeometry } from '../../../../source/index'
import { isArray } from '../../../../utils/dataType'

export type OMapLinearRingGeometryCoordinatesType = Array<OMapCoordinateType>

export type OMapLinearRingType = OlGeometry.LinearRing
export type OlLinearRingGeomInstanceType = InstanceType<typeof OlGeometry.LinearRing>

export function isValidLinearRingCoordinates(
  value: unknown
): value is OMapLinearRingGeometryCoordinatesType {
  return isArray(value) && value.every((item) => isValidCoordinate(item))
}
