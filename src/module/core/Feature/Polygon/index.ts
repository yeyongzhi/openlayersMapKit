import {
  isDefined,
  isCoordinatesType,
  isArray,
  isExtentType,
  isObject,
} from "../../../../utils/index";
import {
  warn_,
  error_,
  getPackageMessage,
  commonMessage,
} from "../../../../utils/message";
import { OlFeature, OlGeometry } from "../../../../source/index";
import BasicFeature from "../BasicFeature";
import {
  type OMapPolygonGeometryCoordinatesType,
  type OlPolygonGeomInstanceType,
  type OMapPolygonType,
  isValidPolygonCoordinates,
} from "./type";
import type { OlFeatureInstanceType } from "../BasicFeature/type";
import {
  type OlLinearRingGeomInstanceType,
  type OMapLinearRingGeometryCoordinatesType,
  isValidLinearRingCoordinates,
} from "../LinearRing/type";
import Point from "../Point/index";
import LinearRing from "../LinearRing/index";
import Lnglat from "../../../basic/Lnglat/index";
import {
  type OMapCoordinateType,
} from "../../../basic/Lnglat/type";
import { handleGetLnglatValue, normalizeCoordinates } from "../../../basic/Lnglat/handle";
import Extent from "../../../basic/Extent/index";
import type { OlExtentType, OMapExtentType } from "../../../basic/Extent/type";
import { handleGetExtentValue } from "../../../basic/Extent/handle";

const PACKAGE_NAME = "Polygon";
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * Polygon类
 * @class
 * @classdesc Polygon
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/14
 * @updateDate 2026/2/1
 */

export default class Polygon extends BasicFeature<OMapPolygonType> {
  constructor(
    args: OMapPolygonGeometryCoordinatesType,
    properties?: Record<string, any>,
  );
  constructor(args: OlFeatureInstanceType);

  constructor(
    coordinatesOrFeature:
      | OMapPolygonGeometryCoordinatesType
      | OlFeatureInstanceType,
    properties?: Record<string, any>,
  ) {
    if (!isDefined(coordinatesOrFeature)) {
      error_(
        createMessage(
          "constructor",
          commonMessage.paramsNotDefined("coordinatesOrFeature"),
        ),
      );
    }
    if (coordinatesOrFeature instanceof OlFeature) {
      super("Polygon", coordinatesOrFeature as OlFeatureInstanceType);
    } else {
      if (!isValidPolygonCoordinates(coordinatesOrFeature)) {
        error_(
          createMessage(
            "constructor",
            commonMessage.paramsInvaildFormat("coordinatesOrFeature"),
          ),
        );
      }
      super("Polygon", coordinatesOrFeature);
      if (isDefined(properties) && isObject(properties)) {
        this.setProperties(properties);
      }
    }
  }

  protected _init(
    coordinates: OMapPolygonGeometryCoordinatesType,
    radius?: number,
  ) {
    this._geometry = new OlGeometry.Polygon(normalizeCoordinates(coordinates));
    this._feature = this._createFeature(this._geometry)
  }


  /**
   * 获取多边形的坐标
   * @param {boolean} rightHanded 是否右手坐标系
   * @returns {Array<Array<Lnglat>>} 多边形的坐标
   */
  getCoordinates(rightHanded?: boolean): Array<Array<Lnglat>> {
    let coordinates = this._geometry.getCoordinates(rightHanded);
    let _coordinates = coordinates.map((c) => {
      return c.map((c2) => {
        return new Lnglat(c2);
      });
    });
    return _coordinates;
  }

  /**
   * 设置多边形的坐标
   * @param {OMapPolygonGeometryCoordinatesType} coordinates 多边形的坐标
   */
  setCoordinates(coordinates: OMapPolygonGeometryCoordinatesType): void {
    if (!isDefined(coordinates)) {
      error_(
        createMessage(
          "setCoordinates",
          commonMessage.paramsNotDefined("coordinates"),
        ),
      );
    }
    if (!isValidPolygonCoordinates(coordinates)) {
      error_(
        createMessage(
          "setCoordinates",
          commonMessage.paramsInvaildFormat("coordinates"),
        ),
      );
    }
    let _coordinates = normalizeCoordinates(coordinates);
    this._geometry.setCoordinates(_coordinates);
  }

  /**
   * 向Polygon中添加LinearRing（内环）
   * @param {LinearRing | OMapLinearRingGeometryCoordinatesType} linearRing 内环
   */
  appendLinearRing(
    linearRingParams: LinearRing | OMapLinearRingGeometryCoordinatesType,
  ) {
    if (!isDefined(linearRingParams)) {
      error_(
        createMessage(
          "appendLinearRing",
          commonMessage.paramsNotDefined("linearRingParams"),
        ),
      );
    }
    if (
      !(
        linearRingParams instanceof LinearRing &&
        isValidLinearRingCoordinates(linearRingParams)
      )
    ) {
      error_(
        createMessage(
          "appendLinearRing",
          commonMessage.paramsInvaildFormat("linearRingParams"),
        ),
      );
    }
    if (linearRingParams instanceof LinearRing) {
      this._geometry.appendLinearRing(linearRingParams.getGeometry());
    } else {
      const coordinates = (linearRingParams as OMapLinearRingGeometryCoordinatesType).map((l) => {
        return handleGetLnglatValue(l);
      });
      this._geometry.appendLinearRing(
        new LinearRing(coordinates).getGeometry(),
      );
    }
  }

  /**
   * 获取多边形的第一个坐标（包含内环）
   * @returns {Lnglat} 多边形的第一个坐标
   */
  getFirstCoordinate(): Lnglat {
    let coordinates = this._geometry.getFirstCoordinate();
    return new Lnglat(coordinates);
  }

  /**
   * 获取多边形的最后一个坐标（包含内环）
   * @returns {Lnglat} 多边形的最后一个坐标
   */
  getLastCoordinate(): Lnglat {
    let coordinates = this._geometry.getLastCoordinate();
    return new Lnglat(coordinates);
  }

  /**
   * 获取多边形的范围
   * @returns {Extent} 多边形的范围
   */
  getExtent(): Extent {
    let extent = this._geometry.getExtent();
    return new Extent(extent);
  }

  /**
   * 返回投影平面上多边形的面积
   * @returns {number} 投影平面上多边形的面积
   */
  getArea(): number {
    return this._geometry.getArea();
  }

  /**
   * 将几何图形中距离传递点最近的点作为坐标返回
   * @param {OMapCoordinateType} point 传递点
   * @param {OMapCoordinateType} closestPoint 最近点
   * @returns {Lnglat} 最近点
   */
  getClosestPoint(
    point: OMapCoordinateType,
    closestPoint?: OMapCoordinateType,
  ): Lnglat {
    let coordinates = handleGetLnglatValue(point);
    let result = this._geometry.getClosestPoint(coordinates);
    let _result = new Lnglat(result);
    closestPoint = _result;
    return _result;
  }

  /**
   * 返回多边形的内点
   * @returns {Point} 多边形的内点
   */
  getInteriorPoint(): Point {
    let result = this._geometry.getInteriorPoint().getCoordinates();
    return new Point(result);
  }

  /**
   * 如果该几何形状包含指定的坐标，则返回 true。如果坐标位于几何形状的边界上，则返回 false。
   * @param {OMapCoordinateType} coordinates
   * @returns {boolean}
   */
  intersectsCoordinate(coordinates: OMapCoordinateType): boolean {
    if (!isDefined(coordinates)) {
      error_(
        createMessage(
          "intersectsCoordinate",
          commonMessage.paramsNotDefined("coordinates"),
        ),
      );
    }
    let _coordinates = handleGetLnglatValue(coordinates);
    return this._geometry.intersectsCoordinate(_coordinates);
  }

  /**
   * 线是否在extent范围内
   * @param {OMapExtentType} extent
   * @returns {boolean}
   */
  intersectsExtent(extent: Extent): boolean {
    if (!isDefined(extent)) {
      error_(
        createMessage(
          "intersectsExtent",
          commonMessage.paramsNotDefined("extent"),
        ),
      );
    }
    if (!(extent instanceof Extent) && !isExtentType(extent)) {
      error_(
        createMessage(
          "intersectsExtent",
          commonMessage.paramsInvaildFormat("extent"),
        ),
      );
    }
    let _extent = handleGetExtentValue(extent);
    return this._geometry.intersectsExtent(_extent);
  }

  simplify(tolerance: number = 0) {
    this._geometry.simplify(tolerance);
  }

  transform() {}

  translate(deltaX: number = 0, deltaY: number = 0): void {
    this._geometry.translate(deltaX, deltaY);
  }
}
