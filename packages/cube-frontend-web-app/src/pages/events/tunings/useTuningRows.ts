import { Page, TuningsApiListTuningsRequest } from '@cube-frontend/api'
import { tuningsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useSequentialInterval } from '@cube-frontend/web-app/hooks/useSequentialInterval/useSequentialInterval'
import { parseErrorMessage } from '@cube-frontend/web-app/utils/errorMessage'
import { isEqual } from 'lodash'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
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

  const intervenedRowIdsRef = useRef<Set<string>>(new Set())

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
      modified: query.modified,
      pageNum: query.currentPage,
      pageSize: query.itemsPerPage,
    }),
  )

  const { startInterval, stopInterval } = useSequentialInterval(
    listTunings,
    5000,
    {
      immediate: false,
    },
  )

  useEffect(() => {
    const tunings = listTuningsResponse?.tunings ?? []
    setRows((oldRows) => {
      const oldRowsMap: Map<string, TuningRow> = new Map(
        oldRows.map((row) => [row.id, row]),
      )
      return tunings.map((tuning) => {
        const newRow = tuningToRow(tuning)
        // For tunings with manual interventions, keep the state intact and
        // sync it using additional API calls.
        if (intervenedRowIdsRef.current.has(newRow.id)) {
          return oldRowsMap.get(newRow.id) ?? newRow
        }
        return newRow
      })
    })
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
    if (!row) return

    intervenedRowIdsRef.current.add(row.id)

    const enabledBeforeToggle = row.enabled

    patchRow(rowId, {
      enabled,
      status: {
        ...row.status,
        isUpdating: true,
      },
    })

    try {
      // Pause polling until the API responds to prevent users from seeing
      // intermediate tunings (e.g., a single tuning split into two due to
      // the fact that COS can only update tunings for 1 host at a time).
      stopInterval()
      await tuningsApi.enableOrDisableTuning({
        dataCenter: dataCenter!.name,
        parameterName: row.name,
        enableOrDisableTuningRequest: {
          enable: enabled,
          hosts: row.hosts.map((host) => host.name),
        },
      })
      startInterval()
      await syncIntervenedRowStatus(row)
    } catch (error) {
      console.error('Toggle tuning error: ', error)
      patchRow(rowId, {
        enabled: enabledBeforeToggle,
        status: {
          ...row.status,
          isUpdating: false,
        },
      })
      intervenedRowIdsRef.current.delete(row.id)
      onError(error)
    }
  }

  const resetTuning = async (rowId: string): Promise<void> => {
    const row = rows.find((row) => row.id === rowId)
    if (!row) return

    intervenedRowIdsRef.current.add(row.id)

    patchRow(rowId, {
      status: {
        ...row.status,
        isUpdating: true,
      },
    })

    try {
      // Pause polling until the API responds to prevent users from seeing
      // intermediate tunings (e.g., a single tuning split into two due to
      // the fact that COS can only update tunings for 1 host at a time).
      stopInterval()
      await tuningsApi.resetTuning({
        dataCenter: dataCenter!.name,
        parameterName: row.name,
        resetTuningRequest: {
          hosts: row.hosts.map((host) => host.name),
        },
      })
      startInterval()
      await syncIntervenedRowStatus(row)
    } catch (error) {
      console.error('Reset tuning error: ', error)
      patchRow(rowId, {
        status: {
          ...row.status,
          isUpdating: false,
        },
      })
      intervenedRowIdsRef.current.delete(row.id)
      onError(error)
    }
  }

  const syncIntervenedRowStatus = async (row: TuningRow): Promise<void> => {
    try {
      // The combination of tuning name and hosts is guaranteed to be unique.
      // However, the API returns tunings matching any host in the `host`
      // parameter, so we have to compare the host names array to find the
      // matching tuning.
      const response = await tuningsApi.listTunings({
        dataCenter: dataCenter!.name,
        host: row.hosts.map((host) => host.name),
        keyword: row.name,
      })

      const tuning = response.data.data.tunings.find(
        (item) =>
          item.name === row.name &&
          isEqual(
            item.hosts.map((host) => host.name),
            row.hosts.map((host) => host.name),
          ),
      )

      if (!tuning) return

      patchRow(row.id, {
        status: tuning.status,
      })
    } catch (error) {
      console.error('List tunings error when syncing intervened row: ', error)
    } finally {
      intervenedRowIdsRef.current.delete(row.id)
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
