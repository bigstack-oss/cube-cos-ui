import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { triggersApi } from '@cube-frontend/web-app/api/cosApi'
import { TriggersApiGetTriggersRequest } from '@cube-frontend/api'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { parseErrorMessage } from '@cube-frontend/web-app/utils/errorMessage'
import { useSequentialInterval } from '@cube-frontend/web-app/hooks/useSequentialInterval/useSequentialInterval'
import { mapToTriggerTableRow, TriggerRow } from './utils'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'

export type UseTriggerRowsOptions = {
  onOperationErrorOccur: (errorMessage: string) => void
}

export type UseTriggerRows = {
  isLoading: boolean
  rows: TriggerRow[]
  handleStatusChange: (triggerName: string) => Promise<void>
  handleEdit: (triggerName: string) => void
}

export const useTriggerRows = (
  options: UseTriggerRowsOptions,
): UseTriggerRows => {
  const { onOperationErrorOccur } = options

  const navigate = useNavigate()

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
    }),
  )

  useSequentialInterval(refreshTriggers, 5000)

  useEffect(() => {
    const triggersFromApi = listTriggersResponse ?? []
    setRows((oldRows) => {
      const oldRowsMap: Map<string, TriggerRow> = new Map(
        oldRows.map((row) => [row.name, row]),
      )
      return triggersFromApi.map((trigger) => {
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

  const handleStatusChange = async (triggerName: string): Promise<void> => {
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
      const {
        data: { data: triggers },
      } = await triggersApi.getTriggers({
        dataCenter: dataCenter!.name,
      })

      const trigger = triggers.find(
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

  const handleEdit = (triggerName: string) => {
    /**
     * Navigate to the Edit page for the selected trigger.
     */
    navigate(`${CosRoutesEnum.EVENTS_TRIGGERS_CREATE_PAGE}?name=${triggerName}`)
  }

  return {
    rows,
    isLoading: !hasResponseBeenReceived,
    handleStatusChange,
    handleEdit,
  }
}
