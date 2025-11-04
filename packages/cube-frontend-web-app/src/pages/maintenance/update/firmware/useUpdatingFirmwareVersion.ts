import { FirmwaresApiGetFirmwareUpgradeProgressRequest } from '@cube-frontend/api'
import { firmwaresApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { usePolling } from '@cube-frontend/web-app/hooks/usePolling'
import { useContext } from 'react'

type useUpdatingFirmwareVersion = string | undefined

const FETCH_INTERVAL = 1000 * 3

export const useUpdatingFirmwareVersion = (): string | undefined => {
  const { dataCenter } = useContext(DataCenterContext)

  const { data: upgradeProgressResponse, getResource } = useCosGetRequest(
    firmwaresApi.getFirmwareUpgradeProgress,
    (): FirmwaresApiGetFirmwareUpgradeProgressRequest => ({
      dataCenter: dataCenter!.name,
    }),
  )

  usePolling(getResource, FETCH_INTERVAL)

  return upgradeProgressResponse?.version
}
