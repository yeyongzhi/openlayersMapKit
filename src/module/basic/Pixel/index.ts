import { isDefined, isNumber, isArray, isAllNumberArray } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import { OlPixelType } from './type'

const PACKAGE_NAME = 'Pixel';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 像素类
 * @class
 * @classdesc 用于存储、使用像素坐标信息
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/06/30
 * @updateDate 2025/10/5
 */

export default class Pixel {
    /**
     * @type {number[]}
     * @example [100, 200]
     * @private
     */
    _pixel: number[] = [];

    constructor(...args: number[]);
    constructor(args: number[]);

    constructor(...args: any[]) {
        let value: OlPixelType = [0, 0]
        if (args.length === 1 && isArray(args[0])) {
            value = args[0];
        } else if (args.length === 2 && isAllNumberArray(args)) {
            value = [args[0], args[1]];
        } else {
            error_(createMessage('constructor', '初始化参数格式有误'));
            return;
        }
        this._pixel = value;
    }

    private _isInitialized(method: string): boolean {
        if (!isDefined(this._pixel)) {
            warn_(createMessage(method, "未正确实例化"));
            return false;
        }
        return true;
    }

    /**
     * 获取像素坐标
     * @returns {number[] | undefined} 像素坐标
     */
    getPixel(): number[] | undefined {
        if (!this._isInitialized("getPixel")) return undefined;
        return this._pixel;
    }

    /**
     * 设置像素坐标
     * @param {number[]} pixel 像素坐标
     */
    setPixel(pixel: number[]): void {

        if (!isNumber(pixel[0]) || !isNumber(pixel[1])) {
            warn_(createMessage("setPixel", "参数格式有误"));
            return;
        }
        this._pixel = pixel;
    }

    /**
     * 获取像素的 x 坐标
     * @returns {number | undefined} x 坐标
     */
    getX(): number | undefined {
        if (!this._isInitialized("getX")) return undefined;
        return this._pixel[0];
    }

    /**
     * 获取像素的 y 坐标
     * @returns {number | undefined} y 坐标
     */
    getY(): number | undefined {
        if (!this._isInitialized("getY")) return undefined;
        return this._pixel[1];
    }

    /**
     * 设置像素的 x 坐标
     * @param {number} x x 坐标
     */
    setX(x: number): void {

        if (!isNumber(x)) {
            warn_(createMessage("setX", "参数格式有误"));
            return;
        }
        this._pixel[0] = x;
    }

    /**
     * 设置像素的 y 坐标
     * @param {number} y y 坐标
     */
    setY(y: number): void {

        if (!isNumber(y)) {
            warn_(createMessage("setY", "参数格式有误"));
            return;
        }
        this._pixel[1] = y;
    }

    /**
     * 判断两个像素坐标是否相等
     * @param {Pixel} pixel 像素对象
     * @returns {boolean | undefined} 判断结果
     */
    equals(pixel: Pixel): boolean | undefined {
        if (!this._isInitialized("equals")) return undefined;
        if (!isDefined(pixel)) {
            warn_(createMessage("equals", "参数未正确实例化"));
            return undefined;
        }
        const otherPixel = pixel.getPixel();
        if (!otherPixel) return undefined;
        return this._pixel[0] === otherPixel[0] && this._pixel[1] === otherPixel[1];
    }
    
    toArray(): number[] | undefined {

        return this._pixel;
    }

    /**
     * 以字符串的形式输出像素坐标
     * @returns {string} 像素坐标字符串
     */
    toString(): string {
        if (!this._isInitialized("toString")) return "";
        return `[${this._pixel[0]}, ${this._pixel[1]}]`;
    }
}