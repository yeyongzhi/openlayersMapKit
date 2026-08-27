// @vitest-environment happy-dom

import { describe, expect, it, vi } from 'vitest'
import {
  ColorhexToRGB,
  extractRGBAValues,
  extractRGBValues,
  opacityHexToNumber
} from '../../src/utils/transform'
import {
  isArrayLength2,
  isBoolean,
  isCoordinatesType,
  isEmptyArray,
  isEmptyString,
  isExtentType,
  isFunction,
  isIdType,
  isNaN,
  isObject,
  isVaildColorHex,
  isVaildColorHexWithAlpha,
  isVaildColorRGB,
  isVaildColorRGBString,
  isVaildOpacity
} from '../../src/utils/dataType'
import { Color, Popup, Size } from '../../src/index'
import { handleGetColorValue } from '../../src/module/basic/Color/handle'
import { handleGetSizeValue } from '../../src/module/basic/Size/handle'
import { createDefaultContentElement, handlePopupEvent } from '../../src/module/basic/Popup/handle'

describe('utility boundaries', () => {
  it('parses color strings and rejects malformed representations', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    expect(ColorhexToRGB('#f00')).toEqual([255, 0, 0])
    expect(ColorhexToRGB('#00ff80')).toEqual([0, 255, 128])
    expect(ColorhexToRGB('ffffff')).toEqual([0, 0, 0])
    expect(ColorhexToRGB('#12')).toEqual([0, 0, 0])
    expect(error).toHaveBeenCalledTimes(2)
    error.mockRestore()

    expect(extractRGBValues('rgb(1, 2, 3)')).toEqual([1, 2, 3])
    expect(extractRGBAValues('rgba(1, 2, 3, 0.5)')).toEqual([1, 2, 3])
    expect(() => extractRGBValues('red')).toThrow(/Invalid RGB/)
    expect(() => extractRGBAValues('red')).toThrow(/Invalid RGB/)
    expect(opacityHexToNumber('80')).toBe('0.50')
  })

  it('covers primitive and tuple guards at valid and invalid boundaries', () => {
    expect(isFunction(() => undefined)).toBe(true)
    expect(isEmptyArray([])).toBe(true)
    expect(isEmptyArray([1])).toBe(false)
    expect(isNaN(Number.NaN)).toBe(true)
    expect(isEmptyString('')).toBe(true)
    expect(isBoolean(false)).toBe(true)
    expect(isObject({})).toBe(true)
    expect(isObject([])).toBe(false)
    expect(isIdType(0)).toBe(true)
    expect(isIdType('id')).toBe(true)
    expect(isCoordinatesType([1, 2])).toBe(true)
    expect(isCoordinatesType([1])).toBe(false)
    expect(isExtentType([1, 2, 3, 4])).toBe(true)
    expect(isExtentType([1, 2])).toBe(false)
    expect(isArrayLength2([1, 2])).toBe(true)
    expect(isVaildColorRGB([0, 128, 255])).toBe(true)
    expect(isVaildColorRGB([0, 256, 1])).toBe(false)
    expect(isVaildColorRGBString('rgb(0, 128, 255)')).toBe(true)
    expect(isVaildOpacity(1)).toBe(true)
    expect(isVaildOpacity(2)).toBe(false)
    expect(isVaildColorHex('#fff')).toBe(true)
    expect(isVaildColorHexWithAlpha('#ffffffff')).toBe(true)
  })

  it('normalizes value objects and Popup payload branches', () => {
    expect(handleGetColorValue(new Color('#ff0000'))).toBe('rgb(255, 0, 0)')
    expect(handleGetColorValue(undefined)).toBeUndefined()
    expect(handleGetSizeValue(new Size(2, 3))).toEqual([2, 3])
    expect(handleGetSizeValue(undefined)).toBeUndefined()
    expect(createDefaultContentElement('hello').innerHTML).toBe('hello')

    const popup = new Popup({ element: document.createElement('div') })
    popup.setOffset([3, 4])
    expect(handlePopupEvent(popup, 'change:offset', { oldValue: [1, 2] }).oldValue).toMatchObject({
      _pixel: [1, 2]
    })
    expect(
      handlePopupEvent(popup, 'change:properties', {
        key: 'category',
        oldValue: { category: 'old' },
        newValue: { category: 'new' }
      })
    ).toMatchObject({ key: 'category', newValue: { category: 'new' } })
    popup.dispose()
  })
})
