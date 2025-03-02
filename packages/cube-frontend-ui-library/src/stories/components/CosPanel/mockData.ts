import { GetCosBasicTable } from '../../../components/CosBasicTable/CosBasicTable'
import { CosCountSegmentedChartCountInfo } from '../../../components/CosCountSegmentedChart/utils'

export type Event = {
  id: string
  type: string
  eventId: string
  description: string
  host: string
  category: string
  service: string
  metadata: string
  time: string
}

export const EventTable = GetCosBasicTable<Event>()

const getMockEvent = (index: number): Event => {
  return {
    id: String(index),
    type: 'Info',
    eventId: 'NET00003I',
    description: `'instance "940c6a1f-1f42-4152-a87e-56c0309939df" 
at 192.168.0.8 is reachable`,
    host: 'dell13',
    category: 'Net',
    service: 'senlin',
    metadata: 'id:940c6a1f-1f42-4152a87e-56c0309939df',
    time: 'yyyy/mm/dd 00:00',
  }
}

export const events = Array.from(Array(5)).map((_, index) => {
  return getMockEvent(index)
})

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
