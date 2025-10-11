import { isDefined, error_, getPackageMessage } from '../../../../utils/index';
import { type OMapFormatInstanceType, type OMapFormatTypeEnum, OMapFormatType, OMapFormatWriteFeatureOptionsType } from '../type';
import GeoJSON from './GeoJSON'
import * as WKT from './WKT'
import * as KML from './KML'
import BasicFeature from '../../../core/Feature/BasicFeature/index';
import { createMessage } from '../index'

export let formatTool: OMapFormatInstanceType | null = null

export function updateFormatTool(format: OMapFormatInstanceType) {
    formatTool = format
}

export function getFormatTool(): OMapFormatInstanceType {
    return formatTool as OMapFormatInstanceType
}

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

function handle(type: OMapFormatTypeEnum, key: string, ...args: unknown[]) {
    const module: any = getMoudule(type)
    if (isDefined(module) && isDefined(module[key])) {
        return module[key](...args)
    } else {
        error_(createMessage(key, `当前格式化工具不支持${key}方法`));
        return undefined
    }
}

export function handleReadFeature(type: OMapFormatTypeEnum, source: unknown, options?: unknown) {
    return handle(type, 'readFeature', source, options)
}

export function handleReadFeatures(type: OMapFormatTypeEnum, source: unknown, options?: unknown) {
    return handle(type, 'readFeatures', source, options)
}

export function handleWriteFeature(type: OMapFormatTypeEnum, feature: BasicFeature<any>, options?: OMapFormatWriteFeatureOptionsType) {
    return handle(type, 'writeFeature', feature, options)
}

export function handleWriteFeatureObject(type: OMapFormatTypeEnum, feature: BasicFeature<any>, options?: OMapFormatWriteFeatureOptionsType) {
    return handle(type, 'writeFeatureObject', feature, options)
}

export function handleWriteFeatures(type: OMapFormatTypeEnum, features: Array<BasicFeature<any>>, options?: OMapFormatWriteFeatureOptionsType) {
    return handle(type, 'writeFeatures', features, options)
}

export function handleWriteFeaturesObject(type: OMapFormatTypeEnum, features: Array<BasicFeature<any>>, options?: OMapFormatWriteFeatureOptionsType) {
    return handle(type, 'writeFeaturesObject', features, options)
}

export function handleWriteFeaturesNode(type: OMapFormatTypeEnum, features: Array<BasicFeature<any>>, options?: OMapFormatWriteFeatureOptionsType) {
    return handle(type, 'writeFeaturesNode', features, options)
}
