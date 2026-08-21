import Lnglat from "../Lnglat/index";
import {
  isArray,
  isDefined,
  defaultValue,
  isNumber,
  isCoordinatesType,
  isAllNumberArray,
} from "../../../utils/index";
import {
  warn_,
  error_,
  getPackageMessage,
  commonMessage,
} from "../../../utils/message";
import { type OMapCoordinateType, isValidCoordinate } from "../Lnglat/type";
import { type OlExtentType, type OMapExtentType } from "./type";
import { OlExtent } from "../../../source/index";
import { handleGetExtentValue } from "./handle";
import { handleGetLnglatValue } from "../Lnglat/handle";
import Size from "../Size/index";

const PACKAGE_NAME = "Extent";
const createMessage = getPackageMessage(PACKAGE_NAME);

/** Extent 边界范围
 * Author：yyz
 * CreateDate：2025/10/4
 * UpdateDate：2026/2/3
 */

export default class Extent {
  static from(value: OMapExtentType): Extent {
    return value instanceof Extent ? value.clone() : new Extent(value);
  }

  /**
   * extent数组
   * @type {OlExtentType}
   * @example [119.26, 28.73, 119.26, 28.73]
   * @private
   */
  _extent: OlExtentType;

  constructor(minX: number, minY: number, maxX: number, maxY: number);
  constructor(lnglat: number[]);

  constructor(...args: [number, number, number, number] | [number[]]) {
    let value: OMapExtentType = [0, 0, 0, 0];

    if (args.length === 4) {
      const [minX, minY, maxX, maxY] = args;
      if (isNumber(minX) && isNumber(minY) && isNumber(maxX) && isNumber(maxY)) {
        value = [minX, minY, maxX, maxY];
      } else {
        error_(
          createMessage(
            "constructor",
            commonMessage.paramsInvaildFormat("extent"),
          ),
        );
      }
    } else if (args.length === 1) {
      const [arr] = args;
      if (Array.isArray(arr) && arr.length >= 4 && isAllNumberArray(arr)) {
        // 只取前四个
        value = [arr[0], arr[1], arr[2], arr[3]];
      } else {
        error_(
          createMessage(
            "constructor",
            commonMessage.paramsInvaildFormat("extent"),
          ),
        );
      }
    } else {
      error_(
        createMessage(
          "constructor",
          commonMessage.paramsInvaildFormat("extent"),
        ),
      );
    }
    this._extent = value;
  }

  getExtent(): OlExtentType {
    return [...this._extent];
  }

  equals(extent: OMapExtentType): boolean {
    return Extent.equals(this, extent);
  }

  clone(): Extent {
    return new Extent(this._extent);
  }

  /**
   * 获取边界范围Extent的左上方位置
   * @return {Lnglat} 左上方位置
   */
  getTopLeft(): Lnglat {
    return new Lnglat(OlExtent.getTopLeft(this._extent));
  }

  /**
   * 获取边界范围Extent的右上方位置
   * @return {Lnglat} 右上方位置
   */
  getTopRight(): Lnglat {
    return new Lnglat(OlExtent.getTopRight(this._extent));
  }

  /**
   * 获取边界范围Extent的左下角位置
   * @return {Lnglat} 左下角位置
   */
  getBottomLeft(): Lnglat {
    return new Lnglat(OlExtent.getBottomLeft(this._extent));
  }

  /**
   * 获取边界范围Extent的右下角位置
   * @return {Lnglat} 右下角位置
   */
  getBottomRight(): Lnglat {
    return new Lnglat(OlExtent.getBottomRight(this._extent));
  }

  /**
   * 获取边界范围Extent的中心点位置
   * @return {Lnglat} 中心点位置
   */
  getCenter(): Lnglat {
    return new Lnglat(OlExtent.getCenter(this._extent));
  }

  /**
   * 获取宽度信息
   * @returns {number} 宽度
   */
  getWidth(): number {
    return OlExtent.getWidth(this._extent);
  }

  /**
   * 获取高度信息
   * @returns {number} 高度
   */
  getHeight(): number {
    return OlExtent.getHeight(this._extent);
  }

  getSize(): Size {
    return new Size(OlExtent.getSize(this._extent));
  }

  /**
   * 以字符串的形式输出边界范围
   * @return {string} 边界范围（字符串）
   */
  toString(place?: number): string {
    let _place = defaultValue(place, 3);
    return `[${this._extent[0].toFixed(_place)}, ${this._extent[1].toFixed(_place)}, ${this._extent[2].toFixed(_place)}, ${this._extent[3].toFixed(_place)}]`;
  }

  toArray(): OlExtentType {
    return [...this._extent];
  }

  /**
   * 构建包含所有给定坐标的范围
   * @param {OMapCoordinateType} coordinates 坐标数组
   * @return {Extent} 边界范围
   */
  static boundingExtent(coordinates: Array<OMapCoordinateType>): Extent {
    if (!isDefined(coordinates)) {
      error_(
        createMessage(
          "boundingExtent",
          commonMessage.paramsNotDefined("coordinates"),
        ),
      );
    }
    if (!isArray(coordinates)) {
      error_(
        createMessage("boundingExtent", "参数coordinates格式错误，必须为数组"),
      );
    }
    let vaildList = coordinates.filter((c) => {
      return isValidCoordinate(c);
    });
    if (vaildList.length < coordinates.length) {
      warn_(
        createMessage(
          "boundingExtent",
          commonMessage.haveInvaildDataItem("coordinates"),
        ),
      );
    }
    let positions = vaildList.map((c) => {
      return handleGetLnglatValue(c);
    });
    let _extent = OlExtent.boundingExtent(positions);
    return new Extent(_extent);
  }

  /**
   * 判断边界范围Extent是否包含某个点
   * @param {OMapExtentType} extent 范围
   * @param {OMapCoordinateType} coordinate 位置
   * @return {boolean} 判断结果
   */
  static containsCoordinate(
    extent: OMapExtentType,
    coordinate: OMapCoordinateType,
  ): boolean {
    if (!isDefined(extent) || !isDefined(coordinate)) {
      error_(
        createMessage(
          "containsCoordinate",
          commonMessage.paramsNotDefined("extent or coordinate"),
        ),
      );
    }
    let _extent = handleGetExtentValue(extent);
    let _coordinate = handleGetLnglatValue(coordinate);
    return OlExtent.containsCoordinate(_extent, _coordinate);
  }

  /**
   * 判断是否某个范围包含另一个范围
   * @param {OMapExtentType} extent1 范围1
   * @param {OMapExtentType} extent2 范围2
   * @return 判断结果
   */
  static containsExtent(
    extent1: OMapExtentType,
    extent2: OMapExtentType,
  ): boolean {
    if (!isDefined(extent1) || !isDefined(extent2)) {
      error_(
        createMessage(
          "containsExtent",
          commonMessage.paramsNotDefined("extent1 or extent2"),
        ),
      );
    }
    let _extent1 = handleGetExtentValue(extent1);
    let _extent2 = handleGetExtentValue(extent2);
    return OlExtent.containsExtent(_extent1, _extent2);
  }

  static containsXY(
    extent: OMapExtentType,
    x: number,
    y: number,
  ): boolean | undefined {
    if (!isDefined(extent) || !isDefined(x) || !isDefined(y)) return;
    let _extent = handleGetExtentValue(extent);
    if (!isDefined(_extent)) return;
    return OlExtent.containsXY(_extent, x, y);
  }

  static createEmpty(): Extent {
    return new Extent(OlExtent.createEmpty());
  }

  static equals(extent1: OMapExtentType, extent2: OMapExtentType): boolean {
    if (!isDefined(extent1) || !isDefined(extent2)) {
      error_(
        createMessage(
          "equals",
          commonMessage.paramsNotDefined("extent1 or extent2"),
        ),
      );
    }
    let _extent1 = handleGetExtentValue(extent1);
    let _extent2 = handleGetExtentValue(extent2);
    return OlExtent.equals(_extent1, _extent2);
  }

  static extend(extent1: OMapExtentType, extent2: OMapExtentType): Extent {
    if (!isDefined(extent1) || !isDefined(extent2)) {
      error_(
        createMessage(
          "extend",
          commonMessage.paramsNotDefined("extent1 or extent2"),
        ),
      );
    }
    let _extent1 = handleGetExtentValue(extent1);
    let _extent2 = handleGetExtentValue(extent2);
    return new Extent(OlExtent.extend(_extent1, _extent2));
  }

  static getArea(extent: OMapExtentType): number {
    if (!isDefined(extent)) {
      error_(
        createMessage("getArea", commonMessage.paramsNotDefined("extent")),
      );
    }
    let _extent = handleGetExtentValue(extent);
    return OlExtent.getArea(_extent);
  }

  /**
   * 确定一个范围是否与另一个范围相交
   * @param {OMapExtentType} extent1
   * @param {OMapExtentType}extent2
   * @returns {boolean} 判断结果
   */
  static intersects(extent1: OMapExtentType, extent2: OMapExtentType): boolean {
    if (!isDefined(extent1) || !isDefined(extent2)) {
      error_(
        createMessage(
          "intersects",
          commonMessage.paramsNotDefined("extent1 or extent2"),
        ),
      );
    }
    let _extent1 = handleGetExtentValue(extent1);
    let _extent2 = handleGetExtentValue(extent2);
    return OlExtent.intersects(_extent1, _extent2);
  }

  static isEmpty(extent: OMapExtentType): boolean {
    if (!isDefined(extent)) {
      error_(
        createMessage("isEmpty", commonMessage.paramsNotDefined("extent")),
      );
    }
    let _extent = handleGetExtentValue(extent);
    return OlExtent.isEmpty(_extent);
  }
}
