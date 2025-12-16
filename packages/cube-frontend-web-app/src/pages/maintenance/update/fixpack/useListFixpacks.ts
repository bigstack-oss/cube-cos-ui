import {
  FixpacksApiListFixpacksRequest,
  ListFixpacksResponseData,
  ListFixpacksResponseDataFixpacksInner,
} from '@cube-frontend/api'
import { fixpacksApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { usePolling } from '@cube-frontend/web-app/hooks/usePolling'
import { shouldDisplayLoading } from '@cube-frontend/web-app/utils/loadingDisplay'
import { useContext, useMemo } from 'react'
import {
  FixpackRow,
  fixpackToRow,
  ListFixpacksQuery,
} from './listFixpacksUtils'

type UseListFixpacks = {
  showLoading: boolean
  allFixpacks: ListFixpacksResponseDataFixpacksInner[]
  allRows: FixpackRow[]
  pagedRows: FixpackRow[]
  totalItemCount: number
  listFixpacks: () => Promise<ListFixpacksResponseData>
}

const POLLING_INTERVAL = 5 * 1000

export const useListFixpacks = (query: ListFixpacksQuery): UseListFixpacks => {
  const { dataCenter } = useContext(DataCenterContext)

  const {
    isLoading,
    hasResponseBeenReceived,
    data: pagedFixpacks,
    getResource: listFixpacks,
  } = useCosGetRequest(
    fixpacksApi.listFixpacks,
    (): FixpacksApiListFixpacksRequest => ({
      // Fetch all fixpacks to check their install/rollback/remove availability.
      // Pagination is done manually in the frontend.
      dataCenter: dataCenter!.name,
    }),
  )

  const { isPolling } = usePolling(listFixpacks, POLLING_INTERVAL)

  const allRows = useMemo<FixpackRow[]>(() => {
    const fixpacks = pagedFixpacks?.fixpacks ?? []
    return fixpacks.map(fixpackToRow)
  }, [pagedFixpacks?.fixpacks])

  const pagedRows = useMemo<FixpackRow[]>(() => {
    const { page, pageSize } = query

    const start = (page - 1) * pageSize
    const end = start + pageSize

    return allRows.slice(start, end)
  }, [allRows, query])

  const showLoading = shouldDisplayLoading({
    isLoading,
    isPolling,
    hasResponseBeenReceived,
  })

  return {
    showLoading,
    allFixpacks: pagedFixpacks?.fixpacks ?? [],
    allRows,
    pagedRows,
    totalItemCount: pagedFixpacks?.page.totalItemCount ?? 0,
    listFixpacks,
  }
}
