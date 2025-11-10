import { GetFirmwareUpgradeProgressResponseDataProgressesInnerStatusCurrentEnum as ProgressStatus } from '@cube-frontend/api'
import { dataCentersApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { useContext, useMemo } from 'react'
import { UpdateProgressRow } from './updateActionUtils'
import { UpdateFirmwareModalActionProps } from './useUpdateFirmwareModalActionProps'

type UseUpdatingFirmwareUpdateModalActionProps = {
  isRollingApplied: boolean
  progressRows: UpdateProgressRow[]
  onRebootRequested: () => unknown
}

export const useUpdatingFirmwareUpdateModalActionProps = (
  args: UseUpdatingFirmwareUpdateModalActionProps,
): UpdateFirmwareModalActionProps => {
  const { isRollingApplied, progressRows, onRebootRequested } = args

  const { dataCenter } = useContext(DataCenterContext)

  const {
    isLoading: isCallingSoftRebootApi,
    mutateResource: softRebootDataCenter,
  } = useCosMutationRequest(dataCentersApi.rolloutDataCenterBySoftReboot)

  const canReboot = useMemo<boolean>(() => {
    return (
      !isRollingApplied &&
      progressRows.every(
        (row) =>
          row.status.current === ProgressStatus.WaitingReboot ||
          row.status.current === ProgressStatus.Resolved,
      )
    )
  }, [isRollingApplied, progressRows])

  const onRebootClusterClick = async (): Promise<void> => {
    try {
      await softRebootDataCenter({
        dataCenter: dataCenter!.name,
      })
      onRebootRequested()
    } catch (error) {
      console.error('Soft reboot data center error: ', error)
    }
  }

  if (!progressRows.length) {
    return {
      actionText: 'Close',
      actionButtonProps: {
        disabled: true,
      },
      isCancelButtonVisible: false,
    }
  }

  if (isRollingApplied) {
    return {
      actionText: 'Done',
      actionButtonProps: {
        // Disable the "Done" button because the firmware is still being updated.
        disabled: true,
      },
      isCancelButtonVisible: false,
    }
  }

  return {
    actionText: 'Reboot cluster',
    actionButtonProps: {
      loading: isCallingSoftRebootApi,
      disabled: !canReboot,
    },
    isCancelButtonVisible: false,
    onActionClick: onRebootClusterClick,
  }
}
