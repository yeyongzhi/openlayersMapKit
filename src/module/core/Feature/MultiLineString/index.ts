import { isDefined, isObject } from '../../../../utils/index'
import { error_, getPackageMessage, commonMessage } from '../../../../utils/message'
import { OlFeature, OlGeometry } from '../../../../source/index'
import BasicFeature from '../BasicFeature'
import type { PropertiesType } from '../../../../utils/type'
import {
  OMapMultiLineStringGeometryCoordinatesType,
  type OMapMultiLineStringType,
  isValidMultiLineStringCoordinates
} from './type'
import type { OlFeatureInstanceType } from '../BasicFeature/type'
import Lnglat from '../../../basic/Lnglat/index'
import { normalizeCoordinates } from '../../../basic/Lnglat/handle'

const PACKAGE_NAME = 'MultiLineString'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * @class MultiLineString
 * @classdesc MultiLineString
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/10/8
 * @updateDate 2026/2/1
 */

export default class MultiLineString extends BasicFeature<OMapMultiLineStringType> {
  constructor(args: OMapMultiLineStringGeometryCoordinatesType, properties?: PropertiesType)
  constructor(args: OlFeatureInstanceType)

  constructor(
    coordinatesOrFeature: OMapMultiLineStringGeometryCoordinatesType | OlFeatureInstanceType,
    properties?: PropertiesType
  ) {
    if (!isDefined(coordinatesOrFeature)) {
      error_(createMessage('constructor', commonMessage.paramsNotDefined('coordinatesOrFeature')))
    }
    if (coordinatesOrFeature instanceof OlFeature) {
      super('MultiLineString', coordinatesOrFeature as OlFeatureInstanceType)
    } else {
      if (!isValidMultiLineStringCoordinates(coordinatesOrFeature)) {
        error_(
          createMessage('constructor', commonMessage.paramsInvaildFormat('coordinatesOrFeature'))
        )
        return
      }
      super('MultiLineString', coordinatesOrFeature as OMapMultiLineStringGeometryCoordinatesType)
      if (isDefined(properties) && isObject(properties)) {
        this.setProperties(properties)
      }
    }
  }

  protected _init(coordinates: OMapMultiLineStringGeometryCoordinatesType) {
    this._geometry = new OlGeometry.MultiLineString(normalizeCoordinates(coordinates))
    this._feature = this._createFeature(this._geometry)
  }

  /**
   * 获取坐标
   * @returns {Array<Array<Lnglat>>} 坐标
   */
  getCoordinates(): Array<Array<Lnglat>> {
    let coordinates = this._geometry.getCoordinates()
    let _coordinates = coordinates.map((c) => {
      return c.map((c2) => {
        return new Lnglat(c2)
      })
    })
    return _coordinates
  }

  /**
   * 设置坐标
   * @param {OMapMultiLineStringGeometryCoordinatesType} coordinates 坐标
   */
  setCoordinates(coordinates: OMapMultiLineStringGeometryCoordinatesType) {
    if (!isDefined(coordinates)) {
      error_(createMessage('setCoordinates', commonMessage.paramsNotDefined('coordinates')))
    }
    if (!isValidMultiLineStringCoordinates(coordinates)) {
      error_(createMessage('setCoordinates', commonMessage.paramsInvaildFormat('coordinates')))
    }
    let _coordinates = normalizeCoordinates(coordinates)
    this._geometry.setCoordinates(_coordinates)
  }
}
