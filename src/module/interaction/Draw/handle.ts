import { OlDrawCreateBox } from '../../../source/index'
import type { GeometryFunction } from 'ol/interaction/Draw'
import type {
  OMapDrawModeType,
  OlDrawType,
  OMapInteractionDrawEventType,
  OlDrawEventPayloadType,
  OMapDrawEvent
} from './type'
import { OlGeometry } from '../../../source/index'
import Draw from './index'
import { isDefined } from '../../../utils/define'
import BasicFeature from '../../core/Feature/BasicFeature/index'

export function getOlDrawType(mode: OMapDrawModeType): {
  type: OlDrawType
  geometryFunction: GeometryFunction | undefined
} {
  let type: OlDrawType = 'Point'
  let geometryFunction: GeometryFunction | undefined = undefined
  switch (mode) {
    case 'Point':
    case 'LineString':
    case 'Polygon':
      type = mode
      break
    case 'Circle':
      type = 'Circle'
      break
    case 'Rectangle':
      type = 'Circle'
      geometryFunction = OlDrawCreateBox()
      break
  }
  return { type, geometryFunction }
}

export function handleInteractionDrawEvent(
  target: Draw,
  type: OMapInteractionDrawEventType,
  e: OlDrawEventPayloadType
): OMapDrawEvent {
  const layer = target.getLayer()
  let layerFeatures: BasicFeature<OlGeometry.Geometry>[] = []
  if (isDefined(layer)) {
    layerFeatures = layer.getFeatures() ?? []
  }
  // 仅 DrawEvent 携带 feature 字段（change 系列事件没有）
  const feature = 'feature' in e ? e.feature : undefined
  let targetFeature: BasicFeature<OlGeometry.Geometry> | null = null
  if (isDefined(feature)) {
    targetFeature = layer?.getFeatureByOlFeature(feature) || null
  }
  return {
    type,
    target,
    features: layerFeatures,
    feature: targetFeature
  }
}
