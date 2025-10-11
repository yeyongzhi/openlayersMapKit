import { type OMapProjectionType } from '../../core/Projection/type'
import { type OMapExtentType } from '../../basic/Extent/type'
import { OlFormat } from '../../../source/index'
import Style from '../../basic/Style/index'

export const OMapFormatType = {
    GeoJSON: 'GeoJSON',
    WKT: 'WKT',
    KML: 'KML',
}

export type OMapFormatTypeEnum = typeof OMapFormatType[keyof typeof OMapFormatType]
export type OMapFormatOptionsType = OMapFormatGeoJSONOptions | OMapFormatWKTOptions | OMapFormatKMLOptions

export interface OMapFormatGeoJSONOptions {
    dataProjection: OMapProjectionType;
    featureProjection?: OMapProjectionType;
    geometryName?: string;
    extractGeometryName: boolean;
    featureClass?: any;
}

export interface OMapFormatWKTOptions {
    splitCollection: boolean;
}

export interface OMapFormatKMLOptions {
    extractStyles: boolean;
    showPointNames: boolean;
    defaultStyle?: Array<Style>;
    writeStyles: boolean;
    crossOrigin: string | null;
    iconUrlFunction?: (iconName: string) => string;
}

export type OMapGeoJSONFormatInstanceType = InstanceType<typeof OlFormat.GeoJSON>;
export type OMapWKTFormatInstanceType = InstanceType<typeof OlFormat.WKT>;
export type OMapKMLFormatInstanceType = InstanceType<typeof OlFormat.KML>;
export type OMapEsriJSONFormatInstanceType = InstanceType<typeof OlFormat.EsriJSON>;

export type OMapFormatInstanceType = OMapGeoJSONFormatInstanceType | OMapWKTFormatInstanceType | OMapKMLFormatInstanceType | OMapEsriJSONFormatInstanceType;

export type OMapFormatReadFeatureOptionsType = {
    dataProjection?: OMapProjectionType;
    featureProjection?: OMapProjectionType;
    extent?: OMapExtentType;
}

export type OMapFormatWriteFeatureOptionsType = {
    dataProjection?: OMapProjectionType;
    featureProjection?: OMapProjectionType;
    rightHanded?: boolean;
    decimals?: number;
}
export const DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS: OMapFormatWriteFeatureOptionsType = {}