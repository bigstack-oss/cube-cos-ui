import { HealthApiGetHealthHistoryRequest } from '@cube-frontend/api'
import { CosStroke } from '@cube-frontend/ui-library'
import { healthApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { ModuleMetadata } from '@cube-frontend/web-app/hooks/useServices/useServices'
import { useTimeFrame } from '@cube-frontend/web-app/hooks/useTimeFrame/useTimeFrame'
import { cva } from 'class-variance-authority'
import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { HistoryRow, widthTransitionClasses } from './healthDetailsUtils'
import { HealthHistoryPanelHeader } from './HealthHistoryPanelHeader'
import { HealthHistoryTableSection } from './HealthHistoryTableSection'
import { HealthTimeBar } from './HealthTimeBar'

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

  const { name: dataCenter } = useContext(DataCenterContext)

  const { now, past, timeRange, onTimeRangeChange } = useTimeFrame()

  const { data: healthData } = useCosGetRequest(
    healthApi.getHealthHistory,
    (): HealthApiGetHealthHistoryRequest | undefined => {
      if (!module || !autoRefresh) {
        return undefined
      }
      return {
        dataCenter,
        serviceType: module.service,
        moduleType: module.name,
        start: past.toISOString(),
        stop: now.toISOString(),
      }
    },
  )

  return (
    <div className={twMerge(container({ isDetailPanelOpen }))}>
      <HealthHistoryPanelHeader
        module={module}
        selectedTimeRange={timeRange}
        onTimeRangeChange={onTimeRangeChange}
        onToggleDetailPanel={onToggleDetailPanel}
      />
      <HealthTimeBar
        isLoading={!healthData}
        history={healthData?.history}
        now={now}
        selectedTimeRange={timeRange}
      />
      <CosStroke type="dot" />
      <HealthHistoryTableSection
        history={healthData?.history}
        activeRow={activeHistoryRow}
        onRowClick={onHistoryRowClick}
      />
    </div>
  )
}
