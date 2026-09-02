const COLOR_RGB_STRING_REGEX =
  /^rgb\(\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*\)$/

const COLOR_RGBA_STRING_REGEX =
  /^rgba\(\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(0|1|0?\.\d+)\s*\)$/

/** 任意函数签名，用于替代裸 Function 类型 */
export type AnyFunction = (...args: never[]) => unknown

function isFunction<T extends AnyFunction>(value: unknown): value is T {
  return typeof value === 'function'
}

function isArray<T>(value: unknown): value is Array<T> {
  return Array.isArray(value)
}

function isEmptyArray<T>(value: T): boolean {
  return Array.isArray(value) && value.length === 0
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

function isNaN(value: number): boolean {
  return Number.isNaN(value)
}

function isString(value: unknown): value is string {
  return typeof value === 'string'
}

function isEmptyString(value: string): boolean {
  return value === ''
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

function isObject(value: unknown): boolean {
  return Object.prototype.toString.call(value) === '[object Object]'
}

function isIdType(value: string | number): boolean {
  return isString(value) || isNumber(value)
}

function isCoordinatesType(value: unknown): boolean {
  return isArray(value) && value.length === 2 && isNumber(value[0]) && isNumber(value[1])
}

function isExtentType(value: unknown): boolean {
  return (
    isArray(value) &&
    value.length === 4 &&
    isNumber(value[0]) &&
    isNumber(value[1]) &&
    isNumber(value[2]) &&
    isNumber(value[3])
  )
}

function isArrayLength2(value: unknown): value is Array<unknown> {
  return isArray(value) && value.length === 2
}

function isValidColorRGB(value: unknown) {
  return (
    isArray(value) &&
    value.length === 3 &&
    value.every((item) => isNumber(item) && item >= 0 && item <= 255)
  )
}

function isValidColorRGBString(value: unknown) {
  return isString(value) && COLOR_RGB_STRING_REGEX.test(value)
}

function isValidColorRGBAString(value: unknown) {
  return isString(value) && COLOR_RGBA_STRING_REGEX.test(value)
}

function isValidOpacity(value: unknown) {
  return isNumber(value) && value >= 0 && value <= 1
}

function isValidColorHex(value: unknown) {
  const normalizedValue = (value as string).replace('#', '')
  return (
    isString(value) &&
    value.startsWith('#') &&
    (normalizedValue.length === 6 || normalizedValue.length === 3)
  )
}

function isValidColorHexWithAlpha(value: unknown) {
  const normalizedValue = (value as string).replace('#', '')
  return isString(value) && value.startsWith('#') && normalizedValue.length === 8
}

export function isAllNumberArray(value: unknown[]): boolean {
  const isAllNumber = value.every((v) => isNumber(v))
  return isArray(value) && isAllNumber
}

export {
  isFunction,
  isArray,
  isEmptyArray,
  isNumber,
  isNaN,
  isString,
  isEmptyString,
  isBoolean,
  isObject,
  isIdType,
  isCoordinatesType,
  isExtentType,
  isArrayLength2,
  isValidColorRGB,
  isValidColorRGBString,
  isValidColorRGBAString,
  isValidOpacity,
  isValidColorHex,
  isValidColorHexWithAlpha
}
