function warn_(message: string): void {
    console.warn("omap warn", message);
}

function error_(message: string): void {
    throw new Error(`omap error ${message}`);
}

function info_(message: string): void {
    console.info("omap info", message);
}

function getPackageMessage(packageName: string) {
    return (methodName: string, message: string) => {
        return `📦${packageName}【${methodName}】: ${message}`
    }
}

export function paramsNotDefined(paramsName: string) {
    return `参数${paramsName}不能为空`
}

export function paramsInvaildFormat(paramsName: string, format?: string) {
    return `参数${paramsName}格式错误` + (format ? `，正确格式为${format}` : "")
}

export function haveInvaildDataItem(paramsName: string) {
    return `参数${paramsName}中存在无效数据，已过滤`
}

const commonMessage = {
    paramsNotDefined,
    paramsInvaildFormat,
    haveInvaildDataItem
}

export { 
    warn_,
    info_,
    error_,
    getPackageMessage,
    commonMessage
}