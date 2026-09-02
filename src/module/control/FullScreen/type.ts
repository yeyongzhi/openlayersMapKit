import { type OlControl } from '../../../source/index'

export type OMapControlFullScreenOptionsType = ConstructorParameters<typeof OlControl.FullScreen>[0]

export const DEFAULT_FULLSCREEN_OPTIONS: OMapControlFullScreenOptionsType = {
  className: 'ol-full-screen',
  activeClassName: 'ol-full-screen-true',
  inactiveClassName: 'ol-full-screen-false',
  tipLabel: '全屏',
  keys: false
}

export type OMapControlFullScreenType = InstanceType<typeof OlControl.FullScreen>
