import { OlFeature, OlGeometry } from '../../../../source/index'
import { isDefined, isNumber, isObject, isString } from '../../../../utils/index'
import { warn_, error_, getPackageMessage } from '../../../../utils/message'
import type {
    OlFeatureInstanceType,
    OMapBasicFeatureType,
    OlGeometryType,
    OlGeomInstanceType,
    OMapBasicFeatureCoordinatesType,
    BasicFeatureLike,
    BasicFeatureInitialized
} from './type'
import type { PropertiesType } from '../../../../utils/type'

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

export default abstract class BasicFeature<T extends OlGeometryType> implements BasicFeatureLike {

    id?: number | string | null;
    type?: OMapBasicFeatureType;
    _feature?: OlFeatureInstanceType;
    _geometry?: T;

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

    protected abstract _isInitialized(method: string): boolean;

    getFeature(): OlFeatureInstanceType | undefined {
        if (!this._isInitialized('getFeature')) return;
        return this._feature
    }

    getGeometry() {
        return this._geometry
    }

    /**
     * 获取坐标
     * @returns {OMapBasicFeatureCoordinatesType} 坐标
     */
    abstract getCoordinates(): OMapBasicFeatureCoordinatesType;

    /**
     * 设置坐标
     * @param {OMapBasicFeatureCoordinatesType} coordinates 坐标
     */
    abstract setCoordinates(coordinates: OMapBasicFeatureCoordinatesType): void;

    getProperties(): PropertiesType | undefined {
        if (!this._isInitialized('getProperties')) return;
        return (this._feature as OlFeatureInstanceType).getProperties()
    }

    setProperties(properties: PropertiesType) {
        if (!this._isInitialized('setProperties')) return;
        if (!isDefined(properties)) {
            warn_(createMessage('setProperties', '参数不能为空'));
            return;
        }
        if (!isObject(properties)) {
            warn_(createMessage('setProperties', '参数应为对象类型'));
            return;
        }
        (this._feature as OlFeatureInstanceType).setProperties(properties || {})
    }

    setId(id: number | string): void {
        if (!this._isInitialized('setId')) return;
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
        if (!this._isInitialized('getId')) return;
        return this.id
    }

    getType() {
        return this.type
    }

}