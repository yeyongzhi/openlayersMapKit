import { isDefined, isFunction } from '../../../utils/index'
import { error_, getPackageMessage } from '../../../utils/index'
import { commonMessage } from '../../../utils/message'
import type { OlCoordinateType, OMapCoordinateType } from '../../basic/Lnglat/type'
import type { OMapBasicFeatureCoordinatesType } from '../../core/Feature/BasicFeature/type'
import { getCurrentDateTime } from '../../../utils/handle'
import { OlInteraction, OlUtil, OlGeometry, OlEvent, OlFeature } from '../../../source/index'
import Interaction from '../Interaction/index'
import VectorLayer from '../../layer/VectorLayer/index'
import BasicFeature from '../../core/Feature/BasicFeature/index'
import type { EventIdType } from '../../util/Event/type'
import { type OMapVectorSourceType } from '../../layer/VectorLayer/type'
import {
  type OMapModifyParamsType,
  type OMapInteractionModifyEventType,
  type ModifyRecordItem,
  type SampleRecordItem,
  isOMapInteractionModifyEventType,
  type OMapModifyType,
  type OMapModifyEvent,
  type OMapModifyEventMap,
  type OlModifyEventPayloadType
} from './type'
import Event from '../../util/Event/index'
import { handleModifyEvent } from './handle'
import { handleGetLnglatValue } from '../../basic/Lnglat/handle'

const PACKAGE_NAME = 'Modify'
const createMessage = getPackageMessage(PACKAGE_NAME)

/**
 * 修改类
 * @class Modify
 * @classdesc 修改类
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/4
 * @updateDate 2026/1/7
 */

const defaultModifyOptions = {
  condition: undefined,
  deleteCondition: undefined,
  insertVertexCondition: undefined,
  pixelTolerance: 10,
  style: undefined,
  source: undefined,
  hitDetection: undefined,
  features: undefined,
  wrapX: false,
  snapToPointer: false
}

export default class Modify extends Interaction<OMapModifyType> {
  /** 收窄交互事件总线类型（构造器中以具体事件映射实例化） */
  declare events: Event<OMapModifyEventMap>
  records: Array<ModifyRecordItem> = []

  constructor(params: OMapModifyParamsType) {
    if (!isDefined(params)) {
      error_(createMessage('init', commonMessage.paramsNotDefined('params')))
    }
    const { id, active, layer, ...modifyOptions } = params
    super('Modify', { id })
    let modify_source: OMapVectorSourceType | null = null
    if (!isDefined(layer)) {
      error_(createMessage('init', 'layer参数不能为空'))
    }
    if (isDefined(layer) && !(layer instanceof VectorLayer)) {
      error_(createMessage('init', 'layer参数不属于VectorLayer类型'))
    }
    this.layer = layer as VectorLayer
    modify_source = (layer as VectorLayer).getSource() as OMapVectorSourceType
    let _params = Object.assign({}, defaultModifyOptions, {
      ...modifyOptions,
      source: modify_source
    })
    this._interaction = new OlInteraction.Modify(_params)
    if (isDefined(active)) {
      this._interaction.setActive(active)
    }
    this.initInteractionEvent()
    this.events = new Event<OMapModifyEventMap>(this)
    // 初始化Modify事件
    this._initModifyEvent()
  }

  protected _initModifyEvent() {
    this.pushRecord((this.layer as VectorLayer).getFeatures())
    const key = this._interaction.on('modifyend', (e) => {
      const modifiedFeatures = e.features
        .getArray()
        .map((feature: OlFeature<OlGeometry.Geometry>) => this.findFeatureByOlFeature(feature))
        .filter(isDefined)
      this.pushRecord(modifiedFeatures)
    })
    this.trackLifecycleEvent(key)
  }

  protected createSnapshot(features: BasicFeature<OlGeometry.Geometry>[]): SampleRecordItem[] {
    return features.map((feature) => {
      return {
        id: feature.getId(),
        originFeatureId: OlUtil.getUid(feature.getFeature()),
        type: feature.type,
        coordinates: feature.getCoordinates() as OMapBasicFeatureCoordinatesType
      }
    })
  }

