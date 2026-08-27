import {
  type OMapInteractionSelectEventType,
  type OlSelectEventPayloadType,
  type OMapSelectEvent
} from './type'
import Select from './index'

export function handleInteractionSelectEvent(
  target: Select,
  type: OMapInteractionSelectEventType,
  _e: OlSelectEventPayloadType
): OMapSelectEvent {
  let result: OMapSelectEvent = {
    target,
    type,
    selected: target.getSelected(),
    deselected: target.getDeselected()
  }
  return result
}
