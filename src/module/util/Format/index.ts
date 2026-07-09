import { isDefined, isNumber, isCoordinatesType, isString, defaultValue } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import { OlFormat, RenderFeature, OlFeature } from '../../../source/index'
import {
    type OMapFormatTypeEnum,
    type OMapFormatGeoJSONOptions,
    type OMapFormatWKTOptions,
    type OMapFormatKMLOptions,
    type OMapFormatOptionsType,
    type OMapFormatInstanceType,
    OMapFormatType,
    type OMapFormatWriteFeatureOptionsType,
} from './type'
import { getDefaultOptionsByType, isVaildFormatType } from './handle'
import { handleGetProjectionValue } from '../../core/Projection/handle';
import BasicFeature from '../../core/Feature/BasicFeature/index';
import { handleGetStyleValue } from '../../basic/Style/handle';
import {
    handleReadFeature,
    handleReadFeatures,
    handleWriteFeature,
    handleWriteFeatureObject,
    handleWriteFeatures,
    handleWriteFeaturesObject,
    handleWriteFeaturesNode,
} from './module/index'

const PACKAGE_NAME = 'Format';
export const createMessage = getPackageMessage(PACKAGE_NAME);

/** 
 * @class Format
 * @classdesc 格式化工具
 * @author yyz
 * @CreateDate 2025/10/8
 * @LastUpdateDate 2025/10/9
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
        if(!isVaildFormatType(type)) {
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
                    ...(this.options as OMapFormatGeoJSONOptions),
                    dataProjection: handleGetProjectionValue((this.options as OMapFormatGeoJSONOptions).dataProjection),
                    featureProjection: handleGetProjectionValue((this.options as OMapFormatGeoJSONOptions).featureProjection),
                });
                break;
            case OMapFormatType.WKT:
                this._format = new OlFormat.WKT({
                    ...(this.options as OMapFormatWKTOptions),
                });
                break;
            case OMapFormatType.KML:
                this._format = new OlFormat.KML({
                    ...(this.options as OMapFormatKMLOptions),
                    defaultStyle: defaultValue(handleGetStyleValue((this.options as OMapFormatKMLOptions).defaultStyle), undefined),
                });
                break;
        }
    }

    readFeature(source: unknown, options?: unknown) {
        return handleReadFeature(this._format as OMapFormatInstanceType, this.type as OMapFormatTypeEnum, source, options)
    }

    readFeatures(source: unknown, options?: unknown) {
        return handleReadFeatures(this._format as OMapFormatInstanceType, this.type as OMapFormatTypeEnum, source, options)
    }

    writeFeature(feature: BasicFeature<any>, options?: OMapFormatWriteFeatureOptionsType): string {
        return handleWriteFeature(this._format as OMapFormatInstanceType, this.type as OMapFormatTypeEnum, feature, options)
    }

    writeFeatureObject(feature: BasicFeature<any>, options?: OMapFormatWriteFeatureOptionsType) {
        return handleWriteFeatureObject(this._format as OMapFormatInstanceType, this.type as OMapFormatTypeEnum, feature, options)
    }

    writeFeatures(features: Array<BasicFeature<any>>, options?: OMapFormatWriteFeatureOptionsType): string {
        return handleWriteFeatures(this._format as OMapFormatInstanceType, this.type as OMapFormatTypeEnum, features, options)
    }

    writeFeaturesObject(features: Array<BasicFeature<any>>, options?: OMapFormatWriteFeatureOptionsType) {
        return handleWriteFeaturesObject(this._format as OMapFormatInstanceType, this.type as OMapFormatTypeEnum, features, options)
    }

    writeFeaturesNode(features: Array<BasicFeature<any>>, options?: OMapFormatWriteFeatureOptionsType) {
        return handleWriteFeaturesNode(this._format as OMapFormatInstanceType, this.type as OMapFormatTypeEnum, features, options)
    }

}
