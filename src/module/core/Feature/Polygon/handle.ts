import {
    type OMapPolygonGeometryCoordinatesType
} from './type'
import { isArray, isCoordinatesType } from '../../../../utils/index'
import Lnglat from '../../../basic/Lnglat/index'

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