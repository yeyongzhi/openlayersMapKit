import { isDefined, isFunction, isNumber, isString } from '../../../utils/index'
import { error_, getPackageMessage } from '../../../utils/message'
import { OlSource, OlUtil } from '../../../source/index'
import type { EventsKey } from 'ol/events'
import Projection from '../../core/Projection/index'
import Extent from '../../basic/Extent/index'
import type { OMapExtentType, OlExtentType } from '../../basic/Extent/type'
import { handleGetExtentValue } from '../../basic/Extent/handle'
import type { OMapCoordinateType } from '../../basic/Lnglat/type'
import { handleGetLnglatValue } from '../../basic/Lnglat/handle'
import { createBaseFeatureByOlFeature } from '../../core/Feature/BasicFeature/handle'
import Source from '../Source/index'
import {
    DEFAULT_VECTOR_SOURCE_PARAMS,
    VECTOR_SOURCE_EVENT_TYPES,
    handleGetVectorSourceParams,
    type OMapVectorSourceEventListener,
    type OMapVectorSourceEventType,
    type OMapVectorSourceFeature,
    type OMapVectorSourceLoader,
    type OMapVectorSourceOlFeature,
    type OMapVectorSourceParamsType,
    type OMapVectorSourceType,
    type OMapVectorSourceUrl
} from './type'

const PACKAGE_NAME = 'VectorSource';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * OMap VectorSource 类
 * @class
 * @classdesc 矢量数据源，提供 Feature 增删查、范围检索、远程加载与事件能力。
 * @description 参考：https://openlayers.org/en/latest/apidoc/module-ol_source_Vector-VectorSource.html
 * @author Aurora
 * @version 1.0.0
 * @createDate 2026/7/8
 * @updateDate 2026/7/8
 */

export default class VectorSource extends Source<OMapVectorSourceType> {

    protected featureCache = new Map<string, OMapVectorSourceFeature>();

    constructor(params: OMapVectorSourceParamsType = {}) {
        const sourceParams = handleGetVectorSourceParams({
            ...DEFAULT_VECTOR_SOURCE_PARAMS,
            ...params
        })
        super(new OlSource.Vector(sourceParams))
        params.features?.forEach(feature => this.cacheFeature(feature));
    }

    addFeature(feature: OMapVectorSourceFeature) {
        this.cacheFeature(feature);
        this._source.addFeature(this.getOlFeature(feature, 'addFeature'));
    }

    addFeatures(features: Array<OMapVectorSourceFeature>) {
        if (!Array.isArray(features)) {
            error_(createMessage('addFeatures', 'features必须是Feature数组'));
        }
        features.forEach(feature => this.cacheFeature(feature));
        this._source.addFeatures(features.map(feature => this.getOlFeature(feature, 'addFeatures')));
    }

    removeFeature(feature: OMapVectorSourceFeature) {
        this._source.removeFeature(this.getOlFeature(feature, 'removeFeature'));
        this.deleteFeatureCache(feature);
    }

    removeFeatures(features: Array<OMapVectorSourceFeature>) {
        if (!Array.isArray(features)) {
            error_(createMessage('removeFeatures', 'features必须是Feature数组'));
        }
        this._source.removeFeatures(features.map(feature => this.getOlFeature(feature, 'removeFeatures')));
        features.forEach(feature => this.deleteFeatureCache(feature));
    }

    clear(fast?: boolean) {
        this._source.clear(fast);
        this.featureCache.clear();
    }

    forEachFeature<T>(callback: (feature: OMapVectorSourceFeature) => T): T | undefined {
        this.validateCallback(callback, 'forEachFeature');
        return this._source.forEachFeature(feature => {
            const omapFeature = this.createOMapFeature(feature);
            return omapFeature ? callback(omapFeature) : undefined;
        });
    }

    forEachFeatureInExtent<T>(
        extent: OMapExtentType,
        callback: (feature: OMapVectorSourceFeature) => T
    ): T | undefined {
        this.validateCallback(callback, 'forEachFeatureInExtent');
        return this._source.forEachFeatureInExtent(
            this.getOlExtent(extent, 'forEachFeatureInExtent'),
            feature => {
                const omapFeature = this.createOMapFeature(feature);
                return omapFeature ? callback(omapFeature) : undefined;
            }
        );
    }

