import Lnglat from '../../basic/Lnglat/index'

/**
 * @class LnglatUtil
 * @classdesc 经纬度处理工具
 * @author yyz
 * @CreateDate 2025/7/8
 * @LastUpdateDate 2025/7/8
 */
export default class LnglatUtil {
  static isLnglat(lnglat: unknown): lnglat is Lnglat {
    return lnglat instanceof Lnglat
  }
}
