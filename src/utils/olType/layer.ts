import { type OlLayer } from '../../source/index'
import type Color from '../../module/basic/Color/index'
import type Extent from '../../module/basic/Extent/index'
import type Map from '../../module/core/Map/index'
import type { XYZSourceOptionsFinalType } from './source'
import type { PropertiesType } from '../type'

export type OlTileLayerInstanceType = InstanceType<typeof OlLayer.Tile>
export type OlVectorLayerInstanceType = InstanceType<typeof OlLayer.Vector>
export type OlImageLayerInstanceType = InstanceType<typeof OlLayer.Image>
export type OlHeatmapLayerInstanceType = InstanceType<typeof OlLayer.Heatmap>

/** ol原生全部类型图层实例 */
export type OlAllLayerInstanceType =
  | OlTileLayerInstanceType
  | OlVectorLayerInstanceType
  | OlImageLayerInstanceType
  | OlHeatmapLayerInstanceType

/** BaseLayer */
export type BaseLayerType = 'Tile' | 'Image' | 'Vector' | 'Gaode' | 'Tdt'
export type BaseLayerIdType = number | string | null | undefined
// 此处的BaseLayerOptionsType 继承 ol.layer.Base全部属性，并增加 id 和 name
export type BaseLayerOptionsType = {
  id?: BaseLayerIdType // 图层id，用于区分图层，默认使用uuid
  name?: string // 图层名称，用于显示在图层控制栏中，默认使用图层id
  className?: string
  opacity?: number
  visible?: boolean
  extent?: Extent
  zIndex?: number
  minResolution?: number
  maxResolution?: number
  minZoom?: number
  maxZoom?: number
  background?: Color | undefined
  properties?: PropertiesType
}

export type BaseLayerEventType = {
  key: string
  oldValue?: number | string | boolean
  target: OlAllLayerInstanceType // ol.layer
  type: string
}

/** TileLayer */

// BseLayer —> BaseTileLayer
// 这里的BaseTileLayer也可以继承于ol.layer.BaseTile
export type BaseTileLayerOptionsType = {
  preload?: number // defaultValue: 0
  map?: Map
  useInterimTilesOnError?: boolean // defaultValue: true
  cacheSize?: number // defaultValue: 512
  source?: XYZSourceOptionsFinalType
}
export const OlBaseTileLayerDefaultOptions: BaseTileLayerOptionsType = {
  preload: 0,
  useInterimTilesOnError: true,
  cacheSize: 512
}
// export type OlTileLayerOptionsType = ConstructorParameters<typeof OlLayer.Tile>[0];
// export type CustOlTileLayerOptionsType = ManualOmit<OlTileLayerOptionsType, 'map' | 'source'>
export type OMapTileLayerOptionsFinalType = BaseLayerOptionsType & BaseTileLayerOptionsType
