import { isDefined, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type { ProjectionUnitsType, OlProjOptionsType, OlProjInstanceType, OlCoordinateType } from '../../../utils/index'
import { getCurrentDateTime } from '../../../utils/handle'
import { OlInteraction, OlUtil } from '../../../source/index'
import Interaction from '../Interaction/index'
import VectorLayer from '../../layer/VectorLayer/index'
import BasicFeature from '../../core/Feature/BasicFeature/index'
import Lnglat from '../../basic/Lnglat/index'
import Event from '../../util/Event/index'
import { type OlVectorSourceInstanceType } from '../../layer/VectorLayer/type'
import type { OMapModifyParamsType, OlModifyInstanceType, OMapModifyEventType, ModifyRecordItem, SampleRecordItem } from './type'
import { handleModifyEvent } from './handle'

const PACKAGE_NAME = 'Modify';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 修改类
 * @class Modify
 * @classdesc 修改类
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/4
 * @updateDate 2025/9/4
 */

const defaultDModifyOptions = {
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

interface ModifyLike {
    /**
     * 存储修改记录
     */
    records: Array<ModifyRecordItem>;
}

export default class Modify extends Interaction implements ModifyLike {

    records: Array<ModifyRecordItem> = [];

    constructor(params: OMapModifyParamsType) {
        super("Modify")
        let modify_source: OlVectorSourceInstanceType | null = null
        if (!isDefined(params.layer)) {
            error_(createMessage('init', 'layer参数不能为空'));
        }
        if (isDefined(params.layer) && !(params.layer instanceof VectorLayer)) {
            error_(createMessage('init', 'layer参数不属于VectorLayer类型'));
        }
        this.layer = params.layer
        modify_source = (params.layer.getSource() as OlVectorSourceInstanceType)
        let _params = Object.assign({}, defaultDModifyOptions, {
            ...params,
            source: modify_source
        })
        this._interaction = new OlInteraction.Modify(_params)
        // 注册事件
        this.initInteractionEvent()
        // 初始化Modify事件
        this.initModifyEvent()
    }

    protected initModifyEvent(): void {
        if (!this._isInitialized('initModifyEvent')) return;
        let originFeatures = (this.layer as VectorLayer).getFeatures(); // 最初始的features
        // 这里不能直接放入originFeatures，因为originFeatures会在modify的过程中被修改
        let originFeaturesList: SampleRecordItem[] = (originFeatures || []).map(o => {
            return {
                id: o.id,
                originFeatureId: OlUtil.getUid(o._feature),
                type: o.type,
                coordinates: (o.getCoordinates() as any),
            }
        })
        this.records.push({
            time: getCurrentDateTime(),
            features: originFeaturesList,
            version: 1,
        });
        // (this._interaction as OlModifyInstanceType).on("modifystart", (e) => {
        //     console.log(e)
        // });
        (this._interaction as OlModifyInstanceType).on("modifyend", (e) => {
            let features = e.features.getArray()
            let newList: any[] = []
            features.forEach(f => {
                let target = ((this.layer as VectorLayer).getFeatures() as BasicFeature[]).find(item => {
                    return OlUtil.getUid(item._feature) === OlUtil.getUid(f)
                })
                if (target) {
                    newList.push({
                        id: target.id,
                        originFeatureId: OlUtil.getUid(target._feature),
                        type: target.type,
                        coordinates: (target.getCoordinates() as any),
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

    canInsertPoint(): boolean | undefined {
        if (!this._isInitialized('canInsertPoint')) return;
        return (this._interaction as OlModifyInstanceType).canInsertPoint()
    }

    canRemovePoint(): boolean | undefined {
        if (!this._isInitialized('canRemovePoint')) return;
        return (this._interaction as OlModifyInstanceType).canRemovePoint()
    }

    /**
     * 插入一个点
     * @param {Lnglat | OlCoordinateType} coordinates 点的坐标
     */
    insertPoint(coordinates: Lnglat | OlCoordinateType): boolean | undefined {
        if (!this._isInitialized('insertPoint')) return;
        if (!isDefined(coordinates)) {
            warn_(createMessage('insertPoint', 'coordinates参数不能为空'));
            return;
        }
        let _coordinates: OlCoordinateType = coordinates instanceof Lnglat ? (coordinates.toArray() as OlCoordinateType) : coordinates;
        return (this._interaction as OlModifyInstanceType).insertPoint(_coordinates)
    }

    /**
     * 删除一个点
     * @param {Lnglat | OlCoordinateType} coordinates 点的坐标
     */
    removePoint(coordinates: Lnglat | OlCoordinateType): boolean | undefined {
        if (!this._isInitialized('removePoint')) return;
        if (!isDefined(coordinates)) {
            warn_(createMessage('removePoint', 'coordinates参数不能为空'));
            return;
        }
        let _coordinates: OlCoordinateType = coordinates instanceof Lnglat ? (coordinates.toArray() as OlCoordinateType) : coordinates;
        return (this._interaction as OlModifyInstanceType).removePoint(_coordinates)
    }

    /**
     * 撤销修改
     */
    revoke(step = 1): boolean | undefined {
        if (!this._isInitialized('revoke')) return;
        if (this.records.length === 1) return false;
        let nowIndex = this.records.length - 1
        let targetIndex = nowIndex - step
        // 回到初始的状态
        if(targetIndex === 0) {
            this.cancel()
            return false;
        }
        const { features } = this.records[targetIndex]
        features.forEach(f => {
            let target = ((this.layer as VectorLayer).getFeatures() as BasicFeature[]).find(item => {
                if (f.id) {
                    return f.id === item.id
                }
                return OlUtil.getUid(item._feature) === (f as SampleRecordItem).originFeatureId
            })
            if (target) {
                target.setCoordinates((f as SampleRecordItem).coordinates)
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
            let target = ((this.layer as VectorLayer).getFeatures() as BasicFeature[]).find(item => {
                if (f.id) {
                    return f.id === item.id
                }
                return OlUtil.getUid(item._feature) === (f as SampleRecordItem).originFeatureId
            })
            if (target) {
                target.setCoordinates((f as SampleRecordItem).coordinates)
            }
        })
        this.records = [
            this.records[0]
        ]
    }

    on(type: OMapModifyEventType, callback: () => void): number | string | undefined {
        if (!this._isInitialized('on')) return;
        if (!isDefined(type) || !isDefined(callback)) {
            warn_(createMessage('on', '参数不能为空'));
            return;
        }
        let list = (this.events as Event).get(type)
        if (!isDefined(list) || list.length === 0) {
            (this._interaction as OlModifyInstanceType).on(type, (e) => {
                (this.events as Event).emit(type, handleModifyEvent(this, type, e))
            })
        }
        const id = (this.events as Event).on(type, callback)
        return id
    }

    un(id: number): void {
        if (!this._isInitialized('un')) return;
        if (!isDefined(id)) {
            warn_(createMessage('un', '参数不能为空'));
            return;
        }
        if (!isNumber(id)) {
            warn_(createMessage('un', '事件ID应为number类型'));
            return;
        }
        (this.events as Event).remove(id)
    }

    once(type: OMapModifyEventType, callback: () => void): number | string | undefined {
        if (!this._isInitialized('on')) return;
        if (!isDefined(type) || !isDefined(callback)) {
            warn_(createMessage('on', '参数不能为空'));
            return;
        }
        let list = (this.events as Event).get(type)
        if (!isDefined(list) || list.length === 0) {
            (this._interaction as OlModifyInstanceType).on(type, (e) => {
                (this.events as Event).emit(type, handleModifyEvent(this, type, e))
            })
        }
        const id = (this.events as Event).once(type, callback)
        return id
    }

}