import { GetFixpackUpdateProgressResponseDataProgressesInnerStatus } from '@cube-frontend/api'
import { GetCosBasicTable } from '@cube-frontend/ui-library'
import { ReactNode } from 'react'
import { FixpackContinueAnywayButton } from './FixpackContinueAnywayButton'
import { ProgressTableRow } from './fixpackUpdateUtils'

type FixpackUpdateProgressTableProps = {
  isLoading: boolean
  rows: ProgressTableRow[]
  showContinueAnywayButton: (row: ProgressTableRow) => boolean
  renderStatus: (
    status: GetFixpackUpdateProgressResponseDataProgressesInnerStatus,
  ) => ReactNode
}

const ProgressTable = GetCosBasicTable<ProgressTableRow>()

export const FixpackUpdateProgressTable = (
  props: FixpackUpdateProgressTableProps,
) => {
  const { isLoading, rows, renderStatus, showContinueAnywayButton } = props

  const renderAction = (row: ProgressTableRow) => {
    if (showContinueAnywayButton(row)) {
      return (
        <div className="flex justify-end">
          <FixpackContinueAnywayButton nodeName={row.host} />
        </div>
      )
    }

    return null
  }

  return (
    <ProgressTable isLoading={isLoading} rows={rows}>
      <ProgressTable.Column label="Host" property="host" />
      <ProgressTable.Column label="Status" property="status">
        {renderStatus}
      </ProgressTable.Column>
      <ProgressTable.Column property="status">
        {(status) =>
          !!status.description && (
            <div className="primary-body4 text-functional-text">
              {status.description}
            </div>
          )
        }
      </ProgressTable.Column>
      <ProgressTable.Column fitContent={true}>
        {(_, row) => renderAction(row)}
      </ProgressTable.Column>
    </ProgressTable>
  )
}
