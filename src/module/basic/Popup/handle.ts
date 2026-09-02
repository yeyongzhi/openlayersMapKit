import type Popup from './index'
import LngLat from '../../basic/LngLat/index'
import Pixel from '../../basic/Pixel/index'
import { type OMapPopupEventType } from './type'
import type { PropertiesType } from '../../../utils/type'
import type { OlCoordinateType } from '../LngLat/type'
import type { OlPixelType } from '../Pixel/type'
import type BaseEvent from 'ol/events/Event'

/**
 * 创建默认弹窗内容元素
 *
 * @param content 弹窗内容
 * @returns {HTMLElement} 弹窗内容元素
 * @todo 可以考虑加一个小箭头的样式
 */
export function createDefaultContentElement(content: string): HTMLElement {
  const div = document.createElement('div')
  div.className = 'omap-popup-default-element'
  div.innerHTML = content
  return div
}

export interface OMapPopupEventTarget {
  target: Popup
  type: OMapPopupEventType
  key?: string
  oldValue?: LngLat | string | HTMLElement | Pixel | PropertiesType
  newValue?: LngLat | string | HTMLElement | Pixel | PropertiesType
}

export type PopupEventChange =
  BaseEvent | Event | { key?: string; oldValue?: unknown; newValue?: unknown }

export function handlePopupEvent(
  target: Popup,
  type: OMapPopupEventType,
  e: PopupEventChange
): OMapPopupEventTarget {
  const key = 'key' in e && typeof e.key === 'string' ? e.key : undefined
  const oldValue = 'oldValue' in e ? e.oldValue : undefined
  const newValue = 'newValue' in e ? e.newValue : undefined
  const result: OMapPopupEventTarget = {
    target,
    type,
    key
  }
  switch (type) {
    case 'change:position':
      result.oldValue =
        oldValue === undefined ? undefined : new LngLat(oldValue as OlCoordinateType)
      result.newValue = target.getPosition()
      break
    case 'change:positioning':
      result.oldValue = oldValue as string
      result.newValue = target.getPositioning()
      break
    case 'change:element':
      result.oldValue = oldValue as HTMLElement
      result.newValue = target.getElement()
      break
    case 'change:offset':
      result.oldValue = oldValue === undefined ? undefined : new Pixel(oldValue as OlPixelType)
      result.newValue = target.getOffset()
      break
    case 'change:properties':
    case 'change:content':
      result.oldValue = oldValue as string | PropertiesType
      result.newValue = newValue as string | PropertiesType
      break
  }
  return result
}
