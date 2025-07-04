function isFunction<T extends Function>(value: T | any): value is T {
    return typeof value === 'function';
}

function isArray<T>(value: any): boolean {
    return Array.isArray(value);
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

function isIdType(value: string | number): boolean {
    return isString(value) || isNumber(value);
}

function isCoordinatesType(value: any): boolean {
    return isArray(value) && value.length === 2 && isNumber(value[0]) && isNumber(value[1]);
}

function isArrayLength2(value: any) {
    return isArray(value) && value.length === 2
}

export { isFunction, isArray, isNumber, isNaN, isString, isEmptyString, isBoolean, isIdType, isCoordinatesType, isArrayLength2 }