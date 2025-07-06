import { Lnglat } from "../index";

export type EmptyArray = [];

export type LnglatType = [number, number];

export interface ColorObjectType {
    color?: string;
    opacity?: number;
    alpha?: number;
    r: number;
    g: number;
    b: number;
}

export type ColorType = string | Array<number | string> | ColorObjectType;


/** Map */
export type MapContainerType = string | HTMLElement | HTMLDivElement; // 容器类型，支持字符串、HTMLElement、HTMLDivElement

export type MapOptionsType = {
    center: InstanceType<typeof Lnglat> | LnglatType;
    zoom: number;
    layers?: Array<any>;
    controls: Array<any>;
    interactions: Array<any>;
    overlays: Array<any>;
}


/**
 * Layer
 */

export type BaseLayerType = 'Tile' | 'Image' | 'Vector' | 'Gaode' | 'Tdt'
export type BaseLayerIdType = number | string | null
export type BaseLayerOptions = {
    id?: BaseLayerIdType; // 图层id，用于区分图层，默认使用uuid
    name?: string; // 图层名称，用于显示在图层控制栏中，默认使用图层id
    className?: string; // 图层样式类名，用于自定义图层样式，默认无
    opacity?: number; // 图层透明度，默认1
    visible?: boolean; // 图层是否可见，默认true
    extent?: [number, number, number, number]; // 图层范围，默认全局
    minZoom?: number; // 最小缩放级别，默认0
    maxZoom?: number; // 最大缩放级别，默认22
    minResolution?: number; // 最小分辨率，默认0r
    maxResolution?: number; // 最大分辨率，默认Infinity
    zIndex?: number; // 图层层级，默认0
    properties?: Record<string, any>; // 图层属性，用于存储图层相关信息
}