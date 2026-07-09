import { isDefined, defaultValue, isFunction } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import { commonMessage } from '../../../utils/message'
import type { OlCoordinateType, OMapCoordinateType } from '../../basic/Lnglat/type'
import Interaction from '../Interaction/index'
import { OlInteraction, OlEvent, OlGeometry } from '../../../source/index'
import VectorLayer from '../../layer/VectorLayer/index'
import BasicFeature from '../../core/Feature/BasicFeature/index'
import { type EventIdType } from '../../util/Event/type'
import {
    type OMapDrawModeType,
    isVaildDrawMode,
    type OMapDrawParamsType,
    type OMapInteractionDrawEventType,
    DrawEventType,
    isOMapInteractionDrawEventType,
    OMAP_DRAW_DEFAULT_PARAMS,
    type OMapDrawType
} from './type'
import type { OlVectorSourceInstanceType, OMapVectorSourceType } from '../../layer/VectorLayer/type'
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
 * @updateDate 2026/2/4
 */

export default class Draw extends Interaction<OMapDrawType> {

    constructor(mode: OMapDrawModeType, params?: OMapDrawParamsType) {
        if (!isDefined(mode)) {
            error_(createMessage('constructor', commonMessage.paramsNotDefined('mode')));
        }
        if (!isVaildDrawMode(mode)) {
            error_(createMessage('constructor', commonMessage.paramsInvaildFormat('mode')));
        }
        let _params: OMapDrawParamsType = defaultValue(params, {})
        const { id, active, layer, style, ...drawOptions } = _params
        super("Draw", { id })
        let draw_source: OMapVectorSourceType | null = null
        if (isDefined<VectorLayer>(layer)) {
            if (layer instanceof VectorLayer) {
                this.layer = layer
                draw_source = layer.getSource() as OMapVectorSourceType
            } else {
                warn_(createMessage('init', commonMessage.paramsInvaildFormat('layer', 'VectorLayer')));
            }
        }
        if (!isDefined(draw_source)) {
            this.layer = new VectorLayer({
                style: style || DEFAULT_STYLE
            })
            draw_source = (this.layer.getSource() as OlVectorSourceInstanceType)
        }
        let drawParams = Object.assign({}, OMAP_DRAW_DEFAULT_PARAMS, {
            ...drawOptions,
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

    /**
     * 追加坐标
     * @param coordinates 坐标
     */
    appendCoordinates(coordinates: Array<OMapCoordinateType>) {
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
        let layer = this.getLayer()
        if(!isDefined<VectorLayer>(layer)) {
            return []
        }
        return defaultValue(layer.getFeatures(), [])
    }

    on(type: OMapInteractionDrawEventType, callback: () => void): EventIdType {
        this.validateEvent(type, callback, 'on')
        const unlisten = OlEvent.listen(this._interaction, type, (e: any) => {
            if(type !== DrawEventType.drawEnd) {
                this.events.emit(type, handleInteractionDrawEvent(this, type, e))
            }
        })
        const id = this.events.on(type, callback, unlisten)
        return id
    }

    once(type: OMapInteractionDrawEventType, callback: () => void): EventIdType {
        this.validateEvent(type, callback, 'once')
        const unlisten = OlEvent.listen(this._interaction, type, (e: any) => {
            if(type !== DrawEventType.drawEnd) {
                this.events.emit(type, handleInteractionDrawEvent(this, type, e))
            }
        })
        const id = this.events.once(type, callback, unlisten)
        return id
    }

    protected validateEvent(type: OMapInteractionDrawEventType, callback: () => void, methodName: string) {
        if (!isDefined(type) || !isDefined(callback)) {
            error_(createMessage(methodName, commonMessage.paramsNotDefined('type or callback')));
        }
        if (!isOMapInteractionDrawEventType(type)) {
            error_(createMessage(methodName, commonMessage.paramsInvaildEnum(type)));
        }
        if (!isFunction(callback)) {
            error_(createMessage(methodName, commonMessage.paramsInvaildFormat('callback', 'function')));
        }
    }

    un(id: EventIdType) {
        if (!isDefined(id)) {
            error_(createMessage('un', commonMessage.paramsNotDefined(id)));
        }
        this.events.remove(id)
    }

}
