import { type OlSource } from '../../source/index'
import type Projection from '../../module/core/Projection/index'
import type { ManualOmit } from '../type'

// 【1】TileSource  12个属性
type OlTileSourceOptionsType = ConstructorParameters<typeof OlSource.Tile>[0]
type CustOlTileSourceOptionsType = ManualOmit<OlTileSourceOptionsType, 'projection'> // 去掉 projection类型
// 【1-1】 TileImageSource
type OlTileImageSourceOptionsType = ConstructorParameters<typeof OlSource.ImageTile>[0]
type CustOlTileImageSourceOptionsType = ManualOmit<OlTileImageSourceOptionsType, 'projection'>

// 【1-1-1】 XYZ
type OlXYZSourceOptionsType = ConstructorParameters<typeof OlSource.XYZ>[0]
type CustOlXYZSourceOptionsType = ManualOmit<OlXYZSourceOptionsType, 'projection'>

export type XYZSourceOptionsFinalType = CustOlTileSourceOptionsType &
  CustOlTileImageSourceOptionsType &
  CustOlXYZSourceOptionsType & {
    projection?: Projection | string
  }
