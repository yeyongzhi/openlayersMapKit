import KeyboardZoom from './index';
import { type OMapInteractionKeyboardZoomEventType } from './type';
import { handleInteractionActiveChangeEvent, type InteractionPropertyChangeEvent } from '../handle'

export function handleInteractionKeyboardZoomEvent(
    target: KeyboardZoom,
    type: OMapInteractionKeyboardZoomEventType,
    e: InteractionPropertyChangeEvent
) {
    return handleInteractionActiveChangeEvent(target, type, e)
}
