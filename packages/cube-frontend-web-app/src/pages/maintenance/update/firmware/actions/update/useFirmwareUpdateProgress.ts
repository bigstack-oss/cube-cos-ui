import {
  FirmwaresApiGetFirmwareUpgradeProgressRequest,
  ListFirmwaresResponseDataFirmwaresInner,
} from '@cube-frontend/api'
import { Nullish } from '@cube-frontend/utils'
import { firmwaresApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { usePolling } from '@cube-frontend/web-app/hooks/usePolling'
import { shouldDisplayLoading } from '@cube-frontend/web-app/utils/loadingDisplay'
import { isCancel } from 'axios'
import { useContext, useMemo } from 'react'
import { UpdateProgressRow, toProgressRow } from './updateActionUtils'

type UseFirmwareUpdateProgress = {
  isLoadingProgress: boolean
  isRollingApplied: boolean
  progressRows: UpdateProgressRow[]
  fetchUpdateProgress: () => Promise<unknown>
}

const POLLING_INTERVAL = 3000

export const useFirmwareUpdateProgress = (
  firmware: ListFirmwaresResponseDataFirmwaresInner | undefined,
): UseFirmwareUpdateProgress => {
  const { dataCenter } = useContext(DataCenterContext)

  const {
    isLoading,
    data: upgradeProgress,
    getResource: fetchUpdateProgress,
    hasResponseBeenReceived,
  } = useCosGetRequest(
    firmwaresApi.getFirmwareUpgradeProgress,
    (): Nullish<FirmwaresApiGetFirmwareUpgradeProgressRequest> => {
      if (!firmware) return undefined
      return {
        dataCenter: dataCenter!.name,
      }
    },
  )

  const { isPolling } = usePolling(async () => {
    if (!firmware) return
    try {
      await fetchUpdateProgress()
    } catch (error) {
      if (isCancel(error)) return
      console.error('Fetch firmware update progress error: ', error)
    }
  }, POLLING_INTERVAL)

  const progressRows = useMemo<UpdateProgressRow[]>(() => {
    if (!upgradeProgress || upgradeProgress.version !== firmware?.version) {
      return []
    }
    return upgradeProgress.progresses.map(toProgressRow)
  }, [firmware?.version, upgradeProgress])

  const showLoading = shouldDisplayLoading({
    isLoading,
    isPolling,
    hasResponseBeenReceived,
  })

  return {
    isLoadingProgress:
      showLoading ||
      // Show loading while `progressRows` is empty, as the result of `useMemo`
      // is always a render behind the state it depends on.
      // This prevents the "No Data" placeholder from flashing in the progress
      // table after the loading state is finished.
      !progressRows.length,
    isRollingApplied: !!upgradeProgress?.isRollingApplied,
    progressRows,
    fetchUpdateProgress,
  }
}
