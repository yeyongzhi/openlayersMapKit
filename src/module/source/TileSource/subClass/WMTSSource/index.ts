import { OlSource } from '../../../../../source/index'
import TileSource from '../../index'
import {
    DEFAULT_WMTS_SOURCE_PARAMS,
    handleGetWMTSSourceParams,
    type OMapWMTSSourceParamsType,
    type OMapWMTSSourceType
} from './type'

export default class WMTSSource extends TileSource<OMapWMTSSourceType> {

    constructor(params: OMapWMTSSourceParamsType) {
        super(new OlSource.WMTS(handleGetWMTSSourceParams({
            ...DEFAULT_WMTS_SOURCE_PARAMS,
            ...params
        } as OMapWMTSSourceParamsType)))
    }

    getDimensions() {
        return this._source.getDimensions();
    }

    getFormat(): string {
        return this._source.getFormat();
    }

    getLayer(): string {
        return this._source.getLayer();
    }

    getMatrixSet(): string {
        return this._source.getMatrixSet();
    }

    getRequestEncoding() {
        return this._source.getRequestEncoding();
    }

    getStyle(): string {
        return this._source.getStyle();
    }

    getVersion(): string {
        return this._source.getVersion();
    }

    updateDimensions(dimensions: Record<string, any>) {
        this._source.updateDimensions(dimensions);
    }

    createFromWMTSTemplate(template: string) {
        return this._source.createFromWMTSTemplate(template);
    }

}
