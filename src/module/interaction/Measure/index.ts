import { isDefined, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type { OlCoordinateType } from '../../../utils/index'
import Interaction from '../Interaction/index'
import { OlInteraction, OlGeometry, OlFeature, OlObservable } from '../../../source/index'
import VectorLayer from '../../layer/VectorLayer/index'
import { createBaseFeatureByOlFeature } from '../../core/Feature/BasicFeature/handle'
import Lnglat from '../../basic/Lnglat/index'
import Map from '../../core/Map/index'
import type { OlMapInstanceType } from '../../core/Map/type'
import Popup from '../../basic/Popup/index'
import { type OlPopupInstanceType } from '../../basic/Popup/type'
import {
    type OMapMeasureMode,
    type OMapMeasureParamsType,
    type OlDrawInstanceType,
    type OMapMeasureEventType,
    DRAW_DEFAULT_PARAMS,
    MeasureMode,
    MeasureEventType
} from './type'
import type { OlVectorSourceInstanceType, OlVectorLayerInstanceType } from '../../layer/VectorLayer/type'
import { DEFAULT_STYLE } from '../../basic/Style/handle'
import {
    getOlDrawType,
    createMeasureTooltipElement,
    createMeasureDistanceElement,
    createMeasureAreaElement,
    createMeasureMarkerElement,
    createMeasureMarkerPopup,
    transformDistance,
    transformArea,
    updateMeasureFeature,
    getOMapMeasureMarkerId,
    destroy
} from './handle'
import Pixel from '../../basic/Pixel/index';
import LineString from '../../core/Feature/LineString/index'
import Polygon from '../../core/Feature/Polygon/index'
import type { OlFeatureInstanceType } from '../../core/Feature/BasicFeature/type';

const PACKAGE_NAME = 'Measure';
const createMessage = getPackageMessage(PACKAGE_NAME);

let measureFeature: OlFeatureInstanceType | null = null
let measureListener: any = null

let pointMoveListener: any = null

/**
 * 绘制类
 * @class Measure
 * @classdesc 测量类
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/5
 * @updateDate 2025/9/9
 */

export default class Measure extends Interaction {

    mode: OMapMeasureMode | null = null;
    /**
     * 作为Measure类中提示类，用于提示用户测量信息
     */
    _popup: Popup | null = null;

    constructor(mode: OMapMeasureMode, params?: OMapMeasureParamsType) {
        if (!(Object.values(MeasureMode) as OMapMeasureMode[]).includes(mode)) {
            error_(createMessage('constructor', 'mode参数有误'));
            return
        }
        super("Measure")
        let draw_source: OlVectorSourceInstanceType | null = null
        // Measure模式下，直接新建一个VectorLayer
        this.layer = new VectorLayer({
            style: DEFAULT_STYLE
        })
        draw_source = (this.layer.getSource() as OlVectorSourceInstanceType)
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
        this.mode = mode
        // 注册事件
        this.initInteractionEvent()
        // this.initMeasureEvent()
    }

    /**
     * 初始化 测量事件
     */
    protected initMeasureEvent() {
        if (!this._isInitialized('initMeasureEvent')) return;
        // -----添加提示信息-----
        if (!isDefined(this._popup)) {
            let div = createMeasureTooltipElement('单击地图开始测量')
            this._popup = new Popup({
                id: 'omap-measure-popup',
                element: div,
                offset: new Pixel(0, -10)
            });
            (this.map as Map).addPopup(this._popup);
            // 这里暂时不使用addPopup直接添加，避免和其他Popup冲突
            // (this.map as Map)._map?.addOverlay(this._popup._popup as OlPopupInstanceType)
        }
        if (isDefined(this.map)) {
            pointMoveListener = ((this.map as Map)._map as OlMapInstanceType).on("pointermove", (e) => {
                if (this._popup) {
                    this._popup.setPosition(e.coordinate)
                }
            });
        }
        // 【测量开始】
        (this._interaction as OlDrawInstanceType).on("drawstart", (e) => {
            // 派发测量开始的回调函数
            this.events.emit(MeasureEventType.measureStart, {
                target: this,
                type: MeasureEventType.measureStart
            });
            const { feature } = e
            let isInitAreaElement = false
            if (isDefined(feature)) {
                measureFeature = feature
                updateMeasureFeature(this.mode as OMapMeasureMode, feature, (this.map as Map))
                let lastLength = 0
                measureListener = measureFeature.getGeometry()?.on('change', (e) => {
                    const { target } = e
                    if (isDefined(target)) {
                        let newLength = (target instanceof OlGeometry.LineString) ? target.getCoordinates().length : target.getCoordinates()[0].length
                        if (lastLength === 0) {
                            lastLength = newLength
                            if (target instanceof OlGeometry.LineString) {
                                let startMarker = createMeasureMarkerElement("起点", 0)
                                let popup = createMeasureMarkerPopup({
                                    id: getOMapMeasureMarkerId(0),
                                    element: startMarker,
                                    offset: new Pixel(0, -10)
                                })
                                popup.setPosition(target.getCoordinates()[0]);
                                (this.map as Map).addPopup(popup);
                                // (this.map as Map)._map?.addOverlay(popup._popup as OlPopupInstanceType)
                            }
                        }
                        let value: number | undefined = undefined
                        if (target instanceof OlGeometry.LineString) {
                            value = this.map?.getLength(new LineString(new OlFeature({
                                geometry: target
                            })))
                        } else if (target instanceof OlGeometry.Polygon) {
                            value = this.map?.getArea(new Polygon(new OlFeature({
                                geometry: target
                            })))
                        }
                        // 更新鼠标Popup的信息
                        if (isDefined(value) && isNumber(value)) {
                            if (target instanceof OlGeometry.LineString) {
                                let newElement = createMeasureDistanceElement(value.toFixed(2))
                                if (isDefined(this._popup)) {
                                    this._popup.setElement(newElement as HTMLElement)
                                }
                            }
                        }
                        if (target instanceof OlGeometry.LineString) {
                            if (newLength > lastLength) {
                                let index = newLength - 1 - 1
                                let marker = createMeasureMarkerElement(transformDistance(value as number), index)
                                let popup = createMeasureMarkerPopup({
                                    id: getOMapMeasureMarkerId(index),
                                    element: marker,
                                    offset: new Pixel(0, -10)
                                })
                                popup.setPosition(target.getCoordinates()[target.getCoordinates().length - 1]);
                                (this.map as Map).addPopup(popup)
                                // (this.map as Map)._map?.addOverlay(popup._popup as OlPopupInstanceType)
                                lastLength = newLength
                            }
                        } else if (target instanceof OlGeometry.Polygon) {
                            if(newLength >= 4) {
                                if (isDefined(this._popup)) {
                                    this._popup.setElement(createMeasureAreaElement(transformArea(value as number)))
                                    this._popup.setPosition(target.getInteriorPoint().getCoordinates());
                                }
                            }
                        }
                    } else {
                        warn_('target is undefined')
                    }
                })
            }
        });
        // 【测量结束】
        (this._interaction as OlDrawInstanceType).on("drawend", (e) => {
            console.log(e)
            const { feature } = e
            if (this.mode === MeasureMode.Distance) {
                if (isDefined(this._popup)) {
                    (this.map as Map).removePopup(this._popup)
                    this._popup.setPosition(undefined)
                    this._popup = null
                    this.setActive(false)
                }
            } else if (this.mode === MeasureMode.Area) {
                if (isDefined(pointMoveListener)) {
                    OlObservable.unByKey(pointMoveListener)
                }
                // if (isDefined(this._popup)) {
                //     this._popup.setOffset(new Pixel(0, 0))
                // }
            }
            this.events.emit(MeasureEventType.measureEnd, {
                target: this,
                type: MeasureEventType.measureEnd
            });
        })
    }

    /**
     * 取消绘制，并结束当前未完成的绘制
     */
    cancel(): void {
        if (!this._isInitialized('cancel')) return;
        (this._interaction as OlDrawInstanceType).abortDrawing()
    }

    /**
     * 删除最后一个点
     */
    revoke(): void {
        if (!this._isInitialized('revoke')) return;
        (this._interaction as OlDrawInstanceType).removeLastPoint()
    }

    /**
     * 结束当前未完成的绘制
     */
    finish(): void {
        if (!this._isInitialized('finish')) return;
        (this._interaction as OlDrawInstanceType).finishDrawing()
    }

    setMap(map: Map) {
        this.map = map
        this.initMeasureEvent()
    }

    on(type: OMapMeasureEventType, callback: () => void): number | string | undefined {
        if (!this._isInitialized('on')) return;
        if (!isDefined(type) || !isDefined(callback)) {
            warn_(createMessage('on', '参数不能为空'));
            return;
        }
        const id = this.events.on(type, callback);
        return id
    }

    destroy() {
        destroy()
        if(isDefined(this.layer)) {
            this.map?.removeLayer(this.layer)
        }
        this.map?.removeInteraction(this)
    }

}