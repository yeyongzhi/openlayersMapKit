import { describe, expect, it } from 'vitest'
import { OMapError, OMapErrorCode } from '../../src/error'
import { error_ } from '../../src/utils/message'

describe('OMapError', () => {
  it('provides a stable public error identity and code', () => {
    const error = new OMapError('invalid', OMapErrorCode.InvalidParameter)

    expect(error).toBeInstanceOf(Error)
    expect(error.name).toBe('OMapError')
    expect(error.code).toBe('OMAP_INVALID_PARAMETER')
  })

  it('is used by the shared validation error boundary', () => {
    expect(() => error_('invalid parameter')).toThrowError(OMapError)

    try {
      error_('invalid parameter')
    } catch (error) {
      expect(error).toMatchObject({ code: OMapErrorCode.InvalidParameter })
    }
  })
})
