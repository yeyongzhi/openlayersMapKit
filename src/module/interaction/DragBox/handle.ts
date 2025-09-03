import { OMapDragBoxEventType } from "./type";
import DragBox from "./index";
import Pixel from '../../basic/Pixel/index'
import Lnglat from '../../basic/Lnglat/index'

interface OMapDragBoxEventTarget {
    target: DragBox;
    type: OMapDragBoxEventType;
    pixel?: Pixel;
    coordinate?: Lnglat;
}

export function handleDragBoxEvent(target: DragBox, type: OMapDragBoxEventType, e: any) {
    let result: OMapDragBoxEventTarget = {
        target,
        type,
        pixel: new Pixel(e.pixel[0], e.pixel[1]),
        coordinate: new Lnglat(e.coordinate[0], e.coordinate[1]),
    }
    return result
}