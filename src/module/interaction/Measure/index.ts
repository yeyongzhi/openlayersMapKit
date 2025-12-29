import { isDefined, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import Interaction from '../Interaction/index'
import { OlInteraction, OlGeometry, OlFeature, OlObservable } from '../../../source/index'
import VectorLayer from '../../layer/VectorLayer/index'
import Lnglat from '../../basic/Lnglat/index'
import type { OlCoordinateType } from '../../basic/Lnglat/type'
import Map from '../../core/Map/index'
import type { OlMapInstanceType } from '../../core/Map/type'
import Popup from '../../basic/Popup/index'
import { type OlPopupInstanceType } from '../../basic/Popup/type'
import {
    type OMapMeasureMode,
    type OMapMeasureParamsType,
    type OlDrawInstanceType,
    type OMapMeasureEventType,
    type OMapMeasureResult,
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
    destroy,
    createMeasureAreaCloseElement
} from './handle'
import Pixel from '../../basic/Pixel/index';
import LineString from '../../core/Feature/LineString/index'
import Polygon from '../../core/Feature/Polygon/index'
import type { OlFeatureInstanceType } from '../../core/Feature/BasicFeature/type';
import { tooltipPopup, measurePopup } from './handlePopup'

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
 * @updateDate 2025/9/16
 */

export default class Measure extends Interaction {

    mode: OMapMeasureMode | null = null;

    result: OMapMeasureResult = {
        value: 0,
        unit: ''
    }

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
        if (mode === MeasureMode.Distance) {
            this.result.unit = 'km'
        } else if (mode === MeasureMode.Area) {
            this.result.unit = 'km²'
        }
        // 注册事件
        this.initInteractionEvent()
        this.initMeasureEvent()
    }

    /**
     * 初始化 测量事件
     */
    protected initMeasureEvent() {
        if (!this._isInitialized('initMeasureEvent')) return;
        this._interaction.on("change:active", (e) => {
            if(this._interaction.getActive()) {
                this.onMeasureActive()
            } else {
                this.onMeasureInActive()
            }
        });
        // 【测量开始】
        (this._interaction as OlDrawInstanceType).on("drawstart", (e) => {
            // 派发测量开始的回调函数
            this.events.emit(MeasureEventType.measureStart, {
                target: this,
                type: MeasureEventType.measureStart
            });
            this.onMeasureStart(e.feature)
        });
        // 【测量结束】
        (this._interaction as OlDrawInstanceType).on("drawend", (e) => {
            this.onMeasureEnd()
        })
    }

    protected onMeasureActive() {
        if (isDefined(this.map)) {
            if(!pointMoveListener) {
                pointMoveListener = ((this.map as Map)._map as OlMapInstanceType).on("pointermove", (e) => {
                    tooltipPopup.updatePosition(e.coordinate)
                });
            }
        }
        // 重置测量数据
        this.result.value = 0
    }

    protected onMeasureInActive() {
        if(pointMoveListener) {
            OlObservable.unByKey(pointMoveListener)
            pointMoveListener = null
        }
    }

    /**
     * 测量开始
     * @param feature 测量开始的feature
     */
    protected onMeasureStart(feature: OlFeatureInstanceType | null) {
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
                    if (isDefined(value) && isNumber(value)) {
                        this.result.value = value
                    }
                    // 更新鼠标Popup的信息
                    if (isDefined(value) && isNumber(value)) {
                        if (target instanceof OlGeometry.LineString) {
                            let newElement = (newLength >= 2) ? createMeasureDistanceElement(transformDistance(value as number), value === 0 ? '' : '单击继续，双击结束测量') : createMeasureTooltipElement('单击地图开始测量')
                            tooltipPopup.setElement(newElement as HTMLElement)
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
                        if (newLength >= 4) {
                            (this.map as Map).addPopup(measurePopup.getPopup() as Popup);
                            measurePopup.setElement(createMeasureAreaElement(transformArea(value as number), '单击继续，双击结束测量'))
                            measurePopup.updatePosition(target.getInteriorPoint().getCoordinates());
                            tooltipPopup.setElement(undefined)
                            tooltipPopup.updatePosition(undefined);
                        }
                    }
                } else {
                    warn_('target is undefined')
                }
            })
        }
    }

    /**
     * 测量结束
     */
    protected onMeasureEnd() {
        this.setActive(false)
        if (isDefined(pointMoveListener)) {
            OlObservable.unByKey(pointMoveListener)
        }
        if (this.mode === MeasureMode.Distance) {

        }
        if (this.mode === MeasureMode.Area) {
            const element = createMeasureAreaElement(transformArea(this.result.value as number))
            element.style.display = 'flex'
            element.style.alignItems = 'center'
            element.appendChild(createMeasureAreaCloseElement(() => {
                measurePopup.updatePosition(undefined)
                measurePopup.setElement(undefined)
                this.layer?.clear()
            }))
            measurePopup.setElement(element)
        }
        tooltipPopup.updatePosition(undefined)
        tooltipPopup.setElement(undefined)
        this.events.emit(MeasureEventType.measureEnd, {
            target: this,
            type: MeasureEventType.measureEnd
        });
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
        this.map = map;
        // this.initMeasureEvent()
        // -----添加提示信息-----
        (this.map as Map).addPopup(tooltipPopup.getPopup() as Popup);
        this.onMeasureActive();
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

    /**
     * 该移除的都移除掉
     */
    destroy() {
        tooltipPopup.updatePosition(undefined)
        this.setActive(false)
        if (isDefined(this.layer)) {
            this.layer.clear()
        }
        destroy()
    }

}