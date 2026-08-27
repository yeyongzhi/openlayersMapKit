import { OlControl } from '../../../source/index'

export type OMapControlZoomOptionsType = ConstructorParameters<typeof OlControl.Zoom>[0]
export const DEFAULT_ZOOM_OPTIONS: OMapControlZoomOptionsType = {
  duration: 250,
  className: 'ol-zoom',
  zoomInLabel: '+',
  zoomOutLabel: '-',
  zoomInTipLabel: '放大',
  zoomOutTipLabel: '缩小',
  zoomInClassName: 'ol-zoom-in',
  zoomOutClassName: 'ol-zoom-out',
  delta: 1
}

export type OMapControlZoomType = OlControl.Zoom
