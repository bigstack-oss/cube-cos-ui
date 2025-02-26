import { Segment } from '@cube-frontend/ui-library'

export const vmSummarySegments: Segment[] = [
  {
    color: 'fill-chart-2',
    colCount: 51,
  },
  {
    color: 'fill-chart-4',
    colCount: 1,
  },
  {
    color: 'fill-chart-3',
    colCount: 1,
  },
  {
    color: 'fill-chart-6',
    colCount: 1,
  },
  {
    color: 'fill-status-negative',
    colCount: 1,
  },
]

export const roleSummarySegments: Segment[] = [
  {
    color: 'fill-chart-1',
    colCount: 1,
  },
  {
    color: 'fill-chart-2',
    colCount: 1,
  },
  {
    color: 'fill-chart-3',
    colCount: 1,
  },
]

export const healthHistorySegments: Segment[] = [
  {
    color: 'fill-cosmos-secondary',
    colCount: 21,
  },
  {
    color: 'fill-status-negative',
    colCount: 1,
  },
  {
    color: 'fill-cosmos-secondary',
    colCount: 3,
  },
  {
    color: 'fill-status-negative',
    colCount: 4,
  },
  {
    color: 'fill-cosmos-secondary',
    colCount: 1,
  },
]

export const healthHistorySegmentsWithHoverContent: Segment[] = [
  {
    color: 'fill-cosmos-secondary',
    colCount: 21,
    hoverContent: {
      title: 'OK',
      message: 'Feb 26, 07:00 - Feb 26, 11:00',
    },
  },
  {
    color: 'fill-status-negative',
    colCount: 1,
    hoverContent: {
      title: 'NG',
      subtext: '#00937442',
      message: 'Feb 26, 11:00 - Feb 26, 11:15',
    },
  },
  {
    color: 'fill-cosmos-secondary',
    colCount: 3,
    hoverContent: {
      title: 'Title A',
      subtext: 'Subtext A',
      message: 'Your message A',
    },
  },
  {
    color: 'fill-status-negative',
    colCount: 4,
    hoverContent: {
      title: 'Title B',
      subtext: 'Subtext B',
      message: 'Your message B',
    },
  },
  {
    color: 'fill-cosmos-secondary',
    colCount: 1,
    hoverContent: {
      title: 'Title C',
      subtext: 'Subtext C',
      message: 'Your message C',
    },
  },
]
