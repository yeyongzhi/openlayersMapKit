import { isDefined, isNumber, isString } from '../../../utils/index'
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type { LayerGroupIdType } from './type'
import BaseLayer from '../BaseLayer'
import type Map from '../../core/Map/index'
import { OlUtil } from '../../../source/index'
import type { OMapBaseLayerCommonType } from '../BaseLayer/type'

type LayerGroupLayer = BaseLayer<OMapBaseLayerCommonType>

const PACKAGE_NAME = 'LayerGroup'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 */

export default class LayerGroup {
  /**
   * 图层组id
   *
   * @type {IdType}
   */
  id: LayerGroupIdType | null = null
  private _layers: LayerGroupLayer[] = []
  map: Map | null = null

  constructor(layers: LayerGroupLayer[])
  /**
   * 图层组构造函数
   *
   * @param {LayerGroupIdType} id 图层组id，最好是填一个
   * @param layers 图层数组
   */
  constructor(id: LayerGroupIdType | null, layers: LayerGroupLayer[])

  constructor(idOrLayers: LayerGroupIdType | null | LayerGroupLayer[], layers?: LayerGroupLayer[]) {
    if (!isDefined(idOrLayers)) {
      error_(createMessage('constructor', '参数不能为空'))
      return
    }
    let initialLayers: LayerGroupLayer[] = layers ?? []
    if (isNumber(idOrLayers) || isString(idOrLayers)) {
      this.id = idOrLayers as LayerGroupIdType
    } else {
      initialLayers = idOrLayers as LayerGroupLayer[]
    }
    const validLayers = initialLayers.filter((item: LayerGroupLayer) => {
      return isDefined(item) && isDefined(item.getLayer()) && item instanceof BaseLayer
    })
    if (validLayers.length !== initialLayers.length) {
      warn_(createMessage('constructor', '图层参数错误，必须为BaseLayer实例，已进行过滤'))
    }
    this._layers = validLayers
    validLayers.forEach((item: LayerGroupLayer) => {
      item.groupId = this.id
    })
  }

  /**
   * 添加图层
   *
   * @param {BaseLayer} layer 图层实例
   */
  add(layer: LayerGroupLayer): void {
    if (!isDefined(layer)) {
      warn_(createMessage('add', '参数layer不能为空'))
      return
    }
    if (!(layer instanceof BaseLayer)) {
      warn_(createMessage('add', '参数layer必须为BaseLayer实例'))
      return
    }
    const isExits: boolean = this._layers.some((item: LayerGroupLayer) => {
      return OlUtil.getUid(item.getLayer()) === OlUtil.getUid(layer.getLayer())
    })
    if (isExits) {
      warn_(createMessage('add', '图层已存在'))
      return
    }
    this._layers.push(layer)
    layer.groupId = this.id
    if (isDefined(this.map)) {
      this.map.addLayer(layer)
    }
  }

  remove(layer: LayerGroupLayer): void {
    if (!isDefined(layer)) {
      warn_(createMessage('remove', '参数layer不能为空'))
      return
    }
    if (!(layer instanceof BaseLayer)) {
      warn_(createMessage('remove', '参数layer必须为BaseLayer实例'))
      return
    }
    const index: number = this._layers.findIndex((item: LayerGroupLayer) => {
      return OlUtil.getUid(item.getLayer()) === OlUtil.getUid(layer.getLayer())
    })
    if (index === -1) {
      warn_(createMessage('remove', '图层不存在'))
      return
    }
    this._layers.splice(index, 1)
    layer.groupId = null
    if (isDefined(this.map)) {
      this.map.removeLayer(layer)
    }
  }

  removeById(id: LayerGroupIdType) {
    if (!isDefined(id)) {
      warn_(createMessage('removeById', '参数id不能为空'))
      return
    }
    const index = this._layers.findIndex((item: LayerGroupLayer) => {
      return isDefined(item.getId()) && item.getId() === id
    })
    if (index === -1) {
      warn_(createMessage('remove', '图层不存在'))
      return
    }
    const layer = this._layers[index]
    layer.groupId = null
    if (isDefined(this.map)) {
      this.map.removeLayer(layer)
    }
    this._layers.splice(index, 1)
  }

  clear() {
    if (isDefined(this.map)) {
      this.map.removeLayers(this._layers)
    }
    this._layers.forEach((layer) => {
      layer.groupId = null
    })
    this._layers = []
  }

  getAllLayers(): LayerGroupLayer[] {
    return this._layers
  }

  getAll(): LayerGroupLayer[] {
    return this._layers
  }

  getId(): LayerGroupIdType | null {
    return this.id
  }

  setMap(map: Map | null) {
    this.map = map
  }
}
