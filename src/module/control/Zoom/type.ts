import { OlControl } from '../../../source/index'

export type OMapControlFullScreenOptionsType = ConstructorParameters<typeof OlControl.FullScreen>[0]
export const DEFAULT_FullScreen_OPTIONS: OMapControlFullScreenOptionsType = {
    className: 'ol-full-screen',
    activeClassName: 'ol-full-screen-true',
    inactiveClassName: 'ol-full-screen-false',
    tipLabel: '全屏',
    keys: false
}

export type OMapControlFullScreenInstanceType = InstanceType<typeof OlControl.FullScreen>

export type OMapControlFullScreenInitialized = {
    _control: OMapControlFullScreenInstanceType
}
