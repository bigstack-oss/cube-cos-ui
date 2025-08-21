import { GetServicesResponseDataInner } from '@cube-frontend/api'
import {
  createTimePoints,
  TimePoint,
} from '@cube-frontend/web-app/components/HealthSegmentedBar/createTimePoints'
import { Dayjs } from 'dayjs'
import { HealthTimeRange } from '../../healthTimeRangeUtils'

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

const sortServicesByModuleCount = (
  services: GetServicesResponseDataInner[],
): GetServicesResponseDataInner[] => {
  return [...services].sort((a, b) => a.modules.length - b.modules.length)
}

export const sortCategoryServicesByModuleCount = (
  categories: ServiceCategory[],
): ServiceCategory[] => {
  return categories.map((category) => ({
    ...category,
    services: sortServicesByModuleCount(category.services),
  }))
}

export const timePointFns: Record<
  HealthTimeRange,
  (now: Dayjs, nowLabel: string) => TimePoint[]
> = {
  '30d': (now, nowLabel) =>
    createTimePoints({
      now,
      iteration: 2,
      value: -15,
      unit: 'days',
      labelFormatters: ['MM/DD', 'HH:mm A'],
      nowLabel,
    }),
  '14d': (now, nowLabel) =>
    createTimePoints({
      now,
      iteration: 2,
      value: -7,
      unit: 'days',
      labelFormatters: ['MM/DD', 'HH:mm A'],
      nowLabel,
    }),
  '7d': (now, nowLabel) =>
    createTimePoints({
      now,
      iteration: 2,
      // Use hours because DayJS only support integer values.
      value: -3.5 * 24,
      unit: 'hours',
      labelFormatters: ['MM/DD', 'HH:mm A'],
      nowLabel,
    }),
  '24h': (now, nowLabel) =>
    createTimePoints({
      now,
      iteration: 2,
      value: -12,
      unit: 'hours',
      labelFormatters: ['HH:mm A'],
      nowLabel,
    }),
  '1h': (now, nowLabel) =>
    createTimePoints({
      now,
      iteration: 2,
      value: -30,
      unit: 'minutes',
      labelFormatters: ['HH:mm A'],
      nowLabel,
    }),
}
