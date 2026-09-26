import { describe, expect, test } from 'vitest'
import { TFunction } from 'i18next'
import { GetMetricsResponseData, NodeRole, RoleUsage } from '@cube-frontend/api'
import { metricsToRoleUsages } from './usagePanelUtils'

const t = ((key: string) => key) as unknown as TFunction

const usage = (count: number): RoleUsage =>
  ({
    count,
    cpu: { usedPercent: count },
    memory: { usedPercent: count },
  }) as RoleUsage

const metrics = {
  host: {
    role: {
      controlConverged: usage(3),
      control: usage(0),
      compute: usage(2),
      storage: usage(0),
      edgeCore: usage(0),
      moderator: usage(1),
    },
  },
} as unknown as GetMetricsResponseData

describe('metricsToRoleUsages', () => {
  test('a converged-only data center gets a single item', () => {
    const items = metricsToRoleUsages(metrics, [NodeRole.ControlConverged], t)

    expect(items.map((item) => item.role)).toEqual([NodeRole.ControlConverged])
    expect(items[0].value.count).toBe(3)
  })

  test('keeps the registered roles order and maps each to its metrics', () => {
    const items = metricsToRoleUsages(
      metrics,
      [NodeRole.ControlConverged, NodeRole.Compute, NodeRole.Moderator],
      t,
    )

    expect(items.map((item) => [item.role, item.value.count])).toEqual([
      [NodeRole.ControlConverged, 3],
      [NodeRole.Compute, 2],
      [NodeRole.Moderator, 1],
    ])
  })

  test('no registered roles gives no items', () => {
    expect(metricsToRoleUsages(metrics, [], t)).toEqual([])
  })
})
