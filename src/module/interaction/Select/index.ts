import { isDefined, isFunction, isString, isArray } from '../../../utils/index'
import { warn_, error_, getPackageMessage, commonMessage } from '../../../utils/message'
import BaseFeature from '../../core/Feature/BasicFeature/index'
import Style from '../../basic/Style/index'
import Interaction from '../Interaction/index'
import { type EventIdType } from '../../util/Event/type'
import type VectorLayer from '../../layer/VectorLayer/index'
import { type OMapVectorLayerType } from '../../layer/VectorLayer/type'
import type { OlStyleInstanceType, OMapStyleLike } from '../../basic/Style/type'
import type { OlFeatureLike } from '../../core/Feature/BasicFeature/type'
import {
  createBaseFeatureByOlFeature,
  createBaseFeatureByOlRenderFeature
} from '../../core/Feature/BasicFeature/handle'
import { OlGeometry, OlFeature, OlInteraction, OlUtil, OlEvent } from '../../../source/index'
import {
  type OMapSelectParamsType,
  type OMapInteractionSelectEventType,
  type OMapSelectType,
  type OMapSelectEvent,
  type OMapSelectEventMap,
  type OlSelectEventPayloadType,
  isOMapInteractionSelectEventType
} from './type'
import Event from '../../util/Event/index'
import { handleInteractionSelectEvent } from './handle'

const PACKAGE_NAME = 'Select'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 地图选择类
 * @class Select
 * @classdesc 允许用户通过选择地图上的元素
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/17
 * @updateDate 2025/12/29
 */

const defaultSelectOptions = {
  layers: undefined,
  style: undefined,
  multi: false, // 当为true的时候，支持一次选择n个重叠的要素
  features: undefined,
  filter: undefined,
  hitTolerance: 0
}

export default class Select extends Interaction<OMapSelectType> {
  /** 收窄交互事件总线类型（构造器中以具体事件映射实例化） */
  declare events: Event<OMapSelectEventMap>
  protected layers: VectorLayer[] = []
  protected features: BaseFeature<OlGeometry.Geometry>[] = []

  /**
   * 最近一次选择变化中**新增选中**的要素（增量，非当前全量）。
   * 当前全量选中集合请用 {@link Select.getSelection}
   * @type {BaseFeature<OlGeometry.Geometry>[]}
   */
  selected: BaseFeature<OlGeometry.Geometry>[] = []
  /**
   * 最近一次选择变化中**被取消选中**的要素（增量）。
   * @type {BaseFeature<OlGeometry.Geometry>[]}
   */
  deselected: BaseFeature<OlGeometry.Geometry>[] = []

  constructor(params?: OMapSelectParamsType) {
    const {
      id,
      active,
      layers: inputLayers,
      features,
      style,
      filter,
      ...selectOptions
    } = params || {}
    super('Select', { id })
    let layers: OMapVectorLayerType[] = []
    if (isDefined(inputLayers)) {
      this.layers = inputLayers
      layers = inputLayers.map((l) => l.getLayer())
    }
    // features 是「候选白名单」，与 layers 正交：
    // layers 限定可从哪些图层拾取，features 限定可从哪些要素拾取，两者同时生效而非互相覆盖。
    if (isDefined(features)) {
      this.features = this.normalizeFeatures(features, 'constructor')
    }
    this._interaction = new OlInteraction.Select(
      Object.assign({}, defaultSelectOptions, {
        ...selectOptions,
        layers: layers.length ? layers : undefined,
        style: this.initStyle(style),
        filter: this.initFilter(filter)
      })
    )
    // 注册事件
    this.initInteractionEvent(active)
    this.events = new Event<OMapSelectEventMap>(this)
    this.initSelectEvent()
  }

