import { GetModuleHealthHistoryResponseDataHistoryInner } from '@cube-frontend/api'
import { GetCosBasicTable } from '@cube-frontend/ui-library'
import { cva } from 'class-variance-authority'
import dayjs from 'dayjs'
import { upperCase } from 'lodash'
import { useMemo } from 'react'
import { HistoryRow, historyToTableRows } from './healthDetailsUtils'

export type HealthHistoryTableSectionProps = {
  history: GetModuleHealthHistoryResponseDataHistoryInner[] | undefined
  activeRow: HistoryRow | undefined
  onRowClick: (row: HistoryRow) => void
}

const HistoryTable = GetCosBasicTable<HistoryRow>()

const tableRow = cva('cursor-pointer', {
  variants: {
    isActive: {
      true: '[&>td]:bg-functional-hover-secondary [&>td]:hover:bg-functional-hover-secondary',
      false: '',
    },
  },
})

export const HealthHistoryTableSection = (
  props: HealthHistoryTableSectionProps,
) => {
  const { history, activeRow, onRowClick } = props

  const rows = useMemo<HistoryRow[]>(() => {
    // Reverse `history` because the entries are sorted by `time` in ascending
    // order from the API, but the history table needs them in descending order.
    const reversedHistory = [...(history ?? [])].reverse()
    return historyToTableRows(reversedHistory)
  }, [history])

  return (
    <div className="flex flex-col gap-y-2">
      <h6 className="primary-h5 text-functional-title">Health History</h6>
      <HistoryTable
        rows={rows}
        isLoading={!history}
        skeletonRowCount={10}
        rowClassName={(row) =>
          tableRow({
            isActive: row.time === activeRow?.time,
          })
        }
        onRowClick={onRowClick}
      >
        <HistoryTable.Column label="Timestamp (UTC#)" property="time">
          {(time) => dayjs(time).format('YYYY/MM/DD HH:mm')}
        </HistoryTable.Column>
        <HistoryTable.Column label="Status" property="status">
          {upperCase}
        </HistoryTable.Column>
        <HistoryTable.Column label="Reason" property="error">
          {(error) => error?.description}
        </HistoryTable.Column>
      </HistoryTable>
    </div>
  )
}
