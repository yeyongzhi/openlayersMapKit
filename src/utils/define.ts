export function isDefined<T>(value: T | undefined): boolean {
    return value !== undefined && value !== null;
}

export function defaultValue<T>(value: T | undefined, defaultValue: T): T {
    return isDefined(value) ? (value as T) : defaultValue;
}