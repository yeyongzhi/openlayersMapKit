import { Lnglat } from '../../../../index'
import { OlGeometry } from '../../../../source/index'
import type { OlCoordinateType } from '../../../../utils/type'
import type { BasicFeatureLike, BasicFeatureInitialized } from '../BasicFeature/type'

export type OMapPointGeometryCoordinatesType = OlCoordinateType | Lnglat

export type OlCircleGeomInstanceType = InstanceType<typeof OlGeometry.Circle>

export type CircleLike = BasicFeatureLike & {
    _geometry?: OlCircleGeomInstanceType
}

export type CircleInitialized = BasicFeatureInitialized & {
    _geometry: OlCircleGeomInstanceType
}