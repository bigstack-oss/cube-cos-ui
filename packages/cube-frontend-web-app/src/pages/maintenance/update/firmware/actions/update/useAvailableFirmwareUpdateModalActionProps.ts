import {
  ListFirmwaresResponseDataFirmwaresInnerStatusCurrentEnum as FirmwareStatus,
  ListFirmwaresResponseDataFirmwaresInner,
} from '@cube-frontend/api'
import { firmwaresApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { useContext, useEffect, useState } from 'react'
import { UpdateFirmwareModalActionProps } from './useUpdateFirmwareModalActionProps'

type UseAvailableFirmwareUpdateModalActionPropsArgs = {
  firmware: ListFirmwaresResponseDataFirmwaresInner | undefined
  isRollingChecked: boolean
}

export const useAvailableFirmwareUpdateModalActionProps = (
  args: UseAvailableFirmwareUpdateModalActionPropsArgs,
): UpdateFirmwareModalActionProps => {
  const { firmware, isRollingChecked } = args

  const { dataCenter } = useContext(DataCenterContext)

  // The firmware upgrade doesn't start right away after the server accepts the
  // API request. There's a brief delay before it actually begins, so we keep
  // the Update button in a loading state to cover the short gap.
  const [keepShowingLoading, setKeepShowingLoading] = useState(false)

  const { isLoading, mutateResource: updateFirmware } = useCosMutationRequest(
    firmwaresApi.upgradeFirmware,
  )

  useEffect(() => {
    if (firmware?.status.current === FirmwareStatus.Installing) {
      setKeepShowingLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firmware?.status.current])

  const onUpdateClick = async (): Promise<void> => {
    if (!firmware) return

    try {
      await updateFirmware({
        dataCenter: dataCenter!.name,
        upgradeFirmwareRequest: {
          version: firmware.version,
          autoRolling: isRollingChecked,
        },
      })
      setKeepShowingLoading(true)
    } catch (error) {
      console.error('Update firmware error: ', error)
      setKeepShowingLoading(false)
    }
  }

  return {
    actionText: 'Yes, update',
    actionButtonProps: {
      loading: isLoading || keepShowingLoading,
    },
    isCancelButtonVisible: true,
    onActionClick: onUpdateClick,
  }
}
