import { isDefined } from '../../../utils/index';
import Popup from '../../basic/Popup/index'
import Pixel from '../../basic/Pixel/index'
import Lnglat from '../../basic/Lnglat/index'
import type { OlCoordinateType } from '../../basic/Lnglat/type'
import { createMeasureTooltipElement } from './handle'

interface TooltipPopupLike {
    popup?: Popup;
}

interface TooltipPopupInitialized {
    popup: Popup;
}

export default class TooltipPopup implements TooltipPopupLike {

    popup?: Popup;

    constructor(text: string) {
        this.initPopup(text || '')
    }

    protected _isInitialized(): this is TooltipPopupInitialized & this {
        if (!isDefined(this.popup)) {
            return false;
        }
        return true;
    }

    protected initPopup(text: string) {
        let div = createMeasureTooltipElement(text)
        this.popup = new Popup({
            id: 'omap-measure-popup',
            element: div,
            offset: new Pixel(0, -10)
        });
    }

    getPopup() {
        return this.popup;
    }

    updatePosition(position: Lnglat | OlCoordinateType | undefined): void {

        this.popup.setPosition(position)
    }

    setElement(element: HTMLElement | undefined): void {

        this.popup.setElement(element as HTMLElement)
    }

    getElement(): HTMLElement | undefined {

        return this.popup.getElement()
    }
}