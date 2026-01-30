import { isDefined, isNumber, isString, isFunction } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import { commonMessage } from '../../../utils/message'
import type { OlCoordinateType, OMapCoordinateType } from '../../basic/Lnglat/type'
import Interaction from '../Interaction/index'
import { OlInteraction, OlEvent, OlFeature, OlGeometry } from '../../../source/index'
import VectorLayer from '../../layer/VectorLayer/index'
import BasicFeature from '../../core/Feature/BasicFeature/index'
import { createBaseFeatureByOlFeature } from '../../core/Feature/BasicFeature/handle'
import type { OlFeatureType, OlFeatureInstanceType } from '../../core/Feature/BasicFeature/type'
import Lnglat from '../../basic/Lnglat/index'
import { type EventIdType } from '../../util/Event/type'
import {
    type OMapDrawMode,
    type OMapDrawParamsType,
    type OlDrawInstanceType,
    type OMapInteractionDrawEventType,
    DrawEventType,
    isOMapInteractionDrawEventType,
    DRAW_DEFAULT_PARAMS,
    DrawMode
} from './type'
import type { OlVectorSourceInstanceType, OlVectorLayerInstanceType } from '../../layer/VectorLayer/type'
import { DEFAULT_STYLE } from '../../basic/Style/handle'
import { getOlDrawType, handleInteractionDrawEvent } from './handle'

const PACKAGE_NAME = 'Draw';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 绘制类
 * @class Draw
 * @classdesc 绘制类
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/8/25
 * @updateDate 2026/1/29
 */

export default class Draw extends Interaction {

    constructor(mode: OMapDrawMode, params?: OMapDrawParamsType) {
        if (!(Object.values(DrawMode) as OMapDrawMode[]).includes(mode)) {
            error_(createMessage('constructor', 'mode参数有误'));
            return
        }
        super("Draw")
        let draw_source: OlVectorSourceInstanceType | null = null
        if (params?.layer) {
            if (params?.layer instanceof VectorLayer) {
                this.layer = params?.layer
                draw_source = (params?.layer.getSource() as OlVectorSourceInstanceType)
            } else {
                warn_(createMessage('init', 'layer参数不属于VectorLayer类型'));
            }
        }
        if (!isDefined(draw_source)) {
            this.layer = new VectorLayer({
                style: DEFAULT_STYLE
            })
            draw_source = (this.layer.getSource() as OlVectorSourceInstanceType)
        }
        let _params = Object.assign({}, DRAW_DEFAULT_PARAMS, {
            clickTolerance: params?.clickTolerance,
            source: draw_source,
            features: undefined,
            style: undefined
        })
        this._interaction = new OlInteraction.Draw({
            ...getOlDrawType(mode),
            ..._params,
        })
        // 注册事件
        this.initInteractionEvent()
    }

    protected initDrawEvent() {

        (this._interaction as OlDrawInstanceType).on("drawend", (e) => {
            const feature: OlFeatureInstanceType = e.feature
            console.log(feature)
            if (isDefined(feature)) {
                // 根据原生的feature生成内部的feature
                let basicFeature = createBaseFeatureByOlFeature(feature as OlFeature<OlGeometry.Geometry>)
                // console.log(basicFeature)
                // console.log((this.layer as VectorLayer)._layer?.getSource()?.getFeatures())
                if (basicFeature) {
                    (this.layer as VectorLayer).addFeature(basicFeature)
                } else {
                    warn_(createMessage('createBaseFeatureByOlFeature', '根据olFeature创建BasicFeature出错'));
                }
            }
        })
    }

    /**
     * 追加坐标
     * @param coordinates 坐标
     */
    appendCoordinates(coordinates: Array<OMapCoordinateType>): void {

        if (!isDefined(coordinates)) {
            warn_(createMessage('appendCoordinates', 'coordinates参数不能为空'));
            return;
        }
        let _coordinates = coordinates.map(c => {
            return c instanceof Lnglat ? (c.toArray() as OlCoordinateType) : c
        });
        (this._interaction as OlDrawInstanceType).appendCoordinates(_coordinates)
    }

    /**
     * 取消绘制，并结束当前未完成的绘制
     */
    cancel(): void {

        (this._interaction as OlDrawInstanceType).abortDrawing()
    }

    /**
     * 撤销操作（会删除最后一个已经绘制的点位）
     */
    revoke(): void {

        (this._interaction as OlDrawInstanceType).removeLastPoint()
    }

    /**
     * 结束当前未完成的绘制（并自动补全图形）
     */
    finish(): void {

        (this._interaction as OlDrawInstanceType).finishDrawing()
    }

    protected destroy(destroyLayer: boolean = true): void {
        if (destroyLayer && (isDefined(this.getLayer()))) {
            this._removeInteractionLayer();
        }
        super.destroy()
    }

    /**
     * 获取当前绘制的所有特征
     * @returns 特征数组
     */
    getFeatures(): BasicFeature<OlGeometry.Geometry>[] | undefined {

        return (this.getLayer() as VectorLayer).getFeatures()
    }

    on(type: OMapInteractionDrawEventType, callback: () => void): EventIdType | undefined {

        if (!isDefined(type) || !isDefined(callback)) {
            warn_(createMessage('on', commonMessage.paramsNotDefined('type or callback')));
            return;
        }
        if (!isOMapInteractionDrawEventType(type)) {
            warn_(createMessage('on', commonMessage.paramsInvaildEnum(type)));
            return;
        };
        if (!isFunction(callback)) {
            warn_(createMessage('on', commonMessage.paramsInvaildFormat('callback', 'function')));
            return;
        }
        const unlisten = OlEvent.listen((this._interaction as OlDrawInstanceType), type, (e: any) => {
            if(type !== DrawEventType.drawEnd) {
                this.events.emit(type, handleInteractionDrawEvent(this, type, e))
            }
        })
        const id = this.events.on(type, callback, unlisten)
        return id
    }

    once(type: OMapInteractionDrawEventType, callback: () => void): EventIdType | undefined {

        if (!isDefined(type) || !isDefined(callback)) {
            warn_(createMessage('once', commonMessage.paramsNotDefined('type or callback')));
            return;
        }
        if (!isOMapInteractionDrawEventType(type)) {
            warn_(createMessage('once', commonMessage.paramsInvaildEnum(type)));
            return;
        };
        if (!isFunction(callback)) {
            warn_(createMessage('once', commonMessage.paramsInvaildFormat('callback', 'function')));
            return;
        }
        const unlisten = OlEvent.listen((this._interaction as OlDrawInstanceType), type, (e: any) => {
            if(type !== DrawEventType.drawEnd) {
                this.events.emit(type, handleInteractionDrawEvent(this, type, e))
            }
        })
        const id = this.events.once(type, callback, unlisten)
        return id
    }

    un(id: EventIdType): void {

        if (!isDefined(id)) {
            warn_(createMessage('un', commonMessage.paramsNotDefined(id)));
            return;
        }
        if (!isString(id)) {
            warn_(createMessage('un', commonMessage.paramsInvaildFormat(id, 'string')));
            return;
        }
        this.events.remove(id)
    }

}