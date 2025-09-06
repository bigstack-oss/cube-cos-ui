import { CosModal } from '@cube-frontend/ui-library'
import { fixpacksApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { useContext } from 'react'

type DeleteFixpackModalProps = {
  version: string | undefined
  onCloseClick: () => void
  onDeleted: () => void
}

export const DeleteFixpackModal = (props: DeleteFixpackModalProps) => {
  const { version, onCloseClick, onDeleted } = props

  const { dataCenter } = useContext(DataCenterContext)

  const { isLoading, mutateResource: deleteFixpack } = useCosMutationRequest(
    fixpacksApi.deleteFixpack,
  )

  const onActionClick = async (): Promise<void> => {
    if (!version) return

    try {
      await deleteFixpack({
        dataCenter: dataCenter!.name,
        version,
      })
      onDeleted()
    } catch (error) {
      console.error('Delete fixpack error: ', error)
    }
  }

  return (
    <CosModal
      isOpen={!!version}
      title="Delete Fixpack"
      size="sm"
      actionText="Yes, delete"
      actionButtonProps={{ loading: isLoading }}
      onActionClick={onActionClick}
      onCloseClick={onCloseClick}
    >
      {`Are you sure you want to delete fixpack ${version}?`}
    </CosModal>
  )
}
