import { type OMapMultiPointGeometryCoordinatesType } from './type'
import { Lnglat } from '../../../../index'
import type { OlCoordinateType } from '../../../../utils/type'
import { isArray, isCoordinatesType } from '../../../../utils/index'
/**
 * 校验多点坐标是否合法
 * @param {OMapMultiPointGeometryCoordinatesType} coordinates 多点坐标
 * @returns 是否合法
 */
export function isVaildConrdinates(coordinates: OMapMultiPointGeometryCoordinatesType) {
    let isHaveInVaildItem = coordinates.some((item : OlCoordinateType | Lnglat) => {
        return !(item instanceof Lnglat) && !isCoordinatesType(item)
    })
    return isArray(coordinates) && !isHaveInVaildItem
}