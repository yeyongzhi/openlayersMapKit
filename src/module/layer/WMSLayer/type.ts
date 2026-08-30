import { OlSource } from '../../../source/index'
import Map from '../../core/Map/index'
import { type OMapProjectionType } from '../../core/Projection/type'
import type { BaseLayerOptionsType, BaseLayerPropertiesType } from '../BaseLayer/type'
import { type OMapTileSourceTileGrid } from '../../source/TileSource/type'

type OlTileWMSOptions = NonNullable<ConstructorParameters<typeof OlSource.TileWMS>[0]>
export type OMapWMSParams = Record<string, unknown>

export type OMapWMSLayerParamsType<P extends BaseLayerPropertiesType = BaseLayerPropertiesType> =
  BaseLayerOptionsType<P> & {
    preload: number
    cacheSize: number
    source?: OMapWMSLayerSourceParamsType // source参数是必须的
    map?: Map
  }
export const DEFAULT_WMS_LAYER_PARAMS: OMapWMSLayerParamsType = {
  preload: 0,
  cacheSize: 512
}
type OMapWMSLayerServerTypeEnum = 'mapserver' | 'geoserver' | 'carmentaserver' | 'qgis'
export type OMapWMSLayerSourceParamsType = {
  attributions?: string | string[]
  attributionsCollapsible: boolean
  crossOrigin?: string | null
  interpolate: boolean
  params: OMapWMSParams
  gutter: number
  hidpi: boolean
  projection: OMapProjectionType
  reprojectionErrorThreshold: number
  tileClass?: OlTileWMSOptions['tileClass']
  tileGrid?: OMapTileSourceTileGrid
  serverType?: OMapWMSLayerServerTypeEnum
  tileLoadFunction?: OlTileWMSOptions['tileLoadFunction']
  url?: string
  urls?: string[]
  wrapX: boolean
  transition: number
  zDirection: number
}
export const DEFAULT_WMS_LAYER_SOURCE_PARAMS: OMapWMSLayerSourceParamsType = {
  attributionsCollapsible: true,
  interpolate: true,
  params: {},
  hidpi: true,
  projection: 'EPSG:3857',
  reprojectionErrorThreshold: 0.5,
  gutter: 0,
  wrapX: true,
  transition: 250,
  zDirection: 0
}
