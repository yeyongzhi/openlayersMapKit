import { OMapInteractionModifyEventType } from "./type";
import Modify from "./index";

interface OMapModifyEventTarget {
    target: Modify;
    type: OMapInteractionModifyEventType;
    mapBrowserEvent: any;
}

export function handleModifyEvent(target: Modify, type: OMapInteractionModifyEventType, e: any) {
    let result: OMapModifyEventTarget = {
        target,
        type,
        mapBrowserEvent: e.mapBrowserEvent
    }
    return result
}