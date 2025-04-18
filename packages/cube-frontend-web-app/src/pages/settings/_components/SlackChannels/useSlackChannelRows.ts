import { SlackChannelPostRequest } from '@cube-frontend/api'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useShowErrorToast } from '@cube-frontend/web-app/hooks/useShowErrorToast/useShowErrorToast'
import { merge } from 'lodash'
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import { createSlackChannel } from './actions/createSlackChannel'
import { deleteSlackChannel as deleteSlackChannelAction } from './actions/deleteSlackChannel'
import { trySlackChannel } from './actions/trySlackChannel'
import { updateSlackChannel } from './actions/updateSlackChannel'
import { slackChannelToRow } from './slackChannelMappers'
import { createNewRow, SlackChannelRow } from './slackChannelsUtils'

type UseSlackChannelRows = {
  rows: SlackChannelRow[]
  onAddClick: () => void
  onEditClick: (rowId: string) => void
  onCancelEditClick: (rowId: string) => void
  onChange: (rowId: string, e: ChangeEvent<HTMLInputElement>) => void
  onTryClick: (rowId: string) => Promise<void>
  onSaveClick: (rowId: string) => Promise<void>
  deleteSlackChannel: (rowId: string) => Promise<void>
}

export const useSlackChannelRows = (
  initialChannels: SlackChannelPostRequest[] | undefined,
): UseSlackChannelRows => {
  const { name: dataCenter } = useContext(DataCenterContext)

  const showErrorToast = useShowErrorToast()

  const [rows, setRows] = useState<SlackChannelRow[]>([])

  const isInitializedRef = useRef(false)

  useEffect(() => {
    // Still loading.
    if (!initialChannels) return

    // Already initialized.
    if (isInitializedRef.current) return

    setRows(initialChannels.map(slackChannelToRow))
    isInitializedRef.current = true
  }, [initialChannels, rows.length])

  const onAddClick = (): void => {
    setRows((prevRows) => [createNewRow(), ...prevRows])
  }

  const patchRow = (id: string, payload: Partial<SlackChannelRow>): void => {
    setRows((prevRows) => {
      const rowIndex = prevRows.findIndex((row) => row.id === id)
      if (rowIndex < 0) {
        return prevRows
      }
      const nextRows = [...prevRows]
      merge(nextRows[rowIndex], payload)
      return nextRows
    })
  }

  const onEditClick = (rowId: string): void => {
    patchRow(rowId, { isEditing: true })
  }

  const onCancelEditClick = (rowId: string): void => {
    const targetRow = rows.find((row) => row.id === rowId)
    if (!targetRow) {
      return
    }

    if (targetRow.isNew) {
      // Remove the new row.
      setRows((prevRows) => prevRows.filter((row) => row.id !== targetRow.id))
    } else {
      // Reset the target row to the original state and exit editing state.
      patchRow(targetRow.id, {
        ...targetRow.originalState,
        isEditing: false,
      })
    }
  }

  const onChange = (rowId: string, e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    patchRow(rowId, {
      [name as keyof SlackChannelPostRequest]: value,
    })
  }

  const onTryClick = async (rowId: string): Promise<void> => {
    const row = rows.find((row) => row.id === rowId)
    if (!row) {
      return
    }
    await trySlackChannel({
      dataCenter,
      row,
      patchRow,
      onError: showErrorToast,
    })
  }

  const onSaveClick = async (rowId: string): Promise<void> => {
    const row = rows.find((row) => row.id === rowId)
    if (!row) {
      return
    }

    if (row.isNew) {
      await createSlackChannel({
        dataCenter,
        row,
        patchRow,
        onError: showErrorToast,
      })
    } else {
      await updateSlackChannel({
        dataCenter,
        row,
        patchRow,
        onError: showErrorToast,
      })
    }
  }

  const deleteSlackChannel = async (rowId: string): Promise<void> => {
    const targetRow = rows.find((row) => row.id === rowId)
    if (!targetRow) {
      return
    }
    await deleteSlackChannelAction({
      dataCenter,
      row: targetRow,
      patchRow,
      onSuccess: () => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== rowId))
      },
      onError: showErrorToast,
    })
  }

  return {
    rows,
    onAddClick,
    onEditClick,
    onCancelEditClick,
    onChange,
    onTryClick,
    onSaveClick,
    deleteSlackChannel,
  }
}
