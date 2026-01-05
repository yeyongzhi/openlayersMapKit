import InteractionExtent from './index'
import type { OMapInteractionExtentEventType } from './type'
import { isDefined } from '../../../utils/define'
import Extent from '../../basic/Extent/index'

export function handleInteractionExtentEvent(target: InteractionExtent, type: OMapInteractionExtentEventType, e: any): {
    target: InteractionExtent,
    type: OMapInteractionExtentEventType,
    extent: Extent | null
} {
    return {
        target,
        type,
        extent: isDefined(e.extent) ? new Extent(e.extent) : null
    }
}