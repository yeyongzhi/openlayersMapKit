import { type OlSource } from '../../../source/index'
import type Map from '../../core/Map/index'
import type Extent from '../../basic/Extent/index'
import { type OlExtentType } from '../../basic/Extent/type'
import type LngLat from '../../basic/LngLat/index'
import { type OlCoordinateType } from '../../basic/LngLat/type'
import type Size from '../../basic/Size/index'
import { type OlSizeType } from '../../basic/Size/type'
import { type OMapProjectionType } from '../../core/Projection/type'
import type { BaseLayerOptionsType, BaseLayerPropertiesType } from '../BaseLayer/type'

type OlWMTSOptions = ConstructorParameters<typeof OlSource.WMTS>[0]

export type OMapWMTSLayerParamsType<P extends BaseLayerPropertiesType = BaseLayerPropertiesType> =
  BaseLayerOptionsType<P> & {
    preload: number
    cacheSize: number
    source?: OMapWMTSLayerSourceParamsType // source参数是必须的
    map?: Map
  }
export const DEFAULT_WMTS_LAYER_PARAMS: OMapWMTSLayerParamsType = {
  preload: 0,
  cacheSize: 512
}
type OMapWMTSLayerRequestEncodingEnum = 'KVP' | 'REST'
export type OMapWMTSTileGridParamsType = {
  extent?: Extent | OlExtentType
  origin?: LngLat | OlCoordinateType
  origins?: Array<LngLat | OlCoordinateType>
  resolutions: number[]
  matrixIds: string[]
  sizes: Array<Size | OlSizeType>
  tileSize?: number | Size | OlSizeType
  tileSizes?: Array<number | Size | OlSizeType>
}
export type OMapWMTSLayerSourceParamsType = {
  attributions?: string | string[]
  attributionsCollapsible: boolean
  crossOrigin?: string | null
  interpolate: boolean
  tileGrid?: OMapWMTSTileGridParamsType
  projection: OMapProjectionType
  reprojectionErrorThreshold: number
  requestEncoding: OMapWMTSLayerRequestEncodingEnum
  layer: string
  style: string
  tileClass?: OlWMTSOptions['tileClass']
  tilePixelRatio: number
  format: string
  version: string
  matrixSet: string
  dimensions?: Record<string, string>
  url?: string
  tileLoadFunction?: OlWMTSOptions['tileLoadFunction']
  urls?: string[]
  wrapX: boolean
  transition: number
  zDirection: number
}
export const DEFAULT_WMTS_LAYER_SOURCE_PARAMS: OMapWMTSLayerSourceParamsType = {
  attributionsCollapsible: true,
  interpolate: true,
  projection: 'EPSG:3857',
  reprojectionErrorThreshold: 0.5,
  requestEncoding: 'KVP',
  layer: '',
  style: '',
  tilePixelRatio: 1,
  format: 'image/jpeg',
  version: '1.0.0',
  matrixSet: 'EPSG:3857',
  wrapX: true,
  transition: 250,
  zDirection: 0
}
