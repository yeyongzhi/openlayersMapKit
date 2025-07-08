import { Lnglat, Extent, Projection } from "../index";
import OlPackage, { OlLayer, OlSource } from '../source/index'
import { OlProjInstanceType } from './olType/projection'

/** 工具类 */
export type ManualOmit<T, K extends keyof any> = {
    [P in keyof T as P extends K ? never : P]: T[P];
};

// 投影相关类型
export * from './olType/projection'

export type EmptyArray = [];

export type LnglatType = number[];

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

/** View */
export type OlViewOptionsType = ConstructorParameters<typeof OlPackage.View>[0];
type OlViewOptionsTypeKeysToOmit = 'center' | 'extent' | 'projection';
type OlViewOptionsOmitType = ManualOmit<OlViewOptionsType, OlViewOptionsTypeKeysToOmit>;
type CustomerOlViewOptionsType = {
    projection: Projection | string;
    center: Lnglat | Array<number>;
    extent: Extent | Array<number>;
};
export type OlViewOptionsFinalType = OlViewOptionsOmitType & CustomerOlViewOptionsType;
/** -------------------------------- */

/** Map */
export type OlMapInstanceType = InstanceType<typeof OlPackage.Map>
export type MapContainerType = string | HTMLElement | HTMLDivElement; // 容器类型，支持字符串、HTMLElement、HTMLDivElement
export type OlMapOptionsType = ConstructorParameters<typeof OlPackage.Map>[0];
type OlMapOptionsTypeKeysToOmit = 'layers' | 'controls' | 'interactions' | 'overlays' | 'target' | 'view';

export type OlMapOptionsOmitType = ManualOmit<OlMapOptionsType, OlMapOptionsTypeKeysToOmit>; // 可行

// 测试使用
// export type azsx<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
// export type OlMapOptionsOmitType2 = Omit<OlMapOptionsType, OlMapOptionsTypeKeysToOmit>;
// export type OlMapOptionsOmitType3 = azsx<OlMapOptionsType, 'layers'>;

export type CustomerOlMapOptionsType = {
    layers: Array<any>;
    controls: Array<any>;
    interactions: Array<any>;
    overlays: Array<string>;
    view: OlViewOptionsFinalType;
};
export type OlMapOptionsFinalType = OlMapOptionsOmitType & CustomerOlMapOptionsType;

/** -------------------------------- */


/** Layer */
export type BaseLayerType = 'Tile' | 'Image' | 'Vector' | 'Gaode' | 'Tdt'
export type BaseLayerIdType = number | string | null | undefined
export type BaseLayerOptions = {
    id?: BaseLayerIdType; // 图层id，用于区分图层，默认使用uuid
    name?: string; // 图层名称，用于显示在图层控制栏中，默认使用图层id
}

export type OlTileLayerOptions = ConstructorParameters<typeof OlLayer.Tile>[0];
// 确保 OlTileLayerOptions 是静态已知类型，直接继承它
export type BaseTileLayerOptions = OlTileLayerOptions & BaseLayerOptions
export type BaseTileLayerEventType = {
    key: string;
    oldValue?: number | string | boolean;
    target: ConstructorParameters<typeof OlLayer.Tile>[0];
    type: string;
}

/** -------------------------------- */

export type OlXYZSourceOptions = ConstructorParameters<typeof OlSource.XYZ>[0];