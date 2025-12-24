import { OlGeometry } from '../../../../source/index'
import type { BasicFeatureLike, BasicFeatureInitialized } from '../BasicFeature/type'
import { type OMapCoordinateType } from '../../../basic/Lnglat/type'

export type OMapPointGeometryCoordinatesType = OMapCoordinateType

export type OlPointGeomInstanceType = InstanceType<typeof OlGeometry.Point>

export type PointLike = BasicFeatureLike & {
    _geometry?: OlPointGeomInstanceType
}

export type PointInitialized = BasicFeatureInitialized & {
    _geometry: OlPointGeomInstanceType
}