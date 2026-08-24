import { defaultValue } from '../../../../utils/index';
import { OlFormat, RenderFeature, OlFeature } from '../../../../source/index'
import {
    type OMapFormatReadFeatureOptionsType,
    type OMapKMLFormatInstanceType,
    type OMapFormatWriteFeatureOptionsType,
    DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS,
} from '../type';
import { createBaseFeatureByOlFeature } from '../../../core/Feature/BasicFeature/handle';
import { type OlFeatureInstanceType, type OlGeometryType } from '../../../core/Feature/BasicFeature/type';
import BasicFeature from '../../../core/Feature/BasicFeature/index';

function readFeature(format: OMapKMLFormatInstanceType, source: ArrayBuffer | Document | Element | Record<string, unknown> | string, options?: OMapFormatReadFeatureOptionsType) {
    const feature = (format as OMapKMLFormatInstanceType).readFeature(source, defaultValue(options, {}));
    const _feature = createBaseFeatureByOlFeature(feature as OlFeatureInstanceType)
    return _feature
}

function readFeatures(format: OMapKMLFormatInstanceType, source: ArrayBuffer | Document | Element | Record<string, unknown> | string, options?: OMapFormatReadFeatureOptionsType) {
    const features = (format as OMapKMLFormatInstanceType).readFeatures(source, defaultValue(options, {}));
    const _features = features.map((feature: OlFeature | RenderFeature) => {
        return createBaseFeatureByOlFeature(feature as OlFeature)
    })
    return _features
}

function writeFeatures(format: OMapKMLFormatInstanceType, features: Array<BasicFeature<OlGeometryType>>, options ?: OMapFormatWriteFeatureOptionsType): string {
    const source = (format as OMapKMLFormatInstanceType).writeFeatures(features.map((feature: BasicFeature<OlGeometryType>) => feature.getFeature() as OlFeatureInstanceType), Object.assign({}, DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS, defaultValue(options, {})));
    return source
}

function writeFeaturesNode(format: OMapKMLFormatInstanceType, features: Array<BasicFeature<OlGeometryType>>, options ?: OMapFormatWriteFeatureOptionsType) {
    const source = (format as OMapKMLFormatInstanceType).writeFeaturesNode(features.map((feature: BasicFeature<OlGeometryType>) => feature.getFeature() as OlFeatureInstanceType), Object.assign({}, DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS, defaultValue(options, {})));
    return source
}

export default {
    readFeature,
    readFeatures,
    writeFeatures,
    writeFeaturesNode,
}
