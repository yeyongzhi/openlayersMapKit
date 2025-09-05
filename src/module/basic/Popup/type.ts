import { OlOverlay } from '../../../source/index'
import type { ManualOmit, OlCoordinateType } from '../../../utils/type'
import Lnglat from '../../basic/Lnglat/index'
import Pixel from '../../basic/Pixel/index'

export type OlPopupParamsType = ConstructorParameters<typeof OlOverlay>[0]
type CustOlPopupParamsType = ManualOmit<OlPopupParamsType,
    'offset' | 'position'
>
export type OMapPopupParamsType = CustOlPopupParamsType & {
    offset?: Pixel;
    position?: Lnglat | OlCoordinateType;
    properties?: Record<string, any>;
}
export type OlPopupInstanceType = InstanceType<typeof OlOverlay>

export const PopupPositioning = {
    bottomLeft: 'bottom-left',
    bottomCenter: 'bottom-center',
    bottomRight: 'bottom-right',
    centerBottom: 'center-bottom',
    centerCenter: 'center-center',
    centerTop: 'center-top',
    topLeft: 'top-left',
    topCenter: 'top-center',
    topRight: 'top-right',
} as const

export type PopupPositioningType = (typeof PopupPositioning)[keyof typeof PopupPositioning]
