export function isDefined<T>(value: T | undefined | null): value is T {
    return value !== undefined && value !== null;
}

export function defaultValue<T>(value: T | undefined | null, defaultValue: T): T {
    return isDefined(value) ? value : defaultValue;
}