import { describe, expect, it, vi } from 'vitest'
import { OMapError, OMapErrorCode, ProjUtil, Projection, LngLat } from '../../src/index'

/** 已知常量：EPSG:3857 的 Web Mercator 半周长（米）。 */
const MERCATOR_HALF_WIDTH = 20037508.342789244

describe('Projection', () => {
  it('normalizes numeric and fully qualified codes', () => {
    expect(new Projection('4326').getCode()).toBe('EPSG:4326')
    expect(new Projection('EPSG:4326').getCode()).toBe('EPSG:4326')
    expect(new Projection('3857').getCode()).toBe('EPSG:3857')
  })

  it('accepts an options object and normalizes its code', () => {
    expect(new Projection({ code: '4326' }).getCode()).toBe('EPSG:4326')
    expect(new Projection({ code: 'EPSG:3857' }).getCode()).toBe('EPSG:3857')
  })

  it('exposes units, axis orientation and extent for known projections', () => {
    const geographic = new Projection('EPSG:4326')
    expect(geographic.getUnits()).toBe('degrees')
    expect(geographic.getAxisOrientation()).toBe('neu')
    expect(geographic.getExtent()).toEqual([-180, -90, 180, 90])

    const mercator = new Projection('EPSG:3857')
    expect(mercator.getUnits()).toBe('m')
    expect(mercator.getAxisOrientation()).toBe('enu')
    const extent = mercator.getExtent()
    expect(extent[0]).toBeCloseTo(-MERCATOR_HALF_WIDTH, 6)
    expect(extent[2]).toBeCloseTo(MERCATOR_HALF_WIDTH, 6)
  })

  it('returns the underlying OpenLayers projection instance', () => {
    const projection = new Projection('EPSG:4326')
    const native = projection.getProjection()

    expect(native).toBeDefined()
    expect(typeof native.getUnits).toBe('function')
    expect(native.getCode()).toBe('EPSG:4326')
  })

  it('throws OMapError instead of leaking a native TypeError for unknown projections', () => {
    let thrown: unknown = null
    try {
      new Projection('EPSG:99999')
    } catch (error) {
      thrown = error
    }

    expect(thrown).toBeInstanceOf(OMapError)
    expect(thrown).toBeInstanceOf(Error)
    expect((thrown as OMapError).code).toBe(OMapErrorCode.InvalidParameter)
    expect((thrown as Error).message).toContain('EPSG:99999')
  })

  it('throws OMapError when the options object omits code', () => {
    expect(() => new Projection({} as { code: string })).toThrow(OMapError)
  })
})

describe('ProjUtil.fromLonLat', () => {
  it('projects a LngLat using the default EPSG:3857 projection', () => {
    const projected = ProjUtil.fromLonLat(new LngLat(120, 30))

    expect(projected).toBeInstanceOf(LngLat)
    expect(projected?.getLng()).toBeCloseTo(13358338.89519283, 6)
    expect(projected?.getLat()).toBeCloseTo(3503549.843504374, 6)
  })

  it('accepts a plain coordinate array', () => {
    const fromArray = ProjUtil.fromLonLat([120, 30])
    const fromInstance = ProjUtil.fromLonLat(new LngLat(120, 30))

    expect(fromArray?.toArray()).toEqual(fromInstance?.toArray())
  })

  it('accepts a projection code string', () => {
    const projected = ProjUtil.fromLonLat([120, 30], 'EPSG:3857')
    expect(projected?.getLng()).toBeCloseTo(13358338.89519283, 6)
  })

  it('accepts a Projection instance', () => {
    const projected = ProjUtil.fromLonLat([120, 30], new Projection('EPSG:3857'))
    expect(projected?.getLng()).toBeCloseTo(13358338.89519283, 6)
  })

  it('returns undefined and warns for missing coordinates', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    expect(ProjUtil.fromLonLat(undefined as unknown as number[])).toBeUndefined()

    expect(warn).toHaveBeenCalledTimes(1)
    expect(warn.mock.calls[0]?.[1]).toContain('coordinate')

    warn.mockRestore()
  })
})

describe('ProjUtil.toLonLat', () => {
  it('converts projected coordinates back to geographic coordinates', () => {
    const projected = ProjUtil.fromLonLat(new LngLat(120, 30))!
    const geographic = ProjUtil.toLonLat(projected.toArray())

    expect(geographic).toBeInstanceOf(LngLat)
    expect(geographic?.getLng()).toBeCloseTo(120, 6)
    expect(geographic?.getLat()).toBeCloseTo(30, 6)
  })

  it('round-trips LngLat -> projected -> LngLat', () => {
    const original = new LngLat(119.26, 28.73)
    const roundTripped = ProjUtil.toLonLat(ProjUtil.fromLonLat(original)!.toArray())

    expect(roundTripped?.getLng()).toBeCloseTo(original.getLng(), 6)
    expect(roundTripped?.getLat()).toBeCloseTo(original.getLat(), 6)
  })

  it('accepts a projection code string and a Projection instance', () => {
    const projected = [13358338.89519283, 3503549.843504374]

    expect(ProjUtil.toLonLat(projected, 'EPSG:3857')?.getLng()).toBeCloseTo(120, 6)
    expect(ProjUtil.toLonLat(projected, new Projection('EPSG:3857'))?.getLng()).toBeCloseTo(120, 6)
  })

  it('returns undefined and warns for missing coordinates', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    expect(ProjUtil.toLonLat(undefined as unknown as number[])).toBeUndefined()

    expect(warn).toHaveBeenCalledTimes(1)

    warn.mockRestore()
  })
})
