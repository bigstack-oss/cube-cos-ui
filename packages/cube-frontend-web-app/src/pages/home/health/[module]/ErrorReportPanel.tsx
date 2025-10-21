import { useTranslation } from 'react-i18next'
import { CosLogConsole } from '@cube-frontend/ui-library'
import { HistoryRow } from './healthDetailsUtils'

export type ErrorReportPanelProps = {
  historyRow: HistoryRow | undefined
}

export const ErrorReportPanel = (props: ErrorReportPanelProps) => {
  const { historyRow } = props

  const { t } = useTranslation()

  return (
    <div>
      <div className="primary-body3 mt-2 text-grey-850">
        {historyRow?.error?.description ?? historyRow?.status.toUpperCase()}
      </div>
      {historyRow?.error && (
        <CosLogConsole
          className="mt-4"
          title={{
            label: t('home.health.errorPanel.detailsLog'),
            href: historyRow.error.log,
          }}
        >
          {historyRow.error.details ?? ''}
        </CosLogConsole>
      )}
    </div>
  )
}
