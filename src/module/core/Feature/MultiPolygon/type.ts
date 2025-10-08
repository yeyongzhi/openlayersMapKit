import { Lnglat } from '../../../../index'
import { OlGeometry } from '../../../../source/index'
import type { OlCoordinateType } from '../../../../utils/type'
import type { BasicFeatureLike, BasicFeatureInitialized } from '../BasicFeature/type'

export type OMapMultiPolygonGeometryCoordinatesType = Array<Array<Array<OlCoordinateType | Lnglat>>>

export type OlMultiPolygonGeomInstanceType = InstanceType<typeof OlGeometry.MultiPolygon>

export type MultiPolygonLike = BasicFeatureLike & {
    _geometry?: OlMultiPolygonGeomInstanceType
}

export type MultiPolygonInitialized = BasicFeatureInitialized & {
    _geometry: OlMultiPolygonGeomInstanceType
}