  protected pushRecord(features: BasicFeature<OlGeometry.Geometry>[]) {
    this.records.push({
      time: getCurrentDateTime(),
      features: this.createSnapshot(features),
      version: this.records.length + 1
    })
  }

  protected findFeatureByOlFeature(
    feature: OlFeature<OlGeometry.Geometry>
  ): BasicFeature<OlGeometry.Geometry> | undefined {
    return (this.layer as VectorLayer).getFeatureByOlFeature(feature)
  }

  protected findFeatureByRecord(
    record: SampleRecordItem
  ): BasicFeature<OlGeometry.Geometry> | undefined {
    return (this.layer as VectorLayer).getFeatures().find((item) => {
      if (isDefined(record.id)) {
        return record.id === item.id
      }
      return OlUtil.getUid(item.getFeature()) === record.originFeatureId
    })
  }

  protected restoreSnapshot(features: Array<BasicFeature<OlGeometry.Geometry> | SampleRecordItem>) {
    features.forEach((feature) => {
      const record = feature as SampleRecordItem
      const target = this.findFeatureByRecord(record)
      if (isDefined(target)) {
        target.setCoordinates(record.coordinates)
      }
    })
  }

  canInsertPoint(): boolean {
    return this._interaction.canInsertPoint()
  }

  canRemovePoint(): boolean {
    return this._interaction.canRemovePoint()
  }

  /**
   * 插入一个点
   * @param {OMapCoordinateType} coordinates 点的坐标
   */
  insertPoint(coordinates: OMapCoordinateType): boolean {
    if (!isDefined(coordinates)) {
      error_(createMessage('insertPoint', commonMessage.paramsNotDefined('coordinates')))
    }
    let _coordinates: OlCoordinateType = handleGetLnglatValue(coordinates)
    return this._interaction.insertPoint(_coordinates)
  }

  /**
   * 删除一个点
   * @param {OMapCoordinateType} coordinates 点的坐标
   */
  removePoint(coordinates: OMapCoordinateType): boolean {
    if (!isDefined(coordinates)) {
      error_(createMessage('removePoint', commonMessage.paramsNotDefined('coordinates')))
    }
    let _coordinates: OlCoordinateType = handleGetLnglatValue(coordinates)
    return this._interaction.removePoint(_coordinates)
  }

  /**
   * 撤销修改
   */
  revoke(step = 1): boolean {
    if (!Number.isInteger(step) || step < 1) {
      error_(createMessage('revoke', 'step必须是大于0的整数'))
    }
    if (this.records.length <= 1) return false
    const nowIndex = this.records.length - 1
    const targetIndex = Math.max(0, nowIndex - step)
    this.restoreSnapshot(this.records[targetIndex].features)
    this.records.splice(targetIndex + 1)
    return true
  }

  /**
   * 取消当前全部修改，也就是回到初始状态
   */
  cancel() {
    this.restoreSnapshot(this.records[0].features)
    this.records = [this.records[0]]
  }

  on(type: OMapInteractionModifyEventType, callback: (e: OMapModifyEvent) => void): EventIdType {
    this.validateEvent(type, callback, 'on')
    const unlisten = OlEvent.listen(this._interaction, type, (e) => {
      this.events.emit(type, handleModifyEvent(this, type, e as OlModifyEventPayloadType))
    })
    const id = this.events.on(type, callback, unlisten)
    return id
  }

  once(type: OMapInteractionModifyEventType, callback: (e: OMapModifyEvent) => void): EventIdType {
    this.validateEvent(type, callback, 'once')
    const unlisten = OlEvent.listen(this._interaction, type, (e) => {
      this.events.emit(type, handleModifyEvent(this, type, e as OlModifyEventPayloadType))
    })
    const id = this.events.once(type, callback, unlisten)
    return id
  }

  protected validateEvent(
    type: OMapInteractionModifyEventType,
    callback: (e: OMapModifyEvent) => void,
    methodName: string
  ) {
    if (!isDefined(type) || !isDefined(callback)) {
      error_(createMessage(methodName, commonMessage.paramsNotDefined('type or callback')))
    }
    if (!isOMapInteractionModifyEventType(type)) {
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
    this.events.remove(id)
  }
}
