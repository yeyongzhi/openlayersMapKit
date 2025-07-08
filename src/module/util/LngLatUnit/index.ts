import { isDefined, isNumber, isCoordinatesType } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type { LnglatType } from '../../../utils/index'
import { Lnglat } from '../../../index'

const PACKAGE_NAME = 'LnglatUtil';
const createMessage = getPackageMessage(PACKAGE_NAME);

/** 
 * @class LnglatUtil
 * @classdesc 经纬度处理工具
 * @author yyz
 * @CreateDate 2025/7/8
 * @LastUpdateDate 2025/7/8
 */
export default class LnglatUtil {

    static isLnglat(lnglat: any): boolean {
        return lnglat instanceof Lnglat
    }

}