import { isDefined, isNumber, isCoordinatesType } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'

const PACKAGE_NAME = 'Event';
const createMessage = getPackageMessage(PACKAGE_NAME);

interface EventItem<T extends readonly unknown[] = readonly unknown[]> {
    id: string | number;
    target?: any;
    type?: string;
    callback: (...args: T) => void;
    once?: boolean;
}

/** 
 * @class Event事件处理类
 * @classdesc 全局通用的事件处理
 * @author yyz
 * @CreateDate 2025/7/11
 * @LastUpdateDate 2025/7/12
 */
export default class Event<Events extends Record<string, readonly unknown[]> = Record<string, readonly unknown[]>> {

    private events = new Map<string, Array<EventItem<any>>>();
    private target: any = null;
    private total: number = 0;

    constructor(target?: any) {
        this.events.clear()
        this.target = target
    }

    on<K extends keyof Events>(type: K, callback: (...args: Events[K]) => void): number {
        let _typeVals = this.events.get(type as string) || []
        let valId = ++this.total;
        _typeVals.push({
            id: valId,
            target: this.target,
            type: type as string,
            callback
        })
        this.events.set(type as string, _typeVals)
        return valId
    }

    once<K extends keyof Events>(
        type: K,
        callback: (...args: Events[K]) => void
    ): number {
        const list = this.events.get(type as string) || [];
        const id = ++this.total;
        list.push({
            id,
            target: this.target,
            type: type as string,
            callback,
            once: true
        });
        this.events.set(type as string, list);
        return id;
    }

    emit<K extends keyof Events>(type: K, ...args: Events[K]): this {
        const list = this.events.get(type as string);
        if (!list || list.length === 0) return this;
        // 拷贝一份，防止在回调里增删时遍历出错
        for (let i = 0; i < list.length; ) {
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

    remove(id: number): this {
        for (const [type, list] of this.events.entries()) {
            const idx = list.findIndex(item => item.id === id);
            if (idx !== -1) {
                list.splice(idx, 1);
                if (list.length === 0) this.events.delete(type);
                return this;
            }
        }
        warn_(createMessage('remove', `未找到 id=${id} 的监听`));
        return this;
    }

    off<K extends keyof Events>(type?: K): this {
        if (type === undefined) {
            this.events.clear();
        } else {
            this.events.delete(type as string);
        }
        return this;
    }

    getEventById(id: string | number): EventItem | undefined {
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

}