import Control from './index'
import { OlControl } from '../../../source/index'
import { isString } from '../../../utils/index'
import type BaseEvent from 'ol/events/Event'

export type OMapControlTypeType = 'Zoom' | 'FullScreen'
export type OMapControlIdType = string | number | null

/**
 * 控件支持的原生事件类型。
 * OpenLayers 的 `Control` 继承 `Observable`，对外仅派发 `change` 与 `error` 两类事件。
 */
export const OMapControlEventTypes = ['change', 'error'] as const

export type OMapControlEventType = (typeof OMapControlEventTypes)[number]

export function isOMapControlEventType(value: unknown): value is OMapControlEventType {
  return isString(value) && (OMapControlEventTypes as readonly string[]).includes(value)
}

/**
 * 控件事件映射：事件类型 → 回调参数列表。
 * 供 {@link Event} 泛型使用，使 `on/once` 的回调参数能被推导为原生事件对象。
 */
export type OMapControlEventMap = Record<OMapControlEventType, [BaseEvent]>

export function isVaildControl(value: unknown): value is Control<OlControl.Control> {
  return value instanceof Control
}

export type OMapControlCommonType = OlControl.Control
