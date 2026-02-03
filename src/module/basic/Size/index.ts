import {
  isDefined,
  isNumber,
  isArray,
  isAllNumberArray,
} from "../../../utils/index";
import {
  warn_,
  error_,
  getPackageMessage,
  commonMessage,
} from "../../../utils/message";
import { handleGetSizeValue } from "./handle";
import { OMapSizeType, type OlSizeType } from "./type";

const PACKAGE_NAME = "Size";
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 尺寸类
 * @class
 * @classdesc 用于存储、使用尺寸信息
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/06/30
 * @updateDate 2025/08/05
 */

export default class Size {
  /**
   * @type {number[]}
   * @example [20, 15]
   * @private
   */
  _size: OlSizeType = [0, 0];

  constructor(x: number, y: number);
  constructor(pixel: number[]);

  constructor(...args: [number, number] | [number[]]) {
    let value: OlSizeType = [0, 0];

    if (args.length === 2) {
      const [x, y] = args;
      if (isNumber(x) && isNumber(y)) {
        value = [x, y];
      } else {
        error_(
          createMessage(
            "constructor",
            commonMessage.paramsInvaildFormat("size"),
          ),
        );
      }
    } else if (args.length === 1) {
      const [arr] = args;
      if (Array.isArray(arr) && arr.length >= 2 && isAllNumberArray(arr)) {
        // 只取前两个
        value = [arr[0], arr[1]];
      } else {
        error_(
          createMessage(
            "constructor",
            commonMessage.paramsInvaildFormat("size"),
          ),
        );
      }
    } else {
      error_(
        createMessage("constructor", commonMessage.paramsInvaildFormat("size")),
      );
    }
    this._size = value;
  }

  /**
   * 获取size
   * @returns {OlSizeType} size
   */
  getSize(): number[] {
    return this._size;
  }

  /**
   * 设置size
   * @param {OMapSizeType} size
   */
  setSize(size: OMapSizeType) {
    this._size = handleGetSizeValue(size);
  }

  /**
   * 获取Size的width
   * @returns {number} width
   */
  getWidth(): number {
    return this._size[0];
  }

  /**
   * 获取Size的height
   * @returns {number} height
   */
  getHeight(): number {
    return this._size[1];
  }

  /**
   * 设置Size的width
   * @param {number} width
   */
  setWidth(width: number) {
    this._size[0] = width;
  }

  /**
   * 设置Size的height
   * @param {number} height
   */
  setHeight(height: number) {
    this._size[1] = height;
  }

  /**
   * 判断两个尺寸是否相等
   * @param {OMapSizeType} size
   * @returns {boolean} 判断结果
   */
  equals(size: OMapSizeType): boolean {
    let _size = handleGetSizeValue(size);
    return this._size[0] === _size[0] && this._size[1] === _size[1];
  }

  /**
   * 转换为数组
   * @returns {OlSizeType} size
   */
  toArray(): OlSizeType {
    return this._size;
  }

  /**
   * 以字符串的形式输出尺寸
   * @returns {string} sizeStr
   */
  toString(): string {
    return `[${this._size[0]}, ${this._size[1]}]`;
  }
}
