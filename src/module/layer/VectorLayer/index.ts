import { isArray, isDefined, isEmptyArray, isFunction, isString, isNumber, isCoordinatesType, isExtentType } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type {
    OMapVectorLayerOptionsFinalType,
    OMapVectorSourceOptionsFinalType,
    OlVectorLayerInstanceType,
    OlVectorSourceInstanceType
} from './type'
import type { OlFeatureInstanceType, OlFeatureLike } from '../../core/Feature/BasicFeature/type'
import { createBaseFeatureByOlFeature } from '../../core/Feature/BasicFeature/handle'
import type { OlStyleInstanceType, OMapStyleLike } from '../../basic/Style/type'
import { OlLayer, OlSource, OlUtil, OlFeature, OlGeometry } from '../../../source/index'
import BaseLayer from '../BaseLayer/index'
import BaseFeature from '../../core/Feature/BasicFeature/index'
import Draw from '../../interaction/Draw/index'
import Measure from '../../interaction/Measure/index'
import Extent from '../../basic/Extent/index'
import type { OlExtentType, OMapExtentType } from '../../basic/Extent/type'
import Lnglat from '../../basic/Lnglat/index'
import type { OlCoordinateType, OMapCoordinateType } from '../../basic/Lnglat/type'
import { handleGetLnglatValue } from '../../basic/Lnglat/handle'
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
 * @updateDate 2025/12/20
 */

export default class VectorLayer extends BaseLayer {

    features: BaseFeature<OlGeometry.Geometry>[] = []

    style: OMapStyleLike | undefined;

    constructor(options: OMapVectorLayerOptionsFinalType = {}) {
        super('Vector', options)
        let _sourceOptions: OMapVectorSourceOptionsFinalType = isDefined(options.source) ? options.source : {}
        let _sourceParams = {
            ..._sourceOptions,
            features: _sourceOptions.features ? _sourceOptions.features.map(f => {
                return f.getFeature() as OlFeatureInstanceType
            }) : []
        }
        this._layer = new OlLayer.Vector({
            source: new OlSource.Vector(_sourceParams)
        })
        this.initStyle(options.style)
        this._initLayerEvent()
        this.initVectorLyaerEvent()
    }

    protected _isInitializedLayer(method: string): this is { _layer: OlVectorLayerInstanceType } & this {
        if (!this._isInitialized(method)) {
            warn_(createMessage(method, '未正确实例化'));
            return false;
        }
        return true;
    }

    /**
     * 初始化矢量图层事件
     */
    protected initVectorLyaerEvent() {
        if (!this._isInitializedLayer('initVectorLyaerEvent')) return;
        (this._layer.getSource() as OlVectorSourceInstanceType).on("addfeature", (e) => {
            const { feature } = e
            if(isDefined(feature)) {
                // 根据原生的feature生成内部的feature
                if(this.target instanceof Draw || this.target instanceof Measure) {
                    // 这里一定要保证原生的feature 和 basicFeature 状态是同步的
                    // 因此 createBaseFeatureByOlFeature 里面不能用fearure.clone()
                    let basicFeature = createBaseFeatureByOlFeature(feature as OlFeature<OlGeometry.Geometry>)
                    if(basicFeature) {
                        this.features.push(basicFeature) // 这里是把 feature 同步一份到 this.features 里面
                    } else {
                        warn_(createMessage('createBaseFeatureByOlFeature', '根据olFeature创建BasicFeature出错'));
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
        if (!this._isInitializedLayer('initStyle')) return;
        let _style: OlStyleInstanceType | Array<OlStyleInstanceType> | ((feature: OlFeatureLike, resolution: number) => (OlStyleInstanceType | undefined)) | undefined = undefined
        if (isDefined(style)) {
            if (style instanceof Style) {
                _style = style.getStyle()
            } else if (isArray(style) && (style as Style[]).every(s => s instanceof Style)) {
                _style = (style as Style[]).map(s => (s.getStyle() as OlStyleInstanceType))
            } else if (isFunction(style)) {
                _style = (feature: OlFeatureLike, resolution: number) => {
                    let uid = OlUtil.getUid(feature)
                    let index = this.features.findIndex(f => OlUtil.getUid(f.getFeature()) === uid)
                    let styleFnResult = (style as Function)(index !== - 1 ? this.features[index] : null, resolution)
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

    getFeatures(): BaseFeature<OlGeometry.Geometry>[] | undefined {
        if (!this._isInitializedLayer('getFeatures')) return;
        return this.features
    }

    getFeatureById(id: number | string): BaseFeature<OlGeometry.Geometry> | undefined {
        if (!this._isInitializedLayer('getFeatureById')) return;
        if (!isDefined(id)) {
            warn_(createMessage('setId', '参数id不能为空'));
            return;
        }
        if (!isNumber(id) && !isString(id)) {
            warn_(createMessage('setId', '参数id格式有误'));
            return;
        }
        let target = this.features.find(f => {
            return isDefined(f.getId()) && f.getId() === id
        })
        return target || undefined
    }

    getFeaturesInExtent(extent: OMapExtentType, projection: Projection): BaseFeature<OlGeometry.Geometry>[] | undefined {
        if (!this._isInitializedLayer('getFeaturesInExtent')) return;
        if (!isDefined(extent)) {
            warn_(createMessage('getFeaturesInExtent', 'extent参数不能为空'));
            return;
        }
        if (!(extent instanceof Extent) && !isExtentType(extent)) {
            warn_(createMessage('getFeaturesInExtent', 'extent参数格式有误'));
            return;
        }
        let _extent = (extent instanceof Extent) ? extent.getExtent() : extent;
        let features = (this._layer.getSource() as OlVectorSourceInstanceType).getFeaturesInExtent(_extent as OlExtentType)
        let _features: BaseFeature<OlGeometry.Geometry>[] = []
        features.forEach(f => {
            let uid = OlUtil.getUid(f)
            let index = this.features.findIndex(f => OlUtil.getUid(f.getFeature()) === uid)
            if (index !== -1) {
                _features.push(this.features[index])
            }
        })
        return _features

    }

    getFeaturesAtCoordinate(coordinates: OMapCoordinateType) {
        if (!this._isInitializedLayer('getFeaturesAtCoordinate')) return;
        if (!isDefined(coordinates)) {
            warn_(createMessage('getFeaturesAtCoordinate', 'coordinates参数不能为空'));
            return;
        }
        if (!(coordinates instanceof Lnglat) && !isCoordinatesType(coordinates)) {
            warn_(createMessage('getFeaturesAtCoordinate', 'coordinates参数格式有误'));
            return;
        }
        let _coordinates = handleGetLnglatValue(coordinates);
        const features = (this._layer.getSource() as OlVectorSourceInstanceType).getFeaturesAtCoordinate(_coordinates as OlCoordinateType)
        let _features: BaseFeature<OlGeometry.Geometry>[] = []
        features.forEach(f => {
            let uid = OlUtil.getUid(f)
            let index = this.features.findIndex(f => OlUtil.getUid(f.getFeature()) === uid)
            if (index !== -1) {
                _features.push(this.features[index])
            }
        })
        return _features

    }

    addFeature(feature: BaseFeature<OlGeometry.Geometry>): void {
        if (!this._isInitializedLayer('addFeature')) return;
        if (!isDefined(feature)) {
            warn_(createMessage('addFeature', '参数不能为空'));
            return;
        }
        if (this._layer.getSource()) {
            (this._layer.getSource() as OlVectorSourceInstanceType).addFeature(feature.getFeature() as OlFeatureInstanceType)
            this.features.push(feature)
        }
    }

    addFeatures(features: BaseFeature<OlGeometry.Geometry>[]): void {
        if (!this._isInitializedLayer('addFeatures')) return;
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
        if (!this._isInitializedLayer('removeFeature')) return;
        if (!isDefined(feature)) {
            warn_(createMessage('removeFeature', '参数不能为空'));
            return;
        }
        if (this._layer.getSource()) {
            let index = this.features.indexOf(feature);
            (this._layer.getSource() as OlVectorSourceInstanceType).removeFeature(feature.getFeature() as OlFeatureInstanceType)
            this.features.splice(index, 1)
        }
    }

    removeFeatures(features: BaseFeature<OlGeometry.Geometry>[]): void {
        if (!this._isInitializedLayer('removeFeatures')) return;
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
        if (!this._isInitializedLayer('clear')) return;
        if (!this._layer.getSource()) {
            return;
        }
        (this._layer.getSource() as OlVectorSourceInstanceType).clear()
        this.features = []
    }

    forEachFeature(callback: (feature: BaseFeature<OlGeometry.Geometry>, index: number) => void): void {
        if (!this._isInitializedLayer('forEachFeature')) return;
        if (!isDefined(callback) || !isFunction(callback)) {
            warn_(createMessage('forEachFeature', '参数格式有误'));
            return;
        }
        this.features.forEach((f, i) => {
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
        if (!this._isInitializedLayer('forEachFeatureInExtent')) return;
        if (!isDefined(callback)) {
            warn_(createMessage('forEachFeatureInExtent', 'callback参数不能为空'));
            return;
        }
        (this._layer.getSource() as OlVectorSourceInstanceType).forEachFeatureInExtent(extent.getExtent() as number[], (feature: any) => {
            let uid = OlUtil.getUid(feature)
            let index = this.features.findIndex(f => OlUtil.getUid(f.getFeature()) === uid)
            if (isDefined(index) && index !== -1) {
                callback(this.features[index], 0)
            }
        })
    }

    /**
     * 遍历与指定范围相交的特征
     * @param {Extent} extent 范围
     * @param {Function} callback 回调函数
     * @returns {void}
     */
    forEachFeatureIntersectingExtent(extent: Extent, callback: (feature: BaseFeature<OlGeometry.Geometry>, index: number) => void) {
        if (!this._isInitializedLayer('forEachFeatureIntersectingExtent')) return;
        if (!isDefined(callback)) {
            warn_(createMessage('forEachFeatureIntersectingExtent', 'callback参数不能为空'));
            return;
        }
        (this._layer.getSource() as OlVectorSourceInstanceType).forEachFeatureIntersectingExtent(extent.getExtent() as number[], (feature: any) => {
            let uid = OlUtil.getUid(feature)
            let index = this.features.findIndex(f => OlUtil.getUid(f.getFeature()) === uid)
            if (isDefined(index) && index !== -1) {
                callback(this.features[index], 0)
            }
        })
    }

    getClosestFeatureToCoordinate(coordinates: OMapCoordinateType, filter?: (feature: BaseFeature<OlGeometry.Geometry>) => boolean): BaseFeature<OlGeometry.Geometry> | undefined {
        if (!this._isInitializedLayer('getClosestFeatureToCoordinate')) return;
        if (!isDefined(coordinates)) {
            warn_(createMessage('getClosestFeatureToCoordinate', 'coordinates参数不能为空'));
            return;
        }
        if (!(coordinates instanceof Lnglat) && !isCoordinatesType(coordinates)) {
            warn_(createMessage('getClosestFeatureToCoordinate', 'coordinates参数格式有误'));
            return;
        }
        let _coordinates = handleGetLnglatValue(coordinates);
        let filterFunction = filter ? (feature: OlFeatureLike) => {
            let uid = OlUtil.getUid(feature)
            let index = this.features.findIndex(f => OlUtil.getUid(f.getFeature()) === uid)
            return filter(this.features[index])
        } : undefined
        const re = (this._layer.getSource() as OlVectorSourceInstanceType).getClosestFeatureToCoordinate(_coordinates as OlCoordinateType, filterFunction)
        let resuleIndex = this.features.findIndex(f => OlUtil.getUid(f.getFeature()) === OlUtil.getUid(re))
        if (resuleIndex === -1) {
            return undefined;
        }
        return this.features[resuleIndex]

    }

    getSourceExtent(): Extent | undefined {
        if (!this._isInitializedLayer('getSourceExtent')) return;
        const extent = (this._layer.getSource() as OlVectorSourceInstanceType).getExtent()
        return new Extent(extent[0], extent[1], extent[2], extent[3])
    }

    // 样式管理
    /**
     * 获取样式
     * @returns {OMapStyleLike | undefined} style 样式
     */
    getStyle(): OMapStyleLike | undefined {
        if (!this._isInitializedLayer('getStyle')) return;
        return this.style
    }
    
    /**
     * 设置图层样式
     * @param {OMapStyleLike} style 新样式
     */
    setStyle(style: OMapStyleLike): void {
        if (!this._isInitializedLayer('setStyle')) return;
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
        if (!this._isInitializedLayer('setDeclutter')) return;
        this._layer.setDeclutter(declutter)
    }

}