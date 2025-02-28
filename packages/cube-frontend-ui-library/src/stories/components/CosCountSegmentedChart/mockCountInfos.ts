import { CosCountSegmentedChartCountInfo } from '../../../components/CosCountSegmentedChart/utils'

export const vmSummary = [
  {
    name: 'Running',
    color: 'fill-chart-2',
    count: 51,
  },
  {
    name: 'Stopped',
    color: 'fill-chart-4',
    count: 1,
  },
  {
    name: 'Suspended',
    color: 'fill-chart-3',
    count: 1,
  },
  {
    name: 'Paused',
    color: 'fill-chart-6',
    count: 1,
  },
  {
    name: 'Error',
    color: 'fill-status-negative',
    count: 1,
  },
] satisfies CosCountSegmentedChartCountInfo[]

export const roleSummary = [
  {
    name: 'Control',
    color: 'fill-chart-1',
    count: 1,
  },
  {
    name: 'Compute',
    color: 'fill-chart-2',
    count: 1,
  },
  {
    name: 'Storage',
    color: 'fill-chart-3',
    count: 1,
  },
] satisfies CosCountSegmentedChartCountInfo[]
