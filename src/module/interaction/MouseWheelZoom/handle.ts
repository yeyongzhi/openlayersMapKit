import MouseWheelZoom from './index';
import { type OMapInteractionMouseWheelZoomEventType } from './type';
import { handleInteractionActiveChangeEvent, type InteractionPropertyChangeEvent } from '../handle'

export function handleInteractionMouseWheelZoomEvent(
    target: MouseWheelZoom,
    type: OMapInteractionMouseWheelZoomEventType,
    e: InteractionPropertyChangeEvent
) {
    return handleInteractionActiveChangeEvent(target, type, e)
}
