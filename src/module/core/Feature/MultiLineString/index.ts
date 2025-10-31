import { isDefined, isCoordinatesType, isExtentType, isObject } from '../../../../utils/index'
import { warn_, error_, getPackageMessage, isNumber } from '../../../../utils/index'
import { type OlCoordinateType } from '../../../basic/Lnglat/type'
import { OlExtentType, OlFeature, OlGeometry } from '../../../../source/index'
import BasicFeature from '../BasicFeature'
import type { OMapMultiLineStringGeometryCoordinatesType, OlMultiLineStringGeomInstanceType, MultiLineStringLike, MultiLineStringInitialized } from './type'
import type { OlFeatureInstanceType } from '../BasicFeature/type'
import { Lnglat, Extent } from '../../../../index'
import { checkMultiLineStringCoordinates } from './handle'
import { handleGetLnglatValue } from '../../../basic/Lnglat/handle'

const PACKAGE_NAME = 'MultiLineString';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * @class MultiLineString
 * @classdesc MultiLineString
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/10/8
 * @updateDate 2025/10/9
 */

export default class MultiLineString extends BasicFeature<OlMultiLineStringGeomInstanceType> implements MultiLineStringLike {

    constructor(args: OMapMultiLineStringGeometryCoordinatesType, properties?: Record<string, any>)
    constructor(args: OlFeatureInstanceType, properties?: Record<string, any>)

    constructor(coordinatesOrFeature: OMapMultiLineStringGeometryCoordinatesType | OlFeatureInstanceType, properties?: Record<string, any>) {
        if (!isDefined(coordinatesOrFeature)) {
            error_(createMessage('constructor', '参数不能为空'));
            return
        }
        if (coordinatesOrFeature instanceof OlFeature) {
            super("MultiLineString", coordinatesOrFeature as OlFeatureInstanceType)
        } else {
            if (!checkMultiLineStringCoordinates(coordinatesOrFeature)) {
                error_(createMessage('constructor', '坐标格式有误'));
                return
            }
            super("MultiLineString", coordinatesOrFeature as OMapMultiLineStringGeometryCoordinatesType)
            if (isDefined(properties) && isObject(properties)) {
                this.setProperties(properties)
            }
        }
    }

    protected _init(coordinates: OMapMultiLineStringGeometryCoordinatesType, radius?: number) {
        let geometryCoordinates = coordinates.map(c => {
            return c.map(c2 => {
                return handleGetLnglatValue(c2) as OlCoordinateType
            })
        });
        if (geometryCoordinates) {
            this._geometry = new OlGeometry.MultiLineString(geometryCoordinates)
            this._feature = new OlFeature({
                geometry: this._geometry
            })
        }
    }

    protected _initByFeature(feature: OlFeatureInstanceType) {
        this._feature = feature
        this._geometry = feature.getGeometry() as OlMultiLineStringGeomInstanceType
    }

    protected _isInitialized(method: string): this is MultiLineStringInitialized & this {
        if (!isDefined(this._feature) || !isDefined(this._geometry)) {
            warn_(createMessage(method, '未正确实例化'));
            return false;
        }
        return true;
    }

    /**
     * 获取坐标
     * @returns {Array<Array<Lnglat>>} 坐标
     */
    getCoordinates(): Array<Array<Lnglat>> | undefined {
        if (!this._isInitialized('getCoordinates')) return;
        let coordinates = (this._geometry as OlMultiLineStringGeomInstanceType).getCoordinates() as Array<Array<OlCoordinateType>>
        let _coordinates = coordinates.map((c: Array<OlCoordinateType>) => {
            return c.map(c2 => {
                return new Lnglat(...c2)
            })
        });
        return _coordinates
    }

    /**
     * 设置坐标
     * @param {OMapMultiLineStringGeometryCoordinatesType} coordinates 坐标
     */
    setCoordinates(coordinates: OMapMultiLineStringGeometryCoordinatesType): void {
        if (!this._isInitialized('setCoordinates')) return;
        if (!isDefined(coordinates)) {
            error_(createMessage('setCoordinates', '参数不能为空'));
            return
        }
        if (!checkMultiLineStringCoordinates(coordinates)) {
            error_(createMessage('setCoordinates', '坐标格式有误'));
            return
        }
        let _coordinates: Array<Array<OlCoordinateType>> = coordinates.map((c: Array<OlCoordinateType | Lnglat>) => {
            return c.map(c2 => {
                return (c2 instanceof Lnglat) ? c2.toArray() as OlCoordinateType : c2
            })
        });
        (this._geometry as OlMultiLineStringGeomInstanceType).setCoordinates(_coordinates as Array<Array<OlCoordinateType>>)
    }

}