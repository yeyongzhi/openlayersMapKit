import { isDefined } from '../../../../utils/index'
import { error_, getPackageMessage, commonMessage } from '../../../../utils/message'
import { OlFeature, OlGeometry } from '../../../../source/index'
import BasicFeature from '../BasicFeature'
import type { PropertiesType } from '../../../../utils/type'
import type { OlFeatureInstanceType } from '../BasicFeature/type'
import {
  isValidLinearRingCoordinates,
  type OMapLinearRingGeometryCoordinatesType,
  type OMapLinearRingType
} from './type'
import Lnglat from '../../../basic/Lnglat/index'
import { normalizeCoordinates } from '../../../basic/Lnglat/handle'
import { type OMapExtentType, isValidExtent } from '../../../basic/Extent/type'
import { handleGetExtentValue } from '../../../basic/Extent/handle'
import { type OMapPointGeometryCoordinatesType } from '../Point/type'
import { isValidCoordinate } from '../../../basic/Lnglat/type'
import { handleGetLnglatValue } from '../../../basic/Lnglat/handle'

const PACKAGE_NAME = 'LinearRing'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * LinearRing类
 * @class
 * @classdesc LinearRing
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/8/25
 * @updateDate 2026/2/1
 */

export default class LinearRing<P extends PropertiesType = PropertiesType> extends BasicFeature<
  OMapLinearRingType,
  P
> {
  constructor(
    coordinatesOrFeature: OMapLinearRingGeometryCoordinatesType | OlFeatureInstanceType,
    properties?: P
  ) {
    if (!isDefined(coordinatesOrFeature)) {
      error_(createMessage('constructor', commonMessage.paramsNotDefined('coordinatesOrFeature')))
      return
    }
    if (coordinatesOrFeature instanceof OlFeature) {
      super('LinearRing', coordinatesOrFeature as OlFeatureInstanceType)
    } else {
      if (!isValidLinearRingCoordinates(coordinatesOrFeature)) {
        error_(
          createMessage('constructor', commonMessage.paramsInvaildFormat('coordinatesOrFeature'))
        )
      }
      super('LinearRing', coordinatesOrFeature)
      if (properties) {
        this.setProperties(properties)
      }
    }
  }

  protected _init(coordinates: OMapLinearRingGeometryCoordinatesType) {
    this._geometry = new OlGeometry.LinearRing(normalizeCoordinates(coordinates))
    this._feature = this._createFeature(this._geometry)
  }

  /**
   * 获取LinearRing的坐标
   * @returns {Array<Lnglat>} LinearRing的坐标
   */
  getCoordinates(): Array<Lnglat> {
    let coordinates = this._geometry.getCoordinates()
    return coordinates.map((c) => {
      return new Lnglat(c)
    })
  }

  /**
   * 设置LinearRing的坐标
   * @param {OMapLinearRingGeometryCoordinatesType} coordinates LinearRing的坐标
   */
  setCoordinates(coordinates: OMapLinearRingGeometryCoordinatesType): void {
    if (!isDefined(coordinates)) {
      error_(createMessage('setCoordinates', commonMessage.paramsNotDefined('coordinates')))
    }
    if (!isValidLinearRingCoordinates(coordinates)) {
      error_(createMessage('setCoordinates', commonMessage.paramsInvaildFormat('coordinates')))
    }
    let _coordinates = normalizeCoordinates(coordinates)
    this._geometry.setCoordinates(_coordinates)
  }

  /**
   * 获取LinearRing的第一个坐标
   * @returns {Lnglat} 第一个坐标
   */
  getFirstCoordinate(): Lnglat {
    return new Lnglat(this._geometry.getFirstCoordinate())
  }

  /**
   * 获取LinearRing的最后一个坐标
   * @returns {Lnglat} 最后一个坐标
   */
  getLastCoordinate(): Lnglat {
    return new Lnglat(this._geometry.getLastCoordinate())
  }

  /**
   * LinearRing是否包含给定坐标
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
   * LinearRing是否与给定范围相交
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
   * 沿 X/Y 轴平移LinearRing
   * @param {number} deltaX X 方向偏移
   * @param {number} deltaY Y 方向偏移
   */
  translate(deltaX: number = 0, deltaY: number = 0): void {
    this._geometry.translate(deltaX, deltaY)
  }
}
