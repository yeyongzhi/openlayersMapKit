import { Lnglat } from '../../../../index'
import { OlGeometry } from '../../../../source/index'
import { type OMapCoordinateType } from '../../../basic/Lnglat/type'
import type { BasicFeatureLike, BasicFeatureInitialized } from '../BasicFeature/type'

export type OMapLineStringGeometryCoordinatesType = Array<OMapCoordinateType>

export type OlLineStringGeomInstanceType = InstanceType<typeof OlGeometry.LineString>

export type LineStringLike = BasicFeatureLike & {
    _geometry?: OlLineStringGeomInstanceType
}

export type LineStringInitialized = BasicFeatureInitialized & {
    _geometry: OlLineStringGeomInstanceType
}