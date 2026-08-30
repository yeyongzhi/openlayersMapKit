import { OlGeometry, OlInteraction } from '../../../source/index'
import type { ManualOmit } from '../../../utils/type'
import { isString } from '../../../utils/dataType'
import type { SelectEvent } from 'ol/interaction/Select'
import type { ObjectEvent } from 'ol/Object'
import type BaseEvent from 'ol/events/Event'
import type Select from './index'
import VectorLayer from '../../layer/VectorLayer/index'
import BaseFeature from '../../core/Feature/BasicFeature/index'
import { type OMapStyleLike } from '../../basic/Style/type'
import {
  type OMapInteractionCommonParamsType,
  OMapInteractionCommonEventTypes
} from '../Interaction/type'

export type OlInteractionSelectParamsType = ConstructorParameters<typeof OlInteraction.Select>[0]
type CustOlSelectParamsType = ManualOmit<
  OlInteractionSelectParamsType,
  'layers' | 'style' | 'features' | 'filter'
>
export type OMapSelectParamsType = OMapInteractionCommonParamsType &
  CustOlSelectParamsType & {
    /** 限定可从哪些图层拾取要素；不传则对所有图层生效 */
    layers?: VectorLayer[]
    /** 选中要素时套用的样式 */
    style?: OMapStyleLike
    /**
     * 候选白名单：限定「可从哪些要素中选中」，不在列表内的要素不可选中。
     * 与 `layers` 正交（两者同时生效），且不同于 OpenLayers 同名选项
     * （OL 的 `features` 是存放选中结果的 collection）
     */
    features?: BaseFeature<OlGeometry.Geometry>[]
    /** 自定义过滤；返回 true 才允许选中。第二个参数为要素所属图层 */
    filter?: (feature: BaseFeature<OlGeometry.Geometry>, layer: VectorLayer) => boolean
  }

export type OMapSelectType = OlInteraction.Select
export type OlInteractionSelectInstanceType = InstanceType<typeof OlInteraction.Select>

/**
 * 选择交互事件类型
 * 这里的select类型，其实是包含了select和deselect两种动作
 */

export const OMapInteractionSelectEventTypes = [
  ...OMapInteractionCommonEventTypes,
  'select'
] as const
export type OMapInteractionSelectEventType = (typeof OMapInteractionSelectEventTypes)[number]

/**
 * OL 原生事件 payload：
 * select 为 `SelectEvent`，change/change:active/propertychange 为 `ObjectEvent`，error 为 `BaseEvent`
 */
export type OlSelectEventPayloadType = SelectEvent | ObjectEvent | BaseEvent

/**
 * OMap 用户回调收到的事件 payload
 */
export interface OMapSelectEvent {
  /** 事件类型 */
  type: OMapInteractionSelectEventType
  /** 触发事件的 Select 实例 */
  target: Select
  /** 当前选中的 Feature 列表（含本次新增） */
  selected: BaseFeature<OlGeometry.Geometry>[]
  /** 当前取消选中的 Feature 列表（含本次移除） */
  deselected: BaseFeature<OlGeometry.Geometry>[]
}

/** 事件名 → 用户回调参数映射 */
export type OMapSelectEventMap = Record<OMapInteractionSelectEventType, [OMapSelectEvent]>

export function isOMapInteractionSelectEventType(
  value: unknown
): value is OMapInteractionSelectEventType {
  return (
    isString(value) &&
    OMapInteractionSelectEventTypes.includes(value as OMapInteractionSelectEventType)
  )
}
