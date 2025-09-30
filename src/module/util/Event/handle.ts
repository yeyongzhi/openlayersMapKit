import { isNumber } from "../../../utils/index"

/**
 * 事件的唯一ID
 */
export type EventIdType = number

export function isValidEventId(id: EventIdType): boolean {
    return isNumber(id) && id > 0
}