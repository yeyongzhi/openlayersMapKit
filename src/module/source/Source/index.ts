import { isDefined, isNumber } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/message'
import { 
    type OMapSourceParamsType,
    type OMapSourceType
} from './type'

const PACKAGE_NAME = 'Source';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * OMap Source 基类
 * @class
 * @classdesc 所有Source的基类，提供了一些通用的方法和属性。
 * @description 参考：https://openlayers.org/en/latest/apidoc/module-ol_source_Source-Source.html
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/9/30
 * @updateDate 2025/9/30
 */

export default class Source<T extends OMapSourceType> {
    
    _source!: T;

    constructor(params: OMapSourceParamsType) {
        
    }

    getSource() {
        return this._source;
    }

    changed() {
        this._source.changed();
    }

    get(key: string) {
        return this._source.get(key);
    }

    getAttributions() {
        return this._source.getAttributions();
    }

    getAttributionsCollapsible() {
        return this._source.getAttributionsCollapsible();
    }

    getKeys() {
        return this._source.getKeys();
    }

    getProjection() {
        return this._source.getProjection();
    }

    getProperties(): Record<string, any> {
        return this._source.getProperties();
    }

    refresh() {
        this._source.refresh();
    }

    setAttributions(attributions: string | string[]) {
        this._source.setAttributions(attributions);
    }

    setProperties(properties: Record<string, any>) {
        this._source.setProperties(properties);
    }

}