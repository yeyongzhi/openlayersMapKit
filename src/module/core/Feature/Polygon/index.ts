import { isDefined, isCoordinatesType, isArray, isExtentType } from '../../../../utils/index'
import { warn_, error_, getPackageMessage } from '../../../../utils/index'
import type { OlCoordinateType, OlExtentType } from '../../../../utils/index'
import { OlFeature, OlGeometry } from '../../../../source/index'
import BasicFeature from '../BasicFeature'
import {
    type OMapPolygonGeometryCoordinatesType,
    type OlPolygonGeomInstanceType,
    checkPolygonCoordinates,
    type PolygonLike,
    type PolygonInitialized,
} from './type'
import type { OlFeatureInstanceType } from '../BasicFeature/type'
import {
    type OlLinearRingGeomInstanceType,
    type OMapLinearRingGeometryCoordinatesType,
    checkLinearRingCoordinates
} from '../LinearRing/type'
import Point from '../Point/index'
import LinearRing from '../LinearRing/index'
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
 * @updateDate 2025/10/6
 */

export default class Polygon extends BasicFeature<OlPolygonGeomInstanceType> implements PolygonLike {

    constructor(args: OMapPolygonGeometryCoordinatesType, properties?: Record<string, any>)
    constructor(args: OlFeatureInstanceType, properties?: Record<string, any>)

    constructor(coordinatesOrFeature: OMapPolygonGeometryCoordinatesType | OlFeatureInstanceType, properties?: Record<string, any>) {
        if (!isDefined(coordinatesOrFeature)) {
            error_(createMessage('constructor', '参数不能为空'));
            return
        }
        if (coordinatesOrFeature instanceof OlFeature) {
            super("Polygon", coordinatesOrFeature as OlFeatureInstanceType)
        } else {
            if (!checkPolygonCoordinates(coordinatesOrFeature)) {
                error_(createMessage('constructor', '坐标格式有误'));
                return
            }
            super("Polygon", coordinatesOrFeature)
            if (properties) {
                this.setProperties(properties)
            }
        }
    }

    protected _init(coordinates: OMapPolygonGeometryCoordinatesType, radius?: number) {
        let geometryCoordinates = coordinates.map(c => {
            return c.map(c2 => {
                return handleGetLnglatValue(c2) as OlCoordinateType
            })
        });
        if (geometryCoordinates) {
            this._geometry = new OlGeometry.Polygon(geometryCoordinates)
            this._feature = new OlFeature({
                geometry: this._geometry
            })
        }
    }

    protected _initByFeature(feature: OlFeatureInstanceType) {
        this._feature = feature
        this._geometry = feature.getGeometry() as OlPolygonGeomInstanceType
    }

    protected _isInitialized(method: string): this is PolygonInitialized & this {
        if (!isDefined(this._feature) || !isDefined(this._geometry)) {
            warn_(createMessage(method, '未正确实例化'));
            return false;
        }
        return true;
    }

    /**
     * 获取多边形的坐标
     * @param {boolean | undefined} rightHanded 是否右手坐标系
     * @returns {Array<Array<Lnglat>>} 多边形的坐标
     */
    getCoordinates(rightHanded: boolean | undefined = undefined): Array<Array<Lnglat>> {
        let coordinates = (this._geometry as OlPolygonGeomInstanceType).getCoordinates(rightHanded)
        let _coordinates = coordinates.map(c => {
            return c.map(c2 => {
                return new Lnglat(c2[0], c2[1])
            })
        })
        return _coordinates
    }

    /**
     * 设置多边形的坐标
     * @param {OMapPolygonGeometryCoordinatesType} coordinates 多边形的坐标
     */
    setCoordinates(coordinates: OMapPolygonGeometryCoordinatesType): void {
        if (!isDefined(coordinates)) {
            error_(createMessage('setCoordinates', '参数不能为空'));
            return
        }
        if (!checkPolygonCoordinates(coordinates)) {
            error_(createMessage('setCoordinates', '坐标格式有误'));
            return
        }
        let _coordinates = coordinates.map(c => {
            return c.map(c2 => {
                return (c2 instanceof Lnglat) ? c2.toArray() as OlCoordinateType : c2
            })
        });
        (this._geometry as OlPolygonGeomInstanceType).setCoordinates(_coordinates)
    }

    /**
     * 向Polygon中添加LinearRing（内环）
     * @param {LinearRing | OMapLinearRingGeometryCoordinatesType} linearRing 内环
     */
    appendLinearRing(linearRingParams: LinearRing | OMapLinearRingGeometryCoordinatesType): void {
        if (!isDefined(linearRingParams)) {
            error_(createMessage('appendLinearRing', 'linearRing参数不能为空'));
            return
        }
        if (!(linearRingParams instanceof LinearRing) && !checkLinearRingCoordinates(linearRingParams)) {
            error_(createMessage('appendLinearRing', 'linearRing参数格式有误'));
            return
        }
        if (linearRingParams instanceof LinearRing) {
            (this._geometry as OlPolygonGeomInstanceType).appendLinearRing(linearRingParams._geometry as OlLinearRingGeomInstanceType)
        } else {
            let coordinates = (linearRingParams as OMapLinearRingGeometryCoordinatesType).map(l => {
                return (l instanceof Lnglat) ? l.toArray() as OlCoordinateType : l
            });
            (this._geometry as OlPolygonGeomInstanceType).appendLinearRing(new LinearRing(coordinates)._geometry as OlLinearRingGeomInstanceType)
        }
    }

    /**
     * 获取多边形的第一个坐标（包含内环）
     * @returns {Lnglat} 多边形的第一个坐标
     */
    getFirstCoordinate(): Lnglat {
        let coordinates = (this._geometry as OlPolygonGeomInstanceType).getFirstCoordinate()
        return new Lnglat(coordinates[0], coordinates[1])
    }

    /**
     * 获取多边形的最后一个坐标（包含内环）
     * @returns {Lnglat} 多边形的最后一个坐标
     */
    getLastCoordinate(): Lnglat {
        let coordinates = (this._geometry as OlPolygonGeomInstanceType).getLastCoordinate()
        return new Lnglat(coordinates[0], coordinates[1])
    }

    /**
     * 获取多边形的范围
     * @returns {Extent} 多边形的范围
     */
    getExtent(): Extent {
        let extent = (this._geometry as OlPolygonGeomInstanceType).getExtent()
        return new Extent(extent[0], extent[1], extent[2], extent[3])
    }

    /**
     * 返回投影平面上多边形的面积
     * @returns {number} 投影平面上多边形的面积
     */
    getArea(): number {
        return (this._geometry as OlPolygonGeomInstanceType).getArea()
    }

    /**
     * 将几何图形中距离传递点最近的点作为坐标返回
     * @param {Lnglat | OlCoordinateType} point 传递点
     * @param {*} closestPoint 最近点
     * @returns {Lnglat} 最近点
     */
    getClosestPoint(point: Lnglat | OlCoordinateType, closestPoint?: any): Lnglat {
        let coordinates = (point instanceof Lnglat) ? point.toArray() as OlCoordinateType : point;
        let result = (this._geometry as OlPolygonGeomInstanceType).getClosestPoint(coordinates)
        let _result = new Lnglat(result[0], result[1])
        closestPoint = _result
        return _result
    }

    /**
     * 返回多边形的内点
     * @returns {Point} 多边形的内点
     */
    getInteriorPoint(): Point {
        let result = (this._geometry as OlPolygonGeomInstanceType).getInteriorPoint().getCoordinates();
        return new Point(result)
    }

    /**
     * 如果该几何形状包含指定的坐标，则返回 true。如果坐标位于几何形状的边界上，则返回 false。
     * @param {Lnglat | OlCoordinateType} coordinates 
     * @returns {boolean | undefined}
     */
    intersectsCoordinate(coordinates: Lnglat | OlCoordinateType): boolean | undefined {
        if (!isDefined(coordinates)) {
            error_(createMessage('intersectsCoordinate', '参数coordinates不能为空'));
            return
        }
        let _coordinates = (coordinates instanceof Lnglat) ? coordinates.toArray() as OlCoordinateType : coordinates;
        return (this._geometry as OlPolygonGeomInstanceType).intersectsCoordinate(_coordinates)
    }

    /**
     * 线是否在extent范围内
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
        return (this._geometry as OlPolygonGeomInstanceType).intersectsExtent(_extent as OlExtentType)
    }

    simplify(tolerance: number = 0): void {
        (this._geometry as OlPolygonGeomInstanceType).simplify(tolerance)
    }

    transform() {

    }

    translate(deltaX: number = 0, deltaY: number = 0): void {
        (this._geometry as OlPolygonGeomInstanceType).translate(deltaX, deltaY)
    }

}