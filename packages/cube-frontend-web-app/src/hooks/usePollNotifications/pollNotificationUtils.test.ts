// @vitest-environment jsdom
import { DataCenter } from '@cube-frontend/api'
import { respectTz } from '@cube-frontend/utils'
import dayjs from 'dayjs'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  computeLastNotificationTimeLocalStorageKey,
  computeStartFrom,
} from './pollNotificationUtils'

dayjs.extend(respectTz)

const username = 'admin'
const dataCenter = { name: 'node1', utcTimeZone: '+00:00' } as DataCenter
const key = computeLastNotificationTimeLocalStorageKey(
  username,
  dataCenter.name,
)

// A stored `Z` time used to be read in the browser's zone, so the next `start`
// carried the browser's offset (`...+08:00`) and the API's string comparison
// dropped every later `Z` notification. Run under a non-UTC `TZ`.
describe('computeStartFrom', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-10-09T16:05:00Z'))
    localStorage.clear()
  })

  afterEach(() => {
    vi.useRealTimers()
    localStorage.clear()
  })

  it.each([
    ['2026-10-09T16:03:41Z', '2026-10-09T16:03:42Z'],
    ['2026-10-09T16:03:41+00:00', '2026-10-09T16:03:42Z'],
    ['2026-10-10T01:03:41+09:00', '2026-10-10T01:03:42+09:00'],
  ])(
    'starts 1 s after the stored last notification time %s',
    (stored, want) => {
      localStorage.setItem(key, stored)
      const start = computeStartFrom(username, dataCenter)
      expect(start).toBe(want)
      expect(dayjs(start).valueOf()).toBe(dayjs(stored).valueOf() + 1000)
    },
  )

  it('starts 6 hours back when nothing is stored', () => {
    expect(computeStartFrom(username, dataCenter)).toBe('2026-10-09T10:05:00Z')
  })

  it('starts 6 hours back when the stored time is older than 6 hours', () => {
    localStorage.setItem(key, '2026-10-09T08:00:00Z')
    expect(computeStartFrom(username, dataCenter)).toBe('2026-10-09T10:05:00Z')
  })
})
