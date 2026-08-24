import OlPackage, { OlEasing, OlLayer } from '../../../source/index'
import { type ManualOmit } from '../../../utils/type'
import { getDevicePixelRatio } from '../../../utils/handle'
import Projection from '../../core/Projection/index'
import Interaction from '../../interaction/Interaction/index'
import { type OMapInteractionCommonType } from '../../interaction/Interaction/type'
import MouseWheelZoom from '../../interaction/MouseWheelZoom/index'
import DoubleClickZoom from '../../interaction/DoubleClickZoom/index'
import DragPan from '../../interaction/DragPan/index'
import Popup from '../../basic/Popup/index'
import Pixel from '../../basic/Pixel/index'
import Lnglat from '../../basic/Lnglat/index'
import { type OMapCoordinateType } from '../../basic/Lnglat/type'
import { type OMapExtentType } from '../../basic/Extent/type'
import { type OMapSizeType } from '../../basic/Size/type'
import BaseLayer from '../../layer/BaseLayer/index'
import type { OMapBaseLayerCommonType } from '../../layer/BaseLayer/type'
import Control from '../../control/Control/index'
import type BaseEvent from 'ol/events/Event'
import type Map from './index'
import type { Coordinate } from '../../../source/index'

/** View */
export type OMapViewType = OlPackage.View
export type OlViewInstanceType = InstanceType<typeof OlPackage.View>
export type OlViewOptionsType = ConstructorParameters<typeof OlPackage.View>[0]
type OlViewOptionsTypeKeysToOmit = 'center' | 'extent' | 'projection'
type OlViewOptionsOmitType = ManualOmit<OlViewOptionsType, OlViewOptionsTypeKeysToOmit>
type CustomerOlViewOptionsType = {
  projection: Projection | string
  center: OMapCoordinateType
  extent: OMapExtentType
}
export type OlViewOptionsFinalType = OlViewOptionsOmitType & CustomerOlViewOptionsType

/** Map */
export type OMapMapType = OlPackage.Map
export type OlMapInstanceType = InstanceType<typeof OlPackage.Map>
export type OMapElementType = string | HTMLElement | HTMLDivElement // 容器类型，支持字符串、HTMLElement、HTMLDivElement
export type OlMapOptionsType = ConstructorParameters<typeof OlPackage.Map>[0]
type OlMapOptionsTypeKeysToOmit =
  'layers' | 'controls' | 'interactions' | 'overlays' | 'target' | 'view'

export type OlMapOptionsOmitType = ManualOmit<OlMapOptionsType, OlMapOptionsTypeKeysToOmit> // 可行

export type CustomerOlMapOptionsType = {
  layers: Array<BaseLayer<OMapBaseLayerCommonType>>
  controls: Array<Control>
  interactions: Array<Interaction<OMapInteractionCommonType>> // 地图的默认交互列表
  popups: Array<Popup>
  view?: OlViewOptionsFinalType
  target?: HTMLElement | string
}
export type OMapOptionsType = OlMapOptionsOmitType & CustomerOlMapOptionsType

/**
 * 地图的默认交互
 */
export function createDefaultMapInteractions(): Array<Interaction<OMapInteractionCommonType>> {
  return [
    new MouseWheelZoom({ id: 'omap_default_mousewheelzoom' }),
    new DoubleClickZoom({ id: 'omap_default_doubleclickzoom' }),
    new DragPan({ id: 'omap_default_dragpan' })
  ]
}

/**
 * 地图的默认弹窗列表
 */
const defaultMapPopups: Popup[] = []

export const defaultMapOptions: OMapOptionsType = {
  pixelRatio: getDevicePixelRatio(),
  layers: [],
  controls: [],
  interactions: [],
  popups: defaultMapPopups
}
export const OMapMapEventTypes = [
  'map:change:size',
  'map:click',
  'map:dbclick',
  'map:error',
  'map:loadend',
  'map:loadstart',
  'map:moveend',
  'map:movestart',
  'map:pointerdrag',
  'map:pointermove',
  'map:postcompose',
  'map:postrender',
  'map:precompose',
  'map:propertychange',
  'map:rendercomplete',
  'map:singleclick',
  'view:change',
  'view:change:center',
  'view:change:resolution',
  'view:change:rotation',
  'view:error',
  'view:propertychange'
] as const
export const OMapMapInteractionIgnoreEventTypes = ['map:click', 'map:dbclick', 'map:singleclick']
export type OMapEventType = (typeof OMapMapEventTypes)[number]

export type OMapEventTarget = {
  target: Map
  type: OMapEventType
  oldValue?: unknown
  newValue?: unknown
  pixel?: Pixel
  coordinate?: Lnglat
  key?: string
}

export type OlMapEventPayloadFields = {
  pixel?: Coordinate
  coordinate?: Coordinate
  key?: string
  oldValue?: unknown
  newValue?: unknown
  oldCenter?: Coordinate
  newCenter?: Coordinate
}

export type OlMapEventPayload = BaseEvent | Event | OlMapEventPayloadFields

export type OMapEventCallBack = (event: OMapEventTarget) => void
export type OlMapOnEventType = Parameters<OlPackage.Map['on']>[0]
export type OlViewOnEventType = Parameters<OlPackage.View['on']>[0]

export type OMapForEachFeatureAtPixelOptionsType = {
  layerFilter?: (layer: BaseLayer<OlLayer.Vector>) => boolean
  hitTolerance: number
  checkWrapped: boolean
}
export const DEFAULT_OMAP_FOREACHFEATURE_AT_PIXEL_OPTIONS: OMapForEachFeatureAtPixelOptionsType = {
  hitTolerance: 0,
  checkWrapped: true
}

export const OMapEasing = {
  linear: OlEasing.linear,
  easeIn: OlEasing.easeIn,
  easeOut: OlEasing.easeOut,
  inAndOut: OlEasing.inAndOut,
  upAndDown: OlEasing.upAndDown
}

export type OMapViewAnimateOptionsType = {
  center?: OMapCoordinateType
  resolution?: number
  rotation?: number
  zoom?: number
  anchor?: OMapCoordinateType
  duration: number
  easing: keyof typeof OMapEasing // TODO：这里还有个参数t时间
}
export const OMAP_VIEW_ANIMATE_DEFAULT_OPTIONS = {
  duration: 1000,
  easing: 'linear'
}
export type OMapViewFitOptionsType = {
  size?: OMapSizeType
  padding: number[]
  nearest: boolean
  minResolution: number
  maxZoom?: number
  duration: number
  easing: keyof typeof OMapEasing
  callback?: () => void
}
export const OMAP_VIEW_FIT_DEFAULT_OPTIONS: OMapViewFitOptionsType = {
  padding: [0, 0, 0, 0],
  nearest: false,
  minResolution: 0,
  duration: 1000,
  easing: 'inAndOut',
  size: undefined
}
