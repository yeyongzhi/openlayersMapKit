import { isDefined, isNumber } from '../../../../utils/index'
import { error_, getPackageMessage, commonMessage } from '../../../../utils/message'
import { OlFeature, OlGeometry } from '../../../../source/index'
import BasicFeature from '../BasicFeature'
import type { PropertiesType } from '../../../../utils/type'
import { type OMapCircleType } from './type'
import { OMapPointGeometryCoordinatesType } from '../Point/type'
import type { OlFeatureInstanceType } from '../BasicFeature/type'
import Lnglat from '../../../basic/Lnglat/index'
import { type OMapCoordinateType, isValidCoordinate } from '../../../basic/Lnglat/type'
import { handleGetLnglatValue, normalizeCoordinates } from '../../../basic/Lnglat/handle'
import { type OMapExtentType, isValidExtent } from '../../../basic/Extent/type'
import { handleGetExtentValue } from '../../../basic/Extent/handle'

const PACKAGE_NAME = 'Circle'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * @class
 * @classdesc Circle
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/1
 * @updateDate 2026/2/1
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
        error_(createMessage('constructor', commonMessage.paramsInvaildFormat('centerOrFeature')))
      }
      if (!(isDefined(radius) && isNumber(radius))) {
        error_(createMessage('constructor', commonMessage.paramsInvaildFormat('radius')))
      }
      super('Circle', centerOrFeature as OMapPointGeometryCoordinatesType, radius)
      if (isDefined(properties)) {
        this.setProperties(properties)
      }
    }
  }

  protected _init(coordinates: OMapPointGeometryCoordinatesType, radius?: number) {
    this._geometry = new OlGeometry.Circle(normalizeCoordinates(coordinates), radius)
    this._feature = this._createFeature(this._geometry)
  }

  getCenter(): Lnglat {
    let center = this._geometry.getCenter()
    return new Lnglat(center)
  }

  setCenter(center: OMapCoordinateType) {
    if (!isDefined(center)) {
      error_(createMessage('setCenter', commonMessage.paramsNotDefined('center')))
    }
    if (!isValidCoordinate(center)) {
      error_(createMessage('setCenter', commonMessage.paramsInvaildFormat('center', 'coordinates')))
    }
    let _center = handleGetLnglatValue(center)
    this._geometry.setCenter(_center)
  }

  getRadius(): number {
    return this._geometry.getRadius()
  }

  setRadius(radius: number) {
    if (!isDefined(radius)) {
      error_(createMessage('setRadius', commonMessage.paramsNotDefined('radius')))
    }
    if (!isNumber(radius)) {
      error_(createMessage('setRadius', commonMessage.paramsInvaildFormat('radius', 'number')))
    }
    this._geometry.setRadius(radius)
  }

  /**
   * 获取圆的圆心坐标
   * @returns {Lnglat} 圆心坐标
   */
  getCoordinates(): Lnglat {
    return this.getCenter()
  }

  /**
   * 设置圆的圆心坐标
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
      error_(createMessage('setCenterAndRadius', commonMessage.paramsInvaildFormat('center')))
    }
    if (!isNumber(radius)) {
      error_(
        createMessage('setCenterAndRadius', commonMessage.paramsInvaildFormat('radius', 'number'))
      )
    }
    let _center = handleGetLnglatValue(center)
    this._geometry.setCenterAndRadius(_center, radius)
  }

  /**
   * 圆是否包含给定坐标
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
   * 圆是否与给定范围相交
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
}
