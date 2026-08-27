import type { EventsKey } from 'ol/events'

export interface EventItem<T extends readonly unknown[] = readonly unknown[]> {
  id: string
  target?: unknown
  type?: string
  // 方法签名（而非函数属性）：参数按方法双变规则比较，
  // 使 Event<具体事件映射> 可赋值给基类持有的默认泛型 Event
  callback(...args: T): void
  once?: boolean
  unlisten?: OMapEventsKeyType
}

export type EventIdType = EventItem['id']

export type OMapEventsKeyType = EventsKey | EventsKey[] | (() => void)
