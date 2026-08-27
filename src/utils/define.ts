export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null
}

// Legacy compatibility boundary: callers currently rely on this helper while
// translating between OMap options and structurally different OpenLayers options.
// Migrate those call sites module-by-module before removing these two `any` values.
export function defaultValue<T>(value: any, fallback: any) {
  return isDefined<T>(value) ? value : fallback
}
