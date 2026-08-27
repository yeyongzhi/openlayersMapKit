import Link from './index'
import { type OMapInteractionLinkEventType } from './type'
import { handleInteractionActiveChangeEvent, type InteractionPropertyChangeEvent } from '../handle'

export function handleInteractionLinkEvent(
  target: Link,
  type: OMapInteractionLinkEventType,
  e: InteractionPropertyChangeEvent
) {
  return handleInteractionActiveChangeEvent(target, type, e)
}
