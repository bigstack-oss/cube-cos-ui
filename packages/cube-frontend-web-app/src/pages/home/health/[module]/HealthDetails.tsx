import { useOpenState } from '@cube-frontend/web-app/hooks/useOpenState/useOpenState'
import { ModuleMetadata } from '@cube-frontend/web-app/hooks/useServices/useServices'
import { useState } from 'react'
import { ErrorReportPanel } from './ErrorReportPanel'
import { HealthHistoryPanel } from './HealthHistoryPanel'
import { HistoryRow } from './healthDetailsUtils'

export type HealthDetailsProps = {
  module: ModuleMetadata | undefined
  autoRefresh: boolean
}

export const HealthDetails = (props: HealthDetailsProps) => {
  const { module, autoRefresh } = props

  const [activeHistoryRow, setActiveHistoryRow] = useState<
    HistoryRow | undefined
  >(undefined)

  const {
    isOpen: isDetailPanelOpen,
    open: openDetailPanel,
    toggle: onToggleDetailPanel,
    close: onDetailPanelClose,
  } = useOpenState()

  const onHistoryRowClick = (row: HistoryRow) => {
    setActiveHistoryRow(row)
    openDetailPanel()
  }

  return (
    <div className="flex items-start justify-between gap-x-3">
      <HealthHistoryPanel
        module={module}
        autoRefresh={autoRefresh}
        isDetailPanelOpen={isDetailPanelOpen}
        activeHistoryRow={activeHistoryRow}
        onHistoryRowClick={onHistoryRowClick}
        onToggleDetailPanel={onToggleDetailPanel}
      />
      <ErrorReportPanel
        isOpen={isDetailPanelOpen}
        historyRow={activeHistoryRow}
        onClose={onDetailPanelClose}
      />
    </div>
  )
}
