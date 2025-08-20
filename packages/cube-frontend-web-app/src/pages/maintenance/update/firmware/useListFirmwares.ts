import { FirmwaresApiListFirmwaresRequest } from '@cube-frontend/api'
import { firmwaresApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { usePolling } from '@cube-frontend/web-app/hooks/usePolling'
import { shouldDisplayLoading } from '@cube-frontend/web-app/utils/loadingDisplay'
import { useContext, useMemo } from 'react'
import {
  FirmwareRow,
  firmwareToRow,
  ListFirmwaresQuery,
} from './listFirmwaresUtils'

type UseListFirmwares = {
  showLoading: boolean
  rows: FirmwareRow[]
  totalItemCount: number
}

const POLLING_INTERVAL = 5 * 1000

export const useListFirmwares = (
  query: ListFirmwaresQuery,
): UseListFirmwares => {
  const { dataCenter } = useContext(DataCenterContext)

  const {
    isLoading,
    hasResponseBeenReceived,
    data: pagedFirmwares,
    getResource: listFirmwares,
  } = useCosGetRequest(
    firmwaresApi.listFirmwares,
    (): FirmwaresApiListFirmwaresRequest => ({
      dataCenter: dataCenter!.name,
      pageNum: query.page,
      pageSize: query.pageSize,
    }),
  )

  const { isPolling } = usePolling(listFirmwares, POLLING_INTERVAL)

  const rows = useMemo<FirmwareRow[]>(() => {
    if (!pagedFirmwares?.firmwares) return []
    return pagedFirmwares.firmwares.map(firmwareToRow)
  }, [pagedFirmwares?.firmwares])

  const showLoading = shouldDisplayLoading({
    isLoading,
    isPolling,
    hasResponseBeenReceived,
  })

  return {
    rows,
    totalItemCount: pagedFirmwares?.page.totalItemCount ?? 0,
    showLoading,
  }
}
