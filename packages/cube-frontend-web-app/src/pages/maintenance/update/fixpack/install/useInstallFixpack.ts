import { fixpacksApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { useContext, useEffect, useState } from 'react'

type UseInstallFixpack = {
  isInstallButtonLoading: boolean
  onInstallClick: () => Promise<void>
}

export const useInstallFixpack = (
  fixpackVersion: string | undefined,
  onInstallationRequested: () => unknown,
): UseInstallFixpack => {
  const { dataCenter } = useContext(DataCenterContext)

  const [isInstallButtonLoading, setIsInstallButtonLoading] = useState(false)

  useEffect(() => {
    setIsInstallButtonLoading(false)
  }, [fixpackVersion])

  const { mutateResource: callInstallFixpackApi } = useCosMutationRequest(
    fixpacksApi.installFixpack,
  )

  const installFixpack = async (): Promise<void> => {
    if (!fixpackVersion) return

    setIsInstallButtonLoading(true)

    try {
      await callInstallFixpackApi({
        dataCenter: dataCenter!.name,
        installFixpackRequest: {
          version: fixpackVersion,
        },
      })
      onInstallationRequested()
      // To avoid the install button briefly flashing back to a non-loading
      // state, keep it in the loading state while we wait for the fixpack
      // to start installing.
    } catch (error) {
      console.error('Request fixpack installation error: ', error)
      setIsInstallButtonLoading(false)
    }
  }

  return {
    isInstallButtonLoading,
    onInstallClick: installFixpack,
  }
}
