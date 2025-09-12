import { dataCentersApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { useContext } from 'react'

type UseSoftRebootDataCenter = {
  isCallingSoftRebootDataCenterApi: boolean
  onRebootClick: () => Promise<void>
}

export const useSoftRebootDataCenter = (
  onSoftRebootRequested: () => unknown,
): UseSoftRebootDataCenter => {
  const { dataCenter } = useContext(DataCenterContext)

  const { isLoading, mutateResource: callSoftRebootApi } =
    useCosMutationRequest(dataCentersApi.rolloutDataCenterBySoftReboot)

  const softRebootDataCenter = async (): Promise<void> => {
    if (!dataCenter) return

    try {
      await callSoftRebootApi({
        dataCenter: dataCenter!.name,
      })
      onSoftRebootRequested()
    } catch (error) {
      console.error('Soft reboot data center error: ', error)
    }
  }

  return {
    isCallingSoftRebootDataCenterApi: isLoading,
    onRebootClick: softRebootDataCenter,
  }
}
