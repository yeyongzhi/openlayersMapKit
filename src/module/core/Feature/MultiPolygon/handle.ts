import { type OlGeometry } from '../../../../source/index'
import { type OMapCoordinateType } from '../../../basic/LngLat/type'

export type OMapMultiPointGeometryCoordinatesType = Array<OMapCoordinateType>

export type OMapMultiPointType = OlGeometry.MultiPoint
export type OlMultiPointGeomInstanceType = InstanceType<typeof OlGeometry.MultiPoint>
