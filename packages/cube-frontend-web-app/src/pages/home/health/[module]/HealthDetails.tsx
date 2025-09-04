import InformationCircle from '@cube-frontend/ui-library/icons/monochrome/information_circle.svg?react'
import {
  CosButton,
  CosCollapsiblePanelLayout,
  CosSkeleton,
} from '@cube-frontend/ui-library'
import { useOpenState } from '@cube-frontend/web-app/hooks/useOpenState/useOpenState'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { useTimeRange } from '@cube-frontend/web-app/components/TimeRangeDropdown/useTimeRange'
import { healthApi } from '@cube-frontend/web-app/api/cosApi'
import { ModuleMetadata } from '@cube-frontend/web-app/hooks/useServices/useServices'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useContext, useState } from 'react'
import dayjs from 'dayjs'
import { healthTimeRanges } from '../healthTimeRangeUtils'
import { ErrorReportPanel } from './ErrorReportPanel'
import { HealthHistoryPanel } from './HealthHistoryPanel'
import { HistoryRow } from './healthDetailsUtils'
import { TimeRangeDropdown } from './HealthHistory/TimeRangeDropdown'
import { RepairButton } from './HealthHistory/RepairButton'
import { useModuleHealthHistory } from './useModuleHealthHistory'
import { moduleNameToLabel } from '../homeHealthPageUtils'

export type HealthDetailsProps = {
  module: ModuleMetadata | undefined
  autoRefresh: boolean
}

export const HealthDetails = (props: HealthDetailsProps) => {
  const { module, autoRefresh } = props

  const { dataCenter } = useContext(DataCenterContext)

  const { now, timeRange, onTimeRangeChange } = useTimeRange({
    includes: healthTimeRanges,
    defaultValue: '24h',
  })

  const [activeHistoryRow, setActiveHistoryRow] = useState<
    HistoryRow | undefined
  >(undefined)

  // Use a separate loading state instead of `useCosMutationRequest`'s `isLoading`
  // to keep the Repair button in the loading state until the `getModuleHealthHistory`
  // API finishes after calling `repairModuleHealth`.
  const [isCallingRepairApi, setIsCallingRepairApi] = useState(false)

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

  const {
    isOpen: isDetailPanelOpen,
    open: openDetailPanel,
    toggle: onToggleDetailPanel,
  } = useOpenState()

  const onHistoryRowClick = (row: HistoryRow) => {
    setActiveHistoryRow(row)
    openDetailPanel()
  }

  const getTimeText = (): string | undefined => {
    if (!activeHistoryRow) {
      return undefined
    }
    return dayjs(activeHistoryRow.time).format('YYYY/MM/DD hh:mm:ss A')
  }

  const timeText = getTimeText()

  const renderHeaderLeftSlot = () => {
    const isRepairable = !!aggregatedHistoryResponse?.isRepairable
    const isFixing =
      !!aggregatedHistoryResponse?.status.isFixing || isCallingRepairApi

    return (
      <>
        {!module && <CosSkeleton className="h-6 w-16" />}
        {isRepairable && (
          <RepairButton
            module={module}
            isRepairable={isRepairable}
            isFixing={isFixing}
            onRepairClick={onRepairClick}
          />
        )}
      </>
    )
  }

  return (
    <CosCollapsiblePanelLayout
      rightPanelWidthPercentage={38}
      isControlledPanelOpen={isDetailPanelOpen}
      onControlledPanelOpenChange={onToggleDetailPanel}
    >
      <CosCollapsiblePanelLayout.LeftPanel
        topic={module && moduleNameToLabel(module.name)}
        leftSlot={renderHeaderLeftSlot()}
        customToggleButton={
          <CosButton
            className="rounded-full"
            type="ghost"
            usage="icon-only"
            Icon={InformationCircle}
            disabled={!module}
          />
        }
        rightSlot={
          <TimeRangeDropdown
            module={module}
            selectedTimeRange={timeRange}
            onTimeRangeChange={onTimeRangeChange}
          />
        }
      >
        <HealthHistoryPanel
          now={now}
          timeRange={timeRange}
          activeHistoryRow={activeHistoryRow}
          showRawHistoryLoading={showRawHistoryLoading}
          showAggregatedHistoryLoading={showAggregatedHistoryLoading}
          rawHistoryResponse={rawHistoryResponse}
          aggregatedHistoryResponse={aggregatedHistoryResponse}
          onHistoryRowClick={onHistoryRowClick}
        />
      </CosCollapsiblePanelLayout.LeftPanel>
      <CosCollapsiblePanelLayout.RightPanel
        topic={timeText}
        leftSlot={
          !timeText && (
            <span className="secondary-h4 font-semibold text-grey-850">
              No row selected
            </span>
          )
        }
        className="sticky top-0"
      >
        <ErrorReportPanel historyRow={activeHistoryRow} />
      </CosCollapsiblePanelLayout.RightPanel>
    </CosCollapsiblePanelLayout>
  )
}
