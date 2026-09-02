import type DragPan from './index'
import { type OMapInteractionDragPanEventType } from './type'
import { handleInteractionActiveChangeEvent, type InteractionPropertyChangeEvent } from '../handle'

export function handleInteractionDragPanEvent(
  target: DragPan,
  type: OMapInteractionDragPanEventType,
  e: InteractionPropertyChangeEvent
) {
  return handleInteractionActiveChangeEvent(target, type, e)
}
