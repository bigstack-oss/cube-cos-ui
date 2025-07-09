import { GetModuleHealthHistoryResponseDataHistoryInner } from '@cube-frontend/api'
import {
  CosPagination,
  GetCosBasicTable,
  ItemsPerPage,
} from '@cube-frontend/ui-library'
import { cva } from 'class-variance-authority'
import dayjs from 'dayjs'
import { upperCase } from 'lodash'
import { useMemo } from 'react'
import { HistoryRow, historyToTableRows } from './healthDetailsUtils'

export type HealthHistoryTableSectionProps = {
  history: GetModuleHealthHistoryResponseDataHistoryInner[] | undefined
  activeRow: HistoryRow | undefined
  onRowClick: (row: HistoryRow) => void
  currentPage: number
  itemsPerPage: ItemsPerPage
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: ItemsPerPage) => void
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
  const {
    history,
    activeRow,
    onRowClick,
    currentPage,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
  } = props

  const pagedRows = useMemo<HistoryRow[]>(() => {
    // Reverse `history` because the entries are sorted by `time` in ascending
    // order from the API, but the history table needs them in descending order.
    const reversedHistory = [...(history ?? [])].reverse()
    const start = itemsPerPage * (currentPage - 1)
    return historyToTableRows(reversedHistory).slice(
      start,
      start + itemsPerPage,
    )
  }, [history, currentPage, itemsPerPage])

  return (
    <div className="flex flex-col gap-y-2">
      <h6 className="primary-h5 text-functional-title">Health History</h6>
      <HistoryTable
        rows={pagedRows}
        isLoading={!history}
        skeletonRowCount={10}
        rowClassName={(row) =>
          tableRow({
            isActive: row.id === activeRow?.id,
          })
        }
        onRowClick={onRowClick}
      >
        <HistoryTable.Column label="Timestamp (UTC#)" property="time">
          {(time) => dayjs(time).format('YYYY/MM/DD HH:mm:ss')}
        </HistoryTable.Column>
        <HistoryTable.Column label="Status" property="status">
          {upperCase}
        </HistoryTable.Column>
        <HistoryTable.Column label="Host" property="hostname" />
        <HistoryTable.Column label="Reason" property="error">
          {(error) => error?.type}
        </HistoryTable.Column>
      </HistoryTable>
      <CosPagination
        isLoading={!history}
        totalItems={history?.length ?? 0}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </div>
  )
}