    forEachFeatureIntersectingExtent<T>(
        extent: OMapExtentType,
        callback: (feature: OMapVectorSourceFeature) => T
    ): T | undefined {
        this.validateCallback(callback, 'forEachFeatureIntersectingExtent');
        return this._source.forEachFeatureIntersectingExtent(
            this.getOlExtent(extent, 'forEachFeatureIntersectingExtent'),
            feature => {
                const omapFeature = this.createOMapFeature(feature);
                return omapFeature ? callback(omapFeature) : undefined;
            }
        );
    }

    getFeatures(): Array<OMapVectorSourceFeature> {
        return this._source
            .getFeatures()
            .map(feature => this.createOMapFeature(feature))
            .filter(isDefined);
    }

    getFeaturesCollection() {
        return this._source.getFeaturesCollection();
    }

    getFeaturesAtCoordinate(coordinate: OMapCoordinateType): Array<OMapVectorSourceFeature> {
        return this._source
            .getFeaturesAtCoordinate(this.getOlCoordinate(coordinate, 'getFeaturesAtCoordinate'))
            .map(feature => this.createOMapFeature(feature))
            .filter(isDefined);
    }

    getFeaturesInExtent(extent: OMapExtentType, projection?: Projection): Array<OMapVectorSourceFeature> {
        return this._source
            .getFeaturesInExtent(
                this.getOlExtent(extent, 'getFeaturesInExtent'),
                projection?.getProjection()
            )
            .map(feature => this.createOMapFeature(feature))
            .filter(isDefined);
    }

    getClosestFeatureToCoordinate(
        coordinate: OMapCoordinateType,
        filter?: (feature: OMapVectorSourceFeature) => boolean
    ): OMapVectorSourceFeature | undefined {
        const olFilter = filter
            ? (feature: OMapVectorSourceOlFeature) => {
                const omapFeature = this.createOMapFeature(feature);
                return omapFeature ? filter(omapFeature) : false;
            }
            : undefined
        const feature = this._source.getClosestFeatureToCoordinate(
            this.getOlCoordinate(coordinate, 'getClosestFeatureToCoordinate'),
            olFilter
        );
        return feature ? this.createOMapFeature(feature) : undefined;
    }

    getExtent(extent?: OMapExtentType): Extent {
        const targetExtent = isDefined(extent) ? this.getOlExtent(extent, 'getExtent') : undefined;
        return new Extent(this._source.getExtent(targetExtent));
    }

    getFeatureById(id: string | number): OMapVectorSourceFeature | undefined {
        if (!isString(id) && !isNumber(id)) {
            error_(createMessage('getFeatureById', 'id必须是字符串或数字'));
        }
        const feature = this._source.getFeatureById(id);
        return feature ? this.createOMapFeature(feature) : undefined;
    }

    getFormat() {
        return this._source.getFormat();
    }

    getOverlaps() {
        return this._source.getOverlaps();
    }

    getUrl() {
        return this._source.getUrl();
    }

    hasFeature(feature: OMapVectorSourceFeature): boolean {
        return this._source.hasFeature(this.getOlFeature(feature, 'hasFeature'));
    }

    isEmpty(): boolean {
        return this._source.isEmpty();
    }

    loadFeatures(extent: OMapExtentType, resolution: number, projection: Projection) {
        if (!isNumber(resolution) || !(projection instanceof Projection)) {
            error_(createMessage('loadFeatures', 'resolution或projection参数格式有误'));
        }
        this._source.loadFeatures(
            this.getOlExtent(extent, 'loadFeatures'),
            resolution,
            projection.getProjection()
        );
    }

    removeLoadedExtent(extent: OMapExtentType) {
        this._source.removeLoadedExtent(this.getOlExtent(extent, 'removeLoadedExtent'));
    }

    setLoader(loader: OMapVectorSourceLoader) {
        if (!isFunction(loader)) {
            error_(createMessage('setLoader', 'loader必须是函数'));
        }
        this._source.setLoader(loader);
    }

