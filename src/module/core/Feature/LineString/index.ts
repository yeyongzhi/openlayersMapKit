import {
	isDefined,
	isCoordinatesType,
	isNumber,
	isExtentType,
	isObject,
} from "../../../../utils/index";
import {
	warn_,
	error_,
	getPackageMessage,
	commonMessage,
} from "../../../../utils/message";
import { OlExtentType, OlFeature, OlGeometry } from "../../../../source/index";
import BasicFeature from "../BasicFeature";
import {
	type OMapLineStringGeometryCoordinatesType,
	type OlLineStringGeomInstanceType,
	type OMapLineStringType,
	isValidLineStringCoordinates,
} from "./type";
import type { OlFeatureInstanceType } from "../BasicFeature/type";
import Lnglat from "../../../basic/Lnglat/index";
import { type OlCoordinateType } from "../../../basic/Lnglat/type";
import { handleGetLnglatValue, normalizeCoordinates } from "../../../basic/Lnglat/handle";
import Extent from "../../../basic/Extent/index";
import { type OMapExtentType, isValidExtent } from "../../../basic/Extent/type";
import { type OMapPointGeometryCoordinatesType } from "../Point/type";
import { handleGetExtentValue } from "../../../basic/Extent/handle"

const PACKAGE_NAME = "LineString";
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * LineString类
 * @class
 * @classdesc LineString
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/7/14
 * @updateDate 2026/1/30
 */

export default class LineString extends BasicFeature<OMapLineStringType> {
	constructor(
		args: OMapLineStringGeometryCoordinatesType,
		properties?: Record<string, any>,
	);
	constructor(args: OlFeatureInstanceType);

	constructor(
		coordinatesOrFeature:
			| OMapLineStringGeometryCoordinatesType
			| OlFeatureInstanceType,
		properties?: Record<string, any>,
	) {
		if (!isDefined(coordinatesOrFeature)) {
			error_(
				createMessage(
					"constructor",
					commonMessage.paramsNotDefined("coordinatesOrFeature"),
				),
			);
		}
		if (coordinatesOrFeature instanceof OlFeature) {
			super("LineString", coordinatesOrFeature as OlFeatureInstanceType);
		} else {
			if (!isValidLineStringCoordinates(coordinatesOrFeature)) {
				error_(
					createMessage(
						"constructor",
						commonMessage.paramsInvaildFormat("coordinatesOrFeature"),
					),
				);
			}
			super("LineString", coordinatesOrFeature);
			if (isDefined(properties) && isObject(properties)) {
				this.setProperties(properties);
			}
		}
	}

	protected _init(coordinates: OMapLineStringGeometryCoordinatesType) {
		this._geometry = new OlGeometry.LineString(normalizeCoordinates(coordinates));
		this._feature = this._createFeature(this._geometry)
	}


	/**
	 * 获取线的坐标
	 * @returns {Array<Lnglat>} 线的坐标
	 */
	getCoordinates(): Lnglat[] {
		let coordinates = this._geometry.getCoordinates();
		return coordinates.map((c) => {
			return new Lnglat(c);
		});
	}

	/**
	 * 设置线的坐标
	 * @param {OMapLineStringGeometryCoordinatesType} coordinates 线的坐标
	 */
	setCoordinates(coordinates: OMapLineStringGeometryCoordinatesType) {
		if (!isDefined(coordinates)) {
			error_(
				createMessage(
					"setCoordinates",
					commonMessage.paramsNotDefined("coordinates")
				),
			);
		}
		if (!isValidLineStringCoordinates(coordinates)) {
			error_(
				createMessage(
					"setCoordinates",
					commonMessage.paramsInvaildFormat("coordinates"),
				),
			);
		}
		let _coordinates = normalizeCoordinates(coordinates);
		this._geometry.setCoordinates(_coordinates);
	}

	/**
	 * 追加坐标
	 * @param {OMapPointGeometryCoordinatesType} coordinates 坐标
	 */
	appendCoordinate(coordinates: OMapPointGeometryCoordinatesType) {
		if (!isDefined(coordinates)) {
			error_(
				createMessage(
					"appendCoordinate",
					commonMessage.paramsNotDefined("coordinates"),
				),
			);
		}
		if (!(coordinates instanceof Lnglat) && !isCoordinatesType(coordinates)) {
			error_(
				createMessage(
					"appendCoordinate",
					commonMessage.paramsInvaildFormat("coordinates"),
				),
			);
		}
		let _coordinates = handleGetLnglatValue(coordinates);
		this._geometry.appendCoordinate(_coordinates);
	}

	/**
	 * 获取线的第一个坐标
	 * @returns {Lnglat} 线的第一个坐标
	 */
	getFirstCoordinate(): Lnglat {
		let coordinates = this._geometry.getFirstCoordinate();
		return new Lnglat(coordinates);
	}

	/**
	 * 获取线的最后一个坐标
	 * @returns {Lnglat} 线的最后一个坐标
	 */
	getLastCoordinate(): Lnglat {
		let coordinates = this._geometry.getLastCoordinate();
		return new Lnglat(coordinates);
	}

	getLength(): number {
		return this._geometry.getLength();
	}

	/**
	 * 获取线段指定位置的坐标点
	 * @param {number} fraction 比例
	 * @param dest 目标坐标点
	 * @returns {Lnglat} 线的坐标点
	 */
	getCoordinateAt(
		fraction: number,
		dest: OlCoordinateType | Lnglat,
	): Lnglat {
		if (!isDefined(fraction)) {
			error_(createMessage("getCoordinateAt", "参数不能为空"));
		}
		if (!(isNumber(fraction) && fraction >= 0 && fraction <= 1)) {
			error_(createMessage("getCoordinateAt", "参数格式有误"));
		}
		let result: number[] = [];
		let coordinates = this._geometry.getCoordinateAt(fraction, result);
		if (isDefined(dest)) {
			if (dest instanceof Lnglat) {
				dest.setLng(result[0]);
				dest.setLat(result[1]);
			} else {
				dest[0] = result[0];
				dest[1] = result[1];
			}
		}
		return new Lnglat(coordinates);
	}

	getCoordinateAtM() {
		return null;
	}

	translate(deltaX: number = 0, deltaY: number = 0) {
		this._geometry.translate(deltaX, deltaY);
	}

	transform() { }

	simplify(tolerance: number = 0) {
		this._geometry.simplify(tolerance);
	}

	intersectsCoordinate() { }

	/**
	 * 线是否在extent范围内
	 * @param {OMapExtentType} extent
	 * @returns {boolean}
	 */
	intersectsExtent(extent: OMapExtentType): boolean {
		if (!isDefined(extent)) {
			error_(createMessage("intersectsExtent", "参数extent不能为空"));
		}
		if (!isValidExtent(extent)) {
			error_(createMessage("intersectsExtent", "坐标格式有误"));
		}
		let _extent = handleGetExtentValue(extent);
		return this._geometry.intersectsExtent(_extent);
	}
}
