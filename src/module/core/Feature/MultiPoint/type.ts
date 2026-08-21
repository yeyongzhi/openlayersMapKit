import { OlGeometry } from '../../../../source/index'
import { type OMapCoordinateType } from '../../../basic/Lnglat/type'

export type OMapMultiPointGeometryCoordinatesType = Array<OMapCoordinateType>

export type OMapMultiPointType = OlGeometry.MultiPoint
export type OlMultiPointGeomInstanceType = InstanceType<typeof OlGeometry.MultiPoint>
