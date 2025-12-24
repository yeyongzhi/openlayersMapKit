import { Lnglat } from '../../../../index'
import { OlGeometry } from '../../../../source/index'
import type { OMapCoordinateType } from '../../../basic/Lnglat/type'
import type { BasicFeatureLike, BasicFeatureInitialized } from '../BasicFeature/type'

export type OMapMultiLineStringGeometryCoordinatesType = Array<Array<OMapCoordinateType>>

export type OlMultiLineStringGeomInstanceType = InstanceType<typeof OlGeometry.MultiLineString>

export type MultiLineStringLike = BasicFeatureLike & {
    _geometry?: OlMultiLineStringGeomInstanceType
}

export type MultiLineStringInitialized = BasicFeatureInitialized & {
    _geometry: OlMultiLineStringGeomInstanceType
}