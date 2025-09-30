import Popup from './index'
import Lnglat from '../../basic/Lnglat/index'
import Pixel from '../../basic/Pixel/index'
import { type OMapPopupEventType } from './type'

/**
 * 创建默认弹窗内容元素
 * @param content 弹窗内容
 * @returns {HTMLElement} 弹窗内容元素
 * @todo 可以考虑加一个小箭头的样式
 */
export function createDefaultContentElement(content: string): HTMLElement {
    let div = document.createElement('div');
    div.className  = 'omap-popup-default-element';
    div.innerHTML = content;
    return div;
}

interface OMapPopupEventTarget {
    target: Popup;
    type: OMapPopupEventType;
    key?: string;
    oldValue?: Lnglat | string | HTMLElement | Pixel | Record<string, any>;
    newValue?: Lnglat | string | HTMLElement | Pixel | Record<string, any>;
}

export function handlePopupEvent(target: Popup, type: OMapPopupEventType, e: any) {
    const { oldValue, key, newValue } = e
    let result: OMapPopupEventTarget = {
        target,
        type,
        key
    }
    switch (type) {
        case "change:position":
            result.oldValue = new Lnglat(oldValue[0], oldValue[1])
            result.newValue = target.getPosition()
            break;
        case "change:positioning":
            result.oldValue = oldValue
            result.newValue = target.getPositioning()
            break;
        case "change:element":
            result.oldValue = oldValue
            result.newValue = target.getElement()
            break;
        case "change:offset":
            result.oldValue = new Pixel(oldValue[0], oldValue[1])
            result.newValue = target.getOffset()
            break;
        case "change:properties":
        case "change:content":
            result.oldValue = oldValue
            result.newValue = newValue
            break;
    }
    return result
}