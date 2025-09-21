import type { OMapEventType } from './olType/map'
import { defaultValue } from './define';

export function MapEventTypeIsMap(type: OMapEventType): boolean {
    return type.startsWith('map:')
}

export function getCurrentDateTime() {
    const now = new Date();
    // 获取各个部分
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以要加1
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    // 组合成你想要的格式，例如：2025-09-04 15:55:30
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
}

export function getDevicePixelRatio() {
    return defaultValue(window.devicePixelRatio, 1);
}