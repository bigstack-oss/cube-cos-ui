import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { ChartQuery } from '../useEventsChartQuery'
import { RankedEvent } from '../useRankedEvents'
import { getRedirectUrl } from '../utils'
import {
  createTooltipCallbackFn,
  EventsColumnChartData,
  toColumnChartData,
} from './utils'
import { TooltipCallbacks } from 'chart.js'

type UseEventsChartComparison = {
  data: EventsColumnChartData[]
  tooltipCallbackFn: () => TooltipCallbacks<'bar'>
  onBarClick: (item: EventsColumnChartData) => void
}

export const useEventsChartComparison = (
  chartQuery: ChartQuery,
  rankedEvents: RankedEvent[],
): UseEventsChartComparison => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const data = useMemo(
    () => toColumnChartData(chartQuery.type, rankedEvents),
    [chartQuery.type, rankedEvents],
  )

  const tooltipCallbackFn = useMemo(
    () => createTooltipCallbackFn(chartQuery.type, data, t),
    [chartQuery.type, data, t],
  )

  const onBarClick = useCallback(
    (item: EventsColumnChartData) => {
      navigate(getRedirectUrl(chartQuery, item.rankedEvent))
    },
    [chartQuery, navigate],
  )

  return { data, tooltipCallbackFn, onBarClick }
}
