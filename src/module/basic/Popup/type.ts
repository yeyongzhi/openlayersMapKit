import { OlOverlay } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import Lnglat from '../../basic/Lnglat/index'
import { type OlCoordinateType } from '../../basic/Lnglat/type'
import Pixel from '../../basic/Pixel/index'

export type OlPopupParamsType = ConstructorParameters<typeof OlOverlay>[0]
type CustOlPopupParamsType = ManualOmit<OlPopupParamsType,
    'offset' | 'position' | 'positioning'
>
export type OMapPopupParamsType = CustOlPopupParamsType & {
    offset?: Pixel;
    position?: Lnglat | OlCoordinateType;
    content?: string;
    properties?: Record<string, any>;
    positioning?: PopupPositioningType;
}
export type OlPopupInstanceType = InstanceType<typeof OlOverlay>

export const PopupPositioning = {
    bottomLeft: 'bottom-left',
    bottomCenter: 'bottom-center',
    bottomRight: 'bottom-right',
    centerLeft: 'center-left',
    centerCenter: 'center-center',
    centerRight: 'center-right',
    topLeft: 'top-left',
    topCenter: 'top-center',
    topRight: 'top-right',
} as const
export function isVaildPopupPositioningType(type: string): type is PopupPositioningType {
    return Object.values(PopupPositioning).includes(type as PopupPositioningType)
}
export type PopupPositioningType = (typeof PopupPositioning)[keyof typeof PopupPositioning]

export const DEFAULT_POPUP_PARAMS: OMapPopupParamsType = {
    offset: new Pixel(0, 0),
    positioning: PopupPositioning.bottomCenter,
    stopEvent: true,
    insertFirst: true,
    autoPan: false,
    className: 'omap-popup-element',
}

type OlOverlayEventType = "change:position" | "change:positioning" | "change:element" | "change:offset"

export function isOlOverlayEventType(type: string): type is OlOverlayEventType {
    return ["change:position", "change:positioning", "change:element", "change:offset"].includes(type)
}
export type OMapPopupEventType = OlOverlayEventType |"change:content" | "change:properties"