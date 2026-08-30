import { isDefined, isObject } from '../../../../utils/index'
import { error_, getPackageMessage, commonMessage } from '../../../../utils/message'
import { OlFeature, OlGeometry } from '../../../../source/index'
import BasicFeature from '../BasicFeature'
import type { PropertiesType } from '../../../../utils/type'
import {
  type OMapMultiPolygonGeometryCoordinatesType,
  type OMapMultiPolygonType,
  isValidMultiPolygonCoordinates
} from './type'
import type { OlFeatureInstanceType } from '../BasicFeature/type'
import Lnglat from '../../../basic/Lnglat/index'
import { normalizeCoordinates } from '../../../basic/Lnglat/handle'
import { type OMapExtentType, isValidExtent } from '../../../basic/Extent/type'
import { handleGetExtentValue } from '../../../basic/Extent/handle'
import { type OMapPointGeometryCoordinatesType } from '../Point/type'
import { isValidCoordinate } from '../../../basic/Lnglat/type'
import { handleGetLnglatValue } from '../../../basic/Lnglat/handle'

const PACKAGE_NAME = 'MultiPolygon'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * @class MultiPolygon
 * @classdesc MultiPolygon
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/10/8
 * @updateDate 2026/2/1
 */

export default class MultiPolygon<P extends PropertiesType = PropertiesType> extends BasicFeature<
  OMapMultiPolygonType,
  P
> {
  constructor(args: OMapMultiPolygonGeometryCoordinatesType, properties?: P)
  constructor(args: OlFeatureInstanceType)

  constructor(
    coordinatesOrFeature: OMapMultiPolygonGeometryCoordinatesType | OlFeatureInstanceType,
    properties?: P
  ) {
    if (!isDefined(coordinatesOrFeature)) {
      error_(createMessage('constructor', commonMessage.paramsNotDefined('coordinatesOrFeature')))
    }
    if (coordinatesOrFeature instanceof OlFeature) {
      super('MultiPolygon', coordinatesOrFeature as OlFeatureInstanceType)
    } else {
      if (!isValidMultiPolygonCoordinates(coordinatesOrFeature)) {
        error_(
          createMessage('constructor', commonMessage.paramsInvaildFormat('coordinatesOrFeature'))
        )
      }
      super('MultiPolygon', coordinatesOrFeature as OMapMultiPolygonGeometryCoordinatesType)
      if (isDefined(properties) && isObject(properties)) {
        this.setProperties(properties)
      }
    }
  }

  protected _init(coordinates: OMapMultiPolygonGeometryCoordinatesType) {
    this._geometry = new OlGeometry.MultiPolygon(normalizeCoordinates(coordinates))
    this._feature = this._createFeature(this._geometry)
  }

  /**
   * 获取多个多边形的坐标
   * @returns {OMapMultiPolygonGeometryCoordinatesType} 多个多边形的坐标（环数组）
   */
  getCoordinates(): OMapMultiPolygonGeometryCoordinatesType {
    let coordinates = this._geometry.getCoordinates()
    let _coordinates = coordinates.map((c) => {
      return c.map((c2) => {
        return c2.map((c3) => {
          return new Lnglat(c3)
        })
      })
    })
    return _coordinates
  }

  /**
   * 设置多个多边形的坐标
   * @param {OMapMultiPolygonGeometryCoordinatesType} coordinates 多个多边形的坐标（环数组）
   */
  setCoordinates(coordinates: OMapMultiPolygonGeometryCoordinatesType): void {
    if (!isDefined(coordinates)) {
      error_(createMessage('setCoordinates', commonMessage.paramsNotDefined('coordinates')))
    }
    if (!isValidMultiPolygonCoordinates(coordinates)) {
      error_(createMessage('setCoordinates', commonMessage.paramsInvaildFormat('coordinates')))
    }
    let _coordinates = normalizeCoordinates(coordinates)
    this._geometry.setCoordinates(_coordinates)
  }

  /**
   * 获取多个多边形的第一个坐标
   * @returns {Lnglat} 第一个坐标
   */
  getFirstCoordinate(): Lnglat {
    return new Lnglat(this._geometry.getFirstCoordinate())
  }

  /**
   * 获取多个多边形的最后一个坐标
   * @returns {Lnglat} 最后一个坐标
   */
  getLastCoordinate(): Lnglat {
    return new Lnglat(this._geometry.getLastCoordinate())
  }

  /**
   * 返回多个多边形的投影平面面积之和
   * @returns {number} 面积
   */
  getArea(): number {
    return this._geometry.getArea()
  }

  /**
   * 多多边形是否包含给定坐标
   * @param {OMapPointGeometryCoordinatesType} coordinates 待判断的坐标
   * @returns {boolean} 是否包含
   */
  intersectsCoordinate(coordinates: OMapPointGeometryCoordinatesType): boolean {
    if (!isDefined(coordinates)) {
      error_(createMessage('intersectsCoordinate', commonMessage.paramsNotDefined('coordinates')))
    }
    if (!isValidCoordinate(coordinates)) {
      error_(
        createMessage('intersectsCoordinate', commonMessage.paramsInvaildFormat('coordinates'))
      )
    }
    return this._geometry.intersectsCoordinate(handleGetLnglatValue(coordinates))
  }

  /**
   * 多多边形是否与给定范围相交
   * @param {OMapExtentType} extent 范围
   * @returns {boolean} 是否相交
   */
  intersectsExtent(extent: OMapExtentType): boolean {
    if (!isDefined(extent)) {
      error_(createMessage('intersectsExtent', commonMessage.paramsNotDefined('extent')))
    }
    if (!isValidExtent(extent)) {
      error_(createMessage('intersectsExtent', commonMessage.paramsInvaildFormat('extent')))
    }
    return this._geometry.intersectsExtent(handleGetExtentValue(extent))
  }

  /**
   * 沿 X/Y 轴平移多多边形
   * @param {number} deltaX X 方向偏移
   * @param {number} deltaY Y 方向偏移
   */
  translate(deltaX: number = 0, deltaY: number = 0): void {
    this._geometry.translate(deltaX, deltaY)
  }
}
