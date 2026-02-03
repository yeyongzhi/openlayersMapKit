const COLOR_RGB_STRING_REGEX = /^rgb\(\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*\)$/

function isFunction<T extends Function>(value: T | any): value is T {
    return typeof value === 'function';
}

function isArray<T>(value: unknown): value is Array<T> {
    return Array.isArray(value);
}

function isEmptyArray<T>(value: T): boolean {
    return Array.isArray(value) && value.length === 0;
}

function isNumber(value: number | any): value is number {
    return typeof value === 'number';
}

function isNaN(value: number): boolean {
    return Number.isNaN(value);
}

function isString(value: string | any): boolean {
    return typeof value === 'string';
}

function isEmptyString(value: string): boolean {
    return value === '';
}

function isBoolean(value: boolean | any): boolean {
    return typeof value === 'boolean';
}

function isObject(value: any): boolean {
    return Object.prototype.toString.call(value) === '[object Object]'
}

function isIdType(value: string | number): boolean {
    return isString(value) || isNumber(value);
}

function isCoordinatesType(value: any): boolean {
    return isArray(value) && value.length === 2 && isNumber(value[0]) && isNumber(value[1]);
}

function isExtentType(value: any): boolean {
    return isArray(value) && value.length === 4 && isNumber(value[0]) && isNumber(value[1]) && isNumber(value[2]) && isNumber(value[3]);
}

function isArrayLength2(value: unknown): value is Array<unknown> {
    return isArray(value) && value.length === 2
}

function isVaildColorRGB(value: any) {
    return isArray(value) && value.length === 3 && value.every((item: any) => isNumber(item) && item >= 0 && item <= 255);
}

function isVaildColorRGBString(value: any) {
    return isString(value) && COLOR_RGB_STRING_REGEX.test(value);
}

function isVaildOpacity(value: any) {
    return isNumber(value) && value >= 0 && value <= 1;
}

function isVaildColorHex(value: any) {
    let _value = value.replace("#", "");
    return isString(value) && value.startsWith("#") && (_value.length === 6 || _value.length === 3);
}

function isVaildColorHexWithAlpha(value: any) {
    let _value = value.replace("#", "");
    return isString(value) && value.startsWith("#") && (_value.length === 8);
}

export function isAllNumberArray(value: any[]): boolean {
    const isAllNumber = value.every((v: any) => isNumber(v));
    return isArray(value) && isAllNumber;
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
    isVaildColorRGB,
    isVaildColorRGBString,
    isVaildOpacity,
    isVaildColorHex,
    isVaildColorHexWithAlpha
}