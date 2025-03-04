export const timeRanges = [
  'last30Days',
  'last14Days',
  'last7Days',
  'last24Hours',
  'lastHour',
] as const

export type TimeRange = (typeof timeRanges)[number]
