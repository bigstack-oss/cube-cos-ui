import { CosStroke, DEFAULT_ITEMS_PER_PAGE } from '@cube-frontend/ui-library'
import { healthApi } from '@cube-frontend/web-app/api/cosApi'
import { useTimeRange } from '@cube-frontend/web-app/components/TimeRangeDropdown/useTimeRange'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { ModuleMetadata } from '@cube-frontend/web-app/hooks/useServices/useServices'
import { cva } from 'class-variance-authority'
import { useContext, useEffect, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { healthTimeRanges } from '../healthTimeRangeUtils'
import {
  filterHistory,
  HistoryRow,
  widthTransitionClasses,
} from './healthDetailsUtils'
import { HealthHistoryPanelHeader } from './HealthHistoryPanelHeader'
import { HealthHistoryTableSection } from './HealthHistoryTableSection'
import { HealthTimeBar } from './HealthTimeBar/HealthTimeBar'
import { HealthTimeBarSkeleton } from './HealthTimeBar/HealthTimeBarSkeleton'
import { useModuleHealthHistory } from './useModuleHealthHistory'
import { DateTimeRange } from '@cube-frontend/web-app/components/HealthSegmentedBar/BrushFilter'
import { useDebounce } from '@cube-frontend/web-app/hooks/useDebounce'

export type HealthHistoryPanelProps = {
  module: ModuleMetadata | undefined
  autoRefresh: boolean
  isDetailPanelOpen: boolean
  activeHistoryRow: HistoryRow | undefined
  onToggleDetailPanel: () => void
  onHistoryRowClick: (row: HistoryRow) => void
}

const container = cva(
  [
    'flex flex-col gap-y-6',
    'rounded-[5px] bg-grey-0 p-6 shadow-[0px_0px_3px_0px_rgba(0,_0,_0,_0.10)]',
    widthTransitionClasses,
  ],
  {
    variants: {
      isDetailPanelOpen: {
        true: 'w-3/5',
        false: 'w-full',
      },
    },
  },
)

export const HealthHistoryPanel = (props: HealthHistoryPanelProps) => {
  const {
    module,
    autoRefresh,
    isDetailPanelOpen,
    activeHistoryRow,
    onToggleDetailPanel,
    onHistoryRowClick,
  } = props

  const { dataCenter } = useContext(DataCenterContext)

  const { now, timeRange, onTimeRangeChange } = useTimeRange({
    includes: healthTimeRanges,
    defaultValue: '24h',
  })

  const {
    showAggregatedHistoryLoading,
    aggregatedHistoryResponse,
    showRawHistoryLoading,
    rawHistoryResponse,
    getHealthHistory,
    startPolling,
    stopPolling,
  } = useModuleHealthHistory({
    module,
    past: timeRange,
    autoRefresh,
  })

  const [brushDateTimeRange, setBrushDateTimeRange] =
    useState<DateTimeRange | null>(null)

  const [throttledBrushDateTimeRange] = useDebounce(brushDateTimeRange, 50)

  const tableHistory = useMemo(
    () =>
      filterHistory(rawHistoryResponse?.history, throttledBrushDateTimeRange),
    [rawHistoryResponse?.history, throttledBrushDateTimeRange],
  )

  // Use a separate loading state instead of `useCosMutationRequest`'s `isLoading`
  // to keep the Repair button in the loading state until the `getModuleHealthHistory`
  // API finishes after calling `repairModuleHealth`.
  const [isCallingRepairApi, setIsCallingRepairApi] = useState(false)

  const { mutateResource: repairModuleHealth } = useCosMutationRequest(
    healthApi.repairModuleHealth,
  )

  const onRepairClick = async () => {
    if (!module) return
    stopPolling()
    setIsCallingRepairApi(true)
    try {
      await repairModuleHealth({
        dataCenter: dataCenter!.name,
        serviceType: module.service,
        moduleType: module.name,
      })
    } catch (error) {
      console.error('Repair module health error: ', error)
    } finally {
      await getHealthHistory()
      startPolling()
      setIsCallingRepairApi(false)
    }
  }

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE)

  useEffect(() => {
    setCurrentPage(1)
  }, [timeRange, brushDateTimeRange])

  useEffect(() => {
    setBrushDateTimeRange(null)
  }, [timeRange])

  return (
    <div className={twMerge(container({ isDetailPanelOpen }))}>
      <HealthHistoryPanelHeader
        module={module}
        isRepairable={!!aggregatedHistoryResponse?.isRepairable}
        isFixing={
          !!aggregatedHistoryResponse?.status.isFixing || isCallingRepairApi
        }
        selectedTimeRange={timeRange}
        onTimeRangeChange={onTimeRangeChange}
        onToggleDetailPanel={onToggleDetailPanel}
        onRepairClick={onRepairClick}
      />
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
