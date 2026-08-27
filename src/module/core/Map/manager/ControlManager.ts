import { isDefined, isNumber, isString } from '../../../../utils/index'
import { commonMessage, error_, getPackageMessage, warn_ } from '../../../../utils/message'
import { OlUtil } from '../../../../source/index'
import Control from '../../../control/Control/index'
import { isVaildControl, type OMapControlIdType } from '../../../control/Control/type'
import type { OMapMapType } from '../type'
import type Map from '../index'

const createMessage = getPackageMessage('Map')

/** Owns Control collection state and native Control mounting for one Map. */
export default class ControlManager {
  private readonly controls: Control[] = []

  constructor(
    private readonly owner: Map,
    private readonly getNativeMap: () => OMapMapType
  ) {}

  add(control: Control): void {
    if (!isDefined(control)) {
      error_(createMessage('addControl', commonMessage.paramsNotDefined('control')))
    }
    if (!isVaildControl(control)) {
      error_(
        createMessage('addControl', commonMessage.paramsInvaildFormat('control', 'Control类型'))
      )
    }
    const exists = this.controls.some(
      (item) => OlUtil.getUid(item.getControl()) === OlUtil.getUid(control.getControl())
    )
    if (exists) {
      warn_(createMessage('addControl', '该控件已添加到地图中'))
      return
    }

    this.controls.push(control)
    control.setMap(this.owner)
    this.getNativeMap().addControl(control.getControl())
  }

  getAll(): Control[] {
    return this.controls
  }

  getById(id: OMapControlIdType): Control | null {
    if (!isDefined(id)) {
      error_(createMessage('getControlById', commonMessage.paramsNotDefined('id')))
    }
    if (!isNumber(id) && !isString(id)) {
      error_(
        createMessage(
          'getControlById',
          commonMessage.paramsInvaildFormat('id', 'OMapControlIdType类型')
        )
      )
    }
    return this.controls.find((control) => control.getId() === id) ?? null
  }

  remove(control: Control): void {
    if (!isDefined(control)) {
      error_(createMessage('addControl', commonMessage.paramsNotDefined('control')))
    }
    if (!isVaildControl(control)) {
      error_(
        createMessage('addControl', commonMessage.paramsInvaildFormat('control', 'Control类型'))
      )
    }
    const index = this.controls.findIndex(
      (item) => OlUtil.getUid(item.getControl()) === OlUtil.getUid(control.getControl())
    )
    if (index === -1) {
      warn_(createMessage('removeControl', '该控件未添加到地图中'))
      return
    }

    this.controls.splice(index, 1)
    control.setMap(null)
    this.getNativeMap().removeControl(control.getControl())
  }

  clear(): void {
    ;[...this.controls].forEach((control) => this.remove(control))
  }

  disposeAll(): void {
    ;[...this.controls].forEach((control) => control.dispose())
  }
}
