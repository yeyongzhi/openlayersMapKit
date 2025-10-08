import { Lnglat } from '../../../../index'
import { OlGeometry } from '../../../../source/index'
import { isArray, isCoordinatesType } from '../../../../utils/index'
import type { OlCoordinateType } from '../../../../utils/index'
import type { BasicFeatureLike, BasicFeatureInitialized } from '../BasicFeature/type'

export type OMapPolygonGeometryCoordinatesType = Array<Array<OlCoordinateType | Lnglat>>
export type OlPolygonGeomInstanceType = InstanceType<typeof OlGeometry.Polygon>

export type PolygonLike = BasicFeatureLike & {
    _geometry?: OlPolygonGeomInstanceType
}

export type PolygonInitialized = BasicFeatureInitialized & {
    _geometry: OlPolygonGeomInstanceType
}