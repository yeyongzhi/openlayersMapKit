export interface EventItem<T extends readonly unknown[] = readonly unknown[]> {
    id: string;
    target?: any;
    type?: string;
    callback: (...args: T) => void;
    once?: boolean;
    unlisten?: OMapEventsKeyType;
}

export type EventIdType = EventItem['id']

export type OMapEventsKeyType = {
    listener: (...args: any[]) => void;
    target: any;
    type: string
}