import {
    type OMapFormatTypeEnum,
    type OMapFormatGeoJSONOptions,
    OMapFormatType
} from './type'

function getGeoJSONDefaultOptions(): OMapFormatGeoJSONOptions {
    return {
        dataProjection: 'EPSG:4326',
        extractGeometryName: false,
    }
}

export function getDefaultOptionsByType(type: OMapFormatTypeEnum) {
    switch (type) {
        case OMapFormatType.GeoJSON:
            return getGeoJSONDefaultOptions();
        default:
            return {};
    }
}