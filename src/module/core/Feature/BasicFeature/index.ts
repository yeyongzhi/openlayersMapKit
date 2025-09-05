import { OlFeature, OlGeometry } from '../../../../source/index'
import { isDefined, isNumber, isObject, isString } from '../../../../utils/index'
import { warn_, error_, getPackageMessage } from '../../../../utils/message'
import type {
    OlFeatureInstanceType,
    OlFeatureType,
    OlGeomInstanceType,
    OMapBasicFeatureCoordinatesType,
    BasicFeatureLike,
    BasicFeatureInitialized
} from './type'
import type { OMapPointGeometryCoordinatesType } from '../Point/type'
import type { OMapLineStringGeometryCoordinatesType } from '../LineString/type'
import type { OMapPolygonGeometryCoordinatesType } from '../Polygon/type'
import type { OMapLinearRingGeometryCoordinatesType } from '../LinearRing/type'
import type { OlCoordinateType, PropertiesType } from '../../../../utils/type'
import { Lnglat } from '../../../../index';

const PACKAGE_NAME = 'Feature';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * 要素类
 * @class
 * @classdesc 要素类
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/14
 * @updateDate 2025/9/1
 */


export default class BasicFeature implements BasicFeatureLike {

    id?: number | string | null;
    type?: OlFeatureType;
    _feature?: OlFeatureInstanceType
    _geometry?: OlGeomInstanceType

    constructor(type: OlFeatureType, coordinatesOrFeature: OMapBasicFeatureCoordinatesType | OlFeatureInstanceType, radius?: number) {
        this.type = type;
        if (coordinatesOrFeature instanceof OlFeature) {
            this._initByFeature(coordinatesOrFeature)
        } else {
            this._init(coordinatesOrFeature as OMapBasicFeatureCoordinatesType, radius)
        }
    }

    protected _init(coordinates: OMapBasicFeatureCoordinatesType, radius?: number) {
        switch (this.type) {
            case 'Point':
                let p_coordinates = coordinates as OMapPointGeometryCoordinatesType
                this._geometry = new OlGeometry.Point((p_coordinates instanceof Lnglat) ? p_coordinates._lnglat : p_coordinates)
                break;
            case 'LineString':
                let l_coordinates = (coordinates as OMapLineStringGeometryCoordinatesType).map(c => {
                    return (c instanceof Lnglat) ? c._lnglat : c
                })
                this._geometry = new OlGeometry.LineString(l_coordinates)
                break;
            case 'Polygon':
                let p2_coordinates = (coordinates as OMapPolygonGeometryCoordinatesType).map(c => {
                    return c.map(c2 => {
                        return (c2 instanceof Lnglat) ? c2._lnglat : c2
                    })
                })
                this._geometry = new OlGeometry.Polygon(p2_coordinates)
                break;
            case 'LinearRing':
                let l2_coordinates = (coordinates as OMapLinearRingGeometryCoordinatesType).map(c => {
                    return (c instanceof Lnglat) ? c._lnglat : c
                })
                this._geometry = new OlGeometry.LinearRing(l2_coordinates)
                break;
            case 'Circle':
                let c_coordinates = coordinates as OMapPointGeometryCoordinatesType;
                this._geometry = new OlGeometry.Circle((c_coordinates instanceof Lnglat) ? c_coordinates._lnglat : c_coordinates, radius as number)
                break;
        }
        this._feature = new OlFeature({
            geometry: this._geometry
        })
    }

    protected _initByFeature(feature: OlFeatureInstanceType) {
        this._feature = feature
        this._geometry = feature.getGeometry() as OlGeomInstanceType
    }

    protected _isInitialized(
        method: string
    ): this is BasicFeatureInitialized & this {
        if (this._feature == null) {
            warn_(createMessage(method, '未正确实例化'));
            return false;
        }
        return true;
    }

    getFeature(): OlFeatureInstanceType | undefined {
        if (!this._isInitialized('getFeature')) return;
        return this._feature
    }

    getProperties(): PropertiesType | undefined {
        if (!this._isInitialized('getProperties')) return;
        return this._feature.getProperties()
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
        this._feature.setProperties(properties || {})
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

    getGeometry() {
        return this._geometry
    }

    getCoordinates() {}

    setCoordinates(coordinates: any) {}

}