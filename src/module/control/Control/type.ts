import Control from './index'

export type OMapControlType = "Zoom" | "FullScreen"
export type OMapControlIdType = string | number

export function isVaildControl(value: unknown): value is Control {
    return value instanceof Control;
}