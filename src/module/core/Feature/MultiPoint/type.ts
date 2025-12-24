import { OlGeometry } from '../../../../source/index'
import type { BasicFeatureLike, BasicFeatureInitialized } from '../BasicFeature/type'
import { type OMapCoordinateType } from '../../../basic/Lnglat/type'

export type OMapMultiPointGeometryCoordinatesType = Array<OMapCoordinateType>

export type OlMultiPointGeomInstanceType = InstanceType<typeof OlGeometry.MultiPoint>

export type MultiPointLike = BasicFeatureLike & {
    _geometry?: OlMultiPointGeomInstanceType
}

export type MultiPointInitialized = BasicFeatureInitialized & {
    _geometry: OlMultiPointGeomInstanceType
}