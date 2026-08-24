import { isDefined } from '../../utils/define'
import type BaseEvent from 'ol/events/Event'
import type { ObjectEvent } from 'ol/Object'

export type InteractionPropertyChangeEvent =
  | BaseEvent
  | ObjectEvent
  | Event
  | { key?: string; oldValue?: unknown }

export type InteractionStateEvent<Target, EventType extends string> = {
  target: Target
  type: EventType
  key?: string
  oldValue?: unknown
  newValue?: boolean
  value?: boolean
}

type ActiveInteraction = {
  getActive(): boolean
}

export function handleInteractionActiveChangeEvent<
  Target extends ActiveInteraction,
  EventType extends string
>(
  target: Target,
  type: EventType,
  event: InteractionPropertyChangeEvent
): InteractionStateEvent<Target, EventType> {
  const key = 'key' in event && typeof event.key === 'string' ? event.key : undefined
  const oldValue = 'oldValue' in event ? event.oldValue : undefined
  const result: InteractionStateEvent<Target, EventType> = { target, type }
  if (isDefined(key)) {
    result.key = key
  }
  if (key === 'active') {
    if (isDefined(oldValue)) {
      result.oldValue = oldValue
      result.newValue = target.getActive()
    } else {
      result.value = target.getActive()
    }
  }
  return result
}
