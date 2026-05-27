import { GetEventsTypeEnum } from '@cube-frontend/api'
import { TooltipCallbacks, TooltipItem } from 'chart.js'
import { TFunction } from 'i18next'
import { RankedEvent } from '../useRankedEvents'
import { getChartLabelByEventsType } from '../utils'

export type EventsColumnChartData = {
  id: string
  label: string
  value: number
  rankedEvent: RankedEvent
}

export const toColumnChartData = (
  eventsType: GetEventsTypeEnum,
  rankedEvents: RankedEvent[],
): EventsColumnChartData[] =>
  rankedEvents.map((rankedEvent) => ({
    id: rankedEvent.uniqueId,
    label: getChartLabelByEventsType(eventsType, rankedEvent),
    value: rankedEvent.number || 0,
    rankedEvent,
  }))

export const createTooltipCallbackFn = (
  eventsType: GetEventsTypeEnum,
  columnChartData: EventsColumnChartData[],
  t: TFunction,
) => {
  return (): TooltipCallbacks<'bar'> =>
    ({
      title: (tooltipItems: TooltipItem<'bar'>[]) =>
        tooltipItems?.[0].label.split('(')[0],
      label: (tooltipItem: TooltipItem<'bar'>) => {
        const { rankedEvent } = columnChartData[tooltipItem.dataIndex]
        const { number, host, instanceName, instanceId } = rankedEvent

        if (eventsType === 'host') {
          return [
            `${t('events.chart.counting')}: ${number}`,
            `${t('events.chart.host')}: ${host || '-'}`,
          ]
        }

        if (eventsType === 'instance') {
          return [
            `${t('events.chart.counting')}: ${number}`,
            `${t('events.chart.instanceName')}: ${instanceName || '-'}`,
            `${t('events.chart.instanceId')}: ${instanceId || '-'}`,
          ]
        }

        return `${t('events.chart.counting')}: ${number}`
      },
    }) as TooltipCallbacks<'bar'>
}
