import { beforeAll, describe, expect, it, vi } from 'vitest'
import { HeatmapLayer, VectorSource } from '../../src/index'
import { OlLayer, OlSource } from '../../src/source/index'

// OL Heatmap builds a gradient via a 2D canvas at construction time; node has no canvas, so stub one.
beforeAll(() => {
  class FakeCtx {
    createLinearGradient() {
      return { addColorStop() {} }
    }
    fillRect() {}
    getImageData() {
      return { data: new Uint8ClampedArray(256 * 4) }
    }
    set fillStyle(_v: unknown) {}
    set strokeStyle(_v: unknown) {}
  }
  const fakeCanvas = { getContext: () => new FakeCtx() }
  vi.stubGlobal('document', { createElement: () => fakeCanvas })
})

describe('HeatmapLayer', () => {
  it('builds from params and exposes the VectorSource wrapper', () => {
    const layer = new HeatmapLayer({ source: {}, radius: 10, blur: 5 })
    expect(layer).toBeInstanceOf(HeatmapLayer)
    expect(layer.getVectorSource()).toBeInstanceOf(VectorSource)
    expect(layer.getSourceWrapper()).toBe(layer.getVectorSource())
    expect(layer.getSource()).toBeInstanceOf(OlSource.Vector)
  })

  it('accepts a VectorSource instance', () => {
    const vs = new VectorSource({})
    const layer = new HeatmapLayer({ source: vs, radius: 15, blur: 8 })
    expect(layer.getVectorSource()).toBe(vs)
  })

  it('produces an OL Heatmap layer', () => {
    const layer = new HeatmapLayer({ source: {}, radius: 10, blur: 5 })
    expect(layer.getLayer()).toBeInstanceOf(OlLayer.Heatmap)
  })
})
