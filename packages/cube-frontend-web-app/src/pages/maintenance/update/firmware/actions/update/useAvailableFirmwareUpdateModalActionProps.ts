import { firmwaresApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { useContext } from 'react'
import { UpdateFirmwareModalActionProps } from './useUpdateFirmwareModalActionProps'

type UseAvailableFirmwareUpdateModalActionPropsArgs = {
  version: string | undefined
  isRollingChecked: boolean
  onUpdateRequested: () => unknown
}

export const useAvailableFirmwareUpdateModalActionProps = (
  args: UseAvailableFirmwareUpdateModalActionPropsArgs,
): UpdateFirmwareModalActionProps => {
  const { version, isRollingChecked, onUpdateRequested } = args

  const { dataCenter } = useContext(DataCenterContext)

  const { isLoading, mutateResource: updateFirmware } = useCosMutationRequest(
    firmwaresApi.upgradeFirmware,
  )

  const onUpdateClick = async (): Promise<void> => {
    if (!version) return

    try {
      await updateFirmware({
        dataCenter: dataCenter!.name,
        upgradeFirmwareRequest: {
          version,
          autoRolling: isRollingChecked,
        },
      })
      onUpdateRequested()
    } catch (error) {
      console.error('Update firmware error: ', error)
    }
  }

  return {
    actionText: 'Yes, update',
    actionButtonProps: {
      loading: isLoading,
    },
    isCancelButtonVisible: true,
    onActionClick: onUpdateClick,
  }
}
