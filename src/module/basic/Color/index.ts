import { isArray, isDefined, isEmptyString, isObject, isString } from '../../../utils/index'
import {
  error_,
  getPackageMessage,
  isValidColorRGB,
  ColorhexToRGB,
  isValidOpacity,
  isValidColorHex,
  isValidColorHexWithAlpha,
  isValidColorRGBString,
  isValidColorRGBAString,
  extractRGBValues,
  extractRGBAValues,
  opacityHexToNumber
} from '../../../utils/index'
import type { ColorType, ColorObjectType } from './type'
import { presetsColor } from './presetsColor'

const PACKAGE_NAME = 'Color'
const createMessage = getPackageMessage(PACKAGE_NAME)

/** 颜色Color格式
 * 1.十六进制：'#ff0000'
 * 2.十六进制（带透明度）：'#ff000099'
 * 3.rgb格式：'rgb(255, 0, 0)'
 * 4.rgba格式：'rgba(255, 0, 0, 0.9)'
 * 5.rgb格式（数组）：[255, 0, 0]
 * 6.rgba格式（数组）：[255, 0, 0, 0.8]
 * 7.rgba格式（数组）：[#ff0000, 0.8]
 * 8.对象格式：{ color: '#1890FF', alpha: 0.8 } 或者 { color: 'rgb(255, 0, 0)', alpha: 0.8 }
 * 9.快捷颜色：'red', 'blue' 参考 presetsColor
 */

/**
 * 颜色类
 *
 */

export default class Color {
  static from(value: Color | ColorType): Color {
    return value instanceof Color ? value.clone() : new Color(value)
  }

  /**
   * 颜色值
   * 所有的颜色值均以string的格式输出
   *
   * @type {string}
   */
  private _color: string = ''

  constructor(color: ColorType) {
    this.initColor(color)
  }

  /**
   * 初始化颜色
   *
   * @param {ColorType} color 颜色
   */
  protected initColor(color: ColorType) {
    const errorHandler = () => {
      error_(createMessage('constructor', '初始化参数有误'))
    }
    // 【情况5,6,7】
    if (isArray(color)) {
      const colorArray = color as Array<number | string>
      // 情况5
      if (colorArray.length === 3) {
        if (!isValidColorRGB(color)) {
          errorHandler()
          return
        }
        this._color = `rgb(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]})`
      } else if (colorArray.length === 4) {
        if (!isValidColorRGB(colorArray.slice(0, 3)) || !isValidOpacity(colorArray[3])) {
          errorHandler()
          return
        }
        this._color = `rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, ${colorArray[3]})`
      } else if (colorArray.length === 2) {
        if (!isValidColorHex(colorArray[0]) || !isValidOpacity(colorArray[1])) {
          errorHandler()
          return
        }
        const colorRGB = ColorhexToRGB((color as Array<string>)[0])
        if (!isDefined(colorRGB)) {
          errorHandler()
          return
        }
        this._color = `rgba(${colorRGB[0]}, ${colorRGB[1]}, ${colorRGB[2]}, ${colorArray[1]})`
      } else {
        errorHandler()
        return
      }
    }
    // 【情况8】Object
    if (isObject(color)) {
      const colorObject = color as ColorObjectType
      // 缺少color或者rgb属性
      if (
        !isDefined(colorObject.color) &&
        !(isDefined(colorObject.r) && isDefined(colorObject.g) && isDefined(colorObject.b))
      ) {
        errorHandler()
        return
      }
      // color属性
      if (isDefined(colorObject.color)) {
        // color为十六进制字符串
        if (isValidColorHex(colorObject.color)) {
          const colorRGB = ColorhexToRGB(colorObject.color as string)
          if (!isDefined(colorRGB)) {
            errorHandler()
            return
          }
          this._color =
            isDefined(colorObject.alpha) || isDefined(colorObject.opacity)
              ? `rgba(${colorRGB[0]}, ${colorRGB[1]}, ${colorRGB[2]}, ${colorObject.alpha || colorObject.opacity})`
              : `rgb(${colorRGB[0]}, ${colorRGB[1]}, ${colorRGB[2]})`
        }
        // color为rgb字符串
        if (isValidColorRGBString(colorObject.color)) {
          const rgbValues = extractRGBValues(colorObject.color as string).join(', ')
          this._color =
            isDefined(colorObject.alpha) || isDefined(colorObject.opacity)
              ? `rgba(${rgbValues}, ${colorObject.alpha || colorObject.opacity})`
              : `rgb(${rgbValues})`
        }
      } else if (isDefined(colorObject.r) && isDefined(colorObject.g) && isDefined(colorObject.b)) {
        if (!isValidColorRGB([colorObject.r, colorObject.g, colorObject.b])) {
          errorHandler()
          return
        }
        this._color =
          isDefined(colorObject.alpha) || isDefined(colorObject.opacity)
            ? `rgba(${colorObject.r}, ${colorObject.g}, ${colorObject.b}, ${colorObject.alpha || colorObject.opacity})`
            : `rgb(${colorObject.r}, ${colorObject.g}, ${colorObject.b})`
      } else {
        errorHandler()
        return
      }
    }
    // 【情况1，2,3,4,9】
    if (isString(color)) {
      if (isEmptyString(color as string)) {
        errorHandler()
        return
      }
      // 情况1
      if (isValidColorHex(color)) {
        const colorRGB = ColorhexToRGB(color as string)
        if (!isDefined(colorRGB)) {
          errorHandler()
          return
        }
        this._color = `rgb(${colorRGB[0]}, ${colorRGB[1]}, ${colorRGB[2]})`
      } else if (isValidColorHexWithAlpha(color)) {
        const colorRGB = ColorhexToRGB((color as string).slice(0, 7))
        if (!isDefined(colorRGB)) {
          errorHandler()
          return
        }
        const opacity = opacityHexToNumber((color as string).slice(6))
        this._color = `rgba(${colorRGB[0]}, ${colorRGB[1]}, ${colorRGB[2]}, ${opacity})`
      } else {
        // 【情况3,4,9】rgb/rgba 字符串或预命名颜色
        const isNamedColor = isDefined(presetsColor[color as string])
        if (!isValidColorRGBString(color) && !isValidColorRGBAString(color) && !isNamedColor) {
          errorHandler()
          return
        }
        this._color = color as string
      }
    }
  }

  getColor(): string {
    return this._color
  }

  equals(color: Color | ColorType): boolean {
    return this._color === Color.from(color)._color
  }

  clone(): Color {
    return new Color(this._color)
  }

  toString(): string {
    return this._color
  }

  /**
   * 设置颜色
   *
   * @param {ColorType} color 颜色值
   */
  setColor(color: ColorType) {
    this.initColor(color)
  }

  /**
   * 设置透明度
   *
   * @param alpha {number} 透明度，范围0-1
   */
  withAlpha(alpha: number) {
    if (!isValidOpacity(alpha)) {
      error_(createMessage('withAlpha', '透明度参数有误'))
      return
    }
    if (this._color.startsWith('rgb') && !this._color.startsWith('rgba')) {
      this.initColor([...extractRGBValues(this._color), alpha])
    } else if (this._color.startsWith('rgba')) {
      this.initColor([...extractRGBAValues(this._color), alpha])
    } else {
      if (!isDefined(presetsColor[this._color as string])) {
        error_(createMessage('withAlpha', '颜色值有误'))
        return
      }
      const colorRGB = ColorhexToRGB(presetsColor[this._color as string])
      if (!isDefined(colorRGB)) {
        error_(createMessage('withAlpha', '颜色值有误'))
        return
      }
      this.initColor([...colorRGB, alpha])
    }
  }
}