  /**
   * 初始化样式
   * @param {OMapStyleLike | undefined} style 样式
   */
  protected initStyle(
    style: OMapStyleLike | undefined
  ):
    | OlStyleInstanceType
    | Array<OlStyleInstanceType>
    | ((
        feature: OlFeatureLike,
        resolution: number
      ) => OlStyleInstanceType | Array<OlStyleInstanceType> | undefined)
    | undefined {
    let _style:
      | OlStyleInstanceType
      | Array<OlStyleInstanceType>
      | ((
          feature: OlFeatureLike,
          resolution: number
        ) => OlStyleInstanceType | Array<OlStyleInstanceType> | undefined)
      | undefined = undefined
    if (isDefined(style)) {
      if (style instanceof Style) {
        _style = style.getStyle()
      } else if (isArray(style) && (style as Style[]).every((s) => s instanceof Style)) {
        _style = (style as Style[]).map((s) => s.getStyle() as OlStyleInstanceType)
      } else if (isFunction(style)) {
        _style = (feature: OlFeatureLike, resolution: number) => {
          const targetFeature = this.getTargetFeature(feature)
          const styleFn = style as (
            feature: BaseFeature<OlGeometry.Geometry> | null,
            resolution: number
          ) => Style | Array<Style> | undefined
          const styleFnResult = styleFn(targetFeature ?? null, resolution)
          if (!styleFnResult) return undefined
          return Array.isArray(styleFnResult)
            ? styleFnResult.map((s) => s.getStyle() as OlStyleInstanceType)
            : styleFnResult.getStyle()
        }
      } else {
        warn_(createMessage('initStyle', 'style格式有误'))
      }
    }
    return _style
  }

  protected initFilter(
    filter: ((feature: BaseFeature<OlGeometry.Geometry>, layer: VectorLayer) => boolean) | undefined
  ): ((feature: OlFeatureLike, layer: OMapVectorLayerType) => boolean) | undefined {
    if (isDefined(filter) || this.features.length) {
      return (feature: OlFeatureLike, layer: OMapVectorLayerType) => {
        const targetFeature = this.getTargetFeature(feature)
        if (!targetFeature) {
          return false
        }
        // 候选白名单优先：不在 features 中的要素一律不可选中
        if (this.features.length && !this.hasFeature(this.features, targetFeature)) {
          return false
        }
        if (!isDefined(filter)) {
          return true
        }
        let targetLayer = this.layers.find(
          (candidate) => OlUtil.getUid(candidate.getLayer()) === OlUtil.getUid(layer)
        )
        targetLayer ??= this.map
          ?.getAllLayers()
          .find((candidate) => OlUtil.getUid(candidate.getLayer()) === OlUtil.getUid(layer)) as
          VectorLayer | undefined
        if (!targetLayer) {
          return false
        }
        return filter(targetFeature, targetLayer)
      }
    } else {
      return undefined
    }
  }

  /**
   * 初始化Select事件
   */
  protected initSelectEvent() {
    const key = this._interaction.on('select', (e) => {
      const { selected, deselected } = e
      this.selected = selected
        .map((s) => {
          return this.getTargetFeature(s) as BaseFeature<OlGeometry.Geometry> | null
        })
        .filter((f) => f !== null)
      this.deselected = deselected
        .map((d) => {
          return this.getTargetFeature(d) as BaseFeature<OlGeometry.Geometry> | null
        })
        .filter((f) => f !== null)
    })
    this.trackLifecycleEvent(key)
  }

  protected getTargetFeature(feature: OlFeatureLike): BaseFeature<OlGeometry.Geometry> | null {
    // 统一走 resolver（Feature/Hit-test 场景可能是原生 Feature 或 RenderFeature），
    // 保证与 VectorSource 共用同一 wrapper 身份，免去逐层 getFeatures() 扫描。
    const wrapper =
      feature instanceof OlFeature
        ? createBaseFeatureByOlFeature(feature)
        : createBaseFeatureByOlRenderFeature(feature)
    return (wrapper as BaseFeature<OlGeometry.Geometry>) ?? null
  }

  /**
   * 校验并归一化为 Feature 数组
   * @param {BaseFeature<OlGeometry.Geometry> | BaseFeature<OlGeometry.Geometry>[]} features 单个要素或要素数组
   * @param {string} methodName 调用方方法名，用于错误信息定位
   * @returns {BaseFeature<OlGeometry.Geometry>[]} 归一化后的要素数组
   */
  protected normalizeFeatures(
    features: BaseFeature<OlGeometry.Geometry> | BaseFeature<OlGeometry.Geometry>[],
    methodName: string
  ): BaseFeature<OlGeometry.Geometry>[] {
    const targets = isArray(features) ? features : [features]
    targets.forEach((feature) => {
      if (!(feature instanceof BaseFeature)) {
        error_(
          createMessage(
            methodName,
            commonMessage.paramsInvaildFormat('features', 'Feature或Feature数组')
          )
        )
      }
    })
    return targets
  }

  /**
   * 以原生 Feature 身份判断 wrapper 是否已存在于列表中
   * @param {BaseFeature<OlGeometry.Geometry>[]} list 待查找列表
   * @param {BaseFeature<OlGeometry.Geometry>} feature 目标要素
   * @returns {boolean} 是否命中
   */
  protected hasFeature(
    list: BaseFeature<OlGeometry.Geometry>[],
    feature: BaseFeature<OlGeometry.Geometry>
  ): boolean {
    const native = feature.getFeature()
    return list.some((item) => item.getFeature() === native)
  }

  /**
   * 将要素记入「新增选中」增量，并从「取消选中」增量中移除
   * @param {BaseFeature<OlGeometry.Geometry>[]} features 本次新增选中的要素
   */
  protected appendSelected(features: BaseFeature<OlGeometry.Geometry>[]): void {
    features.forEach((feature) => {
      const native = feature.getFeature()
      if (!this.hasFeature(this.selected, feature)) {
        this.selected.push(feature)
      }
      const index = this.deselected.findIndex((item) => item.getFeature() === native)
      if (index !== -1) {
        this.deselected.splice(index, 1)
      }
    })
  }

  /**
   * 将要素记入「取消选中」增量，并从「新增选中」增量中移除
   * @param {BaseFeature<OlGeometry.Geometry>[]} features 本次取消选中的要素
   */
  protected appendDeselected(features: BaseFeature<OlGeometry.Geometry>[]): void {
    features.forEach((feature) => {
      const native = feature.getFeature()
      if (!this.hasFeature(this.deselected, feature)) {
        this.deselected.push(feature)
      }
      const index = this.selected.findIndex((item) => item.getFeature() === native)
      if (index !== -1) {
        this.selected.splice(index, 1)
      }
    })
  }

  /**
   * 获取最近一次选择变化中新增选中的要素（增量）
   * @returns {BaseFeature<OlGeometry.Geometry>[]} 新增选中的要素
   */
  getSelected(): BaseFeature<OlGeometry.Geometry>[] {
    return this.selected
  }

  /**
   * 获取最近一次选择变化中被取消选中的要素（增量）
   * @returns {BaseFeature<OlGeometry.Geometry>[]} 取消选中的要素
   */
  getDeselected(): BaseFeature<OlGeometry.Geometry>[] {
    return this.deselected
  }

  /**
   * 获取候选白名单（构造时 `features` 选项指定的可选要素集合）
   * @returns {BaseFeature<OlGeometry.Geometry>[]} 候选要素数组，未设置时为空数组
   */
  getFeatures(): BaseFeature<OlGeometry.Geometry>[] {
    return this.features
  }

  /**
   * 设置候选白名单，替换原有集合
   * @param {BaseFeature<OlGeometry.Geometry> | BaseFeature<OlGeometry.Geometry>[]} features 单个要素或要素数组
   */
  setFeatures(
    features: BaseFeature<OlGeometry.Geometry> | BaseFeature<OlGeometry.Geometry>[]
  ): void {
    this.features = this.normalizeFeatures(features, 'setFeatures')
  }

  /**
   * 获取当前全部选中的 OMap Feature（以原生 collection 为唯一数据源）
   * @returns {BaseFeature<OlGeometry.Geometry>[]} 当前选中的要素
   */
  getSelection(): BaseFeature<OlGeometry.Geometry>[] {
    return this._interaction
      .getFeatures()
      .getArray()
      .map((feature) => this.getTargetFeature(feature))
      .filter(isDefined)
  }

  /**
   * 主动选择一个或多个 Feature（幂等，不重复加入原生 collection），并同步选中增量
   * @param {BaseFeature<OlGeometry.Geometry> | BaseFeature<OlGeometry.Geometry>[]} features 单个要素或要素数组
   */
  select(features: BaseFeature<OlGeometry.Geometry> | BaseFeature<OlGeometry.Geometry>[]): void {
    const targets = this.normalizeFeatures(features, 'select')
    const collection = this._interaction.getFeatures()
    const added: BaseFeature<OlGeometry.Geometry>[] = []
    targets.forEach((feature) => {
      const nativeFeature = feature.getFeature()
      if (!collection.getArray().includes(nativeFeature)) {
        collection.push(nativeFeature)
        added.push(feature)
      }
    })
    this.appendSelected(added)
  }

  /**
   * 主动取消一个或多个 Feature 的选择状态，并同步取消增量
   * @param {BaseFeature<OlGeometry.Geometry> | BaseFeature<OlGeometry.Geometry>[]} features 单个要素或要素数组
   */
  deselect(features: BaseFeature<OlGeometry.Geometry> | BaseFeature<OlGeometry.Geometry>[]): void {
    const targets = this.normalizeFeatures(features, 'deselect')
    const collection = this._interaction.getFeatures()
    const removed: BaseFeature<OlGeometry.Geometry>[] = []
    targets.forEach((feature) => {
      if (isDefined(collection.remove(feature.getFeature()))) {
        removed.push(feature)
      }
    })
    this.appendDeselected(removed)
  }

  /**
   * 清空当前选中集合，并把原选中要素记入取消增量
   */
  clearSelection(): void {
    const current = this.getSelection()
    this._interaction.getFeatures().clear()
    this.selected = []
    this.deselected = []
    this.appendDeselected(current)
  }

  /**
   * 访问 OpenLayers Select 使用的原生 Feature collection
   * @returns 原生选中要素集合
   */
  getFeaturesCollection(): ReturnType<OMapSelectType['getFeatures']> {
    return this._interaction.getFeatures()
  }

  on(type: OMapInteractionSelectEventType, callback: (e: OMapSelectEvent) => void): EventIdType {
    this.validateEvent(type, callback, 'on')
    return this.subscribeEvent(type, callback, (e) =>
      handleInteractionSelectEvent(this, type, e as OlSelectEventPayloadType)
    )
  }

  once(type: OMapInteractionSelectEventType, callback: (e: OMapSelectEvent) => void): EventIdType {
    this.validateEvent(type, callback, 'once')
    return this.subscribeEvent(
      type,
      callback,
      (e) => handleInteractionSelectEvent(this, type, e as OlSelectEventPayloadType),
      true
    )
  }

  protected validateEvent(
    type: OMapInteractionSelectEventType,
    callback: (e: OMapSelectEvent) => void,
    methodName: string
  ) {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(createMessage(methodName, commonMessage.paramsNotDefined('type or callback')))
    }
    if (!isOMapInteractionSelectEventType(type)) {
      error_(createMessage(methodName, commonMessage.paramsInvaildEnum(type)))
    }
    if (!isFunction(callback)) {
      error_(createMessage(methodName, commonMessage.paramsInvaildFormat('callback', 'function')))
    }
  }

  un(id: EventIdType) {
    if (!isDefined(id)) {
      error_(createMessage('un', commonMessage.paramsNotDefined(id)))
    }
    if (!isString(id)) {
      error_(createMessage('un', commonMessage.paramsInvaildFormat(id, 'EventIdType')))
    }
    this.events.remove(id)
  }
}
