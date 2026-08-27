import Control from './index'
import { OlControl } from '../../../source/index'

export type OMapControlTypeType = 'Zoom' | 'FullScreen'
export type OMapControlIdType = string | number | null

export function isVaildControl(value: unknown): value is Control<OlControl.Control> {
  return value instanceof Control
}

export type OMapControlCommonType = OlControl.Control
