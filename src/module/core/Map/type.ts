import OlPackage, { OlLayer, OlSource } from '../../../source/index'
import { type ManualOmit } from '../../../utils/type'
import { getDevicePixelRatio } from '../../../utils/handle'
import Projection from '../../core/Projection/index'
import Interaction from '../../interaction/Interaction/index'
import MouseWheelZoom from '../../interaction/MouseWheelZoom/index'
import DoubleClickZoom from '../../interaction/DoubleClickZoom/index'
import DragPan from '../../interaction/DragPan/index'
import Popup from '../../basic/Popup/index'
import Pixel from '../../basic/Pixel/index'
import Lnglat from '../../basic/Lnglat/index'
import { type OMapCoordinateType } from '../../basic/Lnglat/type'
import { type OMapExtentType } from '../../basic/Extent/type'
import BaseLayer from '../../layer/BaseLayer/index'

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
    target?: HTMLElement | string;
};
export type OMapOptionsType = OlMapOptionsOmitType & CustomerOlMapOptionsType;

/**
 * 地图的默认交互
 */
const defaultMapInteractions: Interaction[] = [
    new MouseWheelZoom(),
    new DoubleClickZoom(),
    new DragPan(),
]

/**
 * 地图的默认弹窗列表
 */
const defaultMapPopups: Popup[] = []

export const defaultMapOptions: OMapOptionsType = {
    pixelRatio: getDevicePixelRatio(),
    layers: [],
    controls: [],
    interactions: defaultMapInteractions,
    popups: defaultMapPopups
}


export type OMapEventType = 
// 'map:change'
// 'map:change:layerGroup'
// 'map:change:size'
// 'map:change:target'
// 'map:change:view'
'map:click' |
'map:dbclick' |
'map:error' |
'map:loadend' |
'map:loadstart' |
'map:moveend' |
'map:movestart' |
'map:pointerdrag' |
'map:pointermove' |
'map:postcompose' |
'map:postrender' |
'map:precompose' |
'map:propertychange' |
'map:rendercomplete' |
'map:singleclick' |
// view部分
'view:change' |
'view:change:center' |
'view:change:resolution' |
'view:change:rotation' |
'view:error' |
'view:propertychange'

export type OMapEventTarget = {
    target: any;
    type: OMapEventType;
    oldValue?: any;
    newValue?: any;
    pixel?: Pixel;
    coordinate?: Lnglat;
    key?: string;
}

export type OMapEventCallBack = (event: OMapEventTarget) => void
export type OlMapOnEventType = Parameters<OlPackage.Map['on']>[0];
export type OlViewOnEventType = Parameters<OlPackage.View['on']>[0];

export type OMapForEachFeatureAtPixelOptionsType = {
    layerFilter?: (layer: BaseLayer) => boolean;
    hitTolerance: number;
    checkWrapped: boolean;
}
export const DEFAULT_OMAP_FOREACHFEATURE_AT_PIXEL_OPTIONS: OMapForEachFeatureAtPixelOptionsType = {
    hitTolerance: 0,
    checkWrapped: true,
}
