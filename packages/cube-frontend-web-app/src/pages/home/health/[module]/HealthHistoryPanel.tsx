import { CosStroke } from '@cube-frontend/ui-library'
import { healthApi } from '@cube-frontend/web-app/api/cosApi'
import { useTimeRange } from '@cube-frontend/web-app/components/TimeRangeDropdown/useTimeRange'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { ModuleMetadata } from '@cube-frontend/web-app/hooks/useServices/useServices'
import { cva } from 'class-variance-authority'
import { useContext, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { healthTimeRanges } from '../healthTimeRangeUtils'
import { HistoryRow, widthTransitionClasses } from './healthDetailsUtils'
import { HealthHistoryPanelHeader } from './HealthHistoryPanelHeader'
import { HealthHistoryTableSection } from './HealthHistoryTableSection'
import { HealthTimeBar } from './HealthTimeBar'
import { HealthTimeBarSkeleton } from './HealthTimeBarSkeleton'
import { useModuleHealthHistory } from './useModuleHealthHistory'

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

  const { historyResponse, getHealthHistory, startInterval, stopInterval } =
    useModuleHealthHistory({
      module,
      past: timeRange,
      autoRefresh,
    })

  // Use a separate loading state instead of `useCosMutationRequest`'s `isLoading`
  // to keep the Repair button in the loading state until the `getModuleHealthHistory`
  // API finishes after calling `repairModuleHealth`.
  const [isCallingRepairApi, setIsCallingRepairApi] = useState(false)

  const { mutateResource: repairModuleHealth } = useCosMutationRequest(
    healthApi.repairModuleHealth,
  )

  const onRepairClick = async () => {
    if (!module) return
    stopInterval()
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
      startInterval()
      setIsCallingRepairApi(false)
    }
  }

  return (
    <div className={twMerge(container({ isDetailPanelOpen }))}>
      <HealthHistoryPanelHeader
        module={module}
        isRepairable={!!historyResponse?.isRepairable}
        isFixing={!!historyResponse?.status.isFixing || isCallingRepairApi}
        selectedTimeRange={timeRange}
        onTimeRangeChange={onTimeRangeChange}
        onToggleDetailPanel={onToggleDetailPanel}
        onRepairClick={onRepairClick}
      />
      {!history ? (
        <HealthTimeBarSkeleton />
      ) : (
        <HealthTimeBar
          history={historyResponse?.history}
          now={now}
          selectedTimeRange={timeRange}
        />
      )}
      <CosStroke type="dot" />
      <HealthHistoryTableSection
        // Use `key` to reset the `currentPage` state in pagination
        // when `timeRange` changes.
        key={timeRange}
        history={historyResponse?.history}
        activeRow={activeHistoryRow}
        onRowClick={onHistoryRowClick}
      />
    </div>
  )
}
