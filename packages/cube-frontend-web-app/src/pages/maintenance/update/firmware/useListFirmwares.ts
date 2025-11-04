import {
  FirmwaresApiListFirmwaresRequest,
  ListFirmwaresResponseData,
  ListFirmwaresResponseDataFirmwaresInner,
} from '@cube-frontend/api'
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
  allFirmwares: ListFirmwaresResponseDataFirmwaresInner[]
  pagedRows: FirmwareRow[]
  totalItemCount: number
  listFirmwares: () => Promise<ListFirmwaresResponseData>
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
      // Fetch all firmwares to check their install/remove availability.
      // Pagination is done manually in the frontend.
      dataCenter: dataCenter!.name,
    }),
  )

  const { isPolling } = usePolling(listFirmwares, POLLING_INTERVAL)

  const pagedRows = useMemo<FirmwareRow[]>(() => {
    const firmwares = pagedFirmwares?.firmwares ?? []
    const { page, pageSize } = query

    const start = (page - 1) * pageSize
    const end = start + pageSize

    return firmwares.slice(start, end).map(firmwareToRow)
  }, [pagedFirmwares?.firmwares, query])

  const showLoading = shouldDisplayLoading({
    isLoading,
    isPolling,
    hasResponseBeenReceived,
  })

  return {
    showLoading,
    allFirmwares: pagedFirmwares?.firmwares ?? [],
    pagedRows,
    totalItemCount: pagedFirmwares?.page.totalItemCount ?? 0,
    listFirmwares,
  }
}
