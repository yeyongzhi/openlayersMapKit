import { isDefined } from '../../../utils/define'
import type { OMapInteractionDragBoxEventType, OlDragBoxEventPayloadType, OMapDragBoxEvent, DragBoxEndEventFunctionType, DragBoxEndEvent } from "./type";
import DragBox from "./index";
import Pixel from '../../basic/Pixel/index'
import Lnglat from '../../basic/Lnglat/index'

export function handleInteractionDragBoxEvent(target: DragBox, type: OMapInteractionDragBoxEventType, e: OlDragBoxEventPayloadType): OMapDragBoxEvent {
    // 仅 DragBoxEvent（boxstart/boxdrag/boxend/boxcancel）携带 coordinate/mapBrowserEvent
    const mapBrowserEvent = 'mapBrowserEvent' in e ? e.mapBrowserEvent : undefined
    const coordinate = 'coordinate' in e ? e.coordinate : undefined
    let result: OMapDragBoxEvent = {
        target,
        type,
        // DragBoxEvent 本身不含 pixel，取其 mapBrowserEvent.pixel
        pixel: isDefined(mapBrowserEvent?.pixel) ? new Pixel(mapBrowserEvent.pixel) : undefined,
        coordinate: isDefined(coordinate) ? new Lnglat(coordinate) : undefined,
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
