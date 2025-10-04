import { OlSource } from '../../../source/index'
import Map from '../../core/Map/index'
import { type OMapSizeType } from '../../basic/Size/type'
import { type OMapProjectionType } from '../../core/Projection/type'
import type { BaseLayerCommonParamsType, BaseLayerOptionsType } from '../BaseLayer/type'
import { type OMapTileSourceTileGrid } from '../../source/TileSource/type'

export type OMapWMSLayerParamsType = BaseLayerOptionsType & {
    preload: number;
    cacheSize: number;
    source?: OMapWMSLayerSourceParamsType; // source参数是必须的
    map?: Map;
}
export const DEFAULT_WMS_LAYER_PARAMS: OMapWMSLayerParamsType = {
    preload: 0,
    cacheSize: 512,
}
type OMapWMSLayerServerTypeEnum = 'mapserver' | 'geoserver' | 'carmentaserver' | 'qgis'
export type OMapWMSLayerSourceParamsType = {
    attributions?: string |string[];
    attributionsCollapsible: boolean;
    crossOrigin?: string | null;
    interpolate: boolean;
    params: Record<string, any>;
    gutter: number;
    hidpi: boolean;
    projection: OMapProjectionType;
    reprojectionErrorThreshold: number;
    tileClass?: any; // TODO
    tileGrid?: OMapTileSourceTileGrid;
    serverType?: OMapWMSLayerServerTypeEnum;
    tileLoadFunction?: (imageTile: any, src?: string) => void; // TODO
    url?: string;
    urls?: string[];
    wrapX: boolean;
    transition: number;
    zDirection: number;
}
export const DEFAULT_WMS_LAYER_SOURCE_PARAMS: OMapWMSLayerSourceParamsType = {
    attributionsCollapsible: true,
    interpolate: true,
    params: {},
    hidpi: true,
    projection: "EPSG:3857",
    reprojectionErrorThreshold: 0.5,
    gutter: 0,
    wrapX: true,
    transition: 250,
    zDirection: 0
}
export type OlwmsSourceInstanceType = InstanceType<typeof OlSource.TileWMS>