import { isDefined, isExtentType, isObject } from '../../../../utils/index'
import { error_, getPackageMessage, commonMessage } from '../../../../utils/message'
import { OlFeature, OlGeometry } from '../../../../source/index'
import BasicFeature from '../BasicFeature'
import type { PropertiesType } from '../../../../utils/type'
import {
  type OMapPolygonGeometryCoordinatesType,
  type OMapPolygonType,
  isValidPolygonCoordinates
} from './type'
import type { OlFeatureInstanceType } from '../BasicFeature/type'
import {
  type OMapLinearRingGeometryCoordinatesType,
  isValidLinearRingCoordinates
} from '../LinearRing/type'
import Point from '../Point/index'
import LinearRing from '../LinearRing/index'
import LngLat from '../../../basic/LngLat/index'
import { type OMapCoordinateType } from '../../../basic/LngLat/type'
import { handleGetLngLatValue, normalizeCoordinates } from '../../../basic/LngLat/handle'
import Extent from '../../../basic/Extent/index'
import { handleGetExtentValue } from '../../../basic/Extent/handle'

const PACKAGE_NAME = 'Polygon'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * Polygon类
 *
 */

export default class Polygon<P extends PropertiesType = PropertiesType> extends BasicFeature<
  OMapPolygonType,
  P
