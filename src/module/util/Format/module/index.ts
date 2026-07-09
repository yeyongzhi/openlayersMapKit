import { isDefined, error_, getPackageMessage } from '../../../../utils/index';
import { type OMapFormatInstanceType, type OMapFormatTypeEnum, OMapFormatType, OMapFormatWriteFeatureOptionsType } from '../type';
import GeoJSON from './GeoJSON'
import WKT from './WKT'
import KML from './KML'
import BasicFeature from '../../../core/Feature/BasicFeature/index';
import { createMessage } from '../index'

function getMoudule(type: OMapFormatTypeEnum) {
    let module: any = null
    switch (type) {
        case OMapFormatType.GeoJSON:
            module = GeoJSON
            break;
        case OMapFormatType.WKT:
            module = WKT
            break;
        case OMapFormatType.KML:
            module = KML
            break;
    }
    return module
}

function handle(format: OMapFormatInstanceType, type: OMapFormatTypeEnum, key: string, ...args: unknown[]) {
    const module: any = getMoudule(type)
    if (isDefined(module) && isDefined(module[key])) {
        return module[key](format, ...args)
    } else {
        error_(createMessage(key, `当前格式化工具不支持${key}方法`));
        return undefined
    }
}

export function handleReadFeature(format: OMapFormatInstanceType, type: OMapFormatTypeEnum, source: unknown, options?: unknown) {
    return handle(format, type, 'readFeature', source, options)
}

export function handleReadFeatures(format: OMapFormatInstanceType, type: OMapFormatTypeEnum, source: unknown, options?: unknown) {
    return handle(format, type, 'readFeatures', source, options)
}

export function handleWriteFeature(format: OMapFormatInstanceType, type: OMapFormatTypeEnum, feature: BasicFeature<any>, options?: OMapFormatWriteFeatureOptionsType) {
    return handle(format, type, 'writeFeature', feature, options)
}

export function handleWriteFeatureObject(format: OMapFormatInstanceType, type: OMapFormatTypeEnum, feature: BasicFeature<any>, options?: OMapFormatWriteFeatureOptionsType) {
    return handle(format, type, 'writeFeatureObject', feature, options)
}

export function handleWriteFeatures(format: OMapFormatInstanceType, type: OMapFormatTypeEnum, features: Array<BasicFeature<any>>, options?: OMapFormatWriteFeatureOptionsType) {
    return handle(format, type, 'writeFeatures', features, options)
}

export function handleWriteFeaturesObject(format: OMapFormatInstanceType, type: OMapFormatTypeEnum, features: Array<BasicFeature<any>>, options?: OMapFormatWriteFeatureOptionsType) {
    return handle(format, type, 'writeFeaturesObject', features, options)
}

export function handleWriteFeaturesNode(format: OMapFormatInstanceType, type: OMapFormatTypeEnum, features: Array<BasicFeature<any>>, options?: OMapFormatWriteFeatureOptionsType) {
    return handle(format, type, 'writeFeaturesNode', features, options)
}
