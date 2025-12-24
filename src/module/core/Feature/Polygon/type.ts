import { OlGeometry } from '../../../../source/index'
import type { OMapCoordinateType } from '../../../basic/Lnglat/type'
import type { BasicFeatureLike, BasicFeatureInitialized } from '../BasicFeature/type'

export type OMapPolygonGeometryCoordinatesType = Array<Array<OMapCoordinateType>>
export type OlPolygonGeomInstanceType = InstanceType<typeof OlGeometry.Polygon>

export type PolygonLike = BasicFeatureLike & {
    _geometry?: OlPolygonGeomInstanceType
}

export type PolygonInitialized = BasicFeatureInitialized & {
    _geometry: OlPolygonGeomInstanceType
}