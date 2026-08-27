import InteractionExtent from './index'
import type {
  OMapInteractionExtentEventType,
  OlExtentEventPayloadType,
  OMapExtentEvent
} from './type'
import { isDefined } from '../../../utils/define'
import Extent from '../../basic/Extent/index'

export function handleInteractionExtentEvent(
  target: InteractionExtent,
  type: OMapInteractionExtentEventType,
  e: OlExtentEventPayloadType
): OMapExtentEvent {
  // 仅 ExtentEvent 携带 extent 字段（change 系列事件没有）
  const extent = 'extent' in e ? e.extent : undefined
  return {
    target,
    type,
    extent: isDefined(extent) ? new Extent(extent) : null
  }
}
