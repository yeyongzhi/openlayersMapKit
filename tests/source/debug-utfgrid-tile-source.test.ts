import { beforeAll, describe, expect, it } from 'vitest'
import TileDebugSource from '../../src/module/source/TileSource/subClass/TileDebugSource/index'
import UTFGridSource from '../../src/module/source/TileSource/subClass/UTFGridSource/index'
import { OlSource } from '../../src/source/index'

/**
 * OpenLayers' UTFGrid source instantiates `new XMLHttpRequest()` eagerly at
 * construction time. The node test environment has no XHR, so we provide a
 * minimal no-op stub. It never fires load/error, leaving the source in a
 * loading state — which is enough to exercise construction and the wrapper API.
 */
class XHRStub {
  status = 0
  responseText = ''
  private listeners: Record<string, Array<(e: unknown) => void>> = {}
  addEventListener(type: string, fn: (e: unknown) => void) {
    ;(this.listeners[type] ??= []).push(fn)
  }
  open() {}
  send() {}
}

beforeAll(() => {
  ;(globalThis as unknown as { XMLHttpRequest: unknown }).XMLHttpRequest = XHRStub
})

describe('TileDebugSource', () => {
  it('constructs with defaults and exposes the native TileDebug source', () => {
    const source = new TileDebugSource()
    expect(source.getSource()).toBeInstanceOf(OlSource.TileDebug)
    // No projection was supplied, but OpenLayers applies the default web-mercator projection.
    expect(source.getProjection()).toBeDefined()
    expect(source.getState()).toBe('ready')
  })
})

describe('UTFGridSource', () => {
  const url = 'https://example.com/{z}/{x}/{y}.json'

  it('constructs with a url and exposes the native UTFGrid source', () => {
    const source = new UTFGridSource({ url })
    expect(source.getSource()).toBeInstanceOf(OlSource.UTFGrid)
    expect(source.getTemplate()).toBeUndefined()
  })

  it('does not throw for valid arguments when no network request is made', () => {
    const source = new UTFGridSource({ url })
    expect(() => source.forDataAtCoordinateAndResolution([0, 0], 1, () => {}, false)).not.toThrow()
  })

  it('throws when the coordinate is undefined', () => {
    const source = new UTFGridSource({ url })
    expect(() => source.forDataAtCoordinateAndResolution(undefined as never, 1, () => {})).toThrow()
  })

  it('throws when the resolution is not a number', () => {
    const source = new UTFGridSource({ url })
    expect(() => source.forDataAtCoordinateAndResolution([0, 0], 'x' as never, () => {})).toThrow()
  })

  it('throws when the callback is not a function', () => {
    const source = new UTFGridSource({ url })
    expect(() => source.forDataAtCoordinateAndResolution([0, 0], 1, 'x' as never)).toThrow()
  })
})
