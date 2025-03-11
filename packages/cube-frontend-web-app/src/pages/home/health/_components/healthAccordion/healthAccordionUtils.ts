import { GetServicesResponseDataInner } from '@cube-frontend/api'
import {
  createTimePoints,
  TimePoint,
} from '@cube-frontend/web-app/components/HealthSegmentedBar/createTimePoints'
import { TimeRange } from '@cube-frontend/web-app/components/TimeRangeDropdown/timeRangeDropdownUtils'
import { Dayjs } from 'dayjs'

export type ServiceCategory = {
  name: string
  services: GetServicesResponseDataInner[]
}

export const groupServicesByCategory = (
  services: GetServicesResponseDataInner[],
): ServiceCategory[] => {
  const map = new Map<string, ServiceCategory>()

  services.forEach((service) => {
    const { category: categoryName } = service

    const category = map.get(categoryName) ?? {
      name: categoryName,
      services: [],
    }

    category.services.push(service)

    map.set(categoryName, category)
  })

  return Array.from(map.values())
}

export const timePointFns: Record<TimeRange, (now: Dayjs) => TimePoint[]> = {
  last30Days: (now) =>
    createTimePoints({
      now,
      iteration: 2,
      value: -15,
      unit: 'days',
      labelFormatters: ['MM/DD', 'HH:mm A'],
    }),
  last14Days: (now) =>
    createTimePoints({
      now,
      iteration: 2,
      value: -7,
      unit: 'days',
      labelFormatters: ['MM/DD', 'HH:mm A'],
    }),
  last7Days: (now) =>
    createTimePoints({
      now,
      iteration: 2,
      // Use hours because DayJS only support integer values.
      value: -3.5 * 24,
      unit: 'hours',
      labelFormatters: ['MM/DD', 'HH:mm A'],
    }),
  last24Hours: (now) =>
    createTimePoints({
      now,
      iteration: 2,
      value: -12,
      unit: 'hours',
      labelFormatters: ['HH:mm A'],
    }),
  lastHour: (now) =>
    createTimePoints({
      now,
      iteration: 2,
      value: -30,
      unit: 'minutes',
      labelFormatters: ['HH:mm A'],
    }),
}
