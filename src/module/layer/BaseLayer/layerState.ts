import BaseLayer from './index'
import { type OMapBaseLayerCommonType } from './type'
import { type LayerGroupIdType } from '../LayerGroup/type'

interface layerStateType {
    groupId: LayerGroupIdType | null
}

export const layerState = new WeakMap<BaseLayer<OMapBaseLayerCommonType>, layerStateType>();
