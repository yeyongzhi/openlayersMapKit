import { describe, expect, it } from 'vitest'
import { OlFeature, OlGeometry } from '../../src/source/index'
import { createBaseFeatureByOlFeature } from '../../src/module/core/Feature/BasicFeature/handle'
import Point from '../../src/module/core/Feature/Point/index'
import LineString from '../../src/module/core/Feature/LineString/index'
import Polygon from '../../src/module/core/Feature/Polygon/index'
import MultiPoint from '../../src/module/core/Feature/MultiPoint/index'
import MultiLineString from '../../src/module/core/Feature/MultiLineString/index'
import MultiPolygon from '../../src/module/core/Feature/MultiPolygon/index'
import LinearRing from '../../src/module/core/Feature/LinearRing/index'
import Circle from '../../src/module/core/Feature/Circle/index'

type FeatureCtor = new (...args: any[]) => {
  getFeature(): any
  getGeometry(): any
  getRadius?: () => number
}

/**
 * 批次 B：为全部 Geometry 建立参数化测试矩阵。
 * 验证 1) 从坐标构造生成 OlFeature 且几何类型正确；
 *      2) 从原生 Feature 构造复用 resolver/WeakMap registry；
 *      3) _initByFeature / _createFeature 上提至基类后行为不变。
 */
const cases: Array<{
  name: string
  type: string
  Ctor: FeatureCtor
  geom: () => any
  coords: any
  radius?: number
}> = [
  {
    name: 'Point',
    type: 'Point',
    Ctor: Point as FeatureCtor,
    geom: () => new OlGeometry.Point([120, 30]),
    coords: [120, 30]
  },
  {
    name: 'LineString',
    type: 'LineString',
    Ctor: LineString as FeatureCtor,
    geom: () =>
      new OlGeometry.LineString([
        [120, 30],
        [121, 31]
      ]),
    coords: [
      [120, 30],
      [121, 31]
    ]
  },
  {
    name: 'Polygon',
    type: 'Polygon',
    Ctor: Polygon as FeatureCtor,
    geom: () =>
      new OlGeometry.Polygon([
        [
          [120, 30],
          [121, 30],
          [121, 31],
          [120, 30]
        ]
      ]),
    coords: [
      [
        [120, 30],
        [121, 30],
        [121, 31],
        [120, 30]
      ]
    ]
  },
  {
    name: 'MultiPoint',
    type: 'MultiPoint',
    Ctor: MultiPoint as FeatureCtor,
    geom: () =>
      new OlGeometry.MultiPoint([
        [120, 30],
        [121, 31]
      ]),
    coords: [
      [120, 30],
      [121, 31]
    ]
  },
  {
    name: 'MultiLineString',
    type: 'MultiLineString',
    Ctor: MultiLineString as FeatureCtor,
    geom: () =>
      new OlGeometry.MultiLineString([
        [
          [120, 30],
          [121, 31]
        ]
      ]),
    coords: [
      [
        [120, 30],
        [121, 31]
      ]
    ]
  },
  {
    name: 'MultiPolygon',
    type: 'MultiPolygon',
    Ctor: MultiPolygon as FeatureCtor,
    geom: () =>
      new OlGeometry.MultiPolygon([
        [
          [
            [120, 30],
            [121, 30],
            [121, 31],
            [120, 30]
          ]
        ]
      ]),
    coords: [
      [
        [
          [120, 30],
          [121, 30],
          [121, 31],
          [120, 30]
        ]
      ]
    ]
  },
  {
    name: 'LinearRing',
    type: 'LinearRing',
    Ctor: LinearRing as FeatureCtor,
    geom: () =>
      new OlGeometry.LinearRing([
        [120, 30],
        [121, 30],
        [121, 31],
        [120, 30]
      ]),
    coords: [
      [120, 30],
      [121, 30],
      [121, 31],
      [120, 30]
    ]
  },
  {
    name: 'Circle',
    type: 'Circle',
    Ctor: Circle as FeatureCtor,
    geom: () => new OlGeometry.Circle([120, 30], 100),
    coords: [120, 30],
    radius: 100
  }
]

describe('Feature factory (批次 B 去重) 参数化矩阵', () => {
  it.each(cases)(
    '$name: 从坐标构造生成 OlFeature 且几何类型正确',
    ({ Ctor, coords, radius, type }) => {
      const wrapper = radius !== undefined ? new Ctor(coords, radius) : new Ctor(coords)
      expect(wrapper.getFeature()).toBeInstanceOf(OlFeature)
      expect(wrapper.getGeometry().getType()).toBe(type)
      if (type === 'Circle') {
        expect((wrapper as any).getRadius()).toBe(100)
      }
    }
  )

  it.each(cases)(
    '$name: 从原生 Feature 构造，wrapper 与原生 Feature 绑定且类型正确',
    ({ Ctor, geom, type }) => {
      const nativeFeature = new OlFeature(geom())
      const wrapper = new Ctor(nativeFeature)
      expect(wrapper.getFeature()).toBe(nativeFeature)
      expect(wrapper.getGeometry().getType()).toBe(type)
    }
  )

  it.each(cases)(
    '$name: 同一原生 Feature 经 factory 多次解析保持同一 wrapper（WeakMap registry）',
    ({ Ctor, geom }) => {
      const nativeFeature = new OlFeature(geom())
      const wrapper = new Ctor(nativeFeature)
      expect(createBaseFeatureByOlFeature(nativeFeature)).toBe(wrapper)
      expect(createBaseFeatureByOlFeature(nativeFeature)).toBe(
        createBaseFeatureByOlFeature(nativeFeature)
      )
    }
  )
})
