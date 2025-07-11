import { isDefined, isNumber, isCoordinatesType } from '../../../utils/index';
import { warn_, error_, getPackageMessage } from '../../../utils/index'

const PACKAGE_NAME = 'Event';
const createMessage = getPackageMessage(PACKAGE_NAME);

interface EventItem {
    id: string | number;
    target?: any;
    type?: string;
    callback: () => void;
}

/** 
 * @class Event事件处理类
 * @classdesc 全局通用的事件处理
 * @author yyz
 * @CreateDate 2025/7/11
 * @LastUpdateDate 2025/7/11
 */
export default class Event {

    events: Map<string | number, Array<EventItem>> = new Map()
    target: any = null;
    total: number = 0;

    constructor(target: any) {
        this.events.clear()
        this.target = target
    }

    add(type: string, callback: () => void) {
        let _typeVals: Array<EventItem> = this.events.get(type) || []
        let valId = this.total + 1
        _typeVals.push({
            id: valId,
            target: this.target,
            type,
            callback
        })
        this.events.set(type, _typeVals)
        this.total++
        return valId
    }

    remove(id: string | number) {
        this.events.keys().forEach(k => {
            let eventlist = this.events.get(k)
            if (isDefined(eventlist) && (eventlist as Array<EventItem>).length > 0) {
                (eventlist as Array<EventItem>).forEach((e, i) => {
                    if (e.id === id) {
                        (eventlist as Array<EventItem>).splice(i, 1)
                    }
                })
                this.events.set(k, (eventlist as Array<EventItem>))
            }
        })
    }

    get(type: string) {
        return this.events.get(type) || []
    }

    clear(type: string) {
        if (isDefined(type)) {
            this.events.delete(type)
        } else {
            this.events.clear()
        }
    }

}