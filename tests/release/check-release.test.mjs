import assert from 'node:assert/strict'
import { test } from 'node:test'
import { releasePlan, assertVersionAvailable } from '../../scripts/check-release.mjs'

test('prereleases never use latest', () => {
  for (const channel of ['alpha', 'beta', 'rc']) {
    const version = `0.1.0-${channel}.1`
    assert.equal(releasePlan(version, `refs/tags/v${version}`, true).distTag, channel)
  }
  assert.equal(releasePlan('1.0.0', 'refs/tags/v1.0.0', true).distTag, 'latest')
})

test('publishing rejects branches, missing tags and mismatched versions', () => {
  for (const ref of [undefined, 'refs/heads/main', 'refs/tags/v0.2.0']) {
    assert.throws(() => releasePlan('0.1.0-beta.1', ref, true))
  }
  assert.throws(() => releasePlan('0.1.0-beta.1', 'refs/tags/v0.1.0'))
  assert.doesNotThrow(() => releasePlan('0.1.0-beta.1', 'refs/heads/dev'))
})

test('unrecognized versions cannot fall through to latest', () => {
  for (const version of [
    '0.1.0\n',
    '0.1.0-preview.1',
    '0.1.0-beta',
    '01.0.0',
    '0.1.0-beta.01',
    '0.1.0\nlatest'
  ]) {
    assert.throws(() => releasePlan(version))
  }
})

test('registry checks fail closed on existing versions and service failures', async () => {
  await assertVersionAvailable('openlayers-map-kit', '0.1.0-beta.1', async () => ({ status: 404 }))
  for (const status of [200, 401, 429, 500]) {
    await assert.rejects(
      assertVersionAvailable('openlayers-map-kit', '0.1.0-beta.1', async () => ({ status }))
    )
  }
  await assert.rejects(
    assertVersionAvailable('openlayers-map-kit', '0.1.0-beta.1', async () => {
      throw new Error('offline')
    })
  )
})
