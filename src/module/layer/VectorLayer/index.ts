import { isArray, isDefined, isEmptyArray, isFunction, isString, isNumber, isCoordinatesType, isExtentType } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import {
    type OMapVectorLayerOptionsFinalType,
    type OMapVectorSourceOptionsFinalType,
    type OlVectorLayerInstanceType,
    type OlVectorSourceInstanceType,
    type OMapVectorLayerType,
} from './type'
import type { OlFeatureLike } from '../../core/Feature/BasicFeature/type'
import type { OlStyleInstanceType, OMapStyleLike } from '../../basic/Style/type'
import { OlLayer, OlFeature, OlGeometry } from '../../../source/index'
import BaseLayer from '../BaseLayer/index'
import BaseFeature from '../../core/Feature/BasicFeature/index'
import VectorSource from '../../source/VectorSource/index'
import Draw from '../../interaction/Draw/index'
import { DrawEventType } from '../../interaction/Draw/type'
import { handleInteractionDrawEvent } from '../../interaction/Draw/handle'
import Measure from '../../interaction/Measure/index'
import Extent from '../../basic/Extent/index'
import type { OMapExtentType } from '../../basic/Extent/type'
import Lnglat from '../../basic/Lnglat/index'
import type { OMapCoordinateType } from '../../basic/Lnglat/type'
import { Projection, Style } from '../../../index'

let PACKAGE_NAME = 'VectorLayer';
let createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 矢量图层类
 * @class
 * @classdesc 基础的矢量地图服务
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/14
 * @updateDate 2026/1/29
 */

export default class VectorLayer extends BaseLayer<OMapVectorLayerType> {

    protected vectorSource!: VectorSource;

    style: OMapStyleLike | undefined;

    constructor(options: OMapVectorLayerOptionsFinalType = {}) {
        super('Vector', options)
        let _sourceOptions: OMapVectorSourceOptionsFinalType = isDefined(options.source) ? options.source : {}
        this.vectorSource = new VectorSource(_sourceOptions)
        this._layer = new OlLayer.Vector({
            source: this.vectorSource.getSource()
        })
        this.initStyle(options.style)
        this._initLayerEvent()
        this.initVectorLyaerEvent()
    }

    getVectorSource(): VectorSource {
        return this.vectorSource;
    }

    /**
     * 初始化矢量图层事件
     */
    protected initVectorLyaerEvent() {
        (this._layer.getSource() as OlVectorSourceInstanceType).on("addfeature", (e) => {
            const { feature } = e
            if(isDefined(feature)) {
                // 根据原生的feature生成内部的feature
                if(this.target instanceof Draw || this.target instanceof Measure) {
                    const basicFeature = this.syncFeatureFromOlFeature(feature as OlFeature<OlGeometry.Geometry>)
                    if(!basicFeature) {
                        warn_(createMessage('syncFeatureFromOlFeature', '根据olFeature同步BasicFeature出错'));
                    }
                    // 绘制结束事件 需要在 addfeature 事件之后 触发，才能获取到完整的 feature
                    if(this.target instanceof Draw && this.target.getActive()) {
                        this.target.events.emit(DrawEventType.drawEnd, handleInteractionDrawEvent(this.target, DrawEventType.drawEnd, { feature }))
                    }
                }
            }
        })
    }

    /**
     * 初始化样式
     * @param {OMapStyleLike | undefined} style 样式
     */
    protected initStyle(style: OMapStyleLike | undefined): void {
        let _style: OlStyleInstanceType | Array<OlStyleInstanceType> | ((feature: OlFeatureLike, resolution: number) => (OlStyleInstanceType | undefined)) | undefined = undefined
        if (isDefined(style)) {
            if (style instanceof Style) {
                _style = style.getStyle()
            } else if (isArray(style) && (style as Style[]).every(s => s instanceof Style)) {
                _style = (style as Style[]).map(s => (s.getStyle() as OlStyleInstanceType))
            } else if (isFunction(style)) {
                _style = (feature: OlFeatureLike, resolution: number) => {
                    const omapFeature = feature instanceof OlFeature
                        ? this.syncFeatureFromOlFeature(feature as OlFeature<OlGeometry.Geometry>)
                        : undefined
                    let styleFnResult = (style as Function)(omapFeature || null, resolution)
                    return styleFnResult ? styleFnResult.getStyle() : undefined
                }
            } else {
                warn_(createMessage('initStyle', 'style格式有误'));
            }
        }
        if(_style) {
            this._layer.setStyle(_style)
            this.style = style // 到这里才更新style属性
        }
    }

    getFeatures(): BaseFeature<OlGeometry.Geometry>[] {
        return this.vectorSource.getFeatures() as BaseFeature<OlGeometry.Geometry>[]
    }

    getFeatureById(id: number | string): BaseFeature<OlGeometry.Geometry> | undefined {
        if (!isDefined(id)) {
            warn_(createMessage('setId', '参数id不能为空'));
            return;
        }
        if (!isNumber(id) && !isString(id)) {
            warn_(createMessage('setId', '参数id格式有误'));
            return;
        }
        return this.vectorSource.getFeatureById(id) as BaseFeature<OlGeometry.Geometry> | undefined
    }

    getFeatureByOlFeature(feature: OlFeature<OlGeometry.Geometry>): BaseFeature<OlGeometry.Geometry> | undefined {
        if (!isDefined(feature)) {
            warn_(createMessage('getFeatureByOlFeature', 'feature参数不能为空'));
            return;
        }
        return this.syncFeatureFromOlFeature(feature)
    }

    getFeaturesInExtent(extent: OMapExtentType, projection: Projection): BaseFeature<OlGeometry.Geometry>[] | undefined {
        if (!isDefined(extent)) {
            warn_(createMessage('getFeaturesInExtent', 'extent参数不能为空'));
            return;
        }
        if (!(extent instanceof Extent) && !isExtentType(extent)) {
            warn_(createMessage('getFeaturesInExtent', 'extent参数格式有误'));
            return;
        }
        return this.vectorSource.getFeaturesInExtent(extent, projection) as BaseFeature<OlGeometry.Geometry>[]

    }

    getFeaturesAtCoordinate(coordinates: OMapCoordinateType) {
        if (!isDefined(coordinates)) {
            warn_(createMessage('getFeaturesAtCoordinate', 'coordinates参数不能为空'));
            return;
        }
        if (!(coordinates instanceof Lnglat) && !isCoordinatesType(coordinates)) {
            warn_(createMessage('getFeaturesAtCoordinate', 'coordinates参数格式有误'));
            return;
        }
        return this.vectorSource.getFeaturesAtCoordinate(coordinates) as BaseFeature<OlGeometry.Geometry>[]

    }

    addFeature(feature: BaseFeature<OlGeometry.Geometry>): void {
        if (!isDefined(feature)) {
            warn_(createMessage('addFeature', '参数不能为空'));
            return;
        }
        if (this._layer.getSource()) {
            if (!this.vectorSource.hasFeature(feature)) {
                this.vectorSource.addFeature(feature)
            }
        }
    }

    addFeatures(features: BaseFeature<OlGeometry.Geometry>[]): void {
        if (!isDefined(features) || !isArray(features)) {
            warn_(createMessage('addFeatures', '参数格式有误不能为空'));
            return;
        }
        if (!isEmptyArray(features)) {
            features.forEach(f => {
                this.addFeature(f)
            })
        }
    }

    removeFeature(feature: BaseFeature<OlGeometry.Geometry>): void {
        if (!isDefined(feature)) {
            warn_(createMessage('removeFeature', '参数不能为空'));
            return;
        }
        if (this._layer.getSource()) {
            this.vectorSource.removeFeature(feature)
        }
    }

