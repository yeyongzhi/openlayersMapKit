import { isDefined } from '../../../utils/define'
import type { OMapInteractionDragBoxEventType, DragBoxEndEventFunctionType, DragBoxEndEvent } from "./type";
import DragBox from "./index";
import Pixel from '../../basic/Pixel/index'
import Lnglat from '../../basic/Lnglat/index'

interface OMapDragBoxEventTarget {
    target: DragBox;
    type: OMapInteractionDragBoxEventType;
    pixel?: Pixel;
    coordinate?: Lnglat;
}

export function handleInteractionDragBoxEvent(target: DragBox, type: OMapInteractionDragBoxEventType, e: any) {
    let result: OMapDragBoxEventTarget = {
        target,
        type,
        pixel: new Pixel(e.pixel),
        coordinate: new Lnglat(e.coordinate),
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