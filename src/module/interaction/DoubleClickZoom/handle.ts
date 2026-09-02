import type DoubleClickZoom from './index'
import { type OMapInteractionDoubleClickZoomEventType } from './type'
import { handleInteractionActiveChangeEvent, type InteractionPropertyChangeEvent } from '../handle'

export function handleInteractionDoubleClickZoomEvent(
  target: DoubleClickZoom,
  type: OMapInteractionDoubleClickZoomEventType,
  e: InteractionPropertyChangeEvent
) {
  return handleInteractionActiveChangeEvent(target, type, e)
}
