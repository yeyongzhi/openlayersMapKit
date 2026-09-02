function warn_(message: string): void {
  console.warn('🐞OMap Warn', message)
}

function error_(message: string, code: OMapErrorCodeType = OMapErrorCode.InvalidParameter): never {
  throw new OMapError(`⚠️OMap Error ${message}`, code)
}

function info_(message: string): void {
  console.info('❕️OMap Info', message)
}

function getPackageMessage(packageName: string) {
  return (methodName: string, message: string) => {
    return `📦${packageName}【${methodName}】: ${message}`
  }
}

/** 校验提示 */

export function paramsNotDefined(paramsName: string) {
  return `参数${paramsName}不能为空`
}

export function paramsListHaveNotDefined(...paramsName: string[]) {
  return `参数${paramsName.join('、')}均不能为空`
}

export function paramsInvalidFormat(paramsName: string, format?: string) {
  return `参数${paramsName}格式错误` + (format ? `，正确格式为${format}` : '')
}

export function paramsInvalidEnum(paramsName: string, _enums?: string) {
  return `参数${paramsName}不在合法枚举值内`
}

export function paramsListInvalidFormat(...paramsName: string[]) {
  return `参数${paramsName.join('、')}格式错误`
}

export function haveInvalidDataItem(paramsName: string) {
  return `参数${paramsName}中存在无效数据，已过滤`
}

/** @deprecated 请使用 {@link paramsInvalidFormat}。 */
export const paramsInvaildFormat = paramsInvalidFormat
/** @deprecated 请使用 {@link paramsInvalidEnum}。 */
export const paramsInvaildEnum = paramsInvalidEnum
/** @deprecated 请使用 {@link paramsListInvalidFormat}。 */
export const paramsListInvaildFormat = paramsListInvalidFormat
/** @deprecated 请使用 {@link haveInvalidDataItem}。 */
export const haveInvaildDataItem = haveInvalidDataItem

const commonMessage = {
  paramsNotDefined,
  paramsListHaveNotDefined,
  paramsInvalidFormat,
  paramsInvalidEnum,
  paramsListInvalidFormat,
  haveInvalidDataItem
}

export { warn_, info_, error_, getPackageMessage, commonMessage }
import { OMapError, OMapErrorCode, type OMapErrorCodeType } from '../error'
