import { OMapInteractionSelectEventType } from './type'
import Select from './index'

export function handleInteractionSelectEvent(target: Select, type: OMapInteractionSelectEventType, e: any) {
    let result = {
        target,
        type,
        selected: target.getSelected(),
        deselected: target.getDeselected(),
    }
    return result
}
