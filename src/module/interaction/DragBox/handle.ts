import { isDefined } from '../../../utils/define'
import type {
  OMapInteractionDragBoxEventType,
  OlDragBoxEventPayloadType,
  OMapDragBoxEvent,
  DragBoxEndEventFunctionType,
  DragBoxEndEvent
} from './type'
import type DragBox from './index'
import Pixel from '../../basic/Pixel/index'
import LngLat from '../../basic/LngLat/index'

export function handleInteractionDragBoxEvent(
  target: DragBox,
  type: OMapInteractionDragBoxEventType,
  e: OlDragBoxEventPayloadType
): OMapDragBoxEvent {
  // 仅 DragBoxEvent（boxstart/boxdrag/boxend/boxcancel）携带 coordinate/mapBrowserEvent
  const mapBrowserEvent = 'mapBrowserEvent' in e ? e.mapBrowserEvent : undefined
  const coordinate = 'coordinate' in e ? e.coordinate : undefined
  const result: OMapDragBoxEvent = {
    target,
    type,
    // DragBoxEvent 本身不含 pixel，取其 mapBrowserEvent.pixel
    pixel: isDefined(mapBrowserEvent?.pixel) ? new Pixel(mapBrowserEvent.pixel) : undefined,
    coordinate: isDefined(coordinate) ? new LngLat(coordinate) : undefined
  }
  return result
}

/** DragBox `onBoxEnd` 回调的持有者。 */
export type DragBoxEndEventHandler = {
  /** 注册结束回调 */
  initFunction: (e: DragBoxEndEventFunctionType) => void
  /** 触发结束回调 */
  emit: (e: DragBoxEndEvent) => void
  /** 清空结束回调 */
  destroy: () => void
}

/**
 * 创建 DragBox `onBoxEnd` 回调的持有者。
 *
 * 必须每个 DragBox 实例独立持有一份：若使用模块级单例，
 * 后创建的实例会覆盖前一个实例的回调，且任意一个实例销毁都会清空全部回调。
 *
 * @returns {DragBoxEndEventHandler} 独立的回调持有者
 */
export function createDragBoxParamsBoxEndHandle(): DragBoxEndEventHandler {
  let endFunction: DragBoxEndEventFunctionType | null = null
  return {
    initFunction: (e: DragBoxEndEventFunctionType) => {
      endFunction = e
    },
    emit: (e: DragBoxEndEvent) => {
      if (isDefined(endFunction)) {
        endFunction(e)
      }
    },
    destroy: () => {
      endFunction = null
    }
  }
}
