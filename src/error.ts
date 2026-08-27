export const OMapErrorCode = {
  Runtime: 'OMAP_RUNTIME_ERROR',
  InvalidParameter: 'OMAP_INVALID_PARAMETER'
} as const

export type OMapErrorCodeType = (typeof OMapErrorCode)[keyof typeof OMapErrorCode]

export class OMapError extends Error {
  readonly code: OMapErrorCodeType

  constructor(message: string, code: OMapErrorCodeType = OMapErrorCode.Runtime) {
    super(message)
    this.name = 'OMapError'
    this.code = code
  }
}
