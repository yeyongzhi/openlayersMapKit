import { isDefined, isObject } from '../../../../utils/index'
import { error_, getPackageMessage, commonMessage } from '../../../../utils/message'
import { OlFeature, OlGeometry } from '../../../../source/index'
import BasicFeature from '../BasicFeature'
import type { PropertiesType } from '../../../../utils/type'
import {
  type OMapMultiLineStringGeometryCoordinatesType,
  type OMapMultiLineStringType,
  isValidMultiLineStringCoordinates
} from './type'
import type { OlFeatureInstanceType } from '../BasicFeature/type'
import LngLat from '../../../basic/LngLat/index'
import { normalizeCoordinates } from '../../../basic/LngLat/handle'
import { type OMapExtentType, isValidExtent } from '../../../basic/Extent/type'
import { handleGetExtentValue } from '../../../basic/Extent/handle'
import { type OMapPointGeometryCoordinatesType } from '../Point/type'
import { isValidCoordinate } from '../../../basic/LngLat/type'
import { handleGetLngLatValue } from '../../../basic/LngLat/handle'

const PACKAGE_NAME = 'MultiLineString'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 */

export default class MultiLineString<
  P extends PropertiesType = PropertiesType
> extends BasicFeature<OMapMultiLineStringType, P> {
  constructor(args: OMapMultiLineStringGeometryCoordinatesType, properties?: P)
  constructor(args: OlFeatureInstanceType)

  constructor(
    coordinatesOrFeature: OMapMultiLineStringGeometryCoordinatesType | OlFeatureInstanceType,
    properties?: P
  ) {
    if (!isDefined(coordinatesOrFeature)) {
      error_(createMessage('constructor', commonMessage.paramsNotDefined('coordinatesOrFeature')))
    }
    if (coordinatesOrFeature instanceof OlFeature) {
      super('MultiLineString', coordinatesOrFeature as OlFeatureInstanceType)
    } else {
      if (!isValidMultiLineStringCoordinates(coordinatesOrFeature)) {
        error_(
          createMessage('constructor', commonMessage.paramsInvalidFormat('coordinatesOrFeature'))
        )
        return
      }
      super('MultiLineString', coordinatesOrFeature as OMapMultiLineStringGeometryCoordinatesType)
      if (isDefined(properties) && isObject(properties)) {
        this.setProperties(properties)
      }
    }
  }

  protected init(coordinates: OMapMultiLineStringGeometryCoordinatesType) {
    this._geometry = new OlGeometry.MultiLineString(normalizeCoordinates(coordinates))
    this._feature = this.createFeature(this._geometry)
  }

  /**
   * 获取多个线串的坐标
   *
   * @returns {Array<Array<LngLat>>} 多个线串的坐标
   */
  getCoordinates(): Array<Array<LngLat>> {
    const coordinates = this._geometry.getCoordinates()
    const coordinateValues = coordinates.map((c) => {
      return c.map((c2) => {
        return new LngLat(c2)
      })
    })
    return coordinateValues
  }

  /**
   * 设置多个线串的坐标
   *
   * @param {OMapMultiLineStringGeometryCoordinatesType} coordinates 多个线串的坐标
   */
  setCoordinates(coordinates: OMapMultiLineStringGeometryCoordinatesType) {
    if (!isDefined(coordinates)) {
      error_(createMessage('setCoordinates', commonMessage.paramsNotDefined('coordinates')))
    }
    if (!isValidMultiLineStringCoordinates(coordinates)) {
      error_(createMessage('setCoordinates', commonMessage.paramsInvalidFormat('coordinates')))
    }
    const coordinateValues = normalizeCoordinates(coordinates)
    this._geometry.setCoordinates(coordinateValues)
  }

  /**
   * 获取多个线串的第一个坐标
   *
   * @returns {LngLat} 第一个坐标
   */
  getFirstCoordinate(): LngLat {
    return new LngLat(this._geometry.getFirstCoordinate())
  }

  /**
   * 获取多个线串的最后一个坐标
   *
   * @returns {LngLat} 最后一个坐标
   */
  getLastCoordinate(): LngLat {
    return new LngLat(this._geometry.getLastCoordinate())
  }

  /**
   * 返回多个线串的投影平面长度之和
   *
   * @returns {number} 长度
   */
  getLength(): number {
    return this._geometry.getLength()
  }

  /**
   * 多线串是否包含给定坐标
   *
   * @param {OMapPointGeometryCoordinatesType} coordinates 待判断的坐标
   * @returns {boolean} 是否包含
   */
  intersectsCoordinate(coordinates: OMapPointGeometryCoordinatesType): boolean {
    if (!isDefined(coordinates)) {
      error_(createMessage('intersectsCoordinate', commonMessage.paramsNotDefined('coordinates')))
    }
    if (!isValidCoordinate(coordinates)) {
      error_(
        createMessage('intersectsCoordinate', commonMessage.paramsInvalidFormat('coordinates'))
      )
    }
    return this._geometry.intersectsCoordinate(handleGetLngLatValue(coordinates))
  }

  /**
   * 多线串是否与给定范围相交
   *
   * @param {OMapExtentType} extent 范围
   * @returns {boolean} 是否相交
   */
  intersectsExtent(extent: OMapExtentType): boolean {
    if (!isDefined(extent)) {
      error_(createMessage('intersectsExtent', commonMessage.paramsNotDefined('extent')))
    }
    if (!isValidExtent(extent)) {
      error_(createMessage('intersectsExtent', commonMessage.paramsInvalidFormat('extent')))
    }
    return this._geometry.intersectsExtent(handleGetExtentValue(extent))
  }

  /**
   * 沿 X/Y 轴平移多线串
   *
   * @param {number} deltaX X 方向偏移
   * @param {number} deltaY Y 方向偏移
   */
  translate(deltaX: number = 0, deltaY: number = 0): void {
    this._geometry.translate(deltaX, deltaY)
  }
}
