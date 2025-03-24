import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { triggersApi } from '@cube-frontend/web-app/api/cosApi'
import { TriggersApiGetTriggersRequest } from '@cube-frontend/api'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { parseErrorMessage } from '@cube-frontend/web-app/utils/errorMessage'
import { useSequentialInterval } from '@cube-frontend/web-app/hooks/useSequentialInterval/useSequentialInterval'
import { mapToTriggerTableRows, TriggerRow } from './triggersUtils'

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

  const { name: dataCenter } = useContext(DataCenterContext)

  const [rows, setRows] = useState<TriggerRow[]>([])

  const {
    data: listTriggersResponse,
    hasResponseBeenReceived,
    getResource: refreshListTriggers,
  } = useCosGetRequest(
    triggersApi.getTriggers,
    (): TriggersApiGetTriggersRequest => ({
      dataCenter,
    }),
  )

  useSequentialInterval(refreshListTriggers, 5000)

  useEffect(() => {
    const triggers = listTriggersResponse ?? []
    setRows(mapToTriggerTableRows(triggers))
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

    patchRow(triggerName, {
      enabled: newEnabled,
      status: {
        ...targetRow.status,
        isUpdating: true,
      },
    })

    try {
      await triggersApi.enableOrDisableTrigger({
        dataCenter,
        triggerName,
        enableOrDisableTriggerRequest: {
          enable: newEnabled,
        },
      })
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
      /**
       * Handle the error by showing a notification.
       */
      onError(error)
    }
  }

  const handleEdit = (triggerName: string) => {
    /**
     * Navigate to the Edit page for the selected trigger.
     */
    navigate(`/events/triggers/create?name=${triggerName}`)
  }

  return {
    rows,
    isLoading: !hasResponseBeenReceived,
    handleStatusChange,
    handleEdit,
  }
}
