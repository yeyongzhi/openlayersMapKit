import {
  isDefined,
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
  type OMapMultiPolygonGeometryCoordinatesType,
  type OlMultiPolygonGeomInstanceType,
  type OMapMultiPolygonType,
  isValidMultiPolygonCoordinates,
} from "./type";
import type { OlFeatureInstanceType } from "../BasicFeature/type";
import Lnglat from "../../../basic/Lnglat/index";
import { handleGetLnglatValue } from "../../../basic/Lnglat/handle";

const PACKAGE_NAME = "MultiPolygon";
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * @class MultiPolygon
 * @classdesc MultiPolygon
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/10/8
 * @updateDate 2026/2/1
 */

export default class MultiPolygon extends BasicFeature<OMapMultiPolygonType> {
  constructor(
    args: OMapMultiPolygonGeometryCoordinatesType,
    properties?: Record<string, any>,
  );
  constructor(args: OlFeatureInstanceType);

  constructor(
    coordinatesOrFeature:
      | OMapMultiPolygonGeometryCoordinatesType
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
      super("MultiPolygon", coordinatesOrFeature as OlFeatureInstanceType);
    } else {
      if (!isValidMultiPolygonCoordinates(coordinatesOrFeature)) {
        error_(
          createMessage(
            "constructor",
            commonMessage.paramsInvaildFormat("coordinatesOrFeature"),
          ),
        );
      }
      super(
        "MultiPolygon",
        coordinatesOrFeature as OMapMultiPolygonGeometryCoordinatesType,
      );
      if (isDefined(properties) && isObject(properties)) {
        this.setProperties(properties);
      }
    }
  }

  protected _init(coordinates: OMapMultiPolygonGeometryCoordinatesType) {
    let geometryCoordinates = coordinates.map((c) => {
      return c.map((c2) => {
        return c2.map((c3) => {
          return handleGetLnglatValue(c3);
        });
      });
    });
    this._geometry = new OlGeometry.MultiPolygon(geometryCoordinates);
    this._feature = new OlFeature({
      geometry: this._geometry,
    });
  }

  protected _initByFeature(feature: OlFeatureInstanceType) {
    this._feature = feature;
    this._geometry = feature.getGeometry() as OlMultiPolygonGeomInstanceType;
  }

  /**
   * 获取坐标
   * @returns {OMapMultiPolygonGeometryCoordinatesType``} 坐标
   */
  getCoordinates(): OMapMultiPolygonGeometryCoordinatesType {
    let coordinates = this._geometry.getCoordinates();
    let _coordinates = coordinates.map((c) => {
      return c.map((c2) => {
        return c2.map((c3) => {
          return new Lnglat(c3);
        });
      });
    });
    return _coordinates;
  }

  /**
   * 设置坐标
   * @param {OMapMultiPolygonGeometryCoordinatesType} coordinates 坐标
   */
  setCoordinates(coordinates: OMapMultiPolygonGeometryCoordinatesType): void {
    if (!isDefined(coordinates)) {
      error_(
        createMessage(
          "setCoordinates",
          commonMessage.paramsNotDefined("coordinates"),
        ),
      );
    }
    if (!isValidMultiPolygonCoordinates(coordinates)) {
      error_(
        createMessage(
          "setCoordinates",
          commonMessage.paramsInvaildFormat("coordinates"),
        ),
      );
    }
    let _coordinates = coordinates.map((c) => {
      return c.map((c2) => {
        return c2.map((c3) => {
          return handleGetLnglatValue(c3);
        });
      });
    });
    this._geometry.setCoordinates(_coordinates);
  }
}
