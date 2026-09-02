import { type OlInteraction } from '../../../source/index'
import Interaction from './index'
import type { OlDrawInstanceType, OMapDrawType } from '../Draw/type'
import type { OlDragBoxInstanceType, OMapDragBoxType } from '../DragBox/type'
import type { OlDragPanInstanceType, OMapDragPanType } from '../DragPan/type'
import type { OlInteractionExtentInstanceType, OMapInteractionExtentType } from '../Extent/type'
import type { OlModifyInstanceType, OMapModifyType } from '../Modify/type'
import type { OlInteractionSelectInstanceType, OMapSelectType } from '../Select/type'
import type { OlInteractionLinkInstanceType, OMapLinkType } from '../Link/type'
import type {
  OlInteractionMouseWheelZoomInstanceType,
  OMapMouseWheelZoomType
} from '../MouseWheelZoom/type'
import type {
  OlInteractionDoubleClickZoomInstanceType,
  OMapDoubleClickZoomType
} from '../DoubleClickZoom/type'
import type {
  OlInteractionKeyboardZoomInstanceType,
  OMapKeyboardZoomType
} from '../KeyboardZoom/type'
import { type OMapDragZoomType } from '../DragZoom/type'

export type OMapInteractionIdType = string | number | null
/**
 * 交互类通用参数
 */
export type OMapInteractionCommonParamsType = {
  /**
   * 交互实例id
   */
  id?: OMapInteractionIdType
  /**
   * 交互是否激活
   */
  active?: boolean
}

/**
 * 交互类通用参数默认值
 */
export const OMAP_INTERACTION_DEFAULT_PARAMS: OMapInteractionCommonParamsType = {
  active: false
}

export type OMapInteractionCommonType = OlInteraction.Interaction
export type OMapInteractionTypeEnum =
  | 'Draw'
  | 'DragBox'
  | 'DragPan'
  | 'InteractionExtent'
  | 'Extent'
  | 'Modify'
  | 'Measure'
  | 'Select'
  | 'Link'
  | 'MouseWheelZoom'
  | 'DoubleClickZoom'
  | 'KeyboardZoom'
  | 'DragZoom'
export type OMapInteractionType =
  | OMapDrawType
  | OMapDragBoxType
  | OMapDragPanType
  | OMapInteractionExtentType
  | OMapInteractionExtentType
  | OMapModifyType
  | OMapSelectType
  | OMapLinkType
  | OMapMouseWheelZoomType
  | OMapDoubleClickZoomType
  | OMapKeyboardZoomType
  | OMapDragZoomType
export type OlInteractionInstanceType =
  | OlDrawInstanceType
  | OlDragBoxInstanceType
  | OlDragPanInstanceType
  | OlInteractionExtentInstanceType
  | OlModifyInstanceType
  | OlInteractionSelectInstanceType
  | OlInteractionLinkInstanceType
  | OlInteractionMouseWheelZoomInstanceType
  | OlInteractionDoubleClickZoomInstanceType
  | OlInteractionKeyboardZoomInstanceType

export const OMapInteractionCommonEventTypes = [
  'change',
  'change:active',
  'error',
  'propertychange'
] as const

export function isValidInteraction<T extends OMapInteractionCommonType>(
  value: unknown
): value is Interaction<T> {
  return value instanceof Interaction
}
