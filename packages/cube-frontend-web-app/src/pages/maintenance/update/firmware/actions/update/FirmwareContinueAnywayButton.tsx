import { CosButton } from '@cube-frontend/ui-library'
import { firmwaresApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { useContext } from 'react'

type FirmwareContinueAnywayButtonProps = {
  nodeName: string
}

export const FirmwareContinueAnywayButton = (
  props: FirmwareContinueAnywayButtonProps,
) => {
  const { nodeName } = props

  const { dataCenter } = useContext(DataCenterContext)

  const { isLoading, mutateResource: continueInterruptedFirmwareUpdate } =
    useCosMutationRequest(firmwaresApi.continueInterruptedFirmwareUpdate)

  const onClick = async (): Promise<void> => {
    try {
      await continueInterruptedFirmwareUpdate({
        dataCenter: dataCenter!.name,
        nodeName,
      })
    } catch (error) {
      console.error('Continue interrupted firmware update error: ', error)
    }
  }

  return (
    <CosButton type="warning" size="sm" loading={isLoading} onClick={onClick}>
      Continue anyway
    </CosButton>
  )
}
