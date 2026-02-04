import DragZoom from './index';
import { type OMapInteractionDragZoomEventType } from './type';
import { isDefined } from '../../../utils/define';

export function handleInteractionDragZoomEvent(
    target: DragZoom,
    type: OMapInteractionDragZoomEventType,
    e: any
) {
    const { key, oldValue } = e;
    let obj: Record<string, any> = {
        target,
        type,
    }
    if(isDefined(key)) {
        obj.key = key;
    }
    if(key === 'active') {
        if(isDefined(oldValue)) {
            obj.oldValue = oldValue;
            obj.newValue = target.getActive();
        } else {
            obj.value = target.getActive();
        }
    }
    return obj
}