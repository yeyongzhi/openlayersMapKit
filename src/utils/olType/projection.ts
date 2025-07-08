import { OlProj } from '../../source/index'

export type ProjectionUnitsType = 'radians' | 'degrees' | 'ft' | 'm' | 'pixels' | 'tile-pixels' | 'us-ft';

export type OlProjOptionsType = ConstructorParameters<typeof OlProj.Projection>[0]

export type OlProjInstanceType = InstanceType<typeof OlProj.Projection>;