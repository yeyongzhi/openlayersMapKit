import { Lnglat } from '../../../../index'
import { OlGeometry } from '../../../../source/index'
import type { OlCoordinateType } from '../../../../utils/type'
import { isArray, isCoordinatesType } from '../../../../utils/index'
import type { BasicFeatureLike, BasicFeatureInitialized } from '../BasicFeature/type'

export type OMapLineStringGeometryCoordinatesType = Array<OlCoordinateType | Lnglat>

export type OlLineStringGeomInstanceType = InstanceType<typeof OlGeometry.LineString>

export type LineStringLike = BasicFeatureLike & {
    _geometry?: OlLineStringGeomInstanceType
}

export type LineStringInitialized = BasicFeatureInitialized & {
    _geometry: OlLineStringGeomInstanceType
}

export function checkLineStringCoordinates(coordinates: OMapLineStringGeometryCoordinatesType) {
    let result = true
    if (!isArray(coordinates)) {
        result = false
    }
    let isInVaildItem = coordinates.some(c => {
        return (!(c instanceof Lnglat)) && (!isCoordinatesType(c))
    })
    if (isInVaildItem) {
        result = false
    }
    return result
}