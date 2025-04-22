import {
  Node,
  SupportFilesApiCreateSupportFilesRequest,
} from '@cube-frontend/api'
import {
  CosInput,
  CosModal,
  CosTag,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import { supportFilesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { CosApiResponse } from '@cube-frontend/web-app/hooks/useCosRequest/cosRequestUtils'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { useContext } from 'react'

const SelectedHostsTable = GetCosBasicTable<NodeForCreateSupportFiles>()

export type CreateSupportFilesModalProps = {
  isOpen: boolean
  selectedNodes: NodeForCreateSupportFiles[]
  comments: string
  onCommentsChange: (comments: string) => void
  onCloseClick: () => void
  onSuccess?: () => void
}

type NodeForCreateSupportFiles = Pick<Node, 'id' | 'hostname' | 'role'>

export const CreateSupportFilesModal = (
  props: CreateSupportFilesModalProps,
) => {
  const {
    isOpen,
    selectedNodes,
    comments,
    onCommentsChange,
    onCloseClick,
    onSuccess,
  } = props

  const { dataCenter } = useContext(DataCenterContext)

  const { isLoading: isCreating, mutateResource: createSupportFilesApi } =
    useCosMutationRequest(
      supportFilesApi.createSupportFiles as (
        params: SupportFilesApiCreateSupportFilesRequest,
      ) => Promise<CosApiResponse<undefined>>,
    )

  const onCreateClick = async (): Promise<void> => {
    try {
      await createSupportFilesApi({
        dataCenter: dataCenter!.name,
        createSupportFilesRequest: {
          description: comments,
          hosts: selectedNodes.map((node) => node.hostname),
        },
      })
      onCloseClick()
      onSuccess?.()
    } catch (error) {
      console.error('Create support files error: ', error)
    }
  }

  return (
    <CosModal
      title="Create Support Files"
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
