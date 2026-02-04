import { isDefined, isFunction, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import { commonMessage } from '../../../utils/message'
import type { OlCoordinateType, OMapCoordinateType } from '../../basic/Lnglat/type'
import { getCurrentDateTime } from '../../../utils/handle'
import { OlInteraction, OlUtil, OlGeometry, OlEvent } from '../../../source/index'
import Interaction from '../Interaction/index'
import VectorLayer from '../../layer/VectorLayer/index'
import BasicFeature from '../../core/Feature/BasicFeature/index'
import type { EventIdType } from '../../util/Event/type'
import { type OMapVectorSourceType } from '../../layer/VectorLayer/type'
import {
    type OMapModifyParamsType,
    type OlModifyInstanceType,
    type OMapInteractionModifyEventType,
    type ModifyRecordItem,
    type SampleRecordItem,
    isOMapInteractionModifyEventType,
    type OMapModifyType,
} from './type'
import { handleModifyEvent } from './handle'
import { handleGetLnglatValue } from '../../basic/Lnglat/handle';

const PACKAGE_NAME = 'Modify';
const createMessage = getPackageMessage(PACKAGE_NAME);

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

    records: Array<ModifyRecordItem> = [];

    constructor(params: OMapModifyParamsType) {
        if (!isDefined(params)) {
            error_(createMessage('init', commonMessage.paramsNotDefined('params')));
        }
        super("Modify", { id: params.id })
        let modify_source: OMapVectorSourceType | null = null
        if (!isDefined(params.layer)) {
            error_(createMessage('init', 'layer参数不能为空'));
        }
        if (isDefined(params.layer) && !(params.layer instanceof VectorLayer)) {
            error_(createMessage('init', 'layer参数不属于VectorLayer类型'));
        }
        this.layer = params.layer
        modify_source = (params.layer.getSource() as OMapVectorSourceType)
        let _params = Object.assign({}, defaultModifyOptions, {
            ...params,
            source: modify_source
        })
        this._interaction = new OlInteraction.Modify(_params)
        this.initInteractionEvent()
        // 初始化Modify事件
        this._initModifyEvent()
    }

    protected _initModifyEvent() {

        let originFeatures = (this.layer as VectorLayer).getFeatures(); // 最初始的features
        // 这里不能直接放入originFeatures，因为originFeatures会在modify的过程中被修改
        // 因此保存经纬度信息即可
        // TODO：后续可能需要接入properties
        let originFeaturesList: SampleRecordItem[] = (originFeatures || []).map(o => {
            return {
                id: o.getId(),
                originFeatureId: OlUtil.getUid(o.getFeature()),
                type: o.type,
                coordinates: o.getCoordinates(),
            }
        })
        this.records.push({
            time: getCurrentDateTime(),
            features: originFeaturesList,
            version: 1,
        });
        this._interaction.on("modifyend", (e) => {
            let features = e.features.getArray()
            let newList: any[] = []
            features.forEach(f => {
                let target = (this.layer as VectorLayer).getFeatures().find(item => {
                    return OlUtil.getUid(item.getFeature()) === OlUtil.getUid(f)
                })
                if (target) {
                    newList.push({
                        id: target.getId(),
                        originFeatureId: OlUtil.getUid(target.getFeature()),
                        type: target.type,
                        coordinates: target.getCoordinates(),
                    })
                }
            })
            // 存储修订记录
            this.records.push({
                time: getCurrentDateTime(),
                features: newList,
                version: this.records.length + 1,
            })
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
            error_(createMessage('insertPoint', commonMessage.paramsNotDefined('coordinates')));
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
            error_(createMessage('removePoint', commonMessage.paramsNotDefined('coordinates')));
        }
        let _coordinates: OlCoordinateType = handleGetLnglatValue(coordinates)
        return this._interaction.removePoint(_coordinates)
    }

    /**
     * 撤销修改
     */
    revoke(step = 1): boolean {
        if (this.records.length === 1) return false;
        let nowIndex = this.records.length - 1
        let targetIndex = nowIndex - step
        // 回到初始的状态
        if (targetIndex === 0) {
            this.cancel()
            return false;
        }
        const { features } = this.records[targetIndex]
        features.forEach(f => {
            let target = ((this.layer as VectorLayer).getFeatures()).find(item => {
                if (f.id) {
                    return f.id === item.id
                }
                return OlUtil.getUid(item.getFeature()) === (f as SampleRecordItem).originFeatureId
            })
            if (isDefined(target)) {
                (target as BasicFeature<OlGeometry.Geometry>).setCoordinates((f as SampleRecordItem).coordinates)
            }
        })
        this.records.splice(targetIndex + 1)
        return true
    }

    /**
     * 取消当前全部修改，也就是回到初始状态
     */
    cancel() {
        const { features } = this.records[0]
        features.forEach(f => {
            let target = ((this.layer as VectorLayer).getFeatures()).find(item => {
                if (f.id) {
                    return f.id === item.id
                }
                return OlUtil.getUid(item.getFeature()) === (f as SampleRecordItem).originFeatureId
            })
            if (target) {
                target.setCoordinates((f as SampleRecordItem).coordinates)
            }
        })
        this.records = [
            this.records[0]
        ]
    }

    on(type: OMapInteractionModifyEventType, callback: () => void): EventIdType {
        if (!isDefined(type) || !isDefined(callback)) {
            error_(createMessage('on', commonMessage.paramsNotDefined('type or callback')));
        }
        if (!isOMapInteractionModifyEventType(type)) {
            error_(createMessage('on', commonMessage.paramsInvaildEnum(type)));
        }
        if (!isFunction(callback)) {
            error_(createMessage('on', commonMessage.paramsInvaildFormat('callback', 'function'))); 
        }
        const unlisten = OlEvent.listen(this._interaction, type, (e: any) => {
            this.events.emit(type, handleModifyEvent(this, type, e))
        })
        const id = this.events.on(type, callback, unlisten)
        return id
    }

    once(type: OMapInteractionModifyEventType, callback: () => void): EventIdType {
        if (!isDefined(type) || !isDefined(callback)) {
            error_(createMessage('once', commonMessage.paramsNotDefined('type or callback')));
        }
        if (!isOMapInteractionModifyEventType(type)) {
            error_(createMessage('once', commonMessage.paramsInvaildEnum(type)));
        }
        if (!isFunction(callback)) {
            error_(createMessage('once', commonMessage.paramsInvaildFormat('callback', 'function'))); 
        }
        const unlisten = OlEvent.listen(this._interaction, type, (e: any) => {
            this.events.emit(type, handleModifyEvent(this, type, e))
        })
        const id = this.events.once(type, callback, unlisten)
        return id
    }

    un(id: EventIdType) {
        if (!isDefined(id)) {
            error_(createMessage('un', commonMessage.paramsNotDefined(id)));
        }
        this.events.remove(id)
    }

}