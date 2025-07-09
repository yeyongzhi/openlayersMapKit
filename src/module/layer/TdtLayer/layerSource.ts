import type { TdtLayerTypeEnum, TdtLayerProjTypeEnum } from './index'
import { MapToken } from '../../util/index'

const commonUrlTemplate = `http://t{0-7}.tianditu.com/DataServer?T={T}&tk={tk}&x={x}&y={y}&l={z}`

export const TdtLayerTypeUrls: Record<TdtLayerTypeEnum, Array<string>> = {
    vec: [],
    img: [],
    ter: []
}

export const createTdtLayerTypeUrls = (type: TdtLayerTypeEnum, proj: TdtLayerProjTypeEnum) => {
    let t: string[] = []
    if(type === 'vec') {
        t = ['vec', 'cva']
    } else if(type === 'img') {
        t = ['img', 'cia']
    } else if(type === 'ter') {
        t = ['ter', 'cta']
    }
    return t.map(item => {
        commonUrlTemplate.replace('{T}', item + proj).replace('{tk}', MapToken.tdt as string)
    })
}