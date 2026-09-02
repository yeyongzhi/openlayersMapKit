import { isDefined, isCoordinatesType, isNumber, isObject } from '../../../../utils/index'
import { error_, getPackageMessage, commonMessage } from '../../../../utils/message'
import { OlFeature, OlGeometry } from '../../../../source/index'
import BasicFeature from '../BasicFeature'
import type { PropertiesType } from '../../../../utils/type'
import {
  type OMapLineStringGeometryCoordinatesType,
  type OMapLineStringType,
  isValidLineStringCoordinates
} from './type'
import type { OlFeatureInstanceType } from '../BasicFeature/type'
import LngLat from '../../../basic/LngLat/index'
import { type OlCoordinateType } from '../../../basic/LngLat/type'
import { handleGetLngLatValue, normalizeCoordinates } from '../../../basic/LngLat/handle'
import { type OMapExtentType, isValidExtent } from '../../../basic/Extent/type'
import { type OMapPointGeometryCoordinatesType } from '../Point/type'
import { handleGetExtentValue } from '../../../basic/Extent/handle'

const PACKAGE_NAME = 'LineString'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * LineString类
 *
 */

export default class LineString<P extends PropertiesType = PropertiesType> extends BasicFeature<
  OMapLineStringType,
  P
> {
  constructor(args: OMapLineStringGeometryCoordinatesType, properties?: P)
  constructor(args: OlFeatureInstanceType)

  constructor(
    coordinatesOrFeature: OMapLineStringGeometryCoordinatesType | OlFeatureInstanceType,
    properties?: P
  ) {
    if (!isDefined(coordinatesOrFeature)) {
      error_(createMessage('constructor', commonMessage.paramsNotDefined('coordinatesOrFeature')))
    }
    if (coordinatesOrFeature instanceof OlFeature) {
      super('LineString', coordinatesOrFeature as OlFeatureInstanceType)
    } else {
      if (!isValidLineStringCoordinates(coordinatesOrFeature)) {
        error_(
          createMessage('constructor', commonMessage.paramsInvalidFormat('coordinatesOrFeature'))
        )
      }
      super('LineString', coordinatesOrFeature)
      if (isDefined(properties) && isObject(properties)) {
        this.setProperties(properties)
      }
    }
  }

  protected init(coordinates: OMapLineStringGeometryCoordinatesType) {
    this._geometry = new OlGeometry.LineString(normalizeCoordinates(coordinates))
    this._feature = this.createFeature(this._geometry)
  }

  /**
   * 获取线的坐标
   *
   * @returns {Array<LngLat>} 线的坐标
   */
  getCoordinates(): LngLat[] {
    const coordinates = this._geometry.getCoordinates()
    return coordinates.map((c) => {
      return new LngLat(c)
    })
  }

  /**
   * 设置线的坐标
   *
   * @param {OMapLineStringGeometryCoordinatesType} coordinates 线的坐标
   */
  setCoordinates(coordinates: OMapLineStringGeometryCoordinatesType) {
    if (!isDefined(coordinates)) {
      error_(createMessage('setCoordinates', commonMessage.paramsNotDefined('coordinates')))
    }
    if (!isValidLineStringCoordinates(coordinates)) {
      error_(createMessage('setCoordinates', commonMessage.paramsInvalidFormat('coordinates')))
    }
    const coordinateValues = normalizeCoordinates(coordinates)
    this._geometry.setCoordinates(coordinateValues)
  }

  /**
   * 追加坐标
   *
   * @param {OMapPointGeometryCoordinatesType} coordinates 坐标
   */
  appendCoordinate(coordinates: OMapPointGeometryCoordinatesType) {
    if (!isDefined(coordinates)) {
      error_(createMessage('appendCoordinate', commonMessage.paramsNotDefined('coordinates')))
    }
    if (!(coordinates instanceof LngLat) && !isCoordinatesType(coordinates)) {
      error_(createMessage('appendCoordinate', commonMessage.paramsInvalidFormat('coordinates')))
    }
    const coordinateValues = handleGetLngLatValue(coordinates)
    this._geometry.appendCoordinate(coordinateValues)
  }

  /**
   * 获取线的第一个坐标
   *
   * @returns {LngLat} 线的第一个坐标
   */
  getFirstCoordinate(): LngLat {
    const coordinates = this._geometry.getFirstCoordinate()
    return new LngLat(coordinates)
  }

  /**
   * 获取线的最后一个坐标
   *
   * @returns {LngLat} 线的最后一个坐标
   */
  getLastCoordinate(): LngLat {
    const coordinates = this._geometry.getLastCoordinate()
    return new LngLat(coordinates)
  }

  getLength(): number {
    return this._geometry.getLength()
  }

  /**
   * 获取线段指定位置的坐标点
   *
   * @param {number} fraction 比例
   * @param dest 目标坐标点
   * @returns {LngLat} 线的坐标点
   */
  getCoordinateAt(fraction: number, dest: OlCoordinateType | LngLat): LngLat {
    if (!isDefined(fraction)) {
      error_(createMessage('getCoordinateAt', '参数不能为空'))
    }
    if (!(isNumber(fraction) && fraction >= 0 && fraction <= 1)) {
      error_(createMessage('getCoordinateAt', '参数格式有误'))
    }
    const result: number[] = []
    const coordinates = this._geometry.getCoordinateAt(fraction, result)
    if (isDefined(dest)) {
      if (dest instanceof LngLat) {
        dest.setLng(result[0])
        dest.setLat(result[1])
      } else {
        dest[0] = result[0]
        dest[1] = result[1]
      }
    }
    return new LngLat(coordinates)
  }

  getCoordinateAtM(m: number, extrapolate: boolean = false): LngLat | null {
    if (!isDefined(m)) {
      error_(createMessage('getCoordinateAtM', '参数 m 不能为空'))
    }
    if (!isNumber(m)) {
      error_(createMessage('getCoordinateAtM', '参数 m 格式有误'))
    }
    const coordinates = this._geometry.getCoordinateAtM(m, extrapolate)
    return isDefined(coordinates) ? new LngLat(coordinates) : null
  }

  translate(deltaX: number = 0, deltaY: number = 0) {
    this._geometry.translate(deltaX, deltaY)
  }

  transform(source: string, destination: string) {
    this._geometry.transform(source, destination)
  }

  simplify(tolerance: number = 0): LineString<P> {
    const simplified = this._geometry.simplify(tolerance) as OlGeometry.LineString
    return new LineString<P>(simplified.getCoordinates() as OMapLineStringGeometryCoordinatesType)
  }

  intersectsCoordinate(coordinates: OMapPointGeometryCoordinatesType): boolean {
    if (!isDefined(coordinates)) {
      error_(createMessage('intersectsCoordinate', commonMessage.paramsNotDefined('coordinates')))
    }
    return this._geometry.intersectsCoordinate(handleGetLngLatValue(coordinates))
  }

  /**
   * 线是否在extent范围内
   *
   * @param {OMapExtentType} extent
   * @returns {boolean}
   */
  intersectsExtent(extent: OMapExtentType): boolean {
    if (!isDefined(extent)) {
      error_(createMessage('intersectsExtent', '参数extent不能为空'))
    }
    if (!isValidExtent(extent)) {
      error_(createMessage('intersectsExtent', '坐标格式有误'))
    }
    const extentValue = handleGetExtentValue(extent)
    return this._geometry.intersectsExtent(extentValue)
  }
}
