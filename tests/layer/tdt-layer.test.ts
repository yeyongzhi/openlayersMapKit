import { beforeAll, describe, expect, it, vi } from 'vitest'
import TdtLayer from '../../src/module/layer/TdtLayer/index'
import XYZSource from '../../src/module/source/TileSource/subClass/XYZ/index'
import MapToken from '../../src/module/util/MapToken/index'

beforeAll(() => {
  // MapToken proxies writes to window.OMapToken, so window must exist in this env.
  vi.stubGlobal('window', {})
  MapToken.tdt = 'test-token'
})

describe('TdtLayer', () => {
  it('builds an XYZSource-backed TileLayer from a valid type', () => {
    const layer = new TdtLayer('vec', 'w', { source: {} })
    expect(layer).toBeInstanceOf(TdtLayer)
    expect(layer.tdtType).toBe('vec')
    expect(layer.getSourceWrapper()).toBeInstanceOf(XYZSource)

    const xyzSource = layer.getSourceWrapper() as XYZSource
    const urls = xyzSource.getSource().getUrls()
    expect(Array.isArray(urls) && urls.length > 0).toBe(true)
    expect((urls as string[])[0]).toContain('tk=test-token')
  })

  it('throws when the tdt type is invalid', () => {
    expect(() => new TdtLayer('bad' as never, 'w', { source: {} })).toThrow()
  })
})
