import { isDefined, isCoordinatesType, isExtentType, isObject } from '../../../../utils/index'
import { warn_, error_, getPackageMessage, isNumber } from '../../../../utils/index'
import type { OlCoordinateType } from '../../../../utils/index'
import { OlExtentType, OlFeature, OlGeometry } from '../../../../source/index'
import BasicFeature from '../BasicFeature'
import type { OMapMultiPointGeometryCoordinatesType, OlMultiPointGeomInstanceType, MultiPointLike, MultiPointInitialized } from './type'
import type { OlFeatureInstanceType } from '../BasicFeature/type'
import { Lnglat, Extent } from '../../../../index'
import { isVaildConrdinates } from './handle'
import Point from '../Point/index'
import { type OMapPointGeometryCoordinatesType } from '../Point/type'
import { handleGetLnglatValue } from '../../../basic/Lnglat/handle'
import { handleGetExtentValue } from '../../../basic/Extent/handle'

const PACKAGE_NAME = 'MultiPoint';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * @class MultiPoint
 * @classdesc MultiPoint
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/10/5
 * @updateDate 2025/10/6
 */

export default class MultiPoint extends BasicFeature<OlMultiPointGeomInstanceType> implements MultiPointLike {

    constructor(args: OMapMultiPointGeometryCoordinatesType, properties?: Record<string, any>)
    constructor(args: OlFeatureInstanceType, properties?: Record<string, any>)

    constructor(coordinatesOrFeature: OMapMultiPointGeometryCoordinatesType | OlFeatureInstanceType, properties?: Record<string, any>) {
        if (!isDefined(coordinatesOrFeature)) {
            error_(createMessage('constructor', '参数不能为空'));
            return
        }
        if (coordinatesOrFeature instanceof OlFeature) {
            super("MultiPoint", coordinatesOrFeature as OlFeatureInstanceType)
        } else {
            if (!isVaildConrdinates(coordinatesOrFeature)) {
                error_(createMessage('constructor', '坐标格式有误'));
                return
            }
            super("MultiPoint", coordinatesOrFeature as OMapMultiPointGeometryCoordinatesType)
        }
        if (isDefined(properties) && isObject(properties)) {
            this.setProperties(properties)
        }
    }

    protected _init(coordinates: OMapMultiPointGeometryCoordinatesType, radius?: number) {
        let geometryCoordinates = coordinates.map(c => {
            return handleGetLnglatValue(c) as OlCoordinateType
        });
        if (geometryCoordinates) {
            this._geometry = new OlGeometry.MultiPoint(geometryCoordinates)
            this._feature = new OlFeature({
                geometry: this._geometry
            })
        }
    }

    protected _initByFeature(feature: OlFeatureInstanceType) {
        this._feature = feature
        this._geometry = feature.getGeometry() as OlMultiPointGeomInstanceType
    }

    protected _isInitialized(method: string): this is MultiPointInitialized & this {
        if (!isDefined(this._feature) || !isDefined(this._geometry)) {
            warn_(createMessage(method, '未正确实例化'));
            return false;
        }
        return true;
    }

    /**
     * 获取点的坐标
     * @returns {Lnglat[]} 点的坐标
     */
    getCoordinates(): Lnglat[] | undefined {
        if (!this._isInitialized('getCoordinates')) return;
        let coordinates = (this._geometry as OlMultiPointGeomInstanceType).getCoordinates() as OlCoordinateType[]
        let _coordinates = coordinates.map((c: OlCoordinateType) => {
            return new Lnglat(...c)
        })
        return _coordinates
    }

    /**
     * 设置点的坐标
     * @param {OMapMultiPointGeometryCoordinatesType} coordinates 点的坐标
     */
    setCoordinates(coordinates: OMapMultiPointGeometryCoordinatesType): void {
        if (!this._isInitialized('setCoordinates')) return;
        if (!isDefined(coordinates)) {
            error_(createMessage('setCoordinates', '参数不能为空'));
            return
        }
        if (!isVaildConrdinates(coordinates)) {
            error_(createMessage('setCoordinates', '坐标格式有误'));
            return
        }
        let _coordinates: OlCoordinateType[] = coordinates.map((c: OlCoordinateType | Lnglat) => {
            return (c instanceof Lnglat) ? c.toArray() as OlCoordinateType : c
        });
        (this._geometry as OlMultiPointGeomInstanceType).setCoordinates(_coordinates as OlCoordinateType[])
    }

    appendPoint(pointOrpointCoordinates: Point | OMapPointGeometryCoordinatesType): void {
        if (!this._isInitialized('appendPoint')) return;
        if (!isDefined(pointOrpointCoordinates)) return;
        let _point = null
        if (pointOrpointCoordinates instanceof Point) {
            _point = (pointOrpointCoordinates as Point).getGeometry()
        } else if (pointOrpointCoordinates instanceof Lnglat) {
            _point = new OlGeometry.Point(pointOrpointCoordinates.toArray() as OlCoordinateType)
        } else if (isCoordinatesType(pointOrpointCoordinates)) {
            _point = new OlGeometry.Point(pointOrpointCoordinates as OlCoordinateType)
        }
        if (!isDefined(_point)) {
            error_(createMessage('appendPoint', '参数格式有误'));
            return
        }
        (this._geometry as OlMultiPointGeomInstanceType).appendPoint(_point)
    }

    getClosestPoint(pointOrpointCoordinates: Point | OMapPointGeometryCoordinatesType): Lnglat | undefined {
        if (!this._isInitialized('getClosestPoint')) return;
        if (!isDefined(pointOrpointCoordinates)) return;
        let _point = null
        if (pointOrpointCoordinates instanceof Point) {
            _point = pointOrpointCoordinates.getCoordinates().toArray() as OlCoordinateType
        } else if (pointOrpointCoordinates instanceof Lnglat) {
            _point = pointOrpointCoordinates.toArray() as OlCoordinateType
        } else if (isCoordinatesType(pointOrpointCoordinates)) {
            _point = (pointOrpointCoordinates as OlCoordinateType)
        }
        if (!isDefined(_point)) return;
        let _closestPoint = (this._geometry as OlMultiPointGeomInstanceType).getClosestPoint(_point)
        return new Lnglat(..._closestPoint)
    }

    getExtent(): Extent | undefined {
        if (!this._isInitialized('getExtent')) return;
        return new Extent(...(this._geometry as OlMultiPointGeomInstanceType).getExtent())
    }

    getFirstCoordinate(): Lnglat | undefined {
        if (!this._isInitialized('getFirstCoordinate')) return;
        return new Lnglat(...(this._geometry as OlMultiPointGeomInstanceType).getFirstCoordinate())
    }

    getLastCoordinate(): Lnglat | undefined {
        if (!this._isInitialized('getLastCoordinate')) return;
        return new Lnglat(...(this._geometry as OlMultiPointGeomInstanceType).getLastCoordinate())
    }

    getPoint(index: number): Point | undefined {
        if (!this._isInitialized('getPoint')) return;
        if (!isDefined(index)) return;
        if (!isNumber(index)) {
            warn_(createMessage('getPoint', '参数index格式有误'));
            return;
        }
        let point = (this._geometry as OlMultiPointGeomInstanceType).getPoint(index);
        return new Point((point.getCoordinates() as OlCoordinateType))
    }

    intersectsCoordinate(coordinate: OlCoordinateType | Lnglat): boolean | undefined {
        if (!this._isInitialized('intersectsCoordinate')) return;
        if (!isDefined(coordinate)) return;
        let _coordinate = handleGetLnglatValue(coordinate)
        if (!isDefined(_coordinate)) return;
        return (this._geometry as OlMultiPointGeomInstanceType).intersectsCoordinate(_coordinate);
    }

    intersectsExtent(extent: OlExtentType | Extent): boolean | undefined {
        if (!this._isInitialized('intersectsExtent')) return;
        if (!isDefined(extent)) return;
        let _extent = handleGetExtentValue(extent)
        if (!isDefined(_extent)) return;
        return (this._geometry as OlMultiPointGeomInstanceType).intersectsExtent(_extent);
    }

}