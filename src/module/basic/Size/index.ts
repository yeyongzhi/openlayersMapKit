
import { isDefined, isNumber } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type { OlSizeType } from '../../../utils/index';

const PACKAGE_NAME = 'Size';
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

export interface SizeLike {
    _size?: OlSizeType;
}


interface SizeLikeInitialized {
    _size: OlSizeType;
}

export default class Size implements SizeLike {

    /**
     * @type {number[]}
     * @example [20, 15]
     * @private
     */
    _size: OlSizeType;

    constructor(width: number, height: number) {
        if(!isNumber(width) || !isNumber(height)) {
            error_(createMessage("constructor", "初始化参数有误"))
        }
        this._size = [width, height];
    }

    private _isInitialized(method: string): this is SizeLikeInitialized & this {
        if (!isDefined(this._size)) {
            warn_(createMessage(method, "未正确实例化"))
            return false;
        }
        return true;
    }

    /**
     * 获取size
     * @returns {OlSizeType | undefined} size
     */
    getSize(): number[] | undefined {
        if(!this._isInitialized("getSize")) return undefined
        return this._size
    }

    /**
     * 设置size
     * @param {OlSizeType} size
     */
    setSize(size: OlSizeType): void {
        if(!this._isInitialized("setSize")) return;
        if(!isNumber(size[0]) || !isNumber(size[1])) {
            warn_(createMessage("setSize", "参数格式有误"))
            return undefined
        }
        this._size = size
    }

    /**
     * 获取Size的width
     * @returns {number | undefined} width
     */
    getWidth(): number | undefined {
        if(!this._isInitialized("getWidth")) return undefined
        return this._size[0]
    }

    /**
     * 获取Size的height
     * @returns {number} height
     */
    getHeight(): number | undefined {
        if(!this._isInitialized("getHeight")) return undefined
        return this._size[1]
    }

    /**
     * 设置Size的width
     * @param {number} width
     */
    setWidth(width: number): void {
        if(!this._isInitialized("setWidth")) return;
        if(!isNumber(width)) {
            warn_(createMessage("setWidth", "参数格式有误"))
            return;
        }
        this._size[0] = width;
    }

    /**
     * 设置Size的height
     * @param {number} height
     */
    setHeight(height: number): void {
        if(!this._isInitialized("setHeight")) return;
        if(!isNumber(height)) {
            warn_(createMessage("setHeight", "参数格式有误"))
            return;
        }
        this._size[1] = height;
    }

    /**
     * 判断两个尺寸是否相等
     * @param {Size} size 
     * @returns {boolean} 判断结果
     */
    equals(size: Size): boolean | undefined {
        if(!this._isInitialized("equals")) return;
        return this._size[0] === size._size[0] && this._size[1] === size._size[1]
    }

    /**
     * 转换为数组
     * @returns {OlSizeType | undefined} size
     */
    toArray(): OlSizeType | undefined {
        if(!this._isInitialized("toArray")) return;
        return this._size
    }

    /**
     * 以字符串的形式输出尺寸
     * @returns {string} sizeStr
     */
    toString(): string {
        if(!this._isInitialized("toString")) return ""
        return `[${this._size[0]}, ${this._size[1]}]`
    }

}