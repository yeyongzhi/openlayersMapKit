import { isDefined, isObject } from '../../../../utils/index'
import { warn_, error_, getPackageMessage, commonMessage } from '../../../../utils/message'
import { OlExtentType, OlFeature, OlGeometry } from '../../../../source/index'
import BasicFeature from '../BasicFeature'
import type { OMapPointGeometryCoordinatesType, OlPointGeomInstanceType, OMapPointType } from './type'
import type { OlFeatureInstanceType } from '../BasicFeature/type'
import Lnglat from '../../../basic/Lnglat/index'
import { handleGetLnglatValue } from '../../../basic/Lnglat/handle'
import { isValidCoordinate } from '../../../basic/Lnglat/type'
import Extent from '../../../basic/Extent/index'
import { handleGetExtentValue } from '@/module/basic/Extent/handle'
import { isValidExtent } from '@/module/basic/Extent/type'

const PACKAGE_NAME = 'Point';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * Point类
 * @class
 * @classdesc Point
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/14
 * @updateDate 2026/1/30
 */

export default class Point extends BasicFeature<OMapPointType> {

    constructor(args: OMapPointGeometryCoordinatesType, properties?: Record<string, any>)
    constructor(args: OlFeatureInstanceType)

    constructor(coordinatesOrFeature: OMapPointGeometryCoordinatesType | OlFeatureInstanceType, properties?: Record<string, any>) {
        if (!isDefined(coordinatesOrFeature)) {
            error_(createMessage('constructor', commonMessage.paramsNotDefined('coordinatesOrFeature')));
        }
        if (coordinatesOrFeature instanceof OlFeature) {
            super("Point", coordinatesOrFeature as OlFeatureInstanceType)
        } else {
            if (!isValidCoordinate(coordinatesOrFeature)) {
                error_(createMessage('constructor', commonMessage.paramsInvaildFormat('coordinatesOrFeature', 'Lnglat or [x, y]')));
            }
            super("Point", coordinatesOrFeature as OMapPointGeometryCoordinatesType)
            if (isDefined(properties) && isObject(properties)) {
                this.setProperties(properties)
            }
        }
    }

    protected _init(coordinates: OMapPointGeometryCoordinatesType) {
        let geometryCoordinates = handleGetLnglatValue(coordinates)
        if (geometryCoordinates) {
            this._geometry = new OlGeometry.Point(geometryCoordinates)
            this._feature = new OlFeature({
                geometry: this._geometry
            })
        }
    }

    protected _initByFeature(feature: OlFeatureInstanceType) {
        this._feature = feature
        this._geometry = feature.getGeometry() as OlPointGeomInstanceType
    }

    /**
     * 获取点的坐标
     * @returns {Lnglat} 点的坐标
     */
    getCoordinates(): Lnglat {
        let coordinates = this._geometry.getCoordinates()
        return new Lnglat(coordinates)
    }

    /**
     * 设置点的坐标
     * @param {OMapPointGeometryCoordinatesType} coordinates 点的坐标
     * @returns {void}
     */
    setCoordinates(coordinates: OMapPointGeometryCoordinatesType): void {
        if (!isDefined(coordinates)) {
            error_(createMessage('setCoordinates', commonMessage.paramsNotDefined('coordinates')));
        }
        if (!isValidCoordinate(coordinates)) {
            error_(createMessage('setCoordinates', commonMessage.paramsInvaildFormat('coordinates', 'Lnglat or [x, y]')));
        }
        let _coordinates = handleGetLnglatValue(coordinates)
        this._geometry.setCoordinates(_coordinates)
    }

    /**
     * 获取点的第一个坐标
     * @returns {Lnglat} 点的第一个坐标
     */
    getFirstCoordinate(): Lnglat {
        return this.getCoordinates()
    }

    /**
     * 获取点的最后一个坐标
     * @returns {Lnglat} 点的最后一个坐标
     */
    getLastCoordinate(): Lnglat {
        return this.getCoordinates()
    }

    intersectsCoordinate() {

    }

    /**
     * 点是否在extent范围内
     * @param {Extent | OlExtentType} extent 
     * @returns {boolean | undefined}
     */
    intersectsExtent(extent: Extent): boolean {
        if (!isDefined(extent)) {
            error_(createMessage('intersectsExtent', commonMessage.paramsNotDefined('extent')));
        }
        if (!isValidExtent(extent)) {
            error_(createMessage('intersectsExtent', commonMessage.paramsInvaildFormat('extent', 'Extent or [xmin, ymin, xmax, ymax]')));
        }
        let _extent = handleGetExtentValue(extent);
        return this._geometry.intersectsExtent(_extent)
    }

}