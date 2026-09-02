import { isArray, isDefined } from '../../../../utils/index'
import { commonMessage, error_, getPackageMessage, warn_ } from '../../../../utils/message'
import { OlUtil } from '../../../../source/index'
import BaseLayer from '../../../layer/BaseLayer/index'
import type { BaseLayerIdType, OMapBaseLayerCommonType } from '../../../layer/BaseLayer/type'
import type LayerGroup from '../../../layer/LayerGroup/index'
import {
  isValidGroupId,
  isValidLayerGroup,
  type LayerGroupIdType
} from '../../../layer/LayerGroup/type'
import type Map from '../index'
import type { OMapMapType } from '../type'

const createMessage = getPackageMessage('Map')
type ManagedLayer = BaseLayer<OMapBaseLayerCommonType>

/** Owns top-level Layer and business LayerGroup state for one Map. */
export default class LayerManager {
  private readonly layers: ManagedLayer[] = []
  private readonly layerGroups: LayerGroup[] = []

  constructor(
    private readonly owner: Map,
    private readonly getNativeMap: () => OMapMapType
  ) {}

  add(layer: ManagedLayer): void {
    if (!(layer instanceof BaseLayer)) {
      error_(createMessage('addLayer', commonMessage.paramsInvalidFormat('layer')))
    }
    const layerId = layer.getId()
    const exists = isDefined(layerId)
      ? isDefined(this.getById(layerId))
      : this.layers.some(
          (item) => OlUtil.getUid(item.getLayer()) === OlUtil.getUid(layer.getLayer())
        )
    if (exists) {
      warn_(createMessage('addLayer', '图层已存在'))
      return
    }

    this.layers.push(layer)
    if (!isDefined(layer.getTarget())) {
      layer.setTarget(this.owner)
    }
    this.getNativeMap().addLayer(layer.getLayer())
  }

  addMany(layers: ManagedLayer[]): void {
    this.validateLayerArray(layers, 'addLayers')
    layers.forEach((layer) => {
      if (layer instanceof BaseLayer) this.add(layer)
      else warn_(createMessage('addLayers', commonMessage.haveInvalidDataItem('layers')))
    })
  }

  getById(id: BaseLayerIdType): ManagedLayer | undefined {
    return this.layers.find((layer) => isDefined(layer.getId()) && layer.getId() === id)
  }

  getAll(): ManagedLayer[] {
    return [...this.layers]
  }

  remove(layer: ManagedLayer): void {
    if (!isDefined(layer)) {
      error_(createMessage('removeLayer', commonMessage.paramsNotDefined('layer')))
    }
    if (!(layer instanceof BaseLayer)) {
      error_(
        createMessage('removeLayer', commonMessage.paramsInvalidFormat('layer', 'BaseLayer实例'))
      )
    }
    const index = this.layers.indexOf(layer)
    if (index === -1) {
      warn_(createMessage('removeLayer', '图层不存在'))
      return
    }

    this.layers.splice(index, 1)
    layer.setTarget(null)
    this.getNativeMap().removeLayer(layer.getLayer())
  }

  removeMany(layers: ManagedLayer[]): void {
    this.validateLayerArray(layers, 'removeLayers')
    layers.forEach((layer) => {
      if (layer instanceof BaseLayer) this.remove(layer)
      else warn_(createMessage('removeLayers', commonMessage.haveInvalidDataItem('layers')))
    })
  }

  removeById(id: BaseLayerIdType): void {
    if (!isDefined(id)) {
      error_(createMessage('removeLayerById', commonMessage.paramsNotDefined('layerId')))
    }
    const layer = this.getById(id)
    if (!layer) {
      warn_(createMessage('removeLayerById', `找不到id为${id}的图层`))
      return
    }
    this.remove(layer)
  }

  addGroup(group: LayerGroup): void {
    this.validateGroup(group, 'addLayerGroup')
    const groupId = group.getId()
    const exists = isDefined(groupId)
      ? this.layerGroups.some((item) => isDefined(item.getId()) && item.getId() === groupId)
      : this.layerGroups.includes(group)
    if (exists) return

    group.setMap(this.owner)
    this.layerGroups.push(group)
    this.addMany(group.getAllLayers())
  }

  removeGroup(group: LayerGroup): void {
    this.validateGroup(group, 'removeLayerGroup')
    const groupId = group.getId()
    const index = isDefined(groupId)
      ? this.layerGroups.findIndex((item) => isDefined(item.getId()) && item.getId() === groupId)
      : this.layerGroups.indexOf(group)
    if (index === -1) {
      warn_(createMessage('removeLayerGroup', '图层组不存在'))
      return
    }

    group.setMap(null)
    this.removeMany(group.getAllLayers())
    this.layerGroups.splice(index, 1)
  }

  removeGroupById(id: LayerGroupIdType): void {
    this.validateGroupId(id)
    const group = this.layerGroups.find((candidate) => candidate.getId() === id)
    if (!group) {
      warn_(createMessage('removeLayerGroupById', '图层组不存在'))
      return
    }
    this.removeGroup(group)
  }

  getGroups(): LayerGroup[] {
    return [...this.layerGroups]
  }

  getGroupById(id: LayerGroupIdType): LayerGroup | null {
    this.validateGroupId(id)
    const group = this.layerGroups.find((candidate) => candidate.getId() === id)
    if (!group) {
      warn_(createMessage('getLayerGroupById', '未找到图层组'))
      return null
    }
    return group
  }

  clear(): void {
    ;[...this.layerGroups].forEach((group) => this.removeGroup(group))
    ;[...this.layers].forEach((layer) => this.remove(layer))
  }

  disposeAll(): void {
    ;[...this.layerGroups].forEach((group) => this.removeGroup(group))
    ;[...this.layers].forEach((layer) => layer.dispose())
  }

  private validateLayerArray(layers: ManagedLayer[], methodName: string): void {
    if (!isDefined(layers)) {
      error_(createMessage(methodName, commonMessage.paramsNotDefined('layers')))
    }
    if (!isArray(layers)) {
      error_(createMessage(methodName, commonMessage.paramsInvalidFormat('layers', '数组类型')))
    }
  }

  private validateGroup(group: LayerGroup, methodName: string): void {
    if (!isDefined(group)) {
      error_(createMessage(methodName, commonMessage.paramsNotDefined('layerGroup')))
    }
    if (!isValidLayerGroup(group)) {
      error_(
        createMessage(methodName, commonMessage.paramsInvalidFormat('layerGroup', 'LayerGroup实例'))
      )
    }
  }

  private validateGroupId(id: LayerGroupIdType): void {
    if (!isDefined(id)) {
      error_(createMessage('removeLayerGroupById', commonMessage.paramsNotDefined('groupId')))
    }
    if (!isValidGroupId(id)) {
      error_(
        createMessage(
          'removeLayerGroupById',
          commonMessage.paramsInvalidFormat('groupId', 'number或string类型')
        )
      )
    }
  }
}
