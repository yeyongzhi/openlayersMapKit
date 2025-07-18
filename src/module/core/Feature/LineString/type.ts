import { Lnglat } from '../../../../index'
import type { OlCoordinateType } from '../../../../utils/type'
import { isArray, isCoordinatesType } from '../../../../utils/index'

export type OMapLineStringGeometryCoordinatesType = Array<OlCoordinateType | Lnglat>

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