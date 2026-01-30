# 事件处理类

## 1. 初始化
events: Event = new Event(target?: any);

```javascript
constructor() {
    ...
    this.events = new Event(this)
}
```

## 2. 事件监听

```javascript
on(type: OMapInteractionExtentEventType, callback: () => void): EventIdType | undefined {

    if (!isDefined(type) || !isDefined(callback)) {
        warn_(createMessage('on', commonMessage.paramsListHaveNotDefined('type or callback')));
        return;
    }
    if (!isOMapInteractionExtentEventType(type)) {
        warn_(createMessage('on', commonMessage.paramsInvaildEnum('type')));
        return;
    };
    if (!isFunction(callback)) {
        warn_(createMessage('on', commonMessage.paramsInvaildFormat('callback', 'function')));
        return;
    }
    const unlisten = OlEvent.listen((this._interaction as OlInteractionExtentInstanceType), type, (e: any) => {
        this.events.emit(type, handleInteractionExtentEvent(this, type, e))
    })
    const id = this.events.on(type, callback, unlisten)
    return id
}

once(type: OMapInteractionExtentEventType, callback: () => void): EventIdType | undefined {

    if (!isDefined(type) || !isDefined(callback)) {
        warn_(createMessage('once', '参数不能为空'));
        return;
    }
    if (!isOMapInteractionExtentEventType(type)) {
        warn_(createMessage('once', '事件类型错误'));
        return;
    };
    if (!isFunction(callback)) {
        warn_(createMessage('once', '回调函数不能为空'));
        return;
    }
    const unlisten = OlEvent.listen((this._interaction as OlInteractionExtentInstanceType), type, (e: any) => {
        this.events.emit(type, handleInteractionExtentEvent(this, type, e))
    })
    const id = this.events.once(type, callback, unlisten)
    return id
}

un(id: EventIdType): void {

    if (!isDefined(id)) {
        warn_(createMessage('un', commonMessage.paramsNotDefined('id')));
        return;
    }
    if (!isNumber(id)) {
        warn_(createMessage('un', '事件ID应为number类型'));
        return;
    }
    this.events.remove(id)
}
```

## 3. 事件触发
```javascript
(this.events as Event).emit(type, { ... })
```