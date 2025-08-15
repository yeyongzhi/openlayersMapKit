import { Lnglat } from '../../../../index'
import { OlGeometry } from '../../../../source/index'
import type { OlCoordinateType } from '../../../../utils/type'

export type OMapPointGeometryCoordinatesType = OlCoordinateType | Lnglat

export type OlPointGeomInstanceType = InstanceType<typeof OlGeometry.Point>