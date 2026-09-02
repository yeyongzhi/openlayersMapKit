import {
  type OMapInteractionSelectEventType,
  type OlSelectEventPayloadType,
  type OMapSelectEvent
} from './type'
import type Select from './index'

export function handleInteractionSelectEvent(
  target: Select,
  type: OMapInteractionSelectEventType,
  _e: OlSelectEventPayloadType
): OMapSelectEvent {
  const result: OMapSelectEvent = {
    target,
    type,
    selected: target.getSelected(),
    deselected: target.getDeselected()
  }
  return result
}
