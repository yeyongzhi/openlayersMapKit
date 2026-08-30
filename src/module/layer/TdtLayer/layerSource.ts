import { type TdtLayerTypeEnum, type TdtLayerProjTypeEnum } from './type'
import { MapToken } from '../../util/index'

const commonUrlTemplate = `http://t{0-7}.tianditu.com/DataServer?T={T}&tk={tk}&x={x}&y={y}&l={z}`

export function getTdtServiceUrl(type: TdtLayerTypeEnum, proj: TdtLayerProjTypeEnum) {
  return commonUrlTemplate
    .replace(/\{T\}/g, type + '_' + proj)
    .replace(/\{tk\}/g, MapToken.tdt as string)
}
