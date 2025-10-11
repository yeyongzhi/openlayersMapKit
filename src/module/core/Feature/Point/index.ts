import { isDefined, isCoordinatesType, isExtentType, isObject } from '../../../../utils/index'
import { warn_, error_, getPackageMessage } from '../../../../utils/index'
import type { OlCoordinateType } from '../../../../utils/index'
import { OlExtentType, OlFeature, OlGeometry } from '../../../../source/index'
import BasicFeature from '../BasicFeature'
import type { OMapPointGeometryCoordinatesType, OlPointGeomInstanceType, PointLike, PointInitialized } from './type'
import type { OlFeatureInstanceType } from '../BasicFeature/type'
import Lnglat from '../../../basic/Lnglat/index'
import { handleGetLnglatValue } from '../../../basic/Lnglat/handle'
import Extent from '../../../basic/Extent/index'

const PACKAGE_NAME = 'Point';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * Point类
 * @class
 * @classdesc Point
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/14
 * @updateDate 2025/10/9
 */

export default class Point extends BasicFeature<OlPointGeomInstanceType> implements PointLike {

    constructor(args: OMapPointGeometryCoordinatesType, properties?: Record<string, any>)
    constructor(args: OlFeatureInstanceType, properties?: Record<string, any>)

    constructor(coordinatesOrFeature: OMapPointGeometryCoordinatesType | OlFeatureInstanceType, properties?: Record<string, any>) {
        if (!isDefined(coordinatesOrFeature)) {
            error_(createMessage('constructor', '参数不能为空'));
            return
        }
        if (coordinatesOrFeature instanceof OlFeature) {
            super("Point", coordinatesOrFeature as OlFeatureInstanceType)
        } else {
            if ((!(coordinatesOrFeature instanceof Lnglat)) && (!isCoordinatesType(coordinatesOrFeature))) {
                error_(createMessage('constructor', '坐标格式有误'));
                return
            }
            super("Point", coordinatesOrFeature as OMapPointGeometryCoordinatesType)
            if (isDefined(properties) && isObject(properties)) {
                this.setProperties(properties)
            }
        }
    }

    protected _init(coordinates: OMapPointGeometryCoordinatesType, radius?: number) {
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

    protected _isInitialized(method: string): this is PointInitialized & this {
        if (!isDefined(this._feature) || !isDefined(this._geometry)) {
            warn_(createMessage(method, '未正确实例化'));
            return false;
        }
        return true;
    }

    /**
     * 获取点的坐标
     * @returns {Lnglat} 点的坐标
     */
    getCoordinates(): Lnglat {
        let coordinates = (this._geometry as OlPointGeomInstanceType).getCoordinates() as OlCoordinateType
        return new Lnglat(coordinates[0], coordinates[1])
    }

    /**
     * 设置点的坐标
     * @param {OMapPointGeometryCoordinatesType} coordinates 点的坐标
     * @returns {void}
     */
    setCoordinates(coordinates: OMapPointGeometryCoordinatesType): void {
        if (!isDefined(coordinates)) {
            error_(createMessage('setCoordinates', '参数不能为空'));
            return
        }
        if ((!(coordinates instanceof Lnglat)) && (!isCoordinatesType(coordinates))) {
            error_(createMessage('setCoordinates', '坐标格式有误'));
            return
        }
        let _coordinates = (coordinates instanceof Lnglat) ? coordinates.toArray() : coordinates;
        (this._geometry as OlPointGeomInstanceType).setCoordinates(_coordinates as any[])
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
    intersectsExtent(extent: Extent): boolean | undefined {
        if (!isDefined(extent)) {
            error_(createMessage('intersectsExtent', '参数extent不能为空'));
            return
        }
        if ((!(extent instanceof Extent)) && (!isExtentType(extent))) {
            error_(createMessage('intersectsExtent', '坐标格式有误'));
            return
        }
        let _extent = extent instanceof Extent ? extent.getExtent() : extent;
        return (this._geometry as OlPointGeomInstanceType).intersectsExtent(_extent as OlExtentType)
    }

}