// @vitest-environment happy-dom

import { describe, expect, it, vi } from 'vitest'
import { OlGeometry } from '../../src/source/index'
import {
  createCloseElement,
  createMarkerElement,
  createResultElement,
  createTooltipElement,
  formatArea,
  formatDistance,
  getGeometryPointCount,
  getMeasureUnit,
  getOlDrawType as getMeasureDrawType
} from '../../src/module/interaction/Measure/handle'
import { MeasureMode } from '../../src/module/interaction/Measure/type'
import {
  DragBoxParamsBoxEndHandle,
  handleInteractionDragBoxEvent
} from '../../src/module/interaction/DragBox/handle'
import { handleInteractionExtentEvent } from '../../src/module/interaction/Extent/handle'
import { handleModifyEvent } from '../../src/module/interaction/Modify/handle'
import { handleInteractionDragPanEvent } from '../../src/module/interaction/DragPan/handle'
import { getGaodeLayerUrlsByType } from '../../src/module/layer/GaodeLayer/handle'
import { createVectorLayer } from '../../src/module/layer/VectorLayer/handle'

describe('interaction and layer helper boundaries', () => {
  it('formats measure values, geometry counts and DOM markers', () => {
    expect(getMeasureDrawType(MeasureMode.Area).type).toBe('Polygon')
    expect(getMeasureDrawType(MeasureMode.Distance).type).toBe('LineString')
    expect(formatDistance(1500)).toBe('1.50 km')
    expect(formatArea(2_000_000)).toBe('2.00 km²')
    expect(getMeasureUnit(MeasureMode.Area)).toBe('km²')
    expect(getMeasureUnit(MeasureMode.Distance)).toBe('km')
    expect(
      getGeometryPointCount(
        new OlGeometry.LineString([
          [0, 0],
          [1, 1]
        ])
      )
    ).toBe(2)
    expect(
      getGeometryPointCount(
        new OlGeometry.Polygon([
          [
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 0]
          ]
        ])
      )
    ).toBe(4)
    expect(getGeometryPointCount(new OlGeometry.Point([0, 0]))).toBe(0)

    expect(createTooltipElement('tip').className).toBe('omap-measure-tooltip')
    expect(createResultElement('距离', '1 km', '继续点击').textContent).toContain('继续点击')

    const close = vi.fn()
    const marker = createMarkerElement('1 km', close)
    marker.querySelector<HTMLElement>('[title="删除"]')?.click()
    expect(close).toHaveBeenCalledOnce()

    const standaloneClose = createCloseElement(close)
    standaloneClose.click()
    expect(close).toHaveBeenCalledTimes(2)
  })

  it('maps DragBox, Extent, Modify and active-change payloads', () => {
    const target = { getActive: () => true }
    const dragBoxEvent = handleInteractionDragBoxEvent(target as never, 'boxend', {
      coordinate: [120, 30],
      mapBrowserEvent: { pixel: [10, 20] }
    } as never)
    expect(dragBoxEvent.coordinate?.toArray()).toEqual([120, 30])
    expect(dragBoxEvent.pixel?.toArray()).toEqual([10, 20])

    const extentEvent = handleInteractionExtentEvent(target as never, 'extentchanged', {
      extent: [0, 1, 2, 3]
    } as never)
    expect(extentEvent.extent?.toArray()).toEqual([0, 1, 2, 3])
    expect(handleInteractionExtentEvent(target as never, 'change', {} as never).extent).toBeNull()

    const browserEvent = { type: 'pointermove' }
    expect(
      handleModifyEvent(target as never, 'modifyend', { mapBrowserEvent: browserEvent } as never)
        .mapBrowserEvent
    ).toBe(browserEvent)
    expect(
      handleModifyEvent(target as never, 'change', {} as never).mapBrowserEvent
    ).toBeUndefined()

    expect(
      handleInteractionDragPanEvent(target as never, 'change:active', {
        key: 'active',
        oldValue: false
      })
    ).toMatchObject({ oldValue: false, newValue: true })
  })

  it('manages DragBox callbacks and layer helper factories', () => {
    const callback = vi.fn()
    DragBoxParamsBoxEndHandle.initFunction(callback)
    DragBoxParamsBoxEndHandle.emit({ target: {} as never })
    expect(callback).toHaveBeenCalledOnce()
    DragBoxParamsBoxEndHandle.destroy()
    DragBoxParamsBoxEndHandle.emit({ target: {} as never })
    expect(callback).toHaveBeenCalledOnce()

    expect(getGaodeLayerUrlsByType('vec')).toHaveLength(4)
    expect(getGaodeLayerUrlsByType(undefined as never)).toEqual([])
    expect(createVectorLayer().getLayer()).toBeDefined()
  })
})
