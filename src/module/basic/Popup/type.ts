import { isString, isNumber } from '../../../utils/dataType'
import { OlOverlay } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import Lnglat from '../../basic/Lnglat/index'
import { type OlCoordinateType } from '../../basic/Lnglat/type'
import Pixel from '../../basic/Pixel/index'
import Popup from './index'

export type OMapPopupIdType = string | number
export function isVaildPopupId(value: unknown): value is OMapPopupIdType {
    return isString(value) || isNumber(value);
}

export type OlPopupParamsType = ConstructorParameters<typeof OlOverlay>[0]
type CustOlPopupParamsType = ManualOmit<OlPopupParamsType,
    'offset' | 'position' | 'positioning'
>

export function isVaildPopup(value: unknown): value is Popup {
    return value instanceof Popup;
}

export type OMapPopupParamsType = CustOlPopupParamsType & {
    offset?: Pixel;
    position?: Lnglat | OlCoordinateType;
    content?: string;
    properties?: Record<string, any>;
    positioning?: PopupPositioningType;
}
export type OMapPopupType = OlOverlay
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

export const OMapPupupEventTypes = [
    "change:position",
    "change:positioning",
    "change:element",
    "change:offset",
    "change:content",
    "change:properties",
] as const
export type OMapPopupEventType = typeof OMapPupupEventTypes[number] extends infer T
    ? T extends string
    ? T
    : never
    : never;

export function isOMapPopupEventType(
    value: unknown
): value is OMapPopupEventType {
    return (
        isString(value) &&
        OMapPupupEventTypes.includes(value as any)
    );
}
