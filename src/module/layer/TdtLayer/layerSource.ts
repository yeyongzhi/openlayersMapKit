import { type TdtLayerTypeEnum, type TdtLayerProjTypeEnum } from './type'
import { MapToken } from '../../util/index'

const commonUrlTemplate = `http://t{0-7}.tianditu.com/DataServer?T={T}&tk={tk}&x={x}&y={y}&l={z}`

export const TdtLayerTypeUrls: Record<TdtLayerTypeEnum, string> = {
    vec: `http://t{0-7}.tianditu.com/DataServer?T=vec_w&tk=4774ca01d665a06c9e494ca5f29dba10&x={x}&y={y}&l={z}`,
    img: `http://t{0-7}.tianditu.com/DataServer?T=img_w&tk=4774ca01d665a06c9e494ca5f29dba10&x={x}&y={y}&l={z}`,
    ter: `http://t{0-7}.tianditu.com/DataServer?T=ter_w&tk=4774ca01d665a06c9e494ca5f29dba10&x={x}&y={y}&l={z}`,
    cva: `http://t{0-7}.tianditu.com/DataServer?T=cva_w&tk=4774ca01d665a06c9e494ca5f29dba10&x={x}&y={y}&l={z}`,
    cia: `http://t{0-7}.tianditu.com/DataServer?T=cia_w&tk=4774ca01d665a06c9e494ca5f29dba10&x={x}&y={y}&l={z}`,
    cta: `http://t{0-7}.tianditu.com/DataServer?T=cta_w&tk=4774ca01d665a06c9e494ca5f29dba10&x={x}&y={y}&l={z}`,
}

export function getTdtServiceUrl(type: TdtLayerTypeEnum, proj: TdtLayerProjTypeEnum) {
    return commonUrlTemplate.replace(/\{T\}/g, type + '_' + proj).replace(/\{tk\}/g, MapToken.tdt as string)
}