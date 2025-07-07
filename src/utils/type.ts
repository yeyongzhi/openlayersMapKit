import { Lnglat } from "../index";
import OlPackage, { OlLayer, OlSource } from '../source/index'

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

export type PropertiesType = Record<string, any>


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

export type OlMapInstanceType = InstanceType<typeof OlPackage.Map>


/**
 * Layer
 */

export type BaseLayerType = 'Tile' | 'Image' | 'Vector' | 'Gaode' | 'Tdt'
export type BaseLayerIdType = number | string | null | undefined
export type BaseLayerOptions = {
    id?: BaseLayerIdType; // 图层id，用于区分图层，默认使用uuid
    name?: string; // 图层名称，用于显示在图层控制栏中，默认使用图层id
}

export type OlTileLayerOptions = ConstructorParameters<typeof OlLayer.Tile>[0];
// 确保 OlTileLayerOptions 是静态已知类型，直接继承它
export type BaseTileLayerOptions  = OlTileLayerOptions & BaseLayerOptions
export type BaseTileLayerEventType = {
    key: string;
    oldValue?: number | string | boolean;
    target: ConstructorParameters<typeof OlLayer.Tile>[0];
    type: string;
}


export type OlXYZSourceOptions = ConstructorParameters<typeof OlSource.XYZ>[0];