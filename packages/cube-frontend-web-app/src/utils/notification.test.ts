import { Notification } from '@cube-frontend/api'
import { respectTz } from '@cube-frontend/utils'
import dayjs from 'dayjs'
import { TFunction } from 'i18next'
import { describe, expect, it } from 'vitest'
import { notificationToToastArgs } from './notification'

dayjs.extend(respectTz)

const t = ((key: string) => key) as unknown as TFunction

const toastTime = (time: string) =>
  notificationToToastArgs(
    {
      id: 'OSD00001I',
      nodeName: 'node1',
      time,
      additionalInfo: { osdId: 'osd.2' },
    } as Notification,
    t,
  ).time

describe('notificationToToastArgs', () => {
  it.each([
    ['2026-10-09T20:46:56Z', '08:46:56 PM'],
    ['2026-10-09T08:46:56Z', '08:46:56 AM'],
    ['2026-10-10T05:46:56+09:00', '05:46:56 AM'],
    ['2026-10-09T12:00:00+00:00', '12:00:00 PM'],
  ])('shows %s as a 12-hour time in its own offset', (time, want) => {
    expect(toastTime(time)).toBe(want)
  })
})
