import { isDefined } from '../../../utils/index'
import type { OMapDragBoxEventType, DragBoxEndEventFunctionType, DragBoxEndEvent } from "./type";
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

export const DragBoxParamsBoxEndHandle: {
    function: DragBoxEndEventFunctionType | null,
    initFunction: (e: DragBoxEndEventFunctionType) => void,
    emit: (e: DragBoxEndEvent) => void,
    destroy: () => void,
} = {
    function: null,
    initFunction: (e: DragBoxEndEventFunctionType) => {
        DragBoxParamsBoxEndHandle.function = e
    },
    emit: (e: DragBoxEndEvent) => {
        if(isDefined(DragBoxParamsBoxEndHandle.function)) {
            DragBoxParamsBoxEndHandle.function(e)
        }
    },
    destroy: () => {
        DragBoxParamsBoxEndHandle.function = null
    }
}