import { CosStroke, DEFAULT_ITEMS_PER_PAGE } from '@cube-frontend/ui-library'
import { GetModuleHealthHistoryResponseData } from '@cube-frontend/api'
import { DateTimeRange } from '@cube-frontend/web-app/components/HealthSegmentedBar/BrushFilter'
import { useDebounce } from '@cube-frontend/web-app/hooks/useDebounce'
import { useEffect, useMemo, useState } from 'react'
import { Dayjs } from 'dayjs'
import { HealthTimeBar } from './HealthTimeBar/HealthTimeBar'
import { HealthTimeBarSkeleton } from './HealthTimeBar/HealthTimeBarSkeleton'
import { filterHistory, HistoryRow } from './healthDetailsUtils'
import { HealthHistoryTableSection } from './HealthHistoryTableSection'

export type HealthHistoryPanelProps = {
  now: Dayjs
  timeRange: '1h' | '24h' | '7d' | '14d' | '30d'
  activeHistoryRow: HistoryRow | undefined
  showRawHistoryLoading: boolean
  showAggregatedHistoryLoading: boolean
  rawHistoryResponse: GetModuleHealthHistoryResponseData | undefined
  aggregatedHistoryResponse: GetModuleHealthHistoryResponseData | undefined
  onHistoryRowClick: (row: HistoryRow) => void
}

export const HealthHistoryPanel = (props: HealthHistoryPanelProps) => {
  const {
    now,
    timeRange,
    activeHistoryRow,
    showRawHistoryLoading,
    showAggregatedHistoryLoading,
    rawHistoryResponse,
    aggregatedHistoryResponse,
    onHistoryRowClick,
  } = props

  const [brushDateTimeRange, setBrushDateTimeRange] =
    useState<DateTimeRange | null>(null)

  const [throttledBrushDateTimeRange] = useDebounce(brushDateTimeRange, 50)

  const tableHistory = useMemo(
    () =>
      filterHistory(rawHistoryResponse?.history, throttledBrushDateTimeRange),
    [rawHistoryResponse?.history, throttledBrushDateTimeRange],
  )

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE)

  useEffect(() => {
    setCurrentPage(1)
  }, [timeRange, brushDateTimeRange])

  useEffect(() => {
    setBrushDateTimeRange(null)
  }, [timeRange])

  return (
    <div className="flex flex-col gap-y-6">
      {showAggregatedHistoryLoading ? (
        <HealthTimeBarSkeleton />
      ) : (
        <HealthTimeBar
          history={aggregatedHistoryResponse?.history}
          now={now}
          timeRange={timeRange}
          brushDateTimeRange={brushDateTimeRange}
          onBrushDateTimeRangeChange={setBrushDateTimeRange}
        />
      )}
      <CosStroke type="dot" />
      <HealthHistoryTableSection
        isLoading={showRawHistoryLoading}
        history={tableHistory}
        activeRow={activeHistoryRow}
        onRowClick={onHistoryRowClick}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  )
}
