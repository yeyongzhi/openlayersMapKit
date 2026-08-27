import { defaultValue, isDefined, isFunction } from '../../../../utils/index'
import { commonMessage, error_, getPackageMessage, warn_ } from '../../../../utils/message'
import { OlUtil } from '../../../../source/index'
import Popup from '../../../basic/Popup/index'
import { isVaildPopup, isVaildPopupId, type OMapPopupIdType } from '../../../basic/Popup/type'
import type { PropertiesType } from '../../../../utils/type'
import type Map from '../index'
import type { OMapMapType } from '../type'

const createMessage = getPackageMessage('Map')

/** Owns Popup collection state and native Overlay mounting for one Map. */
export default class PopupManager {
  private readonly popups: Popup[] = []

  constructor(
    private readonly owner: Map,
    private readonly getNativeMap: () => OMapMapType
  ) {}

  add(popup: Popup): void {
    if (!isDefined(popup)) {
      error_(createMessage('addPopup', commonMessage.paramsNotDefined('popup')))
    }
    if (!isVaildPopup(popup)) {
      error_(createMessage('addPopup', commonMessage.paramsInvaildFormat('popup', 'Popup类型')))
    }
    const exists = this.popups.some(
      (item) => OlUtil.getUid(item.getPopup()) === OlUtil.getUid(popup.getPopup())
    )
    if (exists) {
      warn_(createMessage('addPopup', '该弹窗已添加到地图中'))
      return
    }

    this.popups.push(popup)
    popup.setMap(this.owner)
    this.getNativeMap().addOverlay(popup.getPopup())
  }

  getById(id: OMapPopupIdType): Popup | null {
    if (!isDefined(id)) {
      error_(createMessage('getPopupById', commonMessage.paramsNotDefined('id')))
    }
    if (!isVaildPopupId(id)) {
      error_(
        createMessage(
          'getPopupById',
          commonMessage.paramsInvaildFormat('id', 'OMapPopupIdType类型')
        )
      )
    }
    return defaultValue(
      this.popups.find((popup) => isDefined(popup.getId()) && popup.getId() === id),
      null
    )
  }

  getByProperties(filter: (properties: PropertiesType) => boolean): Popup[] {
    if (!isDefined(filter)) {
      error_(createMessage('getPopupById', commonMessage.paramsNotDefined('filter')))
    }
    if (!isFunction(filter)) {
      error_(createMessage('getPopupById', commonMessage.paramsInvaildFormat('filter', '函数类型')))
    }
    return this.popups.filter((popup) => filter(popup.getProperties()))
  }

  getAll(): Popup[] {
    return this.popups
  }

  remove(popup: Popup): void {
    if (!isDefined(popup)) {
      error_(createMessage('addPopup', commonMessage.paramsNotDefined('popup')))
    }
    if (!isVaildPopup(popup)) {
      error_(createMessage('addPopup', commonMessage.paramsInvaildFormat('popup', 'Popup类型')))
    }
    const index = this.popups.findIndex(
      (item) => OlUtil.getUid(item.getPopup()) === OlUtil.getUid(popup.getPopup())
    )
    if (index === -1) {
      warn_(createMessage('removePopup', '该弹窗未添加到地图中'))
      return
    }

    this.popups.splice(index, 1)
    popup.setMap(null)
    this.getNativeMap().removeOverlay(popup.getPopup())
  }

  clear(): void {
    ;[...this.popups].forEach((popup) => this.remove(popup))
  }

  disposeAll(): void {
    ;[...this.popups].forEach((popup) => popup.dispose())
  }
}