    setUrl(url: OMapVectorSourceUrl) {
        if (!isString(url) && !isFunction(url)) {
            error_(createMessage('setUrl', 'url必须是字符串或函数'));
        }
        this._source.setUrl(url);
    }

    setOverlaps(overlaps: boolean) {
        this._source.setOverlaps(overlaps);
    }

    onVector(type: OMapVectorSourceEventType, listener: OMapVectorSourceEventListener): EventsKey {
        if (!Object.values(VECTOR_SOURCE_EVENT_TYPES).includes(type) || !isFunction(listener)) {
            error_(createMessage('onVector', 'type或listener参数格式有误'));
        }
        return this._source.on(type, listener);
    }

    onAddFeature(listener: OMapVectorSourceEventListener): EventsKey {
        return this.onVector(VECTOR_SOURCE_EVENT_TYPES.addFeature, listener);
    }

    onChangeFeature(listener: OMapVectorSourceEventListener): EventsKey {
        return this.onVector(VECTOR_SOURCE_EVENT_TYPES.changeFeature, listener);
    }

    onRemoveFeature(listener: OMapVectorSourceEventListener): EventsKey {
        return this.onVector(VECTOR_SOURCE_EVENT_TYPES.removeFeature, listener);
    }

    onClear(listener: OMapVectorSourceEventListener): EventsKey {
        return this.onVector(VECTOR_SOURCE_EVENT_TYPES.clear, listener);
    }

    onFeaturesLoadStart(listener: OMapVectorSourceEventListener): EventsKey {
        return this.onVector(VECTOR_SOURCE_EVENT_TYPES.featuresLoadStart, listener);
    }

    onFeaturesLoadEnd(listener: OMapVectorSourceEventListener): EventsKey {
        return this.onVector(VECTOR_SOURCE_EVENT_TYPES.featuresLoadEnd, listener);
    }

    onFeaturesLoadError(listener: OMapVectorSourceEventListener): EventsKey {
        return this.onVector(VECTOR_SOURCE_EVENT_TYPES.featuresLoadError, listener);
    }

    protected createOMapFeature(feature: OMapVectorSourceOlFeature): OMapVectorSourceFeature | undefined {
        const uid = OlUtil.getUid(feature);
        const cachedFeature = this.featureCache.get(uid);
        if (cachedFeature) {
            return cachedFeature;
        }
        const omapFeature = createBaseFeatureByOlFeature(feature) as OMapVectorSourceFeature | null;
        if (omapFeature) {
            this.cacheFeature(omapFeature);
        }
        return omapFeature || undefined;
    }

    protected getOlFeature(feature: OMapVectorSourceFeature, methodName: string): OMapVectorSourceOlFeature {
        if (!isDefined(feature) || !isFunction(feature.getFeature)) {
            error_(createMessage(methodName, 'feature参数格式有误'));
        }
        return feature.getFeature() as OMapVectorSourceOlFeature;
    }

    protected getOlExtent(extent: OMapExtentType, methodName: string): OlExtentType {
        const olExtent = handleGetExtentValue(extent);
        if (!isDefined(olExtent)) {
            error_(createMessage(methodName, 'extent参数格式有误'));
        }
        return olExtent;
    }

    protected getOlCoordinate(coordinate: OMapCoordinateType, methodName: string) {
        const olCoordinate = handleGetLnglatValue(coordinate);
        if (!isDefined(olCoordinate)) {
            error_(createMessage(methodName, 'coordinate参数格式有误'));
        }
        return olCoordinate;
    }

    protected validateCallback(callback: Function, methodName: string) {
        if (!isFunction(callback)) {
            error_(createMessage(methodName, 'callback必须是函数'));
        }
    }

    protected cacheFeature(feature: OMapVectorSourceFeature) {
        this.featureCache.set(OlUtil.getUid(this.getOlFeature(feature, 'cacheFeature')), feature);
    }

    protected deleteFeatureCache(feature: OMapVectorSourceFeature) {
        this.featureCache.delete(OlUtil.getUid(this.getOlFeature(feature, 'deleteFeatureCache')));
    }

}
