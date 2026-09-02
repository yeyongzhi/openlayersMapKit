import { isDefined, isNumber, isAllNumberArray } from '../../../utils/index'
import { error_, getPackageMessage, commonMessage } from '../../../utils/message'
import { handleGetLngLatValue } from './handle'
import { type OlCoordinateType, type OMapCoordinateType } from './type'

const PACKAGE_NAME = 'LngLat'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * @deprecated 请使用 {@link LngLat} 替代。`LngLat` 与 `LngLat` 指向同一类、完全等价，
 * 新代码统一使用 `LngLat`；内部引用将在后续批次统一迁移。
 */
class LngLat {
  static from(value: OMapCoordinateType): LngLat {
    return value instanceof LngLat ? value.clone() : new LngLat(value)
  }

  /**
   * 经纬度数组
   *
   * @type {OlCoordinateType}
   * @example [119.26, 28.73]
   * @private
   */
  private _lngLat: OlCoordinateType = [0, 0]

  constructor(lng: number, lat: number)
  constructor(lnglat: number[])

  constructor(...args: [number, number] | [number[]]) {
    let value: OlCoordinateType = [0, 0]

    if (args.length === 2) {
      const [x, y] = args
      if (isNumber(x) && isNumber(y)) {
        value = [x, y]
      } else {
        error_(createMessage('constructor', commonMessage.paramsInvalidFormat('lnglat')))
      }
    } else if (args.length === 1) {
      const [arr] = args
      if (Array.isArray(arr) && arr.length >= 2 && isAllNumberArray(arr)) {
        // 只取前两个
        value = [arr[0], arr[1]]
      } else {
        error_(createMessage('constructor', commonMessage.paramsInvalidFormat('lnglat')))
      }
    } else {
      error_(createMessage('constructor', commonMessage.paramsInvalidFormat('lnglat')))
    }
    this._lngLat = value
  }

  /**
   * 设置经度
   *
   * @param {number} lng 经度
   */
  setLng(lng: number) {
    if (!isDefined(lng)) {
      error_(createMessage('setLng', commonMessage.paramsNotDefined('lng')))
    }
    if (!isNumber(lng)) {
      error_(createMessage('setLng', commonMessage.paramsInvalidFormat('lng')))
    }
    this._lngLat[0] = lng
  }

  /**
   * 设置纬度
   *
   * @param {number} lat 纬度
   */
  setLat(lat: number) {
    if (!isDefined(lat)) {
      error_(createMessage('setLat', commonMessage.paramsNotDefined('lat')))
    }
    if (!isNumber(lat)) {
      error_(createMessage('setLat', commonMessage.paramsInvalidFormat('lat')))
    }
    this._lngLat[1] = lat
  }

  /**
   * 获取经度
   *
   * @returns {number} 经度
   */
  getLng(): number {
    return this._lngLat[0]
  }

  /**
   * 获取纬度
   *
   * @returns {number} 纬度
   */
  getLat(): number {
    return this._lngLat[1]
  }

  /**
   * 判断两个经纬度是否相等
   *
   * @param {OMapCoordinateType} lnglat 经纬度对象
   * @returns {boolean} 判断结果
   */
  equals(lnglat: OMapCoordinateType): boolean {
    if (!isDefined(lnglat)) {
      error_(createMessage('equals', commonMessage.paramsNotDefined('lnglat')))
    }
    const otherLngLat = handleGetLngLatValue(lnglat)
    return this._lngLat[0] === otherLngLat[0] && this._lngLat[1] === otherLngLat[1]
  }

  /**
   * 以数组形式输出经纬度
   *
   * @returns {OlCoordinateType} 经纬度数组
   */
  toArray(): OlCoordinateType {
    return [...this._lngLat] as OlCoordinateType
  }

  clone(): LngLat {
    return new LngLat(this._lngLat)
  }

  /**
   * 以字符串的形式输出经纬度
   *
   * @param {number} place 保留的小数位数
   * @returns {string} 经纬度字符串
   */
  toString(place?: number): string {
    const precision = place ?? 3
    return `[${this._lngLat[0]?.toFixed(precision)}, ${this._lngLat[1]?.toFixed(precision)}]`
  }
}

/**
 * 经纬度（推荐名称）。
 * `LngLat` 与 `LngLat` 指向同一个类，二者完全等价；
 * 新代码请使用 `LngLat`，`LngLat` 仅作为兼容别名保留。
 */
export default LngLat

/**
 * 经纬度的历史兼容名称。
 *
 * @deprecated 请使用 {@link LngLat}。
 */
export { LngLat as Lnglat }
