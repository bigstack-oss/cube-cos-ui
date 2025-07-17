import { useContext, useEffect, useRef, useState } from 'react'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { triggersApi } from '@cube-frontend/web-app/api/cosApi'
import { Page, TriggersApiGetTriggersRequest } from '@cube-frontend/api'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { parseErrorMessage } from '@cube-frontend/web-app/utils/errorMessage'
import { useSequentialInterval } from '@cube-frontend/web-app/hooks/useSequentialInterval/useSequentialInterval'
import { TriggersQuery, TriggerRow, mapToTriggerTableRow } from './utils'

export type UseTriggerRowsOptions = {
  query: TriggersQuery
  onOperationErrorOccur: (errorMessage: string) => void
}

export type UseTriggerRows = {
  isLoading: boolean
  rows: TriggerRow[]
  page: Page | undefined
  onToggleChange: (triggerName: string) => Promise<void>
}

export const useTriggerRows = (
  options: UseTriggerRowsOptions,
): UseTriggerRows => {
  const { query, onOperationErrorOccur } = options

  const { dataCenter } = useContext(DataCenterContext)

  const [rows, setRows] = useState<TriggerRow[]>([])

  const intervenedTriggerNamesRef = useRef<Set<string>>(new Set())

  const {
    data: listTriggersResponse,
    hasResponseBeenReceived,
    getResource: refreshTriggers,
  } = useCosGetRequest(
    triggersApi.getTriggers,
    (): TriggersApiGetTriggersRequest => ({
      dataCenter: dataCenter!.name,
      pageNum: query.currentPage,
      pageSize: query.itemsPerPage,
    }),
  )

  useSequentialInterval(refreshTriggers, 5000)

  useEffect(() => {
    const triggers = listTriggersResponse?.triggers ?? []

    // Built-in triggers appear at the beginning of the row list
    const sortedTriggers = [...triggers].sort((a, b) => {
      if (a.isBuiltIn === b.isBuiltIn) return 0
      return a.isBuiltIn ? -1 : 1
    })

    setRows((oldRows) => {
      const oldRowsMap: Map<string, TriggerRow> = new Map(
        oldRows.map((row) => [row.name, row]),
      )

      return sortedTriggers.map((trigger) => {
        const newRow = mapToTriggerTableRow(trigger)
        // For triggers with manual interventions, keep the state intact and
        // sync it using additional API calls.
        if (intervenedTriggerNamesRef.current.has(trigger.name)) {
          return oldRowsMap.get(trigger.name) ?? newRow
        }
        return newRow
      })
    })
  }, [listTriggersResponse])

  const onError = (error: unknown): void => {
    const errorMessage = parseErrorMessage(error)
    if (errorMessage) {
      onOperationErrorOccur(errorMessage)
    }
  }

  const patchRow = (name: string, payload: Partial<TriggerRow>): void => {
    setRows((prevRows) => {
      const rowIndex = prevRows.findIndex((row) => row.name === name)
      if (rowIndex < 0) {
        return prevRows
      }
      const nextRows = [...prevRows]
      Object.assign(nextRows[rowIndex], payload)
      return nextRows
    })
  }

  const onToggleChange = async (triggerName: string): Promise<void> => {
    const targetRow = rows.find((row) => row.name === triggerName)

    if (!targetRow) {
      return
    }

    const enabledBeforeToggle = !!targetRow?.enabled
    const newEnabled = !enabledBeforeToggle

    intervenedTriggerNamesRef.current.add(triggerName)

    patchRow(triggerName, {
      enabled: newEnabled,
      status: {
        ...targetRow.status,
        isUpdating: true,
      },
    })

    try {
      await triggersApi.enableOrDisableTrigger({
        dataCenter: dataCenter!.name,
        triggerName,
        enableOrDisableTriggerRequest: {
          enable: newEnabled,
        },
      })
      await syncIntervenedRowStatus(targetRow)
    } catch (error) {
      console.error('Trigger update error: ', error)
      /**
       * Revert the row to its previous state if the update fails.
       */
      patchRow(triggerName, {
        enabled: enabledBeforeToggle,
        status: {
          ...targetRow.status,
          isUpdating: false,
        },
      })
      intervenedTriggerNamesRef.current.delete(triggerName)
      /**
       * Handle the error by showing a notification.
       */
      onError(error)
    }
  }

  const syncIntervenedRowStatus = async (
    targetRow: TriggerRow,
  ): Promise<void> => {
    try {
      const response = await triggersApi.getTriggers({
        dataCenter: dataCenter!.name,
      })

      const trigger = response.data.data.triggers.find(
        (trigger) => trigger.name === targetRow.name,
      )
      if (!trigger) return

      patchRow(targetRow.name, {
        status: trigger.status,
      })
    } catch (error) {
      console.error('Get trigger error when syncing intervened row: ', error)
    } finally {
      intervenedTriggerNamesRef.current.delete(targetRow.id)
    }
  }

  return {
    rows,
    isLoading: !hasResponseBeenReceived,
    page: listTriggersResponse?.page,
    onToggleChange,
  }
}
