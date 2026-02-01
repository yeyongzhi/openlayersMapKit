import {
  isDefined,
  isCoordinatesType,
  isNumber,
} from "../../../../utils/index";
import {
  warn_,
  error_,
  getPackageMessage,
  commonMessage,
} from "../../../../utils/message";
import { OlFeature, OlGeometry } from "../../../../source/index";
import BasicFeature from "../BasicFeature";
import { type OMapCircleType, type OlCircleGeomInstanceType } from "./type";
import { OMapPointGeometryCoordinatesType } from "../Point/type";
import type { OlFeatureInstanceType } from "../BasicFeature/type";
import Lnglat from "../../../basic/Lnglat/index";
import {
  type OMapCoordinateType,
  type OlCoordinateType,
  isValidCoordinate,
} from "../../../basic/Lnglat/type";
import { handleGetLnglatValue } from "../../../basic/Lnglat/handle";

const PACKAGE_NAME = "Circle";
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * @class
 * @classdesc Circle
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/1
 * @updateDate 2026/2/1
 */

export default class Circle extends BasicFeature<OMapCircleType> {
  constructor(
    centerOrFeature: OMapPointGeometryCoordinatesType | OlFeatureInstanceType,
    radius?: number,
    properties?: Record<string, any>,
  ) {
    if (!isDefined(centerOrFeature)) {
      error_(
        createMessage(
          "constructor",
          commonMessage.paramsNotDefined("centerOrFeature"),
        ),
      );
    }
    if (centerOrFeature instanceof OlFeature) {
      super("Circle", centerOrFeature as OlFeatureInstanceType);
    } else {
      if (!isValidCoordinate(centerOrFeature)) {
        error_(
          createMessage(
            "constructor",
            commonMessage.paramsInvaildFormat("centerOrFeature"),
          ),
        );
      }
      if (!(isDefined(radius) && isNumber(radius))) {
        error_(
          createMessage(
            "constructor",
            commonMessage.paramsInvaildFormat("radius"),
          ),
        );
      }
      super(
        "Circle",
        centerOrFeature as OMapPointGeometryCoordinatesType,
        radius,
      );
      if (isDefined(properties)) {
        this.setProperties(properties);
      }
    }
  }

  protected _init(
    coordinates: OMapPointGeometryCoordinatesType,
    radius?: number,
  ) {
    let geometryCoordinates = handleGetLnglatValue(
      coordinates,
    ) as OlCoordinateType;
    this._geometry = new OlGeometry.Circle(geometryCoordinates, radius);
    this._feature = new OlFeature({
      geometry: this._geometry,
    });
  }

  protected _initByFeature(feature: OlFeatureInstanceType) {
    this._feature = feature;
    this._geometry = feature.getGeometry() as OlCircleGeomInstanceType;
  }

  getCenter(): Lnglat {
    let center = this._geometry.getCenter();
    return new Lnglat(center);
  }

  setCenter(center: OMapCoordinateType) {
    if (!isDefined(center)) {
      error_(
        createMessage("setCenter", commonMessage.paramsNotDefined("center")),
      );
    }
    if (!isValidCoordinate(center)) {
      error_(
        createMessage(
          "setCenter",
          commonMessage.paramsInvaildFormat("center", "coordinates"),
        ),
      );
    }
    let _center = handleGetLnglatValue(center);
    this._geometry.setCenter(_center);
  }

  getRadius(): number {
    return this._geometry.getRadius();
  }

  setRadius(radius: number) {
    if (!isDefined(radius)) {
      error_(
        createMessage("setRadius", commonMessage.paramsNotDefined("radius")),
      );
    }
    if (!isNumber(radius)) {
      error_(
        createMessage(
          "setRadius",
          commonMessage.paramsInvaildFormat("radius", "number"),
        ),
      );
    }
    this._geometry.setRadius(radius);
  }

  /**
   * 获取坐标
   */
  getCoordinates(): Lnglat {
    return this.getCenter();
  }

  /**
   * 设置线的坐标
   */
  setCoordinates(center: OMapCoordinateType) {
    this.setCenter(center);
  }

  setCenterAndRadius(center: OMapCoordinateType, radius: number) {
    if (!isDefined(center) || !isDefined(radius)) {
      error_(
        createMessage(
          "setCenterAndRadius",
          commonMessage.paramsListHaveNotDefined("center", "radius"),
        ),
      );
    }
    if (!isValidCoordinate(center)) {
      error_(
        createMessage(
          "setCenterAndRadius",
          commonMessage.paramsInvaildFormat("center"),
        ),
      );
    }
    if (!isNumber(radius)) {
      error_(
        createMessage(
          "setCenterAndRadius",
          commonMessage.paramsInvaildFormat("radius", "number"),
        ),
      );
    }
    let _center = handleGetLnglatValue(center);
    this._geometry.setCenterAndRadius(_center, radius);
  }
}
