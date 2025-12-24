import { isDefined, isCoordinatesType, isExtentType, isObject } from '../../../../utils/index'
import { warn_, error_, getPackageMessage, isNumber } from '../../../../utils/index'
import { OlFeature, OlGeometry } from '../../../../source/index'
import BasicFeature from '../BasicFeature'
import type { OMapMultiPolygonGeometryCoordinatesType, OlMultiPolygonGeomInstanceType, MultiPolygonLike, MultiPolygonInitialized } from './type'
import type { OlFeatureInstanceType } from '../BasicFeature/type'
import Lnglat from '../../../basic/Lnglat/index'
import type { OlCoordinateType, OMapCoordinateType } from '../../../basic/Lnglat/type'
import { checkMultiPolygonCoordinates } from './handle'
import { handleGetLnglatValue } from '../../../basic/Lnglat/handle'

const PACKAGE_NAME = 'MultiPolygon';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * @class MultiPolygon
 * @classdesc MultiPolygon
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/10/8
 * @updateDate 2025/10/9
 */

export default class MultiPolygon extends BasicFeature<OlMultiPolygonGeomInstanceType> implements MultiPolygonLike {

    constructor(args: OMapMultiPolygonGeometryCoordinatesType, properties?: Record<string, any>)
    constructor(args: OlFeatureInstanceType, properties?: Record<string, any>)

    constructor(coordinatesOrFeature: OMapMultiPolygonGeometryCoordinatesType | OlFeatureInstanceType, properties?: Record<string, any>) {
        if (!isDefined(coordinatesOrFeature)) {
            error_(createMessage('constructor', '参数不能为空'));
            return
        }
        if (coordinatesOrFeature instanceof OlFeature) {
            super("MultiPolygon", coordinatesOrFeature as OlFeatureInstanceType)
        } else {
            if (!checkMultiPolygonCoordinates(coordinatesOrFeature)) {
                error_(createMessage('constructor', '坐标格式有误'));
                return
            }
            super("MultiPolygon", coordinatesOrFeature as OMapMultiPolygonGeometryCoordinatesType)
            if (isDefined(properties) && isObject(properties)) {
                this.setProperties(properties)
            }
        }
    }

    protected _init(coordinates: OMapMultiPolygonGeometryCoordinatesType, radius?: number) {
        let geometryCoordinates = coordinates.map(c => {
            return c.map(c2 => {
                return c2.map(c3 => {
                    return handleGetLnglatValue(c3) as OlCoordinateType
                })
            })
        });
        if (geometryCoordinates) {
            this._geometry = new OlGeometry.MultiPolygon(geometryCoordinates)
            this._feature = new OlFeature({
                geometry: this._geometry
            })
        }
    }

    protected _initByFeature(feature: OlFeatureInstanceType) {
        this._feature = feature
        this._geometry = feature.getGeometry() as OlMultiPolygonGeomInstanceType
    }

    protected _isInitialized(method: string): this is MultiPolygonInitialized & this {
        if (!isDefined(this._feature) || !isDefined(this._geometry)) {
            warn_(createMessage(method, '未正确实例化'));
            return false;
        }
        return true;
    }

    /**
     * 获取坐标
     * @returns {Array<Array<Array<Lnglat>>>} 坐标
     */
    getCoordinates(): Array<Array<Array<Lnglat>>> | undefined {
        if (!this._isInitialized('getCoordinates')) return;
        let coordinates = (this._geometry as OlMultiPolygonGeomInstanceType).getCoordinates() as Array<Array<Array<OlCoordinateType>>>
        let _coordinates = coordinates.map((c: Array<Array<OlCoordinateType>>) => {
            return c.map(c2 => {
                return c2.map(c3 => {
                    return new Lnglat(...c3)
                })
            })
        });
        return _coordinates
    }

    /**
     * 设置坐标
     * @param {OMapMultiPolygonGeometryCoordinatesType} coordinates 坐标
     */
    setCoordinates(coordinates: OMapMultiPolygonGeometryCoordinatesType): void {
        if (!this._isInitialized('setCoordinates')) return;
        if (!isDefined(coordinates)) {
            error_(createMessage('setCoordinates', '参数不能为空'));
            return
        }
        if (!checkMultiPolygonCoordinates(coordinates)) {
            error_(createMessage('setCoordinates', '坐标格式有误'));
            return
        }
        let _coordinates: Array<Array<Array<OlCoordinateType>>> = coordinates.map((c: Array<Array<OMapCoordinateType>>) => {
            return c.map(c2 => {
                return c2.map(c3 => {
                    return (c3 instanceof Lnglat) ? c3.toArray() as OlCoordinateType : c3
                })
            })
        });
        (this._geometry as OlMultiPolygonGeomInstanceType).setCoordinates(_coordinates as Array<Array<Array<OlCoordinateType>>>)
    }

}