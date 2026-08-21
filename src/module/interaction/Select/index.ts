import { isDefined, isFunction, isString, isArray } from '../../../utils/index'
import { warn_, error_, getPackageMessage, commonMessage } from '../../../utils/message'
import BaseFeature from '../../core/Feature/BasicFeature/index'
import Style from '../../basic/Style/index'
import Interaction from '../Interaction/index'
import { type EventIdType } from '../../util/Event/type'
import VectorLayer from '../../layer/VectorLayer/index'
import { type OMapVectorLayerType } from '../../layer/VectorLayer/type'
import type { OlStyleInstanceType, OMapStyleLike } from '../../basic/Style/type'
import type { OlFeatureInstanceType, OlFeatureLike } from '../../core/Feature/BasicFeature/type'
import { OlGeometry, OlFeature, OlInteraction, OlUtil, OlEvent } from '../../../source/index'
import {
  type OMapSelectParamsType,
  type OMapInteractionSelectEventType,
  type OMapSelectType,
  isOMapInteractionSelectEventType
} from './type'
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
  protected layers: VectorLayer[] = []
  protected features: BaseFeature<OlGeometry.Geometry>[] = []

  /**
   * 当前选择的要素
   */
  selected: BaseFeature<OlGeometry.Geometry>[] = []
  /**
   * 当前未选择的要素
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
    // layers的优先级低于features
    if (isDefined(inputLayers)) {
      this.layers = inputLayers
      layers = inputLayers.map((l) => l.getLayer())
    }
    if (isDefined(features)) {
      this.features = features
      this.layers = []
    }
    this._interaction = new OlInteraction.Select(
      Object.assign({}, defaultSelectOptions, {
        ...selectOptions,
        layers: layers.length ? layers : undefined,
        style: this.initStyle(style),
        filter: this.initFilter(filter)
      })
    )
    if (isDefined(active)) {
      this._interaction.setActive(active)
    }
    // 注册事件
    this.initInteractionEvent()
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
    | ((feature: OlFeatureLike, resolution: number) => OlStyleInstanceType | undefined)
    | undefined {
    let _style:
      | OlStyleInstanceType
      | Array<OlStyleInstanceType>
      | ((feature: OlFeatureLike, resolution: number) => OlStyleInstanceType | undefined)
      | undefined = undefined
    if (isDefined(style)) {
      if (style instanceof Style) {
        _style = style.getStyle()
      } else if (isArray(style) && (style as Style[]).every((s) => s instanceof Style)) {
        _style = (style as Style[]).map((s) => s.getStyle() as OlStyleInstanceType)
      } else if (isFunction(style)) {
        _style = (feature: OlFeatureLike, resolution: number) => {
          let targetFeature = this.getTargetFeature(feature)
          let styleFnResult = (style as Function)(targetFeature, resolution)
          return styleFnResult ? styleFnResult.getStyle() : undefined
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
        let targetFeature = this.getTargetFeature(feature)
        if (!targetFeature) {
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
    if (this.layers.length) {
      for (const layer of this.layers) {
        const target =
          feature instanceof OlFeature
            ? layer.getFeatureByOlFeature(feature as OlFeatureInstanceType)
            : this.findLayerFeatureByUid(layer, OlUtil.getUid(feature))
        if (target) {
          return target
        }
      }
      return null
    }
    if (!this.features.length && this.map) {
      for (const layer of this.map.getAllLayers()) {
        if (!(layer instanceof VectorLayer)) {
          continue
        }
        const target =
          feature instanceof OlFeature
            ? layer.getFeatureByOlFeature(feature as OlFeatureInstanceType)
            : this.findLayerFeatureByUid(layer, OlUtil.getUid(feature))
        if (target) {
          return target
        }
      }
      return null
    }
    const id = OlUtil.getUid(feature)
    return (
      this.features.find((feature) => {
        return OlUtil.getUid(feature.getFeature()) === id
      }) || null
    )
  }

  protected findLayerFeatureByUid(
    layer: VectorLayer,
    uid: string
  ): BaseFeature<OlGeometry.Geometry> | undefined {
    return layer.getFeatures().find((feature) => {
      return OlUtil.getUid(feature.getFeature()) === uid
    })
  }

  getSelected(): BaseFeature<OlGeometry.Geometry>[] {
    return this.selected
  }

  getDeselected(): BaseFeature<OlGeometry.Geometry>[] {
    return this.deselected
  }

  /** 返回原生 Select collection 当前持有的全部 OMap Feature。 */
  getSelection(): BaseFeature<OlGeometry.Geometry>[] {
    return this._interaction
      .getFeatures()
      .getArray()
      .map((feature) => this.getTargetFeature(feature))
      .filter(isDefined)
  }

  /** 主动选择一个或多个 Feature，不重复加入原生 collection。 */
  select(features: BaseFeature<OlGeometry.Geometry> | BaseFeature<OlGeometry.Geometry>[]): void {
    const targets = isArray(features) ? features : [features]
    const collection = this._interaction.getFeatures()
    targets.forEach((feature) => {
      if (!(feature instanceof BaseFeature)) {
        error_(
          createMessage(
            'select',
            commonMessage.paramsInvaildFormat('features', 'Feature或Feature数组')
          )
        )
      }
      const nativeFeature = feature.getFeature()
      if (!collection.getArray().includes(nativeFeature)) {
        collection.push(nativeFeature)
      }
    })
  }

  /** 主动取消一个或多个 Feature 的选择状态。 */
  deselect(features: BaseFeature<OlGeometry.Geometry> | BaseFeature<OlGeometry.Geometry>[]): void {
    const targets = isArray(features) ? features : [features]
    const collection = this._interaction.getFeatures()
    targets.forEach((feature) => {
      if (!(feature instanceof BaseFeature)) {
        error_(
          createMessage(
            'deselect',
            commonMessage.paramsInvaildFormat('features', 'Feature或Feature数组')
          )
        )
      }
      collection.remove(feature.getFeature())
    })
  }

  /** 清空当前选择 collection。 */
  clearSelection(): void {
    this._interaction.getFeatures().clear()
  }

  /** 访问 OpenLayers Select 使用的原生 Feature collection。 */
  getFeaturesCollection() {
    return this._interaction.getFeatures()
  }

  on(type: OMapInteractionSelectEventType, callback: () => void): EventIdType {
    this.validateEvent(type, callback, 'on')
    const unlisten = OlEvent.listen(this._interaction, type, (e: any) => {
      this.events.emit(type, handleInteractionSelectEvent(this, type, e))
    })
    const id = this.events.on(type, callback, unlisten)
    return id
  }

  once(type: OMapInteractionSelectEventType, callback: () => void): EventIdType {
    this.validateEvent(type, callback, 'once')
    const unlisten = OlEvent.listen(this._interaction, type, (e: any) => {
      this.events.emit(type, handleInteractionSelectEvent(this, type, e))
    })
    const id = this.events.once(type, callback, unlisten)
    return id
  }

  protected validateEvent(
    type: OMapInteractionSelectEventType,
    callback: () => void,
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
