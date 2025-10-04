import { OlProj } from '../../../source/index'
import Projection from './index'

export type OlProjType = string
export type OMapProjectionType = OlProjType | Projection

export type ProjectionUnitsType = 'radians' | 'degrees' | 'ft' | 'm' | 'pixels' | 'tile-pixels' | 'us-ft';

export type OlProjOptionsType = ConstructorParameters<typeof OlProj.Projection>[0]

export type OlProjInstanceType = InstanceType<typeof OlProj.Projection>;