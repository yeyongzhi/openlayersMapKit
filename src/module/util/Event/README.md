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
on(type: string, callback: () => void) {
    if (!this._isInitialized('on')) return;
    if (!isDefined(type) || !isDefined(callback)) {
        warn_(createMessage('on', '参数不能为空'));
        return;
    }
    let list = (this.events as Event).get(type)
    if (!isDefined(list) || list.length === 0) {
        (this._interaction as OlModifyInstanceType).on(type, (e) => {
            (this.events as Event).emit(type, handleModifyEvent(this, type, e))
        })
    }
    const id = (this.events as Event).on(type, callback)
    return id
}

un(id: number): void {
    if (!this._isInitialized('un')) return;
    if (!isDefined(id)) {
        warn_(createMessage('un', '参数不能为空'));
        return;
    }
    if (!isNumber(id)) {
        warn_(createMessage('un', '事件ID应为number类型'));
        return;
    }
    (this.events as Event).remove(id)
}

once() {
    ...同上面的on，只需要修改下面这一行
    const id = (this.events as Event).once(type, callback)
}
```

## 3. 事件触发
```javascript
(this.events as Event).emit(type, { ... })
```