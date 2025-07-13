import { Pixel, Lnglat } from '../../index';
import OlPackage from '../../source/index'

export type OlMapOnEventType = Parameters<OlPackage.Map['on']>[0];
export type OlViewOnEventType = Parameters<OlPackage.View['on']>[0];

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
}

export type OMapEventCallBack = (event: OMapEventTarget) => void