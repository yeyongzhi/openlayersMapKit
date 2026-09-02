import { isDefined, isNumber } from '../../../../utils/index'
import { error_, getPackageMessage, commonMessage } from '../../../../utils/message'
import { OlFeature, OlGeometry } from '../../../../source/index'
import BasicFeature from '../BasicFeature'
import type { PropertiesType } from '../../../../utils/type'
import { type OMapCircleType } from './type'
import { type OMapPointGeometryCoordinatesType } from '../Point/type'
import type { OlFeatureInstanceType } from '../BasicFeature/type'
import LngLat from '../../../basic/LngLat/index'
import { type OMapCoordinateType, isValidCoordinate } from '../../../basic/LngLat/type'
import { handleGetLngLatValue, normalizeCoordinates } from '../../../basic/LngLat/handle'
import { type OMapExtentType, isValidExtent } from '../../../basic/Extent/type'
import { handleGetExtentValue } from '../../../basic/Extent/handle'

const PACKAGE_NAME = 'Circle'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 */

export default class Circle<P extends PropertiesType = PropertiesType> extends BasicFeature<
  OMapCircleType,
  P
> {
  constructor(
    centerOrFeature: OMapPointGeometryCoordinatesType | OlFeatureInstanceType,
    radius?: number,
    properties?: P
  ) {
    if (!isDefined(centerOrFeature)) {
      error_(createMessage('constructor', commonMessage.paramsNotDefined('centerOrFeature')))
    }
    if (centerOrFeature instanceof OlFeature) {
      super('Circle', centerOrFeature as OlFeatureInstanceType)
    } else {
      if (!isValidCoordinate(centerOrFeature)) {
        error_(createMessage('constructor', commonMessage.paramsInvalidFormat('centerOrFeature')))
      }
      if (!(isDefined(radius) && isNumber(radius))) {
        error_(createMessage('constructor', commonMessage.paramsInvalidFormat('radius')))
      }
      super('Circle', centerOrFeature as OMapPointGeometryCoordinatesType, radius)
      if (isDefined(properties)) {
        this.setProperties(properties)
      }
    }
  }

  protected init(coordinates: OMapPointGeometryCoordinatesType, radius?: number) {
    this._geometry = new OlGeometry.Circle(normalizeCoordinates(coordinates), radius)
    this._feature = this.createFeature(this._geometry)
  }

  getCenter(): LngLat {
    const center = this._geometry.getCenter()
    return new LngLat(center)
  }

  setCenter(center: OMapCoordinateType) {
    if (!isDefined(center)) {
      error_(createMessage('setCenter', commonMessage.paramsNotDefined('center')))
    }
    if (!isValidCoordinate(center)) {
      error_(createMessage('setCenter', commonMessage.paramsInvalidFormat('center', 'coordinates')))
    }
    const normalizedCenter = handleGetLngLatValue(center)
    this._geometry.setCenter(normalizedCenter)
  }

  getRadius(): number {
    return this._geometry.getRadius()
  }

  setRadius(radius: number) {
    if (!isDefined(radius)) {
      error_(createMessage('setRadius', commonMessage.paramsNotDefined('radius')))
    }
    if (!isNumber(radius)) {
      error_(createMessage('setRadius', commonMessage.paramsInvalidFormat('radius', 'number')))
    }
    this._geometry.setRadius(radius)
  }

  /**
   * 获取圆的圆心坐标
   *
   * @returns {LngLat} 圆心坐标
   */
  getCoordinates(): LngLat {
    return this.getCenter()
  }

  /**
   * 设置圆的圆心坐标
   *
   * @param {OMapCoordinateType} center 圆心坐标
   */
  setCoordinates(center: OMapCoordinateType) {
    this.setCenter(center)
  }

  setCenterAndRadius(center: OMapCoordinateType, radius: number) {
    if (!isDefined(center) || !isDefined(radius)) {
      error_(
        createMessage(
          'setCenterAndRadius',
          commonMessage.paramsListHaveNotDefined('center', 'radius')
        )
      )
    }
    if (!isValidCoordinate(center)) {
      error_(createMessage('setCenterAndRadius', commonMessage.paramsInvalidFormat('center')))
    }
    if (!isNumber(radius)) {
      error_(
        createMessage('setCenterAndRadius', commonMessage.paramsInvalidFormat('radius', 'number'))
      )
    }
    const normalizedCenter = handleGetLngLatValue(center)
    this._geometry.setCenterAndRadius(normalizedCenter, radius)
  }

  /**
   * 圆是否包含给定坐标
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
   * 圆是否与给定范围相交
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
}
