import { isDefined, isString } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/message'
import { OlEvent } from '../../../source/index'
import type { EventsKey, ListenerFunction } from 'ol/events'
import type BaseEvent from 'ol/events/Event'
import Projection from '../../core/Projection/index'
import {
    type OMapSourceAttributionLike,
    type OMapSourceState,
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

export default abstract class Source<T extends OMapSourceType> {

    protected _source: T;

    constructor(source: T) {
        if (!isDefined(source)) {
            error_(createMessage('constructor', 'source不能为空'));
        }
        this._source = source;
    }

    /**
     * 获取原生 OpenLayers Source 实例
     */
    getSource(): T {
        return this._source;
    }

    /**
     * 子类初始化具体 Source 时使用
     */
    protected setSource(source: T) {
        if (!isDefined(source)) {
            error_(createMessage('setSource', 'source不能为空'));
        }
        this._source = source;
    }

    changed() {
        this._source.changed();
    }

    dispatchEvent(event: BaseEvent | string): boolean | undefined {
        return this._source.dispatchEvent(event);
    }

    get(key: string): any {
        if (!isString(key)) {
            warn_(createMessage('get', 'key必须是字符串'));
            return undefined;
        }
        return this._source.get(key);
    }

    set(key: string, value: any, silent?: boolean) {
        if (!isString(key)) {
            warn_(createMessage('set', 'key必须是字符串'));
            return;
        }
        this._source.set(key, value, silent);
    }

    unset(key: string, silent?: boolean) {
        if (!isString(key)) {
            warn_(createMessage('unset', 'key必须是字符串'));
            return;
        }
        this._source.unset(key, silent);
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

    getProjection(): Projection | undefined {
        const projection = this._source.getProjection();
        return projection ? new Projection(projection.getCode()) : undefined;
    }

    getRevision() {
        return this._source.getRevision();
    }

    getState() {
        return this._source.getState();
    }

    getWrapX() {
        return this._source.getWrapX();
    }

    getInterpolate() {
        return this._source.getInterpolate();
    }

    getResolutions(projection?: Projection) {
        return this._source.getResolutions(projection?.getProjection());
    }

    getView() {
        return this._source.getView();
    }

    getProperties(): Record<string, any> {
        return this._source.getProperties();
    }

    refresh() {
        this._source.refresh();
    }

    setAttributions(attributions: OMapSourceAttributionLike | undefined) {
        this._source.setAttributions(attributions);
    }

    setState(state: OMapSourceState) {
        this._source.setState(state);
    }

    setProperties(properties: Record<string, any>, silent?: boolean) {
        this._source.setProperties(properties, silent);
    }

    // on(type: string | string[], listener: ListenerFunction): EventsKey | EventsKey[] {
    //     if ((!isString(type) && !Array.isArray(type)) || !isDefined(listener)) {
    //         error_(createMessage('on', 'type或listener参数格式有误'));
    //     }
    //     return this._source.on(type, listener);
    // }

    // once(type: string | string[], listener: ListenerFunction): EventsKey | EventsKey[] {
    //     if ((!isString(type) && !Array.isArray(type)) || !isDefined(listener)) {
    //         error_(createMessage('once', 'type或listener参数格式有误'));
    //     }
    //     return this._source.once(type, listener);
    // }

    // un(type: string | string[], listener: ListenerFunction) {
    //     if ((!isString(type) && !Array.isArray(type)) || !isDefined(listener)) {
    //         error_(createMessage('un', 'type或listener参数格式有误'));
    //     }
    //     this._source.un(type, listener);
    // }

    // unByKey(key: EventsKey | EventsKey[]) {
    //     if (Array.isArray(key)) {
    //         key.forEach(item => OlEvent.unlistenByKey(item))
    //     } else {
    //         OlEvent.unlistenByKey(key)
    //     }
    // }

}
