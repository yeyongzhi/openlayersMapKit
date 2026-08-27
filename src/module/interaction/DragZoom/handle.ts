import DragZoom from './index'
import { type OMapInteractionDragZoomEventType } from './type'
import { handleInteractionActiveChangeEvent, type InteractionPropertyChangeEvent } from '../handle'

export function handleInteractionDragZoomEvent(
  target: DragZoom,
  type: OMapInteractionDragZoomEventType,
  e: InteractionPropertyChangeEvent
) {
  return handleInteractionActiveChangeEvent(target, type, e)
}
