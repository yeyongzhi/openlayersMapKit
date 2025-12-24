import { isDefined, isNumber, isCoordinatesType, isString, defaultValue } from '../../../../utils/index';
import { getFormatTool } from "./index";
import { OlFormat, RenderFeature, OlFeature } from '../../../../source/index'
import {
    type OMapFormatReadFeatureOptionsType,
    type OMapGeoJSONFormatInstanceType,
    type OMapFormatWriteFeatureOptionsType,
    DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS,
} from '../type';
import { createBaseFeatureByOlFeature } from '../../../core/Feature/BasicFeature/handle';
import { type OlRenderFeatureInstanceType, type OlFeatureInstanceType } from '../../../core/Feature/BasicFeature/type';
import BasicFeature from '../../../core/Feature/BasicFeature/index';

function readFeature(source: ArrayBuffer | Document | Element | Record<string, any> | string, options?: OMapFormatReadFeatureOptionsType) {
    const format = getFormatTool()
    const feature = (format as OMapGeoJSONFormatInstanceType).readFeature(source, defaultValue(options, {}));
    const _feature = createBaseFeatureByOlFeature(feature as OlFeatureInstanceType)
    return _feature
}

function readFeatures(source: ArrayBuffer | Document | Element | Record<string, any> | string, options?: OMapFormatReadFeatureOptionsType) {
    const format = getFormatTool()
    const features = (format as OMapGeoJSONFormatInstanceType).readFeatures(source, defaultValue(options, {}));
    const _features = features.map((feature: OlFeature | RenderFeature) => {
        return createBaseFeatureByOlFeature<any>(feature as OlFeature)
    })
    return _features
}

function writeFeatures(features: Array<BasicFeature<any>>, options ?: OMapFormatWriteFeatureOptionsType): string {
    const format = getFormatTool()
    const source = (format as OMapGeoJSONFormatInstanceType).writeFeatures(features.map((feature: BasicFeature<any>) => feature.getFeature() as OlFeatureInstanceType), Object.assign({}, DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS, defaultValue(options, {})));
    return source
}

function writeFeaturesNode(features: Array<BasicFeature<any>>, options ?: OMapFormatWriteFeatureOptionsType) {
    const format = getFormatTool()
    const source = (format as OMapGeoJSONFormatInstanceType).writeFeaturesObject(features.map((feature: BasicFeature<any>) => feature.getFeature() as OlFeatureInstanceType), Object.assign({}, DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS, defaultValue(options, {})));
    return source
}

export default {
    readFeature,
    readFeatures,
    writeFeatures,
    writeFeaturesNode,
}
