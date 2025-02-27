import { mockServices } from './mockHealth'

export type ServiceCategory = {
  name: string
  services: typeof mockServices
}

export const groupServicesByCategory = (
  services: typeof mockServices,
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

export const timeRanges = [
  'last30Days',
  'last14Days',
  'last7Days',
  'last24Hours',
  'lastHour',
] as const

export type TimeRange = (typeof timeRanges)[number]
