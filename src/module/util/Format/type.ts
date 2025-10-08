import { type OMapProjectionType } from '../../core/Projection/type'
import { type OMapExtentType } from '../../basic/Extent/type'
import { OlFormat } from '../../../source/index'

export const OMapFormatType = {
    GeoJSON: 'GeoJSON'
}

export type OMapFormatTypeEnum = typeof OMapFormatType[keyof typeof OMapFormatType]
export type OMapFormatOptionsType = OMapFormatGeoJSONOptions

export interface OMapFormatGeoJSONOptions {
    dataProjection: OMapProjectionType;
    featureProjection?: OMapProjectionType;
    geometryName?: string;
    extractGeometryName: boolean;
    featureClass?: any;
}

export type OMapGeoJSONFormatInstanceType = InstanceType<typeof OlFormat.GeoJSON>;

export type OMapFormatInstanceType = OMapGeoJSONFormatInstanceType

export type OMapFormatReadFeatureOptionsType = {
    dataProjection?: OMapProjectionType;
    featureProjection?: OMapProjectionType;
    extent?: OMapExtentType;
}