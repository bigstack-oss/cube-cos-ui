import { CosModal } from '@cube-frontend/ui-library'
import { firmwaresApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { useContext } from 'react'

type DeleteFirmwareModalProps = {
  version: string | undefined
  onCloseClick: () => void
  onDeleted: () => void
}

export const DeleteFirmwareModal = (props: DeleteFirmwareModalProps) => {
  const { version, onCloseClick, onDeleted } = props

  const { dataCenter } = useContext(DataCenterContext)

  const { isLoading, mutateResource: deleteFirmware } = useCosMutationRequest(
    firmwaresApi.deleteFirmware,
  )

  const onDeleteClick = async (): Promise<void> => {
    if (!version) return

    try {
      await deleteFirmware({
        dataCenter: dataCenter!.name,
        version,
      })
      onDeleted()
    } catch (error) {
      console.error('Delete firmware error: ', error)
    }
  }

  return (
    <CosModal
      isOpen={!!version}
      title="Delete Firmware"
      size="sm"
      actionText="Yes, delete"
      actionButtonProps={{ loading: isLoading }}
      onActionClick={onDeleteClick}
      onCloseClick={onCloseClick}
    >
      <div className="primary-body3 text-functional-text">
        {`Are you sure you want to delete this firmware ${version}?`}
      </div>
    </CosModal>
  )
}
