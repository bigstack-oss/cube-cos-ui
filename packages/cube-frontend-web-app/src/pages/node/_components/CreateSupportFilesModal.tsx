import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Node } from '@cube-frontend/api'
import {
  CosInput,
  CosModal,
  CosTag,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import { supportFilesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'

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

  const { t } = useTranslation()

  const { dataCenter } = useContext(DataCenterContext)

  const { isLoading: isCreating, mutateResource: createSupportFilesApi } =
    useCosMutationRequest(supportFilesApi.createSupportFiles)

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
      title={t('nodes.createSupportFiles')}
      size="sm"
      isOpen={isOpen}
      actionText={t('nodes.createSupportFiles')}
      actionButtonProps={{ loading: isCreating }}
      onActionClick={onCreateClick}
      onCloseClick={onCloseClick}
    >
      <div className="flex flex-col gap-y-5">
        <p className="primary-body2 text-functional-text">
          {t('nodes.createSupportFiles.message')}
        </p>
        <SelectedHostsTable rows={selectedNodes}>
          <SelectedHostsTable.Column
            label={t('nodes.createSupportFiles.node')}
            property="hostname"
          />
          <SelectedHostsTable.Column
            label={t('nodes.createSupportFiles.role')}
            property="role"
          >
            {(role) => (
              <CosTag color="blue" variant="filled">
                {t(`common.node.roles.${role}`)}
              </CosTag>
            )}
          </SelectedHostsTable.Column>
        </SelectedHostsTable>
        <CosInput
          label={t('nodes.createSupportFiles.addComments')}
          value={comments}
          onChange={(e) => onCommentsChange(e.target.value)}
        />
      </div>
    </CosModal>
  )
}
