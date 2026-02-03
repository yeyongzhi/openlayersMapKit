import LayerGroup from './index'
import { isNumber, isString } from '../../../utils/dataType'


export type LayerGroupIdType = number | string

export function isVaildGroupId(value: unknown): value is LayerGroupIdType {
    return isNumber(value) || isString(value);
}

export function isVaildLayerGroup(value: unknown): value is LayerGroup {
    return value instanceof LayerGroup;
}