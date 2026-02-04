import MouseWheelZoom from './index';
import { type OMapInteractionMouseWheelZoomEventType } from './type';
import { isDefined } from '../../../utils/define';

export function handleInteractionMouseWheelZoomEvent(
    target: MouseWheelZoom,
    type: OMapInteractionMouseWheelZoomEventType,
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