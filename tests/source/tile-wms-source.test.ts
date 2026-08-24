import { describe, expect, it } from 'vitest'
import TileWMSSource from '../../src/module/source/TileSource/subClass/TileWMSSource/index'

describe('TileWMSSource parameters', () => {
  it('sets and updates structured WMS parameters', () => {
    const source = new TileWMSSource({
      params: {
        LAYERS: 'workspace:roads',
        TILED: true
      }
    })

    expect(source.getParams()).toMatchObject({
      LAYERS: 'workspace:roads',
      TILED: true
    })

    source.updateParams({ CQL_FILTER: 'status=1' })
    expect(source.getParams()).toMatchObject({
      LAYERS: 'workspace:roads',
      CQL_FILTER: 'status=1'
    })

    source.setParams({ LAYERS: 'workspace:stations' })
    expect(source.getParams()).toEqual({ LAYERS: 'workspace:stations' })
  })
})
