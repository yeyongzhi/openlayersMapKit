import { describe, expect, it } from 'vitest'
import { Color, Extent, Lnglat, Pixel, Size } from '../../src/index'

describe('basic value objects', () => {
  it('creates and compares coordinates', () => {
    const coordinate = new Lnglat(120.12345, 30.54321)

    expect(coordinate.toArray()).toEqual([120.12345, 30.54321])
    expect(coordinate.toString(2)).toBe('[120.12, 30.54]')
    expect(coordinate.equals(new Lnglat([120.12345, 30.54321]))).toBe(true)
    expect(Lnglat.from(coordinate)).not.toBe(coordinate)
    expect(coordinate.clone()).not.toBe(coordinate)
  })

  it('creates pixel and size values', () => {
    const pixel = new Pixel(10, 20)
    const size = new Size([800, 600])

    expect(pixel.toArray()).toEqual([10, 20])
    expect(pixel.equals(new Pixel([10, 20]))).toBe(true)
    expect(size.getWidth()).toBe(800)
    expect(size.getHeight()).toBe(600)
    expect(Pixel.from(pixel)).toEqual(pixel)
    expect(Size.from(size)).toEqual(size)
  })

  it('calculates extent values', () => {
    const extent = new Extent([0, 0, 10, 20])

    expect(extent.getCenter().toArray()).toEqual([5, 10])
    expect(extent.getWidth()).toBe(10)
    expect(extent.getHeight()).toBe(20)
    expect(extent.getSize().toArray()).toEqual([10, 20])
    expect(extent.equals([0, 0, 10, 20])).toBe(true)
    expect(Extent.from(extent)).not.toBe(extent)
  })

  it('clones and compares colors', () => {
    const color = new Color('#ff0000')

    expect(color.toString()).toBe('rgb(255, 0, 0)')
    expect(color.equals(color.clone())).toBe(true)
    expect(Color.from(color)).not.toBe(color)
  })
})