> {
  constructor(args: OMapPolygonGeometryCoordinatesType, properties?: P)
  constructor(args: OlFeatureInstanceType)

  constructor(
    coordinatesOrFeature: OMapPolygonGeometryCoordinatesType | OlFeatureInstanceType,
    properties?: P
  ) {
    if (!isDefined(coordinatesOrFeature)) {
      error_(createMessage('constructor', commonMessage.paramsNotDefined('coordinatesOrFeature')))
    }
    if (coordinatesOrFeature instanceof OlFeature) {
      super('Polygon', coordinatesOrFeature as OlFeatureInstanceType)
    } else {
      if (!isValidPolygonCoordinates(coordinatesOrFeature)) {
        error_(
          createMessage('constructor', commonMessage.paramsInvalidFormat('coordinatesOrFeature'))
        )
      }
      super('Polygon', coordinatesOrFeature)
      if (isDefined(properties) && isObject(properties)) {
        this.setProperties(properties)
      }
    }
  }

  protected init(coordinates: OMapPolygonGeometryCoordinatesType, _radius?: number) {
    this._geometry = new OlGeometry.Polygon(normalizeCoordinates(coordinates))
    this._feature = this.createFeature(this._geometry)
  }

  /**
   * 获取多边形的坐标
   *
   * @param {boolean} rightHanded 是否右手坐标系
   * @returns {Array<Array<LngLat>>} 多边形的坐标
   */
  getCoordinates(rightHanded?: boolean): Array<Array<LngLat>> {
    const coordinates = this._geometry.getCoordinates(rightHanded)
    const coordinateValues = coordinates.map((c) => {
      return c.map((c2) => {
        return new LngLat(c2)
      })
    })
    return coordinateValues
  }

  /**
   * 设置多边形的坐标
   *
   * @param {OMapPolygonGeometryCoordinatesType} coordinates 多边形的坐标
   */
  setCoordinates(coordinates: OMapPolygonGeometryCoordinatesType): void {
    if (!isDefined(coordinates)) {
      error_(createMessage('setCoordinates', commonMessage.paramsNotDefined('coordinates')))
    }
    if (!isValidPolygonCoordinates(coordinates)) {
      error_(createMessage('setCoordinates', commonMessage.paramsInvalidFormat('coordinates')))
    }
    const coordinateValues = normalizeCoordinates(coordinates)
    this._geometry.setCoordinates(coordinateValues)
  }

  /**
   * 向Polygon中添加LinearRing（内环）
   *
   * @param {LinearRing | OMapLinearRingGeometryCoordinatesType} linearRingParams 内环
   */
  appendLinearRing(linearRingParams: LinearRing | OMapLinearRingGeometryCoordinatesType) {
    if (!isDefined(linearRingParams)) {
      error_(createMessage('appendLinearRing', commonMessage.paramsNotDefined('linearRingParams')))
    }
    if (!(
      linearRingParams instanceof LinearRing && isValidLinearRingCoordinates(linearRingParams)
    )) {
      error_(
        createMessage('appendLinearRing', commonMessage.paramsInvalidFormat('linearRingParams'))
      )
    }
    if (linearRingParams instanceof LinearRing) {
      this._geometry.appendLinearRing(linearRingParams.getGeometry())
    } else {
      const coordinates = (linearRingParams as OMapLinearRingGeometryCoordinatesType).map((l) => {
        return handleGetLngLatValue(l)
      })
      this._geometry.appendLinearRing(new LinearRing(coordinates).getGeometry())
    }
  }

  /**
   * 获取多边形的第一个坐标（包含内环）
   *
   * @returns {LngLat} 多边形的第一个坐标
   */
  getFirstCoordinate(): LngLat {
    const coordinates = this._geometry.getFirstCoordinate()
    return new LngLat(coordinates)
  }

  /**
   * 获取多边形的最后一个坐标（包含内环）
   *
   * @returns {LngLat} 多边形的最后一个坐标
   */
  getLastCoordinate(): LngLat {
    const coordinates = this._geometry.getLastCoordinate()
    return new LngLat(coordinates)
  }

  /**
   * 返回投影平面上多边形的面积
   *
   * @returns {number} 投影平面上多边形的面积
   */
  getArea(): number {
    return this._geometry.getArea()
  }

  /**
   * 将几何图形中距离传递点最近的点作为坐标返回
   *
   * @param {OMapCoordinateType} point 传递点
   * @param {OMapCoordinateType} _closestPoint 最近点
   * @returns {LngLat} 最近点
   */
  getClosestPoint(point: OMapCoordinateType, _closestPoint?: OMapCoordinateType): LngLat {
    const coordinates = handleGetLngLatValue(point)
    const result = this._geometry.getClosestPoint(coordinates)
    const resultValue = new LngLat(result)
    _closestPoint = resultValue
    return resultValue
  }

  /**
   * 返回多边形的内点
   *
   * @returns {Point} 多边形的内点
   */
  getInteriorPoint(): Point {
    const result = this._geometry.getInteriorPoint().getCoordinates()
    return new Point(result as OMapCoordinateType)
  }

  /**
   * 如果该几何形状包含指定的坐标，则返回 true。如果坐标位于几何形状的边界上，则返回 false。
   *
   * @param {OMapCoordinateType} coordinates
   * @returns {boolean}
   */
  intersectsCoordinate(coordinates: OMapCoordinateType): boolean {
    if (!isDefined(coordinates)) {
      error_(createMessage('intersectsCoordinate', commonMessage.paramsNotDefined('coordinates')))
    }
    const coordinateValues = handleGetLngLatValue(coordinates)
    return this._geometry.intersectsCoordinate(coordinateValues)
  }

  /**
   * 线是否在extent范围内
   *
   * @param {OMapExtentType} extent
   * @returns {boolean}
   */
  intersectsExtent(extent: Extent): boolean {
    if (!isDefined(extent)) {
      error_(createMessage('intersectsExtent', commonMessage.paramsNotDefined('extent')))
    }
    if (!(extent instanceof Extent) && !isExtentType(extent)) {
      error_(createMessage('intersectsExtent', commonMessage.paramsInvalidFormat('extent')))
    }
    const extentValue = handleGetExtentValue(extent)
    return this._geometry.intersectsExtent(extentValue)
  }

  simplify(tolerance: number = 0): Polygon<P> {
    const simplified = this._geometry.simplify(tolerance) as OlGeometry.Polygon
    return new Polygon<P>(simplified.getCoordinates() as OMapPolygonGeometryCoordinatesType)
  }

  transform(source: string, destination: string) {
    this._geometry.transform(source, destination)
  }

  translate(deltaX: number = 0, deltaY: number = 0): void {
    this._geometry.translate(deltaX, deltaY)
  }
}
