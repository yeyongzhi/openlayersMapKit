import type {
  OMapInteractionModifyEventType,
  OlModifyEventPayloadType,
  OMapModifyEvent
} from './type'
import Modify from './index'

export function handleModifyEvent(
  target: Modify,
  type: OMapInteractionModifyEventType,
  e: OlModifyEventPayloadType
): OMapModifyEvent {
  // 仅 ModifyEvent 携带 mapBrowserEvent 字段（change 系列事件没有）
  const mapBrowserEvent = 'mapBrowserEvent' in e ? e.mapBrowserEvent : undefined
  let result: OMapModifyEvent = {
    target,
    type,
    mapBrowserEvent
  }
  return result
}
