import { isDefined, isObject } from '../../../../utils/index'
import { error_, getPackageMessage, commonMessage } from '../../../../utils/message'
import { OlFeature, OlGeometry } from '../../../../source/index'
import BasicFeature from '../BasicFeature'
import type { OMapPointGeometryCoordinatesType, OMapPointType } from './type'
import type { OlFeatureInstanceType } from '../BasicFeature/type'
import LngLat from '../../../basic/LngLat/index'
import { handleGetLngLatValue, normalizeCoordinates } from '../../../basic/LngLat/handle'
import { isValidCoordinate } from '../../../basic/LngLat/type'
import type Extent from '../../../basic/Extent/index'
import { handleGetExtentValue } from '../../../basic/Extent/handle'
import { isValidExtent } from '../../../basic/Extent/type'
import type { PropertiesType } from '../../../../utils/type'

const PACKAGE_NAME = 'Point'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * Point类
 *
 */

export default class Point<P extends PropertiesType = PropertiesType> extends BasicFeature<
  OMapPointType,
  P
> {
  constructor(args: OMapPointGeometryCoordinatesType, properties?: P)
  constructor(args: OlFeatureInstanceType)

  constructor(
    coordinatesOrFeature: OMapPointGeometryCoordinatesType | OlFeatureInstanceType,
    properties?: P
  ) {
    if (!isDefined(coordinatesOrFeature)) {
      error_(createMessage('constructor', commonMessage.paramsNotDefined('coordinatesOrFeature')))
    }
    if (coordinatesOrFeature instanceof OlFeature) {
      super('Point', coordinatesOrFeature as OlFeatureInstanceType)
    } else {
      if (!isValidCoordinate(coordinatesOrFeature)) {
        error_(
          createMessage(
            'constructor',
            commonMessage.paramsInvalidFormat('coordinatesOrFeature', 'LngLat or [x, y]')
          )
        )
      }
      super('Point', coordinatesOrFeature as OMapPointGeometryCoordinatesType)
      if (isDefined(properties) && isObject(properties)) {
        this.setProperties(properties)
      }
    }
  }

  protected init(coordinates: OMapPointGeometryCoordinatesType) {
    this._geometry = new OlGeometry.Point(normalizeCoordinates(coordinates))
    this._feature = this.createFeature(this._geometry)
  }

  /**
   * 获取点的坐标
   *
   * @returns {LngLat} 点的坐标
   */
  getCoordinates(): LngLat {
    const coordinates = this._geometry.getCoordinates()
    return new LngLat(coordinates)
  }

  /**
   * 设置点的坐标
   *
   * @param {OMapPointGeometryCoordinatesType} coordinates 点的坐标
   * @returns {void}
   */
  setCoordinates(coordinates: OMapPointGeometryCoordinatesType): void {
    if (!isDefined(coordinates)) {
      error_(createMessage('setCoordinates', commonMessage.paramsNotDefined('coordinates')))
    }
    if (!isValidCoordinate(coordinates)) {
      error_(
        createMessage(
          'setCoordinates',
          commonMessage.paramsInvalidFormat('coordinates', 'LngLat or [x, y]')
        )
      )
    }
    const coordinateValues = handleGetLngLatValue(coordinates)
    this._geometry.setCoordinates(coordinateValues)
  }

  /**
   * 获取点的第一个坐标
   *
   * @returns {LngLat} 点的第一个坐标
   */
  getFirstCoordinate(): LngLat {
    return this.getCoordinates()
  }

  /**
   * 获取点的最后一个坐标
   *
   * @returns {LngLat} 点的最后一个坐标
   */
  getLastCoordinate(): LngLat {
    return this.getCoordinates()
  }

  /**
   * 点是否与给定坐标相交（即是否落在同一坐标）
   *
   * @param {OMapPointGeometryCoordinatesType} coordinates 待判断的坐标
   * @returns {boolean} 是否相交
   */
  intersectsCoordinate(coordinates: OMapPointGeometryCoordinatesType): boolean {
    if (!isDefined(coordinates)) {
      error_(createMessage('intersectsCoordinate', commonMessage.paramsNotDefined('coordinates')))
    }
    return this._geometry.intersectsCoordinate(handleGetLngLatValue(coordinates))
  }

  /**
   * 点是否在extent范围内
   *
   * @param {Extent | OlExtentType} extent
   * @returns {boolean | undefined}
   */
  intersectsExtent(extent: Extent): boolean {
    if (!isDefined(extent)) {
      error_(createMessage('intersectsExtent', commonMessage.paramsNotDefined('extent')))
    }
    if (!isValidExtent(extent)) {
      error_(
        createMessage(
          'intersectsExtent',
          commonMessage.paramsInvalidFormat('extent', 'Extent or [xmin, ymin, xmax, ymax]')
        )
      )
    }
    const extentValue = handleGetExtentValue(extent)
    return this._geometry.intersectsExtent(extentValue)
  }
}
