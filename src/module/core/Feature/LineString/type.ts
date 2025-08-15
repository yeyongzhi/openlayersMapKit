import { Lnglat } from '../../../../index'
import { OlGeometry } from '../../../../source/index'
import type { OlCoordinateType } from '../../../../utils/type'
import { isArray, isCoordinatesType } from '../../../../utils/index'

export type OMapLineStringGeometryCoordinatesType = Array<OlCoordinateType | Lnglat>

export type OlLineStringGeomInstanceType = InstanceType<typeof OlGeometry.LineString>

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