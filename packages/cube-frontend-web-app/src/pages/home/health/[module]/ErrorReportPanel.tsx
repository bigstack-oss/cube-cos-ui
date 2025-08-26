import { ErrorLog } from './ErrorLog'
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
      {historyRow?.error && <ErrorLog error={historyRow.error} />}
    </div>
  )
}
