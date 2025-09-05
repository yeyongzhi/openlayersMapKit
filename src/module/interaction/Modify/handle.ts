import { OMapModifyEventType } from "./type";
import Modify from "./index";

interface OMapModifyEventTarget {
    target: Modify;
    type: OMapModifyEventType;
    mapBrowserEvent: any;
}

export function handleModifyEvent(target: Modify, type: OMapModifyEventType, e: any) {
    let result: OMapModifyEventTarget = {
        target,
        type,
        mapBrowserEvent: e.mapBrowserEvent
    }
    return result
}