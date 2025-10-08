import { isDefined, isNumber, isCoordinatesType, isString, defaultValue } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import { OlFormat, RenderFeature, OlFeature } from '../../../source/index'
import {
    type OMapFormatTypeEnum,
    type OMapFormatGeoJSONOptions,
    type OMapFormatOptionsType,
    type OMapFormatInstanceType,
    OMapFormatType,
    type OMapFormatReadFeatureOptionsType,
    type OMapGeoJSONFormatInstanceType
} from './type'
import { getDefaultOptionsByType } from './handle'
import { handleGetProjectionValue } from '../../core/Projection/handle';
import { createBaseFeatureByOlFeature } from '../../core/Feature/BasicFeature/handle';
import { type OlRenderFeatureInstanceType, type OlFeatureInstanceType } from '../../core/Feature/BasicFeature/type';


const PACKAGE_NAME = 'Format';
const createMessage = getPackageMessage(PACKAGE_NAME);

/** 
 * @class Format
 * @classdesc 格式化工具
 * @author yyz
 * @CreateDate 2025/10/8
 * @LastUpdateDate 2025/10/8
 */
export default class Format {

    type?: OMapFormatTypeEnum;

    options?: OMapFormatOptionsType;

    _format?: OMapFormatInstanceType;

    constructor(type: typeof OMapFormatType.GeoJSON, options: OMapFormatGeoJSONOptions);

    constructor(type: OMapFormatTypeEnum, options?: OMapFormatGeoJSONOptions) {
        if(!isDefined(type)) {
            error_(createMessage('constructor', '初始化参数有误'));
            return;
        }
        this.type = type;
        this.options = defaultValue(Object.assign({}, getDefaultOptionsByType(type), options), {});
        this._initFormat()
    }

    /**
     * 初始化
     */
    protected _initFormat() {
        switch (this.type) {
            case OMapFormatType.GeoJSON:
                this._format = new OlFormat.GeoJSON({
                    ...this.options,
                    dataProjection: handleGetProjectionValue((this.options as OMapFormatGeoJSONOptions).dataProjection),
                    featureProjection: handleGetProjectionValue((this.options as OMapFormatGeoJSONOptions).featureProjection),
                });
                break;
        }
    }

    readFeature(source: ArrayBuffer | Document | Element | Record<string, any> | string, options?: OMapFormatReadFeatureOptionsType) {
        const feature = (this._format as OMapGeoJSONFormatInstanceType).readFeature(source, defaultValue(options, {}));
        const _feature = createBaseFeatureByOlFeature<any>(feature as OlFeatureInstanceType)
        return _feature
    }

    readFeatures() {

    }

    writeFeature() {

    }

    writeFeatureObject() {

    }

    writeFeatures() {

    }

    writeFeaturesObject() {

    }

}