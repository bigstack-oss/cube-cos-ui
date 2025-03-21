import { Page, TuningsApiListTuningsRequest } from '@cube-frontend/api'
import { ItemsPerPage } from '@cube-frontend/ui-library'
import { tuningsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useContext, useEffect, useState } from 'react'
import { TuningRow, tuningToRow } from './tuningsUtils'
import { TuningsFilterValue } from './useTuningsFilter'

type UseTuningRowsOptions = {
  filter: TuningsFilterValue
  currentPage: number
  itemsPerPage: ItemsPerPage
}

type UseTuningRows = {
  isLoading: boolean
  rows: TuningRow[]
  page: Page | undefined
  onToggleChange: (rowId: string, enabled: boolean) => Promise<void>
  resetTuning: (rowId: string) => Promise<void>
}

export const useTuningRows = (options: UseTuningRowsOptions): UseTuningRows => {
  const { filter, currentPage, itemsPerPage } = options

  const { name: dataCenter } = useContext(DataCenterContext)

  const [rows, setRows] = useState<TuningRow[]>([])

  const { isLoading, data: listTuningsResponse } = useCosGetRequest(
    tuningsApi.listTunings,
    (): TuningsApiListTuningsRequest => ({
      dataCenter,
      host: filter.hosts,
      keyword: filter.keyword,
      pageNum: currentPage,
      pageSize: itemsPerPage,
    }),
  )

  useEffect(() => {
    const tunings = listTuningsResponse?.tunings ?? []
    setRows(tunings.map(tuningToRow))
  }, [listTuningsResponse])

  const patchRow = (id: string, payload: Partial<TuningRow>): void => {
    setRows((prevRows) => {
      const rowIndex = prevRows.findIndex((row) => row.id === id)
      if (rowIndex < 0) {
        return prevRows
      }
      const nextRows = [...prevRows]
      Object.assign(nextRows[rowIndex], payload)
      return nextRows
    })
  }

  const onToggleChange = async (
    rowId: string,
    enabled: boolean,
  ): Promise<void> => {
    const row = rows.find((row) => row.id === rowId)
    if (!row) {
      return undefined
    }

    const currentEnabled = row.enabled

    patchRow(rowId, {
      enabled,
      status: {
        ...row.status,
        isUpdating: true,
      },
    })

    try {
      await tuningsApi.enableOrDisableTuning({
        dataCenter,
        parameterName: row.name,
        enableOrDisableTuningRequest: {
          enable: enabled,
          hosts: row.hosts,
        },
      })
      patchRow(rowId, {
        status: {
          ...row.status,
          isUpdating: false,
        },
      })
    } catch (error) {
      console.error('Toggle tuning error: ', error)
      patchRow(rowId, {
        enabled: currentEnabled,
        status: {
          ...row.status,
          isUpdating: false,
        },
      })
    }
  }

  const resetTuning = async (rowId: string): Promise<void> => {
    const row = rows.find((row) => row.id === rowId)
    if (!row) {
      return
    }

    patchRow(rowId, { isResetting: true })

    try {
      await tuningsApi.resetTuning({
        dataCenter,
        parameterName: row.name,
        resetTuningRequest: {
          hosts: row.hosts,
        },
      })
    } catch (error) {
      console.error('Reset tuning error: ', error)
    } finally {
      patchRow(rowId, { isResetting: false })
    }
  }

  return {
    isLoading,
    rows,
    page: listTuningsResponse?.page,
    onToggleChange,
    resetTuning,
  }
}
