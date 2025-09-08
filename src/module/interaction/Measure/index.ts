import { isDefined, isNumber, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type { OlCoordinateType } from '../../../utils/index'
import Interaction from '../Interaction/index'
import { OlInteraction, OlGeometry } from '../../../source/index'
import VectorLayer from '../../layer/VectorLayer/index'
import { createBaseFeatureByOlFeature } from '../../core/Feature/BasicFeature/handle'
import Lnglat from '../../basic/Lnglat/index'
import Map from '../../core/Map/index'
import type { OlMapInstanceType } from '../../core/Map/type'
import Popup from '../../basic/Popup/index'
import {
    type OMapMeasureMode,
    type OMapMeasureParamsType,
    type OlDrawInstanceType,
    DRAW_DEFAULT_PARAMS,
    MeasureMode
} from './type'
import type { OlVectorSourceInstanceType, OlVectorLayerInstanceType } from '../../layer/VectorLayer/type'
import { DEFAULT_STYLE } from '../../basic/Style/handle'
import { getOlDrawType, createMeasureElement } from './handle'
import Pixel from '../../basic/Pixel/index';
import type { OlFeatureInstanceType } from '../../core/Feature/BasicFeature/type';

const PACKAGE_NAME = 'Measure';
const createMessage = getPackageMessage(PACKAGE_NAME);

let measureFeature: OlFeatureInstanceType | null = null
let measureListener: any = null

/**
 * 绘制类
 * @class Measure
 * @classdesc 测量类
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/5
 * @updateDate 2025/9/8
 */

export default class Measure extends Interaction {

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
        // 注册事件
        this.initInteractionEvent()
        // this.initMeasureEvent()
    }

    protected initMeasureEvent() {
        if (!this._isInitialized('initDrawEvent')) return;
        console.log(this.map);
        if(!isDefined(this._popup)) {
            let div = createMeasureElement('单击地图开始测量')
            this._popup = new Popup({
                id: 'omap-measure-popup',
                element: div,
                offset: new Pixel(0, -10)
            });
            (this.map as Map).addPopup(this._popup)
        }
        if(isDefined(this.map)) {
            ((this.map as Map)._map as OlMapInstanceType).on("pointermove", (e) => {
            if(this._popup) {
                this._popup.setPosition(e.coordinate)
            }
        });
        }
        (this._interaction as OlDrawInstanceType).on("drawstart", (e) => {
            console.log("drawstart")
            console.log(e)
            const { feature } = e
            if(isDefined(feature)) {
                console.log(feature)
                measureFeature = feature
                measureListener = measureFeature.getGeometry()?.on('change', (e) => {
                    console.log(e)
                    const { target } = e
                    if(isDefined(target)) {
                        if(target instanceof OlGeometry.LineString) {
                            console.log(target.getCoordinates())
                        } else if(target instanceof OlGeometry.Polygon) {
                            // console.log(target.getCoordinates())
                        }
                    }
                })
            }
        })
        // (this._interaction as OlDrawInstanceType).on("drawend", (e) => {
        //     const { feature } = e
        //     console.log(this.layer?.getFeatures())
        //     if (isDefined(feature)) {
        //         // 根据原生的feature生成内部的feature
        //         let basicFeature = createBaseFeatureByOlFeature(feature)
        //         if (basicFeature) {
        //             (this.layer as VectorLayer).addFeature(basicFeature)
        //             console.log(this.layer?.getFeatures())
        //         } else {
        //             warn_(createMessage('createBaseFeatureByOlFeature', '根据olFeature创建BasicFeature出错'));
        //         }
        //     }
        // })
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

}