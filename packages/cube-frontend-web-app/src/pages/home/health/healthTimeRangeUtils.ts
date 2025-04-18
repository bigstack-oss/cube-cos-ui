export const healthTimeRanges = ['30d', '14d', '7d', '24h', '1h'] as const

export type HealthTimeRange = (typeof healthTimeRanges)[number]
