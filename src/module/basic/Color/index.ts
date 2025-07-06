import { isArray, isDefined, isEmptyString, isObject, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage, isVaildColorRGB, ColorhexToRGB, isVaildOpacity, isVaildColorHex, isVaildColorHexWithAlpha, isVaildColorRGBString, extractRGBValues, extractRGBAValues, opacityHexToNumber } from '../../../utils/index'
import type { ColorType, ColorObjectType } from '../../../utils/index';
import { presetsColor } from './presetsColor';

const PACKAGE_NAME = 'Color';
const createMessage = getPackageMessage(PACKAGE_NAME);

/** 颜色Color格式
 * 1.十六进制：'#ff0000'
 * 2.十六进制（带透明度）：'#ff000099'
 * 3.rgb格式：'rgb(255, 0, 0)'
 * 4.rgba格式：'rgba(255, 0, 0, 0.9)'
 * 5.rgb格式（数组）：[255, 0, 0]
 * 6.rgba格式（数组）：[255, 0, 0, 0.8]
 * 7.rgba格式（数组）：[#ff0000, 0.8]
 * 8.对象格式：{ color: '#1890FF', alpha: 0.8 } 或者 { color: 'rgb(255, 0, 0)', alpha: 0.8 }
 * 9.快捷颜色：'red', 'blue'
 */

/**
 * 颜色类
 * @class
 * @classdesc 用于颜色的存储、使用
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/5
 * @updateDate 2025/7/5
 */

export default class Color {
    _color: string = "";

    constructor(color: ColorType) {
        this._initColor(color);
    }

    /**
     * 初始化颜色
     * @param {ColorType} color 颜色
     */
    private _initColor(color: ColorType) {
        const errorHandler = () => {
            error_(createMessage('constructor', '初始化参数有误'));
        }
        // 【情况5,6,7】
        if (isArray(color)) {
            let _colorArr = (color as Array<number | string>)
            // 情况5
            if (_colorArr.length === 3) {
                if (!isVaildColorRGB(color)) {
                    errorHandler()
                    return;
                }
                this._color = `rgb(${_colorArr[0]}, ${_colorArr[1]}, ${_colorArr[2]})`;
            } else if (_colorArr.length === 4) {
                if (!isVaildColorRGB(_colorArr.slice(0, 3)) || !isVaildOpacity(_colorArr[3])) {
                    errorHandler()
                    return;
                }
                this._color = `rgba(${_colorArr[0]}, ${_colorArr[1]}, ${_colorArr[2]}, ${_colorArr[3]})`;
            } else if (_colorArr.length === 2) {
                if (!isVaildColorHex(_colorArr[0]) || !isVaildOpacity(_colorArr[1])) {
                    errorHandler()
                    return;
                }
                let colorRGB = ColorhexToRGB((color as Array<string>)[0]);
                if (!isDefined(colorRGB)) {
                    errorHandler()
                    return;
                }
                this._color = `rgba(${colorRGB[0]}, ${colorRGB[1]}, ${colorRGB[2]}, ${_colorArr[1]})`;
            } else {
                errorHandler()
                return;
            }
        }
        // 【情况8】Object
        if (isObject(color)) {
            let _colorObj = (color as ColorObjectType)
            // 缺少color或者rgb属性
            if (!isDefined(_colorObj.color) && !(isDefined(_colorObj.r) && isDefined(_colorObj.g) && isDefined(_colorObj.b))) {
                errorHandler()
                return;
            }
            // color属性
            if (isDefined(_colorObj.color)) {
                // color为十六进制字符串
                if (isVaildColorHex(_colorObj.color)) {
                    let colorRGB = ColorhexToRGB((_colorObj.color as string));
                    if (!isDefined(colorRGB)) {
                        errorHandler()
                        return;
                    }
                    this._color = (isDefined(_colorObj.alpha) || isDefined(_colorObj.opacity)) ? `rgba(${colorRGB[0]}, ${colorRGB[1]}, ${colorRGB[2]}, ${_colorObj.alpha || _colorObj.opacity})` :
                        `rgb(${colorRGB[0]}, ${colorRGB[1]}, ${colorRGB[2]})`;
                }
                // color为rgb字符串
                if (isVaildColorRGBString(_colorObj.color)) {
                    let rgbValues = extractRGBValues(_colorObj.color as string).join(', ');
                    this._color = (isDefined(_colorObj.alpha) || isDefined(_colorObj.opacity)) ? `rgba(${rgbValues}, ${_colorObj.alpha || _colorObj.opacity})` : `rgb(${rgbValues})`;
                }
            } else if (isDefined(_colorObj.r) && isDefined(_colorObj.g) && isDefined(_colorObj.b)) {
                if (!isVaildColorRGB([_colorObj.r, _colorObj.g, _colorObj.b])) {
                    errorHandler()
                    return;
                }
                this._color = (isDefined(_colorObj.alpha) || isDefined(_colorObj.opacity)) ? `rgba(${_colorObj.r}, ${_colorObj.g}, ${_colorObj.b}, ${_colorObj.alpha || _colorObj.opacity})` : `rgb(${_colorObj.r}, ${_colorObj.g}, ${_colorObj.b})`;
            } else {
                errorHandler()
                return;
            }
        }
        // 【情况1，2,3,4,9】
        if (isString(color)) {
            if (isEmptyString(color as string)) {
                errorHandler()
                return;
            }
            // 情况1
            if (isVaildColorHex(color)) {
                let colorRGB = ColorhexToRGB(color as string);
                if (!isDefined(colorRGB)) {
                    errorHandler()
                    return;
                }
                this._color = `rgb(${colorRGB[0]}, ${colorRGB[1]}, ${colorRGB[2]})`;
            } else if (isVaildColorHexWithAlpha(color)) {
                let colorRGB = ColorhexToRGB((color as string).slice(0, 7));
                if (!isDefined(colorRGB)) {
                    errorHandler()
                    return;
                }
                let opacity = opacityHexToNumber((color as string).slice(6));
                this._color = `rgba(${colorRGB[0]}, ${colorRGB[1]}, ${colorRGB[2]}, ${opacity})`;
            } else {
                // 【情况3,4,9】
                this._color = color as string;
            }
        }
    }

    getColor() {
        return this._color;
    }

    setColor(color: ColorType) {
        this._initColor(color);
    }

    /**
     * 设置透明度
     * @param alpha {number} 透明度，范围0-1
     */
    withAlpha(alpha: number) {
        if (!isVaildOpacity(alpha)) {
            error_(createMessage('withAlpha', '透明度参数有误'));
            return;
        }
        if (this._color.startsWith('rgb') && !this._color.startsWith('rgba')) {
            this._initColor([...extractRGBValues(this._color), alpha])
        } else if (this._color.startsWith('rgba')) {
            this._initColor([...extractRGBAValues(this._color), alpha])
        } else {
            if (!isDefined(presetsColor[this._color as string])) {
                error_(createMessage('withAlpha', '颜色值有误'));
                return;
            }
            let colorRGB = ColorhexToRGB(presetsColor[this._color as string]);
            if (!isDefined(colorRGB)) {
                error_(createMessage('withAlpha', '颜色值有误'));
                return;
            }
            this._initColor([...colorRGB, alpha])
        }
    }
}