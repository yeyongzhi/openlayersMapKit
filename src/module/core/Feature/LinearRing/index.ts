import { isDefined, isCoordinatesType, isArray } from "../../../../utils/index";
import {
  warn_,
  error_,
  getPackageMessage,
  commonMessage,
} from "../../../../utils/message";
import { OlExtentType, OlFeature, OlGeometry } from "../../../../source/index";
import BasicFeature from "../BasicFeature";
import type { OlFeatureInstanceType } from "../BasicFeature/type";
import {
  isValidLinearRingCoordinates,
  type OMapLinearRingGeometryCoordinatesType,
  type OlLinearRingGeomInstanceType,
  type OMapLinearRingType,
} from "./type";
import Lnglat from "../../../basic/Lnglat/index";
import { normalizeCoordinates } from "../../../basic/Lnglat/handle";

const PACKAGE_NAME = "LinearRing";
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * LinearRing类
 * @class
 * @classdesc LinearRing
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/8/25
 * @updateDate 2026/2/1
 */

export default class LinearRing extends BasicFeature<OMapLinearRingType> {
  constructor(
    coordinatesOrFeature:
      | OMapLinearRingGeometryCoordinatesType
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
      return;
    }
    if (coordinatesOrFeature instanceof OlFeature) {
      super("LinearRing", coordinatesOrFeature as OlFeatureInstanceType);
    } else {
      if (!isValidLinearRingCoordinates(coordinatesOrFeature)) {
        error_(
          createMessage(
            "constructor",
            commonMessage.paramsInvaildFormat("coordinatesOrFeature"),
          ),
        );
      }
      super("LinearRing", coordinatesOrFeature);
      if (properties) {
        this.setProperties(properties);
      }
    }
  }

  protected _init(coordinates: OMapLinearRingGeometryCoordinatesType) {
    this._geometry = new OlGeometry.LinearRing(normalizeCoordinates(coordinates));
    this._feature = this._createFeature(this._geometry)
  }


  /**
   * 获取LinearRing的坐标
   * @returns {Array<Lnglat>} LinearRing的坐标
   */
  getCoordinates(): Array<Lnglat> {
    let coordinates = this._geometry.getCoordinates();
    return coordinates.map((c) => {
      return new Lnglat(c);
    });
  }

  /**
   * 设置LinearRing的坐标
   * @param {OMapLinearRingGeometryCoordinatesType} coordinates LinearRing的坐标
   */
  setCoordinates(coordinates: OMapLinearRingGeometryCoordinatesType): void {
    if (!isDefined(coordinates)) {
      error_(
        createMessage(
          "setCoordinates",
          commonMessage.paramsNotDefined("coordinates"),
        ),
      );
    }
    if (!isValidLinearRingCoordinates(coordinates)) {
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
}
