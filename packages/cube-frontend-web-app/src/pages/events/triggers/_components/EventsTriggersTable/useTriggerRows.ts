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
  handleDelete: (triggerName: string) => Promise<void>
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

  const handleStatusChange = async (
    triggerName: string,
    enabled: boolean,
  ): Promise<void> => {
    const targetRow = rows.find((row) => row.name === triggerName)

    if (!targetRow) {
      return undefined
    }

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
    }
  }

  const handleEdit = (triggerName: string) => {
    /**
     * Navigate to the Edit page for the selected trigger.
     */
    navigate(`/events/triggers/create?name=${triggerName}`)
  }

  const handleDelete = async (triggerName: string) => {
    const targetRow = rows.find((row) => row.name === triggerName)
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
