import type { TdtLayerTypeEnum } from './index'

const commonUrlTemplate = `http://t${index}.tianditu.com/DataServer?T=${this.tdtType}&tk=${this.tk}&x={x}&y={y}&l={z}`

export const TdtLayerTypeUrls: Record<TdtLayerTypeEnum, Array<string>> = {
    vec: [
        "https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
        "https://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
        "https://webrd03.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
        "https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
    ],
    img: [
        "http://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
        "http://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
        "http://webst03.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
        "http://webst04.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}"
    ],
    ter: [
        "http://webst01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
        "http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
        "http://webst03.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
        "http://webst04is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8"
    ]
}