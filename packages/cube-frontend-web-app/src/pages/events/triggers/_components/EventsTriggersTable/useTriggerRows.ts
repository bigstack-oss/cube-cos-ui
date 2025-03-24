import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { triggersApi } from '@cube-frontend/web-app/api/cosApi'
import { TriggersApiGetTriggersRequest } from '@cube-frontend/api'
import { mapToTriggerTableRows, TriggerRow } from './utils'

export type UseTriggerRows = {
  isLoading: boolean
  rows: TriggerRow[]
  handleStatusChange: (triggerName: string, enabled: boolean) => Promise<void>
  handleEdit: (triggerName: string) => void
  handleDelete: () => void
}

export const useTriggerRows = (): UseTriggerRows => {
  const navigate = useNavigate()

  const { name: dataCenter } = useContext(DataCenterContext)

  const [rows, setRows] = useState<TriggerRow[]>([])

  const { data: triggersResponse, isLoading } = useCosGetRequest(
    triggersApi.getTriggers,
    (): TriggersApiGetTriggersRequest => ({
      dataCenter,
    }),
  )

  useEffect(() => {
    const formattedRows = mapToTriggerTableRows(triggersResponse ?? [])
    setRows(formattedRows)
  }, [triggersResponse])

  const patchRow = (
    triggerName: string,
    payload: Partial<TriggerRow>,
  ): void => {
    setRows((prevRows) => {
      const rowIndex = prevRows.findIndex((row) => row.name === triggerName)

      if (rowIndex < 0) {
        return prevRows
      } else {
        const newRows = [...prevRows]
        Object.assign(newRows[rowIndex], payload)
        return newRows
      }
    })
  }

  const handleStatusChange = async (
    triggerName: string,
    /**
     * It is the new status to update for the trigger.
     */
    enabled: boolean,
  ): Promise<void> => {
    const targetRow = rows.find((row) => row.name === triggerName)

    if (!targetRow) {
      return undefined
    }

    const enabledBeforeUpdate = targetRow.enabled

    patchRow(triggerName, {
      enabled,
      status: {
        ...targetRow,
        isUpdating: true,
      },
    })

    try {
      /**
       * Update toggle status with the new API,
       * which only updates the status without passing the rest of the request.
       */
    } catch (error) {
      console.error('Trigger update error: ', error)
      /**
       * Handle update API errors
       * and revert the row to its previous state if an error occurs.
       */
      patchRow(triggerName, {
        enabled: enabledBeforeUpdate,
        status: {
          ...targetRow,
          isUpdating: false,
        },
      })
    }
  }

  const handleEdit = (triggerName: string) => {
    /**
     * Navigate to the Edit page for the selected trigger.
     */
    navigate(`/events/triggers/create?name=${triggerName}`)
  }

  const handleDelete = () => {
    /**
     * Handle trigger deletion here;
     * the function is not included in Phase 1.
     */
  }

  return {
    rows,
    isLoading,
    handleStatusChange,
    handleEdit,
    handleDelete,
  }
}
