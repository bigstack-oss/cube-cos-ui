import { TimeRange } from '@cube-frontend/web-app/components/TimeRangeDropdown/timeRangeDropdownUtils'
import { Dayjs } from 'dayjs'
import { upperFirst } from 'lodash'
import { useMemo } from 'react'
import {
  createMockServiceHealth,
  mockServices,
  ModuleHealthHistory,
} from './mockHealth'
import { ModuleHealth } from './ModuleHealth'

export type ServiceHealthProps = {
  service: (typeof mockServices)[number]
  timeRange: TimeRange
  now: Dayjs
}

export const ServiceHealth = (props: ServiceHealthProps) => {
  const { service, timeRange, now } = props

  const moduleHealthMap = useMemo<
    Partial<Record<string, ModuleHealthHistory>>
  >(() => {
    // TODO: Replace mock health history with real API data once it's implemented.
    const serviceHealth = createMockServiceHealth(now)
    const entries = serviceHealth.map((health) => [
      health.module,
      health.history,
    ])
    return Object.fromEntries(entries)
  }, [now])

  return (
    <div className="flex flex-col gap-y-2">
      <div className="primary-body3 font-medium text-functional-text">
        {upperFirst(service.name)}
      </div>
      <div className="rounded-t-[5px] border border-functional-border-divider">
        <div className="secondary-body3 bg-scene-background px-4 py-2 text-functional-text-light">
          Health status
        </div>
        {service.modules.map((module) => (
          <ModuleHealth
            key={module.name}
            name={module.name}
            history={moduleHealthMap[module.name] ?? []}
            timeRange={timeRange}
            now={now}
          />
        ))}
      </div>
    </div>
  )
}
