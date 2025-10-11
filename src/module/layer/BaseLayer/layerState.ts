import BaseLayer from './index'
import { type LayerGroupIdType } from '../LayerGroup/type'

interface layerStateType {
    groupId: LayerGroupIdType | null
}

export const layerState = new WeakMap<BaseLayer, layerStateType>();
