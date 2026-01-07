import Color from './index'
export type OlBackgroundColorType = string
export type OlColorType = string

export type OMapColorType = string | Color

export interface ColorObjectType {
    color?: string;
    opacity?: number;
    alpha?: number;
    r?: number;
    g?: number;
    b?: number;
}

export type ColorType = string | Array<number | string> | ColorObjectType;
