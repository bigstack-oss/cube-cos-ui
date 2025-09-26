import { CosLogConsole } from '@cube-frontend/ui-library'
import { HistoryRow } from './healthDetailsUtils'

export type ErrorReportPanelProps = {
  historyRow: HistoryRow | undefined
}

export const ErrorReportPanel = (props: ErrorReportPanelProps) => {
  const { historyRow } = props

  return (
    <div>
      <div className="primary-body3 mt-2 text-grey-850">
        {historyRow?.error?.description ?? historyRow?.status.toUpperCase()}
      </div>
      {historyRow?.error && (
        <CosLogConsole
          className="mt-4"
          title={{ label: 'Details log', href: historyRow.error.log }}
        >
          {historyRow.error.details ?? ''}
        </CosLogConsole>
      )}
    </div>
  )
}
