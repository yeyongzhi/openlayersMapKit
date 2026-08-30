import { OlSource } from '../../../source/index'
import Map from '../../core/Map/index'
import { type OMapSizeType } from '../../basic/Size/type'
import { type OMapProjectionType } from '../../core/Projection/type'
import type { BaseLayerOptionsType, BaseLayerPropertiesType } from '../BaseLayer/type'
import { type OMapTileSourceTileGrid } from '../../source/TileSource/type'

type OlXYZOptions = NonNullable<ConstructorParameters<typeof OlSource.XYZ>[0]>

export type OMapXYZLayerParamsType<P extends BaseLayerPropertiesType = BaseLayerPropertiesType> =
  BaseLayerOptionsType<P> & {
    preload: number
    cacheSize: number
    source?: OMapXYZLayerSourceParamsType // source参数是必须的
    map?: Map
  }
export const DEFAULT_XYZ_LAYER_PARAMS: OMapXYZLayerParamsType = {
  preload: 0,
  cacheSize: 512
}

export type OMapXYZLayerSourceParamsType = {
  attributions?: string | string[]
  attributionsCollapsible: boolean
  cacheSize?: number
  crossOrigin?: string | null
  interpolate: boolean
  projection: OMapProjectionType
  reprojectionErrorThreshold: number
  maxZoom: number
  minZoom: number
  maxResolution?: number
  tileGrid?: OMapTileSourceTileGrid
  tilePixelRatio: number
  tileSize: OMapSizeType
  gutter: number
  tileUrlFunction?: OlXYZOptions['tileUrlFunction']
  url?: string
  urls?: string[]
  wrapX: boolean
  transition: number
  zDirection: number
}
export const DEFAULT_XYZ_LAYER_SOURCE_PARAMS: OMapXYZLayerSourceParamsType = {
  attributionsCollapsible: true,
  interpolate: true,
  projection: 'EPSG:3857',
  reprojectionErrorThreshold: 0.5,
  maxZoom: 42,
  minZoom: 0,
  tilePixelRatio: 1,
  tileSize: [256, 256],
  gutter: 0,
  wrapX: true,
  transition: 250,
  zDirection: 0
}
export type OlXYZSourceInstanceType = InstanceType<typeof OlSource.XYZ>
