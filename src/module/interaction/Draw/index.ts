import { isDefined, defaultValue, isNumber, isString, isFunction } from '../../../utils/index';
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
    DrawMode,
    type OMapDrawType
} from './type'
import type { OlVectorSourceInstanceType, OlVectorLayerInstanceType } from '../../layer/VectorLayer/type'
import { DEFAULT_STYLE } from '../../basic/Style/handle'
import { getOlDrawType, handleInteractionDrawEvent } from './handle'
import { handleGetLnglatValue } from '../../basic/Lnglat/handle';

const PACKAGE_NAME = 'Draw';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 绘制类
 * @class Draw
 * @classdesc 绘制类
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/8/25
 * @updateDate 2026/2/3
 */

export default class Draw extends Interaction<OMapDrawType> {

    constructor(mode: OMapDrawMode, params?: OMapDrawParamsType) {
        let _params: OMapDrawParamsType = defaultValue(params, {})
        if (!(Object.values(DrawMode) as OMapDrawMode[]).includes(mode)) {
            error_(createMessage('constructor', commonMessage.paramsInvaildFormat('mode')));
        }
        super("Draw", { id: params?.id })
        let draw_source: OlVectorSourceInstanceType | null = null
        if (isDefined<VectorLayer>(_params.layer)) {
            if (_params.layer instanceof VectorLayer) {
                this.layer = _params.layer
                draw_source = (_params.layer.getSource() as OlVectorSourceInstanceType)
            } else {
                warn_(createMessage('init', commonMessage.paramsInvaildFormat('layer', 'VectorLayer')));
            }
        }
        if (!isDefined(draw_source)) {
            this.layer = new VectorLayer({
                style: DEFAULT_STYLE
            })
            draw_source = (this.layer.getSource() as OlVectorSourceInstanceType)
        }
        let drawParams = Object.assign({}, DRAW_DEFAULT_PARAMS, {
            clickTolerance: _params.clickTolerance,
            source: draw_source,
            features: undefined,
            style: undefined
        })
        this._interaction = new OlInteraction.Draw({
            ...getOlDrawType(mode),
            ...drawParams
        })
        // 注册事件
        this.initInteractionEvent()
    }

    protected initDrawEvent() {
        this._interaction.on("drawend", (e) => {
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
            error_(createMessage('appendCoordinates', commonMessage.paramsNotDefined('coordinates')));
        }
        let _coordinates = coordinates.map(c => {
            return handleGetLnglatValue(c)
        });
        this._interaction.appendCoordinates(_coordinates)
    }

    /**
     * 取消绘制，并结束当前未完成的绘制
     */
    cancel() {
        this._interaction.abortDrawing()
    }

    /**
     * 撤销操作（会删除最后一个已经绘制的点位）
     */
    revoke() {
        this._interaction.removeLastPoint()
    }

    /**
     * 结束当前未完成的绘制（并自动补全图形）
     */
    finish() {
        this._interaction.finishDrawing()
    }

    protected destroy(destroyLayer: boolean = true) {
        if (destroyLayer && (isDefined(this.getLayer()))) {
            this._removeInteractionLayer();
        }
        super.destroy()
    }

    /**
     * 获取当前绘制的所有特征
     * @returns 特征数组
     */
    getFeatures(): BasicFeature<OlGeometry.Geometry>[] {
        if(!isDefined<VectorLayer>(this.getLayer())) {
            return []
        }
        return defaultValue((this.getLayer() as VectorLayer).getFeatures(), [])
    }

    on(type: OMapInteractionDrawEventType, callback: () => void): EventIdType | undefined {
        if (!isDefined(type) || !isDefined(callback)) {
            error_(createMessage('on', commonMessage.paramsNotDefined('type or callback')));
        }
        if (!isOMapInteractionDrawEventType(type)) {
            error_(createMessage('on', commonMessage.paramsInvaildEnum(type)));
        };
        if (!isFunction(callback)) {
            error_(createMessage('on', commonMessage.paramsInvaildFormat('callback', 'function')));
        }
        const unlisten = OlEvent.listen(this._interaction, type, (e: any) => {
            if(type !== DrawEventType.drawEnd) {
                this.events.emit(type, handleInteractionDrawEvent(this, type, e))
            }
        })
        const id = this.events.on(type, callback, unlisten)
        return id
    }

    once(type: OMapInteractionDrawEventType, callback: () => void): EventIdType | undefined {
        if (!isDefined(type) || !isDefined(callback)) {
            error_(createMessage('once', commonMessage.paramsNotDefined('type or callback')));
        }
        if (!isOMapInteractionDrawEventType(type)) {
            error_(createMessage('once', commonMessage.paramsInvaildEnum(type)));
        };
        if (!isFunction(callback)) {
            error_(createMessage('once', commonMessage.paramsInvaildFormat('callback', 'function')));
        }
        const unlisten = OlEvent.listen(this._interaction, type, (e: any) => {
            if(type !== DrawEventType.drawEnd) {
                this.events.emit(type, handleInteractionDrawEvent(this, type, e))
            }
        })
        const id = this.events.once(type, callback, unlisten)
        return id
    }

    un(id: EventIdType) {
        if (!isDefined(id)) {
            error_(createMessage('un', commonMessage.paramsNotDefined(id)));
        }
        if (!isString(id)) {
            error_(createMessage('un', commonMessage.paramsInvaildFormat(id, 'string')));
        }
        this.events.remove(id)
    }

}