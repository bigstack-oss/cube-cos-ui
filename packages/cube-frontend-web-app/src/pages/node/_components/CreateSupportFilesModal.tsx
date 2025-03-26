import { Node } from '@cube-frontend/api'
import {
  CosInput,
  CosModal,
  CosTag,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'

const SelectedHostsTable = GetCosBasicTable<Node>()

export type CreateSupportFilesModalProps = {
  isOpen: boolean
  isCreating: boolean
  selectedNodes: Node[]
  comments: string
  onCommentsChange: (comments: string) => void
  onCreateClick: () => void
  onCloseClick: () => void
}

export const CreateSupportFilesModal = (
  props: CreateSupportFilesModalProps,
) => {
  const {
    isOpen,
    isCreating,
    selectedNodes,
    comments,
    onCommentsChange,
    onCreateClick,
    onCloseClick,
  } = props

  return (
    // TODO: remove transition
    <CosModal
      title="Create support files"
      size="sm"
      isOpen={isOpen}
      actionText="Create support files"
      actionButtonProps={{ loading: isCreating }}
      onActionClick={onCreateClick}
      onCloseClick={onCloseClick}
    >
      <div className="flex flex-col gap-y-5">
        <p className="primary-body2 text-functional-text">
          Do you want to create support files from these nodes?
        </p>
        <SelectedHostsTable rows={selectedNodes}>
          <SelectedHostsTable.Column label="Node" property="hostname" />
          <SelectedHostsTable.Column label="Role" property="role">
            {(role) => (
              <CosTag color="blue" variant="filled">
                {role}
              </CosTag>
            )}
          </SelectedHostsTable.Column>
        </SelectedHostsTable>
        <CosInput
          label="Add comments"
          value={comments}
          onChange={(e) => onCommentsChange(e.target.value)}
        />
      </div>
    </CosModal>
  )
}
