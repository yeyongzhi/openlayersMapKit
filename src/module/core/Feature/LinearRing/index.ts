import { isDefined, isCoordinatesType, isArray } from '../../../../utils/index'
import { warn_, error_, getPackageMessage } from '../../../../utils/index'
import type { OlCoordinateType } from '../../../../utils/index'
import { OlExtentType, OlFeature, OlGeometry } from '../../../../source/index'
import BasicFeature from '../BasicFeature'
import type { OlFeatureInstanceType } from '../BasicFeature/type'
import {
    checkLinearRingCoordinates,
    type OMapLinearRingGeometryCoordinatesType,
    type OlLinearRingGeomInstanceType,
    type LinearRingLike,
    type LinearRingInitialized,
} from './type'
import Lnglat from '../../../basic/Lnglat/index'
import { handleGetLnglatValue } from '../../../basic/Lnglat/handle'


const PACKAGE_NAME = 'LinearRing';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * LinearRing类
 * @class
 * @classdesc LinearRing
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/8/25
 * @updateDate 2025/10/6
 */

export default class LinearRing extends BasicFeature<OlLinearRingGeomInstanceType> implements LinearRingLike {

    constructor(coordinatesOrFeature: OMapLinearRingGeometryCoordinatesType | OlFeatureInstanceType, properties?: Record<string, any>) {
        if (!isDefined(coordinatesOrFeature)) {
            error_(createMessage('constructor', '参数不能为空'));
            return
        }
        if (coordinatesOrFeature instanceof OlFeature) {
            super("LinearRing", coordinatesOrFeature as OlFeatureInstanceType)
        } else {
            if (!checkLinearRingCoordinates(coordinatesOrFeature)) {
                error_(createMessage('constructor', '坐标格式有误'));
                return
            }
            super("LinearRing", coordinatesOrFeature)
            if (properties) {
                this.setProperties(properties)
            }
        }
    }

    protected _init(coordinates: OMapLinearRingGeometryCoordinatesType, radius?: number) {
        let geometryCoordinates = coordinates.map(c => {
            return handleGetLnglatValue(c) as OlCoordinateType
        });
        if (geometryCoordinates) {
            this._geometry = new OlGeometry.LinearRing(geometryCoordinates)
            this._feature = new OlFeature({
                geometry: this._geometry
            })
        }
    }

    protected _initByFeature(feature: OlFeatureInstanceType) {
        this._feature = feature
        this._geometry = feature.getGeometry() as OlLinearRingGeomInstanceType
    }

    protected _isInitialized(method: string): this is LinearRingInitialized & this {
        if (!isDefined(this._feature) || !isDefined(this._geometry)) {
            warn_(createMessage(method, '未正确实例化'));
            return false;
        }
        return true;
    }

    /**
     * 获取LinearRing的坐标
     * @returns {Array<Lnglat>} LinearRing的坐标
     */
    getCoordinates(): Array<Lnglat> {
        let coordinates = (this._geometry as OlLinearRingGeomInstanceType).getCoordinates()
        let _coordinates = coordinates.map(c => {
            return new Lnglat(c[0], c[1])
        })
        return _coordinates
    }

    /**
     * 设置LinearRing的坐标
     * @param {OMapLinearRingGeometryCoordinatesType} coordinates LinearRing的坐标
     */
    setCoordinates(coordinates: OMapLinearRingGeometryCoordinatesType): void {
        if (!isDefined(coordinates)) {
            error_(createMessage('setCoordinates', '参数不能为空'));
            return
        }
        if (!checkLinearRingCoordinates(coordinates)) {
            error_(createMessage('setCoordinates', '坐标格式有误'));
            return
        }
        let _coordinates = coordinates.map(c => {
            return (c instanceof Lnglat) ? c.toArray() as OlCoordinateType : c
        });
        (this._geometry as OlLinearRingGeomInstanceType).setCoordinates(_coordinates)
    }

}