import {
  FixpacksApiGetFixpackProgressRequest,
  GetFixpackUpdateProgressResponseDataOperationEnum,
  ListFixpacksResponseDataFixpacksInner,
} from '@cube-frontend/api'
import { fixpacksApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { Nullish } from '@cube-frontend/web-app/hooks/useCosRequest/cosRequestUtils'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { usePolling } from '@cube-frontend/web-app/hooks/usePolling'
import { shouldDisplayLoading } from '@cube-frontend/web-app/utils/loadingDisplay'
import { isCancel } from 'axios'
import { useContext, useMemo } from 'react'
import { ProgressTableRow, toProgressTableRow } from './fixpackUpdateUtils'

type UseFixpackUpdateProgress = {
  isLoadingProgress: boolean
  operation: GetFixpackUpdateProgressResponseDataOperationEnum | undefined
  progressRows: ProgressTableRow[]
  fetchUpdateProgress: () => Promise<unknown>
}

type UseFixpackUpdateProgressArgs = {
  fixpack: ListFixpacksResponseDataFixpacksInner | undefined
  targetOperation: GetFixpackUpdateProgressResponseDataOperationEnum
}

const POLLING_INTERVAL = 3000

export const useFixpackUpdateProgress = (
  args: UseFixpackUpdateProgressArgs,
): UseFixpackUpdateProgress => {
  const { fixpack, targetOperation } = args

  const { dataCenter } = useContext(DataCenterContext)

  const {
    isLoading,
    data: updateProgress,
    getResource: fetchUpdateProgress,
    hasResponseBeenReceived,
  } = useCosGetRequest(
    fixpacksApi.getFixpackProgress,
    (): Nullish<FixpacksApiGetFixpackProgressRequest> => {
      if (!fixpack) return undefined
      return {
        dataCenter: dataCenter!.name,
      }
    },
  )

  const { isPolling } = usePolling(async () => {
    if (!fixpack) return
    try {
      await fetchUpdateProgress()
    } catch (error) {
      if (isCancel(error)) return
      console.error('Fetch update progress error: ', error)
    }
  }, POLLING_INTERVAL)

  const progressRows = useMemo<ProgressTableRow[]>(() => {
    if (
      !updateProgress ||
      updateProgress.version !== fixpack?.version ||
      updateProgress.operation !== targetOperation
    ) {
      return []
    }
    return updateProgress.progresses.map(toProgressTableRow)
  }, [fixpack?.version, targetOperation, updateProgress])

  const showLoading = shouldDisplayLoading({
    isLoading,
    isPolling,
    hasResponseBeenReceived,
  })

  return {
    isLoadingProgress: showLoading,
    operation: updateProgress?.operation,
    progressRows,
    fetchUpdateProgress,
  }
}
