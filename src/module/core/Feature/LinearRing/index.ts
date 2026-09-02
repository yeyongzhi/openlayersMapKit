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
import LngLat from '../../../basic/LngLat/index'
import { normalizeCoordinates } from '../../../basic/LngLat/handle'
import { type OMapExtentType, isValidExtent } from '../../../basic/Extent/type'
import { handleGetExtentValue } from '../../../basic/Extent/handle'
import { type OMapPointGeometryCoordinatesType } from '../Point/type'
import { isValidCoordinate } from '../../../basic/LngLat/type'
import { handleGetLngLatValue } from '../../../basic/LngLat/handle'

const PACKAGE_NAME = 'LinearRing'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * LinearRing类
 *
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
          createMessage('constructor', commonMessage.paramsInvalidFormat('coordinatesOrFeature'))
        )
      }
      super('LinearRing', coordinatesOrFeature)
      if (properties) {
        this.setProperties(properties)
      }
    }
  }

  protected init(coordinates: OMapLinearRingGeometryCoordinatesType) {
    this._geometry = new OlGeometry.LinearRing(normalizeCoordinates(coordinates))
    this._feature = this.createFeature(this._geometry)
  }

  /**
   * 获取LinearRing的坐标
   *
   * @returns {Array<LngLat>} LinearRing的坐标
   */
  getCoordinates(): Array<LngLat> {
    const coordinates = this._geometry.getCoordinates()
    return coordinates.map((c) => {
      return new LngLat(c)
    })
  }

  /**
   * 设置LinearRing的坐标
   *
   * @param {OMapLinearRingGeometryCoordinatesType} coordinates LinearRing的坐标
   */
  setCoordinates(coordinates: OMapLinearRingGeometryCoordinatesType): void {
    if (!isDefined(coordinates)) {
      error_(createMessage('setCoordinates', commonMessage.paramsNotDefined('coordinates')))
    }
    if (!isValidLinearRingCoordinates(coordinates)) {
      error_(createMessage('setCoordinates', commonMessage.paramsInvalidFormat('coordinates')))
    }
    const coordinateValues = normalizeCoordinates(coordinates)
    this._geometry.setCoordinates(coordinateValues)
  }

  /**
   * 获取LinearRing的第一个坐标
   *
   * @returns {LngLat} 第一个坐标
   */
  getFirstCoordinate(): LngLat {
    return new LngLat(this._geometry.getFirstCoordinate())
  }

  /**
   * 获取LinearRing的最后一个坐标
   *
   * @returns {LngLat} 最后一个坐标
   */
  getLastCoordinate(): LngLat {
    return new LngLat(this._geometry.getLastCoordinate())
  }

  /**
   * LinearRing是否包含给定坐标
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
   * LinearRing是否与给定范围相交
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
   * 沿 X/Y 轴平移LinearRing
   *
   * @param {number} deltaX X 方向偏移
   * @param {number} deltaY Y 方向偏移
   */
  translate(deltaX: number = 0, deltaY: number = 0): void {
    this._geometry.translate(deltaX, deltaY)
  }
}
