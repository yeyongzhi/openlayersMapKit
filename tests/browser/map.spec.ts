import { expect, test } from '@playwright/test'
import type {} from './fixture/main'

test.beforeEach(async ({ page }) => {
  await page.route('**/*', async (route) => {
    const host = new URL(route.request().url()).hostname
    if (host !== '127.0.0.1' && host !== 'localhost')
      throw new Error(`External request: ${route.request().url()}`)
    await route.continue()
  })
  await page.goto('/')
  await page.waitForFunction(() => !!window.fixture)
  await expect(page.locator('#map canvas')).toBeVisible()
})

test('renders a vector feature at the projected center', async ({ page }) => {
  expect(
    await page.evaluate(() => {
      const nativeMap = window.fixture.map.getMap()
      return {
        size: nativeMap.getSize(),
        pixel: nativeMap.getPixelFromCoordinate([0, 0]),
        hits: nativeMap.getFeaturesAtPixel([400, 300]).length
      }
    })
  ).toEqual({ size: [800, 600], pixel: [400, 300], hits: 1 })
  const rgba = await page.locator('#map canvas').evaluate((canvas: HTMLCanvasElement) => {
    const context = canvas.getContext('2d')!
    return Array.from(context.getImageData(canvas.width / 2, canvas.height / 2, 1, 1).data)
  })
  expect(rgba).toEqual([255, 0, 0, 255])
})

test('Draw completes, aborts a new sketch and clears finished features', async ({ page }) => {
  await page.evaluate(() => window.fixture.activate('draw'))
  await page.mouse.click(200, 200)
  await page.mouse.move(550, 220, { steps: 10 })
  await page.mouse.dblclick(550, 220, { delay: 80 })
  await expect.poll(() => page.evaluate(() => window.fixture.events.drawEnd)).toBe(1)
  await expect
    .poll(() => page.evaluate(() => window.fixture.tool?.getLayer()?.getFeatures().length))
    .toBe(1)
  await page.mouse.click(250, 400)
  await page.mouse.move(500, 400)
  await page.evaluate(() => {
    const tool = window.fixture.tool
    if (tool && 'abort' in tool) tool.abort()
  })
  await expect.poll(() => page.evaluate(() => window.fixture.events.drawAbort)).toBe(1)
  expect(await page.evaluate(() => window.fixture.tool?.getLayer()?.getFeatures().length)).toBe(1)
  await page.evaluate(() => {
    const tool = window.fixture.tool
    if (tool && 'clearFeatures' in tool) tool.clearFeatures()
  })
  expect(await page.evaluate(() => window.fixture.tool?.getLayer()?.getFeatures().length)).toBe(0)
})

test('Select reports the existing wrapper on selection and deselection', async ({ page }) => {
  await page.evaluate(() => window.fixture.activate('select'))
  await page.mouse.click(400, 300)
  await expect.poll(() => page.evaluate(() => window.fixture.events.selected)).toBe(1)
  expect(await page.evaluate(() => window.fixture.events.sameFeature)).toBe(true)
  await page.mouse.click(650, 450)
  await expect.poll(() => page.evaluate(() => window.fixture.events.deselected)).toBe(1)
  expect(await page.evaluate(() => window.fixture.events.sameFeature)).toBe(true)
})

test('Modify drags the point and restores its previous coordinates', async ({ page }) => {
  await page.evaluate(() => window.fixture.activate('modify'))
  await page.mouse.move(400, 300)
  await page.mouse.down()
  await page.mouse.move(500, 350, { steps: 12 })
  await page.mouse.up()
  await expect.poll(() => page.evaluate(() => window.fixture.events.modified)).toBe(1)
  expect(await page.evaluate(() => window.fixture.point.getCoordinates().toArray())).not.toEqual([
    0, 0
  ])
  expect(
    await page.evaluate(() => {
      const tool = window.fixture.tool
      return tool && 'records' in tool ? tool.revoke() : false
    })
  ).toBe(true)
  expect(await page.evaluate(() => window.fixture.point.getCoordinates().toArray())).toEqual([0, 0])
})

test('Measure produces a distance and releases overlays on disposal', async ({ page }) => {
  await page.evaluate(() => window.fixture.activate('measure'))
  await page.mouse.click(200, 220)
  await page.mouse.dblclick(550, 220)
  await expect.poll(() => page.evaluate(() => window.fixture.events.measured)).toBeGreaterThan(0)
  expect(
    await page.evaluate(() => window.fixture.map.getMap().getOverlays().getLength())
  ).toBeGreaterThan(0)
  await page.evaluate(() => {
    const fixture = window.fixture
    fixture.map.removeInteraction(fixture.tool!)
    fixture.tool!.dispose()
  })
  expect(await page.evaluate(() => window.fixture.map.getMap().getOverlays().getLength())).toBe(0)
  await expect(page.locator('.omap-measure-result')).toHaveCount(0)
})

test('Popup updates, detaches and can be mounted again', async ({ page }) => {
  await page.evaluate(() => window.fixture.showPopup())
  await expect(page.getByTestId('popup')).toBeVisible()
  await page.evaluate(() => {
    window.fixture.popup!.setContent('<span data-testid="popup">updated</span>')
    window.fixture.popup!.setPosition([100, 100])
  })
  await expect(page.getByTestId('popup')).toHaveText('updated')
  await page.evaluate(() => window.fixture.popup!.remove())
  await expect(page.getByTestId('popup')).toHaveCount(0)
  await page.evaluate(() => window.fixture.map.addPopup(window.fixture.popup!))
  await expect(page.getByTestId('popup')).toBeVisible()
  expect(await page.evaluate(() => window.fixture.map.getMap().getOverlays().getLength())).toBe(1)
})

test('repeated disposal and recreation do not accumulate map DOM or overlays', async ({ page }) => {
  for (let cycle = 0; cycle < 3; cycle++) {
    await page.evaluate(() => {
      window.fixture.showPopup()
      window.fixture.activate('measure')
    })
    await page.evaluate(() => window.fixture.dispose())
    await expect(page.locator('#map .ol-viewport')).toHaveCount(0)
    await expect(page.getByTestId('popup')).toHaveCount(0)
    await page.evaluate(() => window.fixture.recreate())
    await expect(page.locator('#map .ol-viewport')).toHaveCount(1)
    expect(await page.evaluate(() => window.fixture.map.getMap().getOverlays().getLength())).toBe(0)
  }
})

test.afterEach(async ({ page }) => {
  await page.evaluate(() => window.fixture?.dispose())
})
