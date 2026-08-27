import { isString } from '../../../utils/index'
import type { EventIdType } from './type'

export function isValidEventId(id: EventIdType): boolean {
  return isString(id)
}

/**
 * 获取目标对象的构造函数名称
 * @param target 目标对象
 * @returns 构造函数名称或undefined
 */
export function getConstructorName(target: unknown): string | undefined {
  if ((typeof target !== 'object' && typeof target !== 'function') || target === null) {
    return undefined
  }
  const ctor = target.constructor
  return typeof ctor === 'function' ? ctor.name : undefined
}
