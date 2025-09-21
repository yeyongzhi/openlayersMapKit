import OlPackage, { OlLayer, OlSource } from '../../../source/index'
import { type ManualOmit } from '../../../utils/type'
import { getDevicePixelRatio } from '../../../utils/handle'
import Projection from '../../core/Projection/index'
import Interaction from '../../interaction/Interaction/index'
import Popup from '../../basic/Popup/index'
import { type OMapCoordinateType } from '../../basic/Lnglat/type'
import { type OMapExtentType } from '../../basic/Extent/type'

/** View */
export type OlViewInstanceType = InstanceType<typeof OlPackage.View>
export type OlViewOptionsType = ConstructorParameters<typeof OlPackage.View>[0];
type OlViewOptionsTypeKeysToOmit = 'center' | 'extent' | 'projection';
type OlViewOptionsOmitType = ManualOmit<OlViewOptionsType, OlViewOptionsTypeKeysToOmit>;
type CustomerOlViewOptionsType = {
    projection: Projection | string;
    center: OMapCoordinateType;
    extent: OMapExtentType;
};
export type OlViewOptionsFinalType = OlViewOptionsOmitType & CustomerOlViewOptionsType;


/** Map */
export type OlMapInstanceType = InstanceType<typeof OlPackage.Map>
export type MapContainerType = string | HTMLElement | HTMLDivElement; // 容器类型，支持字符串、HTMLElement、HTMLDivElement
export type OlMapOptionsType = ConstructorParameters<typeof OlPackage.Map>[0];
type OlMapOptionsTypeKeysToOmit = 'layers' | 'controls' | 'interactions' | 'overlays' | 'target' | 'view';

export type OlMapOptionsOmitType = ManualOmit<OlMapOptionsType, OlMapOptionsTypeKeysToOmit>; // 可行

export type CustomerOlMapOptionsType = {
    layers: Array<any>;
    controls: Array<any>;
    interactions: Array<Interaction>; // 地图的默认交互列表
    popups: Array<Popup>;
    view?: OlViewOptionsFinalType;
};
export type OMapOptionsType = OlMapOptionsOmitType & CustomerOlMapOptionsType;

export const defaultMapOptions: OMapOptionsType = {
    pixelRatio: getDevicePixelRatio(),
    layers: [],
    controls: [],
    interactions: [],
    popups: []
}