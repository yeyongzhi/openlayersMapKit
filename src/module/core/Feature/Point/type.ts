import { Lnglat } from '../../../../index'
import { OlGeometry } from '../../../../source/index'
import type { OlCoordinateType } from '../../../../utils/type'
import type { BasicFeatureLike, BasicFeatureInitialized } from '../BasicFeature/type'

export type OMapPointGeometryCoordinatesType = OlCoordinateType | Lnglat

export type OlPointGeomInstanceType = InstanceType<typeof OlGeometry.Point>

export type PointLike = BasicFeatureLike & {
    _geometry?: OlPointGeomInstanceType
}

export type PointInitialized = BasicFeatureInitialized & {
    _geometry: OlPointGeomInstanceType
}