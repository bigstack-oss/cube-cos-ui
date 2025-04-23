import { Page, TuningsApiListTuningsRequest } from '@cube-frontend/api'
import { tuningsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useInterval } from '@cube-frontend/web-app/hooks/useInterval'
import { parseErrorMessage } from '@cube-frontend/web-app/utils/errorMessage'
import { useContext, useEffect, useMemo, useState } from 'react'
import { TuningRow, tuningToRow } from './tuningsUtils'
import { ListTuningsQuery } from './useListTuningsQuery'

type UseTuningRows = {
  isLoading: boolean
  rows: TuningRow[]
  hasModifiedTuning: boolean
  page: Page | undefined
  onToggleChange: (rowId: string, enabled: boolean) => Promise<void>
  resetTuning: (rowId: string) => Promise<void>
}

export const useTuningRows = (
  query: ListTuningsQuery,
  onOperationErrorOccur: (errorMessage: string) => void,
): UseTuningRows => {
  const { dataCenter } = useContext(DataCenterContext)

  const [rows, setRows] = useState<TuningRow[]>([])

  const {
    data: listTuningsResponse,
    hasResponseBeenReceived,
    getResource: listTunings,
  } = useCosGetRequest(
    tuningsApi.listTunings,
    (): TuningsApiListTuningsRequest => ({
      dataCenter: dataCenter!.name,
      host: query.hosts,
      keyword: query.keyword,
      modified: query.selectedModified[0],
      pageNum: query.currentPage,
      pageSize: query.itemsPerPage,
    }),
  )

  useInterval(listTunings, 5000)

  useEffect(() => {
    const tunings = listTuningsResponse?.tunings ?? []
    setRows(tunings.map(tuningToRow))
  }, [listTuningsResponse])

  const hasModifiedTuning = useMemo<boolean>(() => {
    return rows.some((row) => row.isModified)
  }, [rows])

  const onError = (error: unknown): void => {
    const errorMessage = parseErrorMessage(error)
    if (errorMessage) {
      onOperationErrorOccur(errorMessage)
    }
  }

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

    const enabledBeforeToggle = row.enabled

    patchRow(rowId, {
      enabled,
      status: {
        ...row.status,
        isUpdating: true,
      },
    })

    try {
      await tuningsApi.enableOrDisableTuning({
        dataCenter: dataCenter!.name,
        parameterName: row.name,
        enableOrDisableTuningRequest: {
          enable: enabled,
          hosts: row.hosts.map((host) => host.name),
        },
      })
      // Poll for updates instead of changing the `isUpdating` status on the
      // client side after the API call, as the client doesn't know if the
      // tuning entry is still updating or not.
    } catch (error) {
      console.error('Toggle tuning error: ', error)
      patchRow(rowId, {
        enabled: enabledBeforeToggle,
        status: {
          ...row.status,
          isUpdating: false,
        },
      })
      onError(error)
    }
  }

  const resetTuning = async (rowId: string): Promise<void> => {
    const row = rows.find((row) => row.id === rowId)
    if (!row) {
      return
    }

    patchRow(rowId, {
      status: {
        ...row.status,
        isUpdating: true,
      },
    })

    try {
      await tuningsApi.resetTuning({
        dataCenter: dataCenter!.name,
        parameterName: row.name,
        resetTuningRequest: {
          hosts: row.hosts.map((host) => host.name),
        },
      })
      // Poll for updates instead of changing the `isUpdating` status on the
      // client side after the API call, as the client doesn't know if the
      // tuning entry is still updating or not.
    } catch (error) {
      console.error('Reset tuning error: ', error)
      patchRow(rowId, {
        status: {
          ...row.status,
          isUpdating: false,
        },
      })
      onError(error)
    }
  }

  return {
    isLoading: !hasResponseBeenReceived,
    rows,
    hasModifiedTuning,
    page: listTuningsResponse?.page,
    onToggleChange,
    resetTuning,
  }
}
