import { Lnglat } from '../../../../index'
import { OlGeometry } from '../../../../source/index'
import type { OlCoordinateType } from '../../../../utils/type'
import { isArray, isCoordinatesType } from '../../../../utils/index'
import type { BasicFeatureLike, BasicFeatureInitialized } from '../BasicFeature/type'

export type OMapLinearRingGeometryCoordinatesType = Array<OlCoordinateType | Lnglat>

export type OlLinearRingGeomInstanceType = InstanceType<typeof OlGeometry.LinearRing>

export type LinearRingLike = BasicFeatureLike & {
    _geometry?: OlLinearRingGeomInstanceType
}

export type LinearRingInitialized = BasicFeatureInitialized & {
    _geometry: OlLinearRingGeomInstanceType
}

export function checkLinearRingCoordinates(coordinates: OMapLinearRingGeometryCoordinatesType) {
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