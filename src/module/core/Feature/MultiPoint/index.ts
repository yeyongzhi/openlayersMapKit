import { isDefined, isObject, isNumber } from '../../../../utils/index'
import { error_, getPackageMessage, commonMessage } from '../../../../utils/message'
import { OlFeature, OlGeometry } from '../../../../source/index'
import BasicFeature from '../BasicFeature'
import type { PropertiesType } from '../../../../utils/type'
import type { OMapMultiPointGeometryCoordinatesType, OMapMultiPointType } from './type'
import type { OlFeatureInstanceType } from '../BasicFeature/type'
import { type OMapExtentType } from '../../../basic/Extent/type'
import { isValidCoordinate, type OlCoordinateType } from '../../../basic/LngLat/type'
import LngLat from '../../../basic/LngLat/index'
import Point from '../Point/index'
import { type OMapPointGeometryCoordinatesType } from '../Point/type'
import { handleGetLngLatValue, normalizeCoordinates } from '../../../basic/LngLat/handle'
import { handleGetExtentValue } from '../../../basic/Extent/handle'

const PACKAGE_NAME = 'MultiPoint'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 */

export default class MultiPoint<P extends PropertiesType = PropertiesType> extends BasicFeature<
  OMapMultiPointType,
  P
> {
  constructor(args: OMapMultiPointGeometryCoordinatesType, properties?: P)
  constructor(args: OlFeatureInstanceType)

  constructor(
    coordinatesOrFeature: OMapMultiPointGeometryCoordinatesType | OlFeatureInstanceType,
    properties?: P
  ) {
    if (!isDefined(coordinatesOrFeature)) {
      error_(createMessage('constructor', commonMessage.paramsNotDefined('coordinatesOrFeature')))
    }
    if (coordinatesOrFeature instanceof OlFeature) {
      super('MultiPoint', coordinatesOrFeature as OlFeatureInstanceType)
    } else {
      if (!coordinatesOrFeature.every((item) => isValidCoordinate(item))) {
        error_(
          createMessage(
            'constructor',
            commonMessage.paramsInvalidFormat('coordinatesOrFeature', 'Array<LngLat or [x, y]>')
          )
        )
      }
      super('MultiPoint', coordinatesOrFeature as OMapMultiPointGeometryCoordinatesType)
      if (isDefined(properties) && isObject(properties)) {
        this.setProperties(properties)
      }
    }
  }

  protected init(coordinates: OMapMultiPointGeometryCoordinatesType) {
    this._geometry = new OlGeometry.MultiPoint(normalizeCoordinates(coordinates))
    this._feature = this.createFeature(this._geometry)
  }

  /**
   * 获取多个点的坐标
   *
   * @returns {LngLat[]} 多个点的坐标
   */
  getCoordinates(): LngLat[] {
    const coordinates = this._geometry.getCoordinates()
    const coordinateValues = coordinates.map((c) => {
      return new LngLat(c)
    })
    return coordinateValues
  }

  /**
   * 设置多个点的坐标
   *
   * @param {OMapMultiPointGeometryCoordinatesType} coordinates 多个点的坐标
   */
  setCoordinates(coordinates: OMapMultiPointGeometryCoordinatesType): void {
    if (!isDefined(coordinates)) {
      error_(createMessage('setCoordinates', commonMessage.paramsNotDefined('coordinates')))
    }
    if (!coordinates.every((item) => isValidCoordinate(item))) {
      error_(
        createMessage(
          'setCoordinates',
          commonMessage.paramsInvalidFormat('coordinates', 'Array<LngLat or [x, y]>')
        )
      )
    }
    const coordinateValues = normalizeCoordinates(coordinates)
    this._geometry.setCoordinates(coordinateValues)
  }

  appendPoint(pointOrpointCoordinates: Point | OMapPointGeometryCoordinatesType) {
    if (!isDefined(pointOrpointCoordinates)) {
      error_(
        createMessage('appendPoint', commonMessage.paramsNotDefined('pointOrpointCoordinates'))
      )
    }
    let pointFeature = null
    if (pointOrpointCoordinates instanceof Point) {
      pointFeature = pointOrpointCoordinates.getGeometry()
    } else {
      pointFeature = new OlGeometry.Point(handleGetLngLatValue(pointOrpointCoordinates))
    }
    this._geometry.appendPoint(pointFeature)
  }

  getClosestPoint(pointOrpointCoordinates: Point | OMapPointGeometryCoordinatesType): LngLat {
    if (!isDefined(pointOrpointCoordinates)) {
      error_(
        createMessage('getClosestPoint', commonMessage.paramsNotDefined('pointOrpointCoordinates'))
      )
    }
    let pointFeature = null
    if (pointOrpointCoordinates instanceof Point) {
      pointFeature = pointOrpointCoordinates.getCoordinates().toArray()
    } else {
      pointFeature = handleGetLngLatValue(pointOrpointCoordinates)
    }
    const closestPointValue = this._geometry.getClosestPoint(pointFeature)
    return new LngLat(closestPointValue)
  }

  getFirstCoordinate(): LngLat {
    return new LngLat(this._geometry.getFirstCoordinate())
  }

  getLastCoordinate(): LngLat {
    return new LngLat(this._geometry.getLastCoordinate())
  }

  getPoint(index: number): Point {
    if (!isDefined(index)) {
      error_(createMessage('getPoint', commonMessage.paramsNotDefined('index')))
    }
    if (!isNumber(index)) {
      error_(createMessage('getPoint', commonMessage.paramsInvalidFormat('index', 'number')))
    }
    const point = this._geometry.getPoint(index)
    return new Point(point.getCoordinates() as OlCoordinateType)
  }

  intersectsCoordinate(coordinate: OMapPointGeometryCoordinatesType): boolean {
    if (!isDefined(coordinate)) {
      error_(createMessage('intersectsCoordinate', commonMessage.paramsNotDefined('coordinate')))
    }
    const coordinateValue = handleGetLngLatValue(coordinate)
    return this._geometry.intersectsCoordinate(coordinateValue)
  }

  intersectsExtent(extent: OMapExtentType): boolean {
    if (!isDefined(extent)) {
      error_(createMessage('intersectsExtent', commonMessage.paramsNotDefined('extent')))
    }
    const extentValue = handleGetExtentValue(extent)
    return this._geometry.intersectsExtent(extentValue)
  }
}
