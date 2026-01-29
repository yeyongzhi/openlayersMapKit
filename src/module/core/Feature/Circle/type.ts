import { Lnglat } from '../../../../index'
import { OlGeometry } from '../../../../source/index'
import type { OMapCoordinateType } from '../../../basic/Lnglat/type'
import type { BasicFeatureLike, BasicFeatureInitialized } from '../BasicFeature/type'

export type OlCircleGeomInstanceType = InstanceType<typeof OlGeometry.Circle>

export type CircleLike = BasicFeatureLike & {
    _geometry?: OlCircleGeomInstanceType
}

export type CircleInitialized = BasicFeatureInitialized & {
    _geometry: OlCircleGeomInstanceType
}