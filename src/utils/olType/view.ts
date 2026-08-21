import type { OlCoordinateType } from '../../module/basic/Lnglat/type'
import Lnglat from '../../module/basic/Lnglat/index'

export interface OlAnimationOptions {
    center?: Lnglat | OlCoordinateType;
    zoom?: number;
    resolution?: number;
    rotation?: number;
    anchor?: Lnglat | OlCoordinateType;
    duration?: number;
    easing?: (t: number) => number;
}
