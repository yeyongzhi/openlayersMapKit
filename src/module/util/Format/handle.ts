import {
    type OMapFormatTypeEnum,
    type OMapFormatGeoJSONOptions,
    type OMapFormatWKTOptions,
    type OMapFormatKMLOptions,
    OMapFormatType
} from './type'

export function isVaildFormatType(type: unknown): type is OMapFormatTypeEnum {
    return Object.values(OMapFormatType).includes(type as OMapFormatTypeEnum);
}

function getGeoJSONDefaultOptions(): OMapFormatGeoJSONOptions {
    return {
        dataProjection: 'EPSG:4326',
        extractGeometryName: false
    }
}

function getWKTDefaultOptions(): OMapFormatWKTOptions {
    return {
        splitCollection: false
    }   
}

function getKMLOptionsDefaultOptions(): OMapFormatKMLOptions {
    return {
        extractStyles: false,
        showPointNames: false,
        writeStyles: false,
        crossOrigin: null
    }
}

/**
 * 获取默认参数
 * @param type 格式类型
 * @returns 默认参数
 */
export function getDefaultOptionsByType(type: OMapFormatTypeEnum) {
    switch (type) {
        case OMapFormatType.GeoJSON:
            return getGeoJSONDefaultOptions();
        case OMapFormatType.WKT:
            return getWKTDefaultOptions();
        case OMapFormatType.KML:
            return getKMLOptionsDefaultOptions();
        default:
            return {};
    }
}
