import { fixpacksApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { useContext, useEffect, useState } from 'react'

type UseRollbackFixpack = {
  isRollbackButtonLoading: boolean
  onRollbackClick: () => Promise<void>
}

export const useRollbackFixpack = (
  fixpackVersion: string | undefined,
  onRollbackRequested: () => unknown,
): UseRollbackFixpack => {
  const { dataCenter } = useContext(DataCenterContext)

  const [isRollbackButtonLoading, setIsRollbackButtonLoading] = useState(false)

  useEffect(() => {
    setIsRollbackButtonLoading(false)
  }, [fixpackVersion])

  const { mutateResource: callRollbackFixpackApi } = useCosMutationRequest(
    fixpacksApi.rollbackFixpack,
  )

  const rollbackFixpack = async (): Promise<void> => {
    if (!fixpackVersion) return

    setIsRollbackButtonLoading(true)

    try {
      await callRollbackFixpackApi({
        dataCenter: dataCenter!.name,
        version: fixpackVersion,
      })
      onRollbackRequested()
      // To avoid the rollback button briefly flashing back to a non-loading
      // state, keep it in the loading state while we wait for the fixpack
      // to start Rolling Back.
    } catch (error) {
      console.error('Request fixpack Rollback error: ', error)
      setIsRollbackButtonLoading(false)
    }
  }

  return {
    isRollbackButtonLoading,
    onRollbackClick: rollbackFixpack,
  }
}
