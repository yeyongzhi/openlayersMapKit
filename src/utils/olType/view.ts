import type { OlCoordinateType } from '../../module/basic/LngLat/type'
import type LngLat from '../../module/basic/LngLat/index'

export interface OlAnimationOptions {
  center?: LngLat | OlCoordinateType
  zoom?: number
  resolution?: number
  rotation?: number
  anchor?: LngLat | OlCoordinateType
  duration?: number
  easing?: (t: number) => number
}