    removeFeatures(features: BaseFeature<OlGeometry.Geometry>[]): void {
        if (!isDefined(features) || !isArray(features)) {
            warn_(createMessage('removeFeatures', '参数格式有误不能为空'));
            return;
        }
        if (!isEmptyArray(features)) {
            features.forEach(f => {
                this.removeFeature(f)
            })
        }
    }

    clear() {
        if (!this._layer.getSource()) {
            return;
        }
        this.vectorSource.clear()
    }

    forEachFeature(callback: (feature: BaseFeature<OlGeometry.Geometry>, index: number) => void): void {
        if (!isDefined(callback) || !isFunction(callback)) {
            warn_(createMessage('forEachFeature', '参数格式有误'));
            return;
        }
        this.getFeatures().forEach((f, i) => {
            callback(f, i)
        })
    }

    /**
     * 遍历指定范围的特征
     * @param {Extent} extent 范围
     * @param {Function} callback 回调函数
     * @returns {void}
     */
    forEachFeatureInExtent(extent: Extent, callback: (feature: BaseFeature<OlGeometry.Geometry>, index: number) => void): void {
        if (!isDefined(callback)) {
            warn_(createMessage('forEachFeatureInExtent', 'callback参数不能为空'));
            return;
        }
        let index = 0
        this.vectorSource.forEachFeatureInExtent(extent, (feature) => {
            callback(feature as BaseFeature<OlGeometry.Geometry>, index++)
        })
    }

    /**
     * 遍历与指定范围相交的特征
     * @param {Extent} extent 范围
     * @param {Function} callback 回调函数
     * @returns {void}
     */
    forEachFeatureIntersectingExtent(extent: Extent, callback: (feature: BaseFeature<OlGeometry.Geometry>, index: number) => void) {
        if (!isDefined(callback)) {
            warn_(createMessage('forEachFeatureIntersectingExtent', 'callback参数不能为空'));
            return;
        }
        let index = 0
        this.vectorSource.forEachFeatureIntersectingExtent(extent, (feature) => {
            callback(feature as BaseFeature<OlGeometry.Geometry>, index++)
        })
    }

    getClosestFeatureToCoordinate(coordinates: OMapCoordinateType, filter?: (feature: BaseFeature<OlGeometry.Geometry>) => boolean): BaseFeature<OlGeometry.Geometry> | undefined {
        if (!isDefined(coordinates)) {
            warn_(createMessage('getClosestFeatureToCoordinate', 'coordinates参数不能为空'));
            return;
        }
        if (!(coordinates instanceof Lnglat) && !isCoordinatesType(coordinates)) {
            warn_(createMessage('getClosestFeatureToCoordinate', 'coordinates参数格式有误'));
            return;
        }
        return this.vectorSource.getClosestFeatureToCoordinate(coordinates, filter) as BaseFeature<OlGeometry.Geometry> | undefined

    }

    getSourceExtent(): Extent {
        return this.vectorSource.getExtent()
    }

    // 样式管理
    /**
     * 获取样式
     * @returns {OMapStyleLike | undefined} style 样式
     */
    getStyle(): OMapStyleLike | undefined {
        return this.style
    }
    
    /**
     * 设置图层样式
     * @param {OMapStyleLike} style 新样式
     */
    setStyle(style: OMapStyleLike): void {
        if(!isDefined(style)) {
            warn_(createMessage('setStyle', 'style参数不能为空'));
            return;
        }
        this.initStyle(style)
    }

    /**
     * 设置去重叠功能
     * @param declutter 
     * @returns 
     */
    setDeclutter(declutter: boolean | string | number): void {
        this._layer.setDeclutter(declutter)
    }

    protected syncFeatureFromOlFeature(feature: OlFeature<OlGeometry.Geometry>): BaseFeature<OlGeometry.Geometry> | undefined {
        return this.vectorSource.getFeatureByOlFeature(feature) as BaseFeature<OlGeometry.Geometry> | undefined
    }

}
