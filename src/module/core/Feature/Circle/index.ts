import { isDefined, isCoordinatesType, isNumber } from '../../../../utils/index'
import { warn_, error_, getPackageMessage } from '../../../../utils/index'
import { commonMessage } from '../../../../utils/message'
import { OlFeature, OlGeometry } from '../../../../source/index'
import BasicFeature from '../BasicFeature'
import type {
    OlCircleGeomInstanceType,
    CircleLike,
    CircleInitialized,
} from './type'
import { OMapPointGeometryCoordinatesType } from '../Point/type'
import type { OlFeatureInstanceType } from '../BasicFeature/type'
import Lnglat from '../../../basic/Lnglat/index'
import { type OMapCoordinateType, type OlCoordinateType } from '../../../basic/Lnglat/type'
import { handleGetLnglatValue } from '../../../basic/Lnglat/handle'

const PACKAGE_NAME = 'Circle';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * @class
 * @classdesc Circle
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/1
 * @updateDate 2025/10/6
 */

export default class Circle extends BasicFeature<OlCircleGeomInstanceType> implements CircleLike {

    constructor(centerOrFeature: OMapPointGeometryCoordinatesType | OlFeatureInstanceType, radius?: number, properties?: Record<string, any>) {
        if (!isDefined(centerOrFeature)) {
            error_(createMessage('constructor', '参数不能为空'));
            return
        }
        if (centerOrFeature instanceof OlFeature) {
            super("Circle", centerOrFeature as OlFeatureInstanceType)
        } else {
            if ((!(centerOrFeature instanceof Lnglat)) && (!isCoordinatesType(centerOrFeature))) {
                error_(createMessage('constructor', '坐标格式有误'));
                return
            }
            if (!isDefined(radius)) {
                error_(createMessage('constructor', 'radius参数不能为空'));
                return
            }
            if (!isNumber(radius)) {
                error_(createMessage('constructor', 'radius参数格式有误'));
                return
            }
            super("Circle", centerOrFeature as OMapPointGeometryCoordinatesType, radius)
            if (properties) {
                this.setProperties(properties)
            }
        }
    }

    protected _init(coordinates: OMapPointGeometryCoordinatesType, radius?: number) {
        let geometryCoordinates = handleGetLnglatValue(coordinates) as OlCoordinateType
        if (geometryCoordinates) {
            this._geometry = new OlGeometry.Circle(geometryCoordinates, radius)
            this._feature = new OlFeature({
                geometry: this._geometry
            })
        }
    }

    protected _initByFeature(feature: OlFeatureInstanceType) {
        this._feature = feature
        this._geometry = feature.getGeometry() as OlCircleGeomInstanceType
    }

    protected _isInitialized(method: string): this is CircleInitialized & this {
        if (!isDefined(this._feature) || !isDefined(this._geometry)) {
            warn_(createMessage(method, '未正确实例化'));
            return false;
        }
        return true;
    }

    getCenter(): Lnglat | void {

        let center = this._geometry.getCenter()
        return new Lnglat(...center)
    }

    setCenter(center: OMapCoordinateType): void {

        if (!isDefined(center)) {
            error_(createMessage('setCenter', commonMessage.paramsNotDefined('center')));
            return
        }
        if (!isCoordinatesType(center) && !(center instanceof Lnglat)) {
            error_(createMessage('setCenter', commonMessage.paramsInvaildFormat('center', 'coordinates')));
            return
        }
        let _center = handleGetLnglatValue(center) as OlCoordinateType
        this._geometry.setCenter(_center)
    }

    getRadius(): number | void {

        return this._geometry.getRadius()
    }

    setRadius(radius: number): void {

        if (!isDefined(radius)) {
            error_(createMessage('setRadius', commonMessage.paramsNotDefined('radius')));
            return
        }
        if (!isNumber(radius)) {
            error_(createMessage('setRadius', commonMessage.paramsInvaildFormat('radius', 'number')));
            return
        }
        this._geometry.setRadius(radius)
    }

    /**
     * 获取坐标
     */
    getCoordinates(): Lnglat | void {
        return this.getCenter()
    }

    /**
     * 设置线的坐标
     */
    setCoordinates(center: OMapCoordinateType): void {
        this.setCenter(center)
    }

    setCenterAndRadius(center: OMapCoordinateType, radius: number): void {

        if (!isDefined(center) || !isDefined(radius)) {
            error_(createMessage('setCenterAndRadius', commonMessage.paramsListHaveNotDefined('center', 'radius')));
            return
        }
        if (!isCoordinatesType(center) && !(center instanceof Lnglat)) {
            error_(createMessage('setCenterAndRadius', commonMessage.paramsInvaildFormat('center', 'coordinates')));
            return
        }
        if (!isNumber(radius)) {
            error_(createMessage('setCenterAndRadius', commonMessage.paramsInvaildFormat('radius', 'number')));
            return
        }
        let _center = handleGetLnglatValue(center) as OlCoordinateType
        this._geometry.setCenterAndRadius(_center, radius)
    }

}