import {
  isDefined,
  isCoordinatesType,
  isExtentType,
  isObject,
  isNumber,
} from "../../../../utils/index";
import {
  warn_,
  error_,
  getPackageMessage,
  commonMessage,
} from "../../../../utils/message";
import { OlExtentType, OlFeature, OlGeometry } from "../../../../source/index";
import BasicFeature from "../BasicFeature";
import type {
  OMapMultiPointGeometryCoordinatesType,
  OlMultiPointGeomInstanceType,
  OMapMultiPointType,
} from "./type";
import type { OlFeatureInstanceType } from "../BasicFeature/type";
import Extent from "../../../basic/Extent/index";
import { OMapExtentType } from "../../../basic/Extent/type";
import {
  isValidCoordinate,
  type OlCoordinateType,
} from "../../../basic/Lnglat/type";
import Lnglat from "../../../basic/Lnglat/index";
import Point from "../Point/index";
import {
  type OMapPointType,
  type OMapPointGeometryCoordinatesType,
} from "../Point/type";
import { handleGetLnglatValue, normalizeCoordinates } from "../../../basic/Lnglat/handle";
import { handleGetExtentValue } from "../../../basic/Extent/handle";

const PACKAGE_NAME = "MultiPoint";
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * @class MultiPoint
 * @classdesc MultiPoint
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/10/5
 * @updateDate 2026/1/30
 */

export default class MultiPoint extends BasicFeature<OMapMultiPointType> {
  constructor(
    args: OMapMultiPointGeometryCoordinatesType,
    properties?: Record<string, any>,
  );
  constructor(args: OlFeatureInstanceType);

  constructor(
    coordinatesOrFeature:
      | OMapMultiPointGeometryCoordinatesType
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
      super("MultiPoint", coordinatesOrFeature as OlFeatureInstanceType);
    } else {
      if (!coordinatesOrFeature.every((item) => isValidCoordinate(item))) {
        error_(
          createMessage(
            "constructor",
            commonMessage.paramsInvaildFormat(
              "coordinatesOrFeature",
              "Array<Lnglat or [x, y]>",
            ),
          ),
        );
      }
      super(
        "MultiPoint",
        coordinatesOrFeature as OMapMultiPointGeometryCoordinatesType,
      );
      if (isDefined(properties) && isObject(properties)) {
        this.setProperties(properties);
      }
    }
  }

  protected _init(coordinates: OMapMultiPointGeometryCoordinatesType) {
    this._geometry = new OlGeometry.MultiPoint(normalizeCoordinates(coordinates));
    this._feature = this._createFeature(this._geometry)
  }


  /**
   * 获取点的坐标
   * @returns {Lnglat[]} 点的坐标
   */
  getCoordinates(): Lnglat[] {
    let coordinates = this._geometry.getCoordinates();
    let _coordinates = coordinates.map((c) => {
      return new Lnglat(c);
    });
    return _coordinates;
  }

  /**
   * 设置点的坐标
   * @param {OMapMultiPointGeometryCoordinatesType} coordinates 点的坐标
   */
  setCoordinates(coordinates: OMapMultiPointGeometryCoordinatesType): void {
    if (!isDefined(coordinates)) {
      error_(
        createMessage(
          "setCoordinates",
          commonMessage.paramsNotDefined("coordinates"),
        ),
      );
    }
    if (!coordinates.every((item) => isValidCoordinate(item))) {
      error_(
        createMessage(
          "setCoordinates",
          commonMessage.paramsInvaildFormat(
            "coordinates",
            "Array<Lnglat or [x, y]>",
          ),
        ),
      );
    }
    let _coordinates = normalizeCoordinates(coordinates);
    this._geometry.setCoordinates(_coordinates);
  }

  appendPoint(
    pointOrpointCoordinates: Point | OMapPointGeometryCoordinatesType,
  ) {
    if (!isDefined(pointOrpointCoordinates)) {
      error_(
        createMessage(
          "appendPoint",
          commonMessage.paramsNotDefined("pointOrpointCoordinates"),
        ),
      );
    }
    let _point = null;
    if (pointOrpointCoordinates instanceof Point) {
      _point = pointOrpointCoordinates.getGeometry();
    } else {
      _point = new OlGeometry.Point(
        handleGetLnglatValue(pointOrpointCoordinates),
      );
    }
    this._geometry.appendPoint(_point);
  }

  getClosestPoint(
    pointOrpointCoordinates: Point | OMapPointGeometryCoordinatesType,
  ): Lnglat {
    if (!isDefined(pointOrpointCoordinates)) {
      error_(
        createMessage(
          "getClosestPoint",
          commonMessage.paramsNotDefined("pointOrpointCoordinates"),
        ),
      );
    }
    let _point = null;
    if (pointOrpointCoordinates instanceof Point) {
      _point = pointOrpointCoordinates.getCoordinates().toArray();
    } else {
      _point = handleGetLnglatValue(pointOrpointCoordinates);
    }
    let _closestPoint = this._geometry.getClosestPoint(_point);
    return new Lnglat(_closestPoint);
  }

  getFirstCoordinate(): Lnglat {
    return new Lnglat(this._geometry.getFirstCoordinate());
  }

  getLastCoordinate(): Lnglat {
    return new Lnglat(this._geometry.getLastCoordinate());
  }

  getPoint(index: number): Point {
    if (!isDefined(index)) {
      error_(
        createMessage("getPoint", commonMessage.paramsNotDefined("index")),
      );
    }
    if (!isNumber(index)) {
      error_(
        createMessage(
          "getPoint",
          commonMessage.paramsInvaildFormat("index", "number"),
        ),
      );
    }
    let point = this._geometry.getPoint(index);
    return new Point(point.getCoordinates());
  }

  intersectsCoordinate(coordinate: OMapPointGeometryCoordinatesType): boolean {
    if (!isDefined(coordinate)) {
      error_(
        createMessage(
          "intersectsCoordinate",
          commonMessage.paramsNotDefined("coordinate"),
        ),
      );
    }
    let _coordinate = handleGetLnglatValue(coordinate);
    return this._geometry.intersectsCoordinate(_coordinate);
  }

  intersectsExtent(extent: OMapExtentType): boolean {
    if (!isDefined(extent)) {
      error_(
        createMessage(
          "intersectsExtent",
          commonMessage.paramsNotDefined("extent"),
        ),
      );
    }
    let _extent = handleGetExtentValue(extent);
    return this._geometry.intersectsExtent(_extent);
  }
}
