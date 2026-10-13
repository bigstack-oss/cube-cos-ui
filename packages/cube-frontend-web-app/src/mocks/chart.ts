import { http, HttpResponse, passthrough } from 'msw'
import {
  DiskReadWriteHistory,
  MetricRank,
  MetricRankRankInnerHistoryInner,
} from '@cube-frontend/api'

// Home > Chart values that cross every SI tier, to check the axis, tooltip,
// legend and ranking labels (cubecos #1816):
// - Storage Bandwidth: read about 3M, write about 800k bytes/s
// - Storage IOPS: thousands, so the labels keep a lowercase `k`
// - Storage Latency: at or below 0.001, which used to show NaN
// - Rankings for disk IOPS and network traffic: one value per tier
// Other metrics go to the real API.

const POINT_COUNT = 60

const toHistory = (
  start: string | null,
  stop: string | null,
  getValue: (index: number) => number,
): MetricRankRankInnerHistoryInner[] => {
  const stopMs = stop ? Date.parse(stop) : Date.now()
  const startMs = start ? Date.parse(start) : stopMs - 60 * 60 * 1000
  const stepMs = (stopMs - startMs) / (POINT_COUNT - 1)

  return Array.from({ length: POINT_COUNT }, (_, index) => ({
    time: new Date(startMs + stepMs * index).toISOString(),
    value: getValue(index),
  }))
}

// A wave between `min` and `max`, so the chart has peaks to hover.
const wave = (min: number, max: number) => (index: number) =>
  min + ((max - min) * (1 + Math.sin(index / 4))) / 2

const readWriteHistory = (
  unit: string,
  start: string | null,
  stop: string | null,
  read: (index: number) => number,
  write: (index: number) => number,
): DiskReadWriteHistory => ({
  unit,
  read: toHistory(start, stop, read),
  write: toHistory(start, stop, write),
})

const RANK_VALUES = [1.2e12, 2.5e9, 3e6, 5040, 0.0005]

const rank = (
  unit: string,
  start: string | null,
  stop: string | null,
): MetricRank => ({
  unit,
  rank: RANK_VALUES.map((value, index) => ({
    id: `mock-${index}`,
    name: `mock-${value}`,
    value,
    history: toHistory(start, stop, wave(value * 0.5, value)),
  })),
})

const ok = <T>(data: T) =>
  HttpResponse.json({ code: 200, status: 'ok', msg: '', data })

export const chartHandlers = [
  http.get(
    '*/api/v1/datacenters/:dataCenter/metrics/:metricType/:viewType/:entityType',
    ({ request, params }) => {
      const url = new URL(request.url)
      const start = url.searchParams.get('start')
      const stop = url.searchParams.get('stop')

      if (params.viewType === 'history') {
        switch (params.metricType) {
          case 'diskBandwidth':
            return ok(
              readWriteHistory(
                'bytes',
                start,
                stop,
                wave(1e6, 3e6),
                wave(2e5, 8e5),
              ),
            )
          case 'diskIops':
            return ok(
              readWriteHistory(
                'iops',
                start,
                stop,
                wave(2000, 6000),
                wave(300, 900),
              ),
            )
          case 'diskLatency':
            return ok(
              readWriteHistory(
                'ms',
                start,
                stop,
                wave(0.0002, 0.0008),
                () => 0.001,
              ),
            )
        }
      }

      if (params.viewType === 'rank') {
        switch (params.metricType) {
          case 'diskReadIops':
          case 'diskWriteIops':
            return ok(rank('iops', start, stop))
          case 'networkTrafficIn':
          case 'networkTrafficOut':
            return ok(rank('bytes', start, stop))
        }
      }

      return passthrough()
    },
  ),
]
