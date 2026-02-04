export function isDefined<T>(value: T | undefined | null): value is T {
    return value !== undefined && value !== null;
}

export function defaultValue<T>(value: any, defaultValue: any) {
    return isDefined<T>(value) ? value : defaultValue;
}