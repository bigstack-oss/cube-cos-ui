import { SlackChannelPostRequest } from '@cube-frontend/api'
import {
  CosModal,
  CosTableInput,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import { SlackChannelsHeader } from './SlackChannelsHeader'
import { SlackChannelRow } from './slackChannelsUtils'
import { ActionCell } from './tableCells/ActionCell'
import { useDeleteSlackChannelModal } from './useDeleteSlackChannelModal'
import { useSlackChannelRows } from './useSlackChannelRows'
import { useSlackChannelRowsErrorMap } from './useSlackChannelRowsErrorMap'

type SlackChannelsProps = {
  isLoading: boolean
  initialChannels: SlackChannelPostRequest[] | undefined
}

const SlackChannelTable = GetCosBasicTable<SlackChannelRow>()

export const SlackChannels = (props: SlackChannelsProps) => {
  const { isLoading, initialChannels } = props

  const {
    rows,
    onAddClick,
    onEditClick,
    onCancelEditClick,
    onChange,
    onTryClick,
    onSaveClick,
    deleteSlackChannel,
  } = useSlackChannelRows(initialChannels)

  const rowsErrorMap = useSlackChannelRowsErrorMap(rows)

  const {
    isDeleteModalOpen,
    toBeDeletedRowId,
    onDeleteClick,
    onCloseDeleteModal,
  } = useDeleteSlackChannelModal()

  const onConfirmDelete = async (): Promise<void> => {
    if (toBeDeletedRowId) {
      onCloseDeleteModal()
      await deleteSlackChannel(toBeDeletedRowId)
    }
  }

  return (
    <div className="flex flex-col gap-y-2">
      <SlackChannelsHeader
        isCountLimitReached={rows.length >= 10}
        isRowsLoading={isLoading}
        onAddButtonClick={onAddClick}
      />
      <SlackChannelTable isLoading={isLoading} rows={rows}>
        <SlackChannelTable.Column property="name" label="Name">
          {(name, row) =>
            row.isEditing ? (
              <CosTableInput
                className="w-32"
                name="name"
                placeholder="Name"
                value={name}
                errorMessage={rowsErrorMap.get(row.id)?.name}
                disabled={row.isSaving}
                onChange={(e) => onChange(row.id, e)}
              />
            ) : (
              name
            )
          }
        </SlackChannelTable.Column>
        <SlackChannelTable.Column property="url" label="Url">
          {(url, row) =>
            row.isEditing ? (
              <CosTableInput
                name="url"
                placeholder="Url"
                value={url}
                errorMessage={rowsErrorMap.get(row.id)?.url}
                disabled={row.isSaving}
                onChange={(e) => onChange(row.id, e)}
              />
            ) : (
              url
            )
          }
        </SlackChannelTable.Column>
        <SlackChannelTable.Column property="description" label="Description">
          {(description, row) =>
            row.isEditing ? (
              <CosTableInput
                className="w-60"
                name="description"
                placeholder="Description"
                value={description}
                errorMessage={rowsErrorMap.get(row.id)?.description}
                disabled={row.isSaving}
                onChange={(e) => onChange(row.id, e)}
              />
            ) : (
              description
            )
          }
        </SlackChannelTable.Column>
        <SlackChannelTable.Column>
          {(_, row) => (
            <ActionCell
              row={row}
              rowError={rowsErrorMap.get(row.id)}
              nonEditingActions={{
                onEditClick,
                onTryClick,
                onDeleteClick,
              }}
              editingActions={{
                onSaveClick,
                onCancelEditClick,
              }}
            />
          )}
        </SlackChannelTable.Column>
      </SlackChannelTable>
      <CosModal
        title="Delete Slack Channel"
        size="sm"
        isOpen={isDeleteModalOpen}
        actionText="Delete"
        onActionClick={onConfirmDelete}
        onCloseClick={onCloseDeleteModal}
      >
        Are you sure you want to delete this Slack channel?
      </CosModal>
    </div>
  )
}
