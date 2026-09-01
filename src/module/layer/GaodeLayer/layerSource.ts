import { type GaodeLayerTypeEnum } from './type'

export const GaodeLayerTypeUrls: Record<GaodeLayerTypeEnum, Array<string>> = {
  vec: [
    'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
    'https://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
    'https://webrd03.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
    'https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
  ],
  img: [
    'https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
    'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
    'https://webst03.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
    'https://webst04.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
  ],
  road: [
    'https://webst01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
    'https://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
    'https://webst03.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
    'https://webst04.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8'
  ]
}
