import { Lnglat } from '../../../../index'
import { OlGeometry } from '../../../../source/index'
import { isArray, isCoordinatesType } from '../../../../utils/index'
import type { OlCoordinateType } from '../../../../utils/index'

export type OMapPolygonGeometryCoordinatesType = Array<Array<OlCoordinateType | Lnglat>>
export type OlPolygonGeomInstanceType = InstanceType<typeof OlGeometry.Polygon>

export function checkPolygonCoordinates(coordinates: OMapPolygonGeometryCoordinatesType) {
    let result = true
    if (!isArray(coordinates)) {
        result = false
    }
    let isInVaildItem = coordinates.some(c => !isArray(c))
    if (isInVaildItem) {
        result = false
    }
    coordinates.forEach(c => {
        c.forEach(c2 => {
            if((!(c2 instanceof Lnglat)) && (!isCoordinatesType(c2))) {
                result = false
            }
        })
    })
    return result
}