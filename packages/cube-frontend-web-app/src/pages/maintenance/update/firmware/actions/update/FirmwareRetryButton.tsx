import { CosButton } from '@cube-frontend/ui-library'
import { firmwaresApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { useContext, useState } from 'react'

type FirmwareRetryButtonProps = {
  version: string
  nodeName: string
  onAccepted: () => Promise<unknown>
}

export const FirmwareRetryButton = (props: FirmwareRetryButtonProps) => {
  const { version, nodeName, onAccepted } = props

  const { dataCenter } = useContext(DataCenterContext)

  const [isLoading, setIsLoading] = useState(false)

  const { mutateResource: retryFirmwareUpdate } = useCosMutationRequest(
    firmwaresApi.retryNodeFirmwareUpdate,
  )

  const onClick = async (): Promise<void> => {
    setIsLoading(true)
    try {
      await retryFirmwareUpdate({
        dataCenter: dataCenter!.name,
        version,
        nodeName,
      })
      onAccepted()
    } catch (error) {
      console.error('Retry firmware update error: ', error)
      setIsLoading(false)
    }
  }

  return (
    <CosButton type="warning" size="sm" loading={isLoading} onClick={onClick}>
      Retry
    </CosButton>
  )
}
