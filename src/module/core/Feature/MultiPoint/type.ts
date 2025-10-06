import { Lnglat } from '../../../../index'
import { OlGeometry } from '../../../../source/index'
import type { OlCoordinateType } from '../../../../utils/type'
import type { BasicFeatureLike, BasicFeatureInitialized } from '../BasicFeature/type'

export type OMapMultiPointGeometryCoordinatesType = Array<OlCoordinateType | Lnglat>

export type OlMultiPointGeomInstanceType = InstanceType<typeof OlGeometry.MultiPoint>

export type MultiPointLike = BasicFeatureLike & {
    _geometry?: OlMultiPointGeomInstanceType
}

export type MultiPointInitialized = BasicFeatureInitialized & {
    _geometry: OlMultiPointGeomInstanceType
}