import LngLat from '../../basic/LngLat/index'

/**
 */
export default class LngLatUtil {
  static isLngLat(lnglat: unknown): lnglat is LngLat {
    return lnglat instanceof LngLat
  }
}
