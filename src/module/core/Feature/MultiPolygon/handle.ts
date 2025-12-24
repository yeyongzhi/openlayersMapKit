import { type OMapMultiPolygonGeometryCoordinatesType } from './type'
import { Lnglat } from '../../../../index'
import type { OMapCoordinateType } from '../../../basic/Lnglat/type'
import { isArray, isCoordinatesType } from '../../../../utils/index'
import { checkPolygonCoordinates } from '../Polygon/handle'

/**
 * 校验坐标是否合法
 * @param {OMapMultiPolygonGeometryCoordinatesType} coordinates 坐标
 * @returns 是否合法
 */
export function checkMultiPolygonCoordinates(coordinates: OMapMultiPolygonGeometryCoordinatesType) {
    let isHaveInVaildItem = coordinates.some((item : Array<Array<OMapCoordinateType>>) => {
        return !isArray(item) || (isArray(item) && !checkPolygonCoordinates(item))
    })
    return isArray(coordinates) && !isHaveInVaildItem
}