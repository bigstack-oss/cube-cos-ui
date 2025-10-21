import { useTranslation } from 'react-i18next'
import {
  GetModuleHealthHistoryResponseDataHistoryInner,
  GetModuleHealthHistoryResponseDataHistoryInnerStatusEnum,
} from '@cube-frontend/api'
import {
  CosPagination,
  GetCosBasicTable,
  ItemsPerPage,
} from '@cube-frontend/ui-library'
import { cva } from 'class-variance-authority'
import dayjs from 'dayjs'
import { upperCase, upperFirst } from 'lodash'
import { useMemo } from 'react'
import { HistoryRow, historyToTableRows } from './healthDetailsUtils'

export type HealthHistoryTableSectionProps = {
  isLoading: boolean
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
    isLoading,
    history,
    activeRow,
    onRowClick,
    currentPage,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
  } = props

  const { t } = useTranslation()

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

  const renderStatus = (status: string) => {
    const { Ok, Ng } = GetModuleHealthHistoryResponseDataHistoryInnerStatusEnum
    if (status === Ok || status === Ng) {
      // Use upperCase for OK and NG statuses since they are abbreviations.
      return upperCase(status)
    }

    return upperFirst(status)
  }

  return (
    <div className="flex flex-col gap-y-2">
      <h6 className="primary-h5 text-functional-title">
        {t('home.health.history.healthHistory')}
      </h6>
      <HistoryTable
        rows={pagedRows}
        isLoading={isLoading}
        skeletonRowCount={10}
        rowClassName={(row) =>
          tableRow({
            isActive: row.id === activeRow?.id,
          })
        }
        onRowClick={onRowClick}
      >
        <HistoryTable.Column
          label={t('home.health.history.timestamp')}
          property="time"
        >
          {(time) => dayjs(time).format('YYYY/MM/DD HH:mm:ss')}
        </HistoryTable.Column>
        <HistoryTable.Column
          label={t('home.health.history.status')}
          property="status"
        >
          {renderStatus}
        </HistoryTable.Column>
        <HistoryTable.Column
          label={t('home.health.history.host')}
          property="hostname"
        />
        <HistoryTable.Column
          label={t('home.health.history.reason')}
          property="error"
        >
          {(error) => error?.type}
        </HistoryTable.Column>
      </HistoryTable>
      <CosPagination
        isLoading={isLoading}
        totalItems={history?.length ?? 0}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </div>
  )
}
