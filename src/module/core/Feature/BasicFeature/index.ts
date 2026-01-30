import { OlFeature, OlGeometry } from '../../../../source/index'
import { isDefined, isNumber, isObject, isString } from '../../../../utils/index'
import { warn_, error_, getPackageMessage, commonMessage } from '../../../../utils/message'
import type {
    OlFeatureInstanceType,
    OMapBasicFeatureType,
    OlGeometryType,
    OlGeomInstanceType,
    OMapBasicFeatureCoordinatesType,
    BasicFeatureLike,
    BasicFeatureInitialized
} from './type'
import Extent from '../../../basic/Extent/index'
import { type OlStyleInstanceType, type  OMapStyleLike } from '../../../basic/Style/type'
import { handleGetStyleValue } from '../../../basic/Style/handle'
import type { PropertiesType } from '../../../../utils/type'
import { type OlFeatureLike } from '../../../core/Feature/BasicFeature/type'

const PACKAGE_NAME = 'BasicFeature';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * @class BasicFeature
 * @classdesc 要素基类（抽象类）
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/14
 * @updateDate 2025/10/6
 */

export default abstract class BasicFeature<T extends OlGeometryType> {

    protected id: number | string | null;
    protected type: OMapBasicFeatureType;
    protected _feature: OlFeatureInstanceType;
    protected _geometry: T;

    constructor(type: OMapBasicFeatureType, coordinatesOrFeature: OMapBasicFeatureCoordinatesType | OlFeatureInstanceType, radius?: number) {
        this.type = type;
        if (coordinatesOrFeature instanceof OlFeature) {
            this._initByFeature(coordinatesOrFeature)
        } else {
            this._init(coordinatesOrFeature as OMapBasicFeatureCoordinatesType, radius)
        }
    }

    protected abstract _init(coordinates: OMapBasicFeatureCoordinatesType, radius?: number): void;

    protected abstract _initByFeature(feature: OlFeatureInstanceType): void;

    /**
     * 获取原生的Openlayers Feature对象
     * @returns {OlFeatureInstanceType | undefined} 原生的Openlayers Feature对象
     */
    getFeature(): OlFeatureInstanceType | undefined {

        return this._feature
    }

    /**
     * 获取坐标
     * @returns {OMapBasicFeatureCoordinatesType} 坐标
     */
    abstract getCoordinates(): OMapBasicFeatureCoordinatesType | void;

    /**
     * 设置坐标
     * @param {OMapBasicFeatureCoordinatesType} coordinates 坐标
     */
    abstract setCoordinates(coordinates: OMapBasicFeatureCoordinatesType): void;


    setId(id: number | string): void {

        if (!isDefined(id)) {
            warn_(createMessage('setId', '参数id不能为空'));
            return;
        }
        if (!isNumber(id) && !isString(id)) {
            warn_(createMessage('setId', '参数id格式有误'));
            return;
        }
        this.id = id
    }

    getId(): number | string | null | undefined {

        return this.id
    }

    getType() {
        return this.type
    }

    changed(): void {
        this._feature.changed()
    }

    dispatchEvent() {

    }

    clone() {

    }

    get(key: string): any | void {

        if (!isDefined(key)) {
            error_(createMessage('get', commonMessage.paramsNotDefined('key')))
            return
        }
        if (!isString(key)) {
            error_(createMessage('get', commonMessage.paramsInvaildFormat('key', 'string')))
            return 
        }
        return this._feature.get(key)
    }

    /**
     * 获取原生的Openlayers Geometry对象
     * @returns {OlGeometryType | undefined} 原生的Openlayers Geometry对象
     */
    getGeometry(): OlGeometryType | void {

        return this._geometry
    }

    getGeometryName() : string | void {

    }

    getKeys() : string[] | void {

        return this._feature.getKeys()
    }

    getStyle() {

    }

    setStyle(style?: OMapStyleLike) {
        let _style = handleGetStyleValue(style)
        if (isDefined(_style)) {
            this._feature.setStyle(_style)
        }
    }

    /**
     * 获取要素的范围
     * @returns {Extent | undefined} 要素的范围
     */
    getExtent(): Extent | void {

        let extent = this._geometry.getExtent()
        return new Extent(extent)
    }

    getProperties(): PropertiesType | undefined {

        return this._feature.getProperties()
    }

    setProperties(properties: PropertiesType) {

        if (!isDefined(properties)) {
            warn_(createMessage('setProperties', '参数不能为空'));
            return;
        }
        if (!isObject(properties)) {
            warn_(createMessage('setProperties', '参数应为对象类型'));
            return;
        }
        this._feature.setProperties(properties)
    }

}