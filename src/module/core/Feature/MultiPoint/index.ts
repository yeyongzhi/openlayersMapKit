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
import {
  isValidCoordinate,
  type OlCoordinateType,
} from "../../../basic/Lnglat/type";
import Lnglat from "../../../basic/Lnglat/index";
import Point from "../Point/index";
import {
  OlPointGeomInstanceType,
  type OMapPointGeometryCoordinatesType,
} from "../Point/type";
import { handleGetLnglatValue } from "../../../basic/Lnglat/handle";
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
    let geometryCoordinates = coordinates.map((c) => {
      return handleGetLnglatValue(c);
    });
    if (geometryCoordinates) {
      this._geometry = new OlGeometry.MultiPoint(geometryCoordinates);
      this._feature = new OlFeature({
        geometry: this._geometry,
      });
    }
  }

  protected _initByFeature(feature: OlFeatureInstanceType) {
    this._feature = feature;
    this._geometry = feature.getGeometry() as OlMultiPointGeomInstanceType;
  }

  /**
   * 获取点的坐标
   * @returns {Lnglat[]} 点的坐标
   */
  getCoordinates(): Lnglat[] {
    let coordinates = this._geometry.getCoordinates();
    let _coordinates = coordinates.map((c: OlCoordinateType) => {
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
      return;
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
      return;
    }
    let _coordinates: OlCoordinateType[] = coordinates.map((c) => {
      return handleGetLnglatValue(c);
    });
    this._geometry.setCoordinates(_coordinates);
  }

  appendPoint(
    pointOrpointCoordinates: Point | OMapPointGeometryCoordinatesType,
  ): void {
    if (!isDefined(pointOrpointCoordinates)) {
      error_(
        createMessage(
          "appendPoint",
          commonMessage.paramsNotDefined("pointOrpointCoordinates"),
        ),
      );
      return;
    }
    let _point = null;
    if (pointOrpointCoordinates instanceof Point) {
      _point = (pointOrpointCoordinates as Point).getGeometry();
    } else {
      _point = new OlGeometry.Point(
        handleGetLnglatValue(pointOrpointCoordinates) as OlCoordinateType,
      );
    }
    this._geometry.appendPoint(_point as OlPointGeomInstanceType);
  }

  getClosestPoint(
    pointOrpointCoordinates: Point | OMapPointGeometryCoordinatesType,
  ): Lnglat | undefined {
    if (!isDefined(pointOrpointCoordinates)) return;
    let _point = null;
    if (pointOrpointCoordinates instanceof Point) {
      _point = pointOrpointCoordinates
        .getCoordinates()
        .toArray() as OlCoordinateType;
    } else if (pointOrpointCoordinates instanceof Lnglat) {
      _point = pointOrpointCoordinates.toArray() as OlCoordinateType;
    } else if (isCoordinatesType(pointOrpointCoordinates)) {
      _point = pointOrpointCoordinates as OlCoordinateType;
    }
    if (!isDefined(_point)) return;
    let _closestPoint = (
      this._geometry as OlMultiPointGeomInstanceType
    ).getClosestPoint(_point);
    return new Lnglat(_closestPoint);
  }

  // getExtent(): Extent | undefined {
  //     if (!this._isInitialized('getExtent')) return;
  //     return new Extent(...(this._geometry as OlMultiPointGeomInstanceType).getExtent())
  // }

  getFirstCoordinate(): Lnglat | undefined {
    return new Lnglat(
      ...(this._geometry as OlMultiPointGeomInstanceType).getFirstCoordinate(),
    );
  }

  getLastCoordinate(): Lnglat | undefined {
    return new Lnglat(
      ...(this._geometry as OlMultiPointGeomInstanceType).getLastCoordinate(),
    );
  }

  getPoint(index: number): Point | undefined {
    if (!isDefined(index)) return;
    if (!isNumber(index)) {
      warn_(createMessage("getPoint", "参数index格式有误"));
      return;
    }
    let point = (this._geometry as OlMultiPointGeomInstanceType).getPoint(
      index,
    );
    return new Point(point.getCoordinates() as OlCoordinateType);
  }

  intersectsCoordinate(
    coordinate: OlCoordinateType | Lnglat,
  ): boolean | undefined {
    if (!isDefined(coordinate)) return;
    let _coordinate = handleGetLnglatValue(coordinate);
    if (!isDefined(_coordinate)) return;
    return (
      this._geometry as OlMultiPointGeomInstanceType
    ).intersectsCoordinate(_coordinate);
  }

  intersectsExtent(extent: OlExtentType | Extent): boolean | undefined {
    if (!isDefined(extent)) return;
    let _extent = handleGetExtentValue(extent);
    if (!isDefined(_extent)) return;
    return (this._geometry as OlMultiPointGeomInstanceType).intersectsExtent(
      _extent,
    );
  }
}
