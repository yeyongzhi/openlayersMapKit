import KeyboardZoom from './index';
import { type OMapInteractionKeyboardZoomEventType } from './type';
import { isDefined } from '../../../utils/define';

export function handleInteractionKeyboardZoomEvent(
    target: KeyboardZoom,
    type: OMapInteractionKeyboardZoomEventType,
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