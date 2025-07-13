import { Lnglat, Extent, Projection } from "../index";
import OlPackage, { OlLayer, OlSource } from '../source/index'
import { OlProjInstanceType } from './olType/projection'

export type IdType = number | string | null

/** 工具类 */
export type ManualOmit<T, K extends keyof any> = {
    [P in keyof T as P extends K ? never : P]: T[P];
};

export * from './olType/basic'
export * from './olType/projection'
export * from './olType/layer'
export * from './olType/source'
export * from './olType/event'
export * from './olType/map'

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
export type OlViewInstanceType = InstanceType<typeof OlPackage.View>
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