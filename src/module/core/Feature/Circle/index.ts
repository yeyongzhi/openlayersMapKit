import { isDefined, isCoordinatesType, isExtentType, isNumber } from '../../../../utils/index'
import { warn_, error_, getPackageMessage } from '../../../../utils/index'
import type { OlCoordinateType } from '../../../../utils/index'
import { OlExtentType, OlFeature, OlGeometry } from '../../../../source/index'
import BasicFeature from '../BasicFeature'
import type { OMapPointGeometryCoordinatesType, OlCircleGeomInstanceType } from './type'
import type { OlFeatureInstanceType } from '../BasicFeature/type'
import { Lnglat, Extent } from '../../../../index'


const PACKAGE_NAME = 'Circle';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * Circle类
 * @class
 * @classdesc Circle
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/1
 * @updateDate 2025/9/1
 */

export default class Circle extends BasicFeature {

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
            if(!isDefined(radius)) {
                error_(createMessage('constructor', 'radius参数不能为空'));
                return
            }
            if(!isNumber(radius)) {
                error_(createMessage('constructor', 'radius参数格式有误'));
                return
            }
            super("Circle", centerOrFeature as OMapPointGeometryCoordinatesType, radius)
            if (properties) {
                this.setProperties(properties)
            }
        }
    }
}