import {
    type OMapLineStringGeometryCoordinatesType
} from './type'
import { isArray, isCoordinatesType } from '../../../../utils/index'
import Lnglat from '../../../basic/Lnglat/index'

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