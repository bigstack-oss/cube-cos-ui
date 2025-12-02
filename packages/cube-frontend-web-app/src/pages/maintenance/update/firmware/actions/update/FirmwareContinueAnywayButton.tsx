import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { CosButton } from '@cube-frontend/ui-library'
import { firmwaresApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'

type FirmwareContinueAnywayButtonProps = {
  nodeName: string
  onAccepted: () => Promise<unknown>
}

export const FirmwareContinueAnywayButton = (
  props: FirmwareContinueAnywayButtonProps,
) => {
  const { nodeName, onAccepted } = props

  const { dataCenter } = useContext(DataCenterContext)

  const { isLoading, mutateResource: continueInterruptedFirmwareUpdate } =
    useCosMutationRequest(firmwaresApi.continueInterruptedFirmwareUpdate)

  const onClick = async (): Promise<void> => {
    try {
      await continueInterruptedFirmwareUpdate({
        dataCenter: dataCenter!.name,
        nodeName,
      })
      onAccepted()
    } catch (error) {
      console.error('Continue interrupted firmware update error: ', error)
    }
  }

  const { t } = useTranslation()

  return (
    <CosButton type="warning" size="sm" loading={isLoading} onClick={onClick}>
      {t('maintenance.update.firmware.updateModal.continueAnyway')}
    </CosButton>
  )
}
