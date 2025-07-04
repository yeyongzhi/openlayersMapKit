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

export { 
    warn_,
    info_,
    error_,
    getPackageMessage
}