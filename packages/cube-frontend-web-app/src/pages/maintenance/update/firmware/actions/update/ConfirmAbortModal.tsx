import { CosModal } from '@cube-frontend/ui-library'
import { firmwaresApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { useContext, useState } from 'react'

type ConfirmAbortModalProps = {
  isOpen: boolean
  firmwareVersion: string
  onAborted: () => unknown
  onCloseClick: () => void
}

export const ConfirmAbortModal = (props: ConfirmAbortModalProps) => {
  const { isOpen, firmwareVersion, onAborted, onCloseClick } = props

  const { dataCenter } = useContext(DataCenterContext)

  const [isLoading, setIsLoading] = useState(false)

  const { mutateResource: abortFirmwareUpdate } = useCosMutationRequest(
    firmwaresApi.abortFirmwareUpdate,
  )

  const onClick = async (): Promise<void> => {
    setIsLoading(true)
    try {
      await abortFirmwareUpdate({
        dataCenter: dataCenter!.name,
      })
      onAborted()
    } catch (error) {
      console.error('Failed to abort firmware update: ', error)
      setIsLoading(false)
    }
  }

  return (
    <CosModal
      isOpen={isOpen}
      size="sm"
      title="Abort Firmware Update"
      actionText="Abort"
      actionButtonProps={{ loading: isLoading }}
      onActionClick={onClick}
      onCloseClick={onCloseClick}
    >
      <div className="primary-body2 text-functional-text">
        Are you sure you want to abort the update of{' '}
        <b className="font-semibold">{firmwareVersion}</b>?
      </div>
    </CosModal>
  )
}
