import { isDefined, defaultValue, isNumber, isCoordinatesType, isFunction } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'
import type { EventItem, EventIdType, OMapEventsKeyType } from './type'
import { OlEvent } from '../../../source/index'
import { getConstructorName } from './handle'

const PACKAGE_NAME = 'Event';
const createMessage = getPackageMessage(PACKAGE_NAME);

/** 
 * @class Event事件处理类
 * @classdesc 全局通用的事件处理
 * @author yyz
 * @CreateDate 2025/7/11
 * @LastUpdateDate 2026/1/7
 */
export default class Event<Events extends Record<string, readonly unknown[]> = Record<string, readonly unknown[]>> {

    protected instanceName: string = "";
    private localCounter = 0; // 本实例内的递增序号
    private events = new Map<string, Array<EventItem<any>>>(); // 记录事件类型和事件回调
    private target: any = null;
    private total: number = 0;

    constructor(target?: any) {
        this.events.clear()
        this.target = target
        this.instanceName = getConstructorName(target) || ""
    }

    private generateId(): EventIdType {
        return `${this.instanceName}-event-${++this.localCounter}` as const;
    }

    on<K extends keyof Events>(type: K, callback: (...args: Events[K]) => void, unlisten?: OMapEventsKeyType): EventIdType {
        let _typeVals = this.events.get(type as string) || []
        const id = this.generateId();
        _typeVals.push({
            id,
            target: this.target,
            type: type as string,
            callback,
            unlisten,
        })
        this.events.set(type as string, _typeVals)
        return id
    }

    once<K extends keyof Events>(
        type: K,
        callback: (...args: Events[K]) => void,
        unlisten?: OMapEventsKeyType,
    ): EventIdType {
        const list = this.events.get(type as string) || [];
        const id = this.generateId();
        list.push({
            id,
            target: this.target,
            type: type as string,
            callback,
            once: true,
            unlisten,
        });
        this.events.set(type as string, list);
        return id;
    }

    emit<K extends keyof Events>(type: K, ...args: Events[K]): this {
        const list = this.events.get(type as string);
        if (!list || list.length === 0) return this;
        // 拷贝一份，防止在回调里增删时遍历出错
        for (let i = 0; i < list.length;) {
            const item = list[i];
            try {
                item.callback.call(item.target, ...args);
            } catch (e) {
                error_(createMessage('emit', `回调异常: ${String(e)}`));
            }
            if (item.once) {
                list.splice(i, 1);
            } else {
                i++;
            }
        }
        // 清空空数组，减少内存占用
        if (list.length === 0) this.events.delete(type as string);
        return this;
    }

    remove(id: EventIdType): this {
        for (const [type, list] of this.events.entries()) {
            const idx = list.findIndex(item => item.id === id);
            if (idx !== -1) {
                const item = list[idx];
                this.disposeUnlisten(item.unlisten);
                list.splice(idx, 1);
                if (list.length === 0) this.events.delete(type);
                return this;
            }
        }
        warn_(createMessage('remove', `未找到【id=${id}】的监听`));
        return this;
    }

    off<K extends keyof Events>(type?: K): this {
        if (type === undefined) {
            // 清空全部
            for (const list of this.events.values()) {
                for (const item of list) {
                    this.disposeUnlisten(item.unlisten);
                }
            }
            this.events.clear();
        } else {
            const list = this.events.get(type as string);
            if (list) {
                for (const item of list) {
                    this.disposeUnlisten(item.unlisten);
                }
                this.events.delete(type as string);
            }
        }
        return this;
    }

    getEventById(id: EventIdType): EventItem | undefined {
        for (const list of this.events.values()) {
            const found = list.find(item => item.id === id);
            if (found) return found;
        }
        return undefined;
    }

    get<K extends keyof Events>(type: K): ReadonlyArray<EventItem<Events[K]>> {
        return this.events.get(type as string) || [];
    }

    listenerCount<K extends keyof Events>(type: K): number {
        return this.events.get(type as string)?.length || 0;
    }

    private disposeUnlisten(unlisten?: OMapEventsKeyType) {
        if (!isDefined(unlisten)) return;
        if (isFunction(unlisten)) {
            unlisten();
            return;
        }
        if (Array.isArray(unlisten)) {
            unlisten.forEach(item => OlEvent.unlistenByKey(item));
            return;
        }
        OlEvent.unlistenByKey(unlisten);
    }

}
