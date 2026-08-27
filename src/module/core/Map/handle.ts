import { isDefined, isString } from '../../../utils/index'
import {
  type OMapEventType,
  type OMapEventTarget,
  OMapMapEventTypes,
  type OlMapEventPayload,
  type OlMapEventPayloadFields
} from './type'
import Lnglat from '../../basic/Lnglat/index'
import { type OlCoordinateType } from '../../basic/Lnglat/type'
import Pixel from '../../basic/Pixel/index'
import Map from './index'
import Interaction from '../../interaction/Interaction/index'
import { type OMapInteractionCommonType } from '../../interaction/Interaction/type'
import Draw from '../../interaction/Draw/index'
import Measure from '../../interaction/Measure/index'

export function MapEventTypeIsMap(type: OMapEventType): boolean {
  return type && type.startsWith('map:')
}

export function handleMapOnCallBack(target: Map, type: OMapEventType, e: OlMapEventPayload) {
  let result: OMapEventTarget | null = {
    target,
    type
  }
  if (!isDefined(e)) return result
  const payload = e as OlMapEventPayloadFields
  switch (type) {
    case 'map:click':
    case 'map:singleclick':
    case 'map:dbclick':
      if (isDefined(payload.pixel)) {
        result.pixel = new Pixel(payload.pixel as OlCoordinateType)
      }
      if (isDefined(payload.coordinate)) {
        result.coordinate = new Lnglat(payload.coordinate as OlCoordinateType)
      }
      break
    case 'map:propertychange':
      if (isDefined(payload.oldValue))
        result.oldValue =
          payload.key === 'center'
            ? new Lnglat(payload.oldValue as OlCoordinateType)
            : payload.oldValue
      if (payload.key === 'size') {
        result.newValue = isDefined(payload.newValue) ? payload.newValue : target.getSize()
      } else {
        result.newValue = payload.newValue
      }
      result.key = payload.key
      break
    case 'map:moveend':
      if (isDefined(payload.oldCenter))
        result.oldValue = new Lnglat(payload.oldCenter as OlCoordinateType)
      result.newValue = isDefined(payload.newCenter)
        ? new Lnglat(payload.newCenter as OlCoordinateType)
        : target.getCenter()
      break
    case 'view:change:resolution':
      if (isDefined(payload.oldValue)) result.oldValue = payload.oldValue
      result.newValue = isDefined(payload.newValue) ? payload.newValue : target.getResolution()
      break
    case 'view:change:center':
      if (isDefined(payload.oldValue))
        result.oldValue = new Lnglat(payload.oldValue as OlCoordinateType)
      result.newValue = isDefined(payload.newValue)
        ? new Lnglat(payload.newValue as OlCoordinateType)
        : target.getCenter()
      break
    case 'view:change:rotation':
      if (isDefined(payload.oldValue)) result.oldValue = payload.oldValue
      result.newValue = isDefined(payload.newValue) ? payload.newValue : target.getRotation()
      break
    case 'view:propertychange':
      if (isDefined(payload.oldValue))
        result.oldValue =
          payload.key === 'center'
            ? new Lnglat(payload.oldValue as OlCoordinateType)
            : payload.oldValue
      if (payload.key === 'center') {
        result.newValue = isDefined(payload.newValue)
          ? new Lnglat(payload.newValue as OlCoordinateType)
          : target.getCenter()
      } else if (payload.key === 'rotation') {
        result.newValue = isDefined(payload.newValue) ? payload.newValue : target.getRotation()
      } else if (payload.key === 'resolution') {
        result.newValue = isDefined(payload.newValue) ? payload.newValue : target.getResolution()
      } else {
        result.newValue = payload.newValue
      }
      result.key = payload.key
      break
    default:
      break
  }
  return result
}

export function isOMapMapEventType(type: unknown): type is OMapEventType {
  return isString(type) && OMapMapEventTypes.includes(type as OMapEventType)
}

/**
 * 判断地图是否正在绘制
 * @param mapInteractions 地图交互事件
 * @returns {boolean} 是否正在绘制
 */
export function isMapDrawing(
  mapInteractions: Array<Interaction<OMapInteractionCommonType>>
): boolean {
  return mapInteractions.some((interaction) => {
    return isDefined(interaction) && interaction instanceof Draw && interaction.getActive()
  })
}

/**
 * 判断地图是否正在测量
 * @param mapInteractions 地图交互事件
 * @returns {boolean} 是否正在测量
 */
export function isMapMeasuring(
  mapInteractions: Array<Interaction<OMapInteractionCommonType>>
): boolean {
  return mapInteractions.some((interaction) => {
    return isDefined(interaction) && interaction instanceof Measure && interaction.getActive()
  })
}
