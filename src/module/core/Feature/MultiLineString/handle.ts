import { type OMapMultiLineStringGeometryCoordinatesType } from './type'
import { Lnglat } from '../../../../index'
import { type OlCoordinateType } from '../../../basic/Lnglat/type'
import { isArray, isCoordinatesType } from '../../../../utils/index'
import { checkLineStringCoordinates } from '../LineString/handle'

/**
 * 校验坐标是否合法
 * @param {OMapMultiLineStringGeometryCoordinatesType} coordinates 坐标
 * @returns 是否合法
 */
export function checkMultiLineStringCoordinates(coordinates: OMapMultiLineStringGeometryCoordinatesType) {
    let isHaveInVaildItem = coordinates.some((item : Array<OlCoordinateType | Lnglat>) => {
        return !isArray(item) || (isArray(item) && !checkLineStringCoordinates(item))
    })
    return isArray(coordinates) && !isHaveInVaildItem
}