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
import { handleGetPixelValue } from "./handle";
import { OlPixelType, OMapPixelType } from "./type";

const PACKAGE_NAME = "Pixel";
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 像素类
 * @class
 * @classdesc 用于存储、使用像素坐标信息
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/06/30
 * @updateDate 2026/2/2
 */

export default class Pixel {
  static from(value: OMapPixelType): Pixel {
    return value instanceof Pixel ? value.clone() : new Pixel(value);
  }

  /**
   * @type {number[]}
   * @example [100, 200]
   * @private
   */
  _pixel: number[] = [0, 0];

  constructor(x: number, y: number);
  constructor(pixel: number[]);

  constructor(...args: [number, number] | [number[]]) {
    let value: OlPixelType = [0, 0];

    if (args.length === 2) {
      const [x, y] = args;
      if (isNumber(x) && isNumber(y)) {
        value = [x, y];
      } else {
        error_(
          createMessage(
            "constructor",
            commonMessage.paramsInvaildFormat("pixel"),
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
            commonMessage.paramsInvaildFormat("pixel"),
          ),
        );
      }
    } else {
      error_(
        createMessage(
          "constructor",
          commonMessage.paramsInvaildFormat("pixel"),
        ),
      );
    }
    this._pixel = value;
  }

  /**
   * 获取像素坐标
   * @returns {number[] | undefined} 像素坐标
   */
  getPixel(): number[] {
    return this._pixel;
  }

  /**
   * 设置像素坐标
   * @param {number[]} pixel 像素坐标
   */
  setPixel(pixel: number[]) {
    this._pixel = pixel;
  }

  /**
   * 获取像素的 x 坐标
   * @returns {number} x 坐标
   */
  getX(): number {
    return this._pixel[0];
  }

  /**
   * 获取像素的 y 坐标
   * @returns {number} y 坐标
   */
  getY(): number {
    return this._pixel[1];
  }

  /**
   * 设置像素的 x 坐标
   * @param {number} x x 坐标
   */
  setX(x: number) {
    this._pixel[0] = x;
  }

  /**
   * 设置像素的 y 坐标
   * @param {number} y y 坐标
   */
  setY(y: number) {
    this._pixel[1] = y;
  }

  /**
   * 判断两个像素坐标是否相等
   * @param {Pixel} pixel 像素对象
   * @returns {boolean | undefined} 判断结果
   */
  equals(pixel: OMapPixelType): boolean {
    if (!isDefined(pixel)) {
      error_(createMessage("equals", commonMessage.paramsNotDefined("pixel")));
    }
    const otherPixel = handleGetPixelValue(pixel);
    return this._pixel[0] === otherPixel[0] && this._pixel[1] === otherPixel[1];
  }

  toArray(): number[] {
    return [...this._pixel];
  }

  clone(): Pixel {
    return new Pixel(this._pixel);
  }

  /**
   * 以字符串的形式输出像素坐标
   * @returns {string} 像素坐标字符串
   */
  toString(): string {
    return `[${this._pixel[0]}, ${this._pixel[1]}]`;
  }
}
