import { isArray, isDefined, isEmptyArray, isFunction, isString, isNumber, isCoordinatesType } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type { OlCoordinateType } from '../../../utils/index'
import type {
    OMapVectorLayerOptionsFinalType,
    OMapVectorSourceOptionsFinalType,
    OlVectorLayerInstanceType,
    OlVectorSourceInstanceType
} from './type'
import type { OlFeatureInstanceType, OlFeatureLike } from '../../core/Feature/BasicFeature/type'
import type { OlStyleInstanceType } from '../../basic/Style/type'
import { OlLayer, OlSource, OlUtil } from '../../../source/index'
import BaseLayer from '../BaseLayer/index'
import BaseFeature from '../../core/Feature/BasicFeature/index'
import { Extent, Lnglat, Projection, Style } from '../../../index'

let PACKAGE_NAME = 'VectorLayer';
let createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 矢量图层类
 * @class
 * @classdesc 基础的矢量地图服务
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/14
 * @updateDate 2025/7/23
 */

export default class VectorLayer extends BaseLayer {

    features: BaseFeature[] = []

    constructor(options: OMapVectorLayerOptionsFinalType = {}) {
        super('Vector', options)
        let _sourceOptions: OMapVectorSourceOptionsFinalType = isDefined(options.source) ? options.source : {}
        let _sourceParams = {
            ..._sourceOptions,
            features: _sourceOptions.features ? _sourceOptions.features.map(f => {
                return f.getFeature() as OlFeatureInstanceType
            }) : []
        }
        let _style: OlStyleInstanceType | Array<OlStyleInstanceType> | ((feature: OlFeatureLike, resolution: number) => (OlStyleInstanceType | undefined)) | undefined = undefined
        if (isDefined(options.style)) {
            if (options.style instanceof Style) {
                _style = options.style.getStyle()
            } else if (isArray(options.style) && (options.style as Style[]).every(s => s instanceof Style)) {
                _style = (options.style as Style[]).map(s => (s.getStyle() as OlStyleInstanceType))
            } else if (isFunction(options.style)) {
                _style = (feature: OlFeatureLike, resolution: number) => {
                    let uid = OlUtil.getUid(feature)
                    let index = this.features.findIndex(f => OlUtil.getUid(f.getFeature()) === uid)
                    let style = (options.style as Function)(index !== - 1 ? this.features[index] : null, resolution)
                    return style ? style.getStyle() : undefined
                }
            }
        }
        this._layer = new OlLayer.Vector({
            source: new OlSource.Vector(_sourceParams),
            style: _style
        })
        this._initLayerEvent()
    }

    protected _isInitializedLayer(method: string): this is { _layer: OlVectorLayerInstanceType } & this {
        if (!this._isInitialized(method)) {
            warn_(createMessage(method, '未正确实例化'));
            return false;
        }
        return true;
    }

    getFeatures(): BaseFeature[] | undefined {
        if (!this._isInitializedLayer('getFeatures')) return;
        return this.features
    }

    getFeatureById(id: number | string): BaseFeature | undefined {
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

    getFeaturesInExtent(extent: Extent, projection: Projection) {

    }

    addFeature(feature: BaseFeature): void {
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

    addFeatures(features: BaseFeature[]): void {
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

    removeFeature(feature: BaseFeature): void {
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

    removeFeatures(features: BaseFeature[]): void {
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

    forEachFeature(callback: (feature: BaseFeature, index: number) => void): void {
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
    forEachFeatureInExtent(extent: Extent, callback: (feature: BaseFeature, index: number) => void): void {
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
    forEachFeatureIntersectingExtent(extent: Extent, callback: (feature: BaseFeature, index: number) => void) {
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

    getClosestFeatureToCoordinate(coordinates: Lnglat | OlCoordinateType, filter?: (feature: BaseFeature) => boolean): BaseFeature | undefined {
        if (!this._isInitializedLayer('getClosestFeatureToCoordinate')) return;
        if (!isDefined(coordinates)) {
            warn_(createMessage('getClosestFeatureToCoordinate', 'coordinates参数不能为空'));
            return;
        }
        if (!(coordinates instanceof Lnglat) && !isCoordinatesType(coordinates)) {
            warn_(createMessage('getClosestFeatureToCoordinate', 'coordinates参数格式有误'));
            return;
        }
        let _coordinates = (coordinates instanceof Lnglat) ? coordinates._lnglat : coordinates;
        (this._layer.getSource() as OlVectorSourceInstanceType).getClosestFeatureToCoordinate(_coordinates, (feature: OlFeatureLike) => {
            console.log(feature)
            return true
        })
    }

}