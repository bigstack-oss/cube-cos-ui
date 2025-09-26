import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { CosMutationApiResponse } from '@cube-frontend/web-app/hooks/useCosRequest/cosMutationRequestUtils'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { useContext } from 'react'
import { UpdateFirmwareModalActionProps } from './useUpdateFirmwareModalActionProps'

type UseAvailableFirmwareUpdateModalActionPropsArgs = {
  version: string | undefined
  onUpdateRequested: () => unknown
}

// TODO: Replace it with the real update firmware API.
const FAKE_UPDATE_FIRMWARE_API = async (
  _args: unknown,
): Promise<CosMutationApiResponse<unknown>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined as unknown as CosMutationApiResponse<unknown>)
    }, 2000)
  })
}

export const useAvailableFirmwareUpdateModalActionProps = (
  args: UseAvailableFirmwareUpdateModalActionPropsArgs,
): UpdateFirmwareModalActionProps => {
  const { version, onUpdateRequested } = args

  const { dataCenter } = useContext(DataCenterContext)

  const { isLoading, mutateResource: updateFirmware } = useCosMutationRequest(
    FAKE_UPDATE_FIRMWARE_API,
  )

  const onUpdateClick = async (): Promise<void> => {
    if (!version) return

    try {
      await updateFirmware({
        dataCenter: dataCenter!.name,
        version,
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
