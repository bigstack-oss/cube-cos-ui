import {
  FixpacksApiListFixpackNodeStatusRequest,
  ListFixpackNodeStatusResponseDataInner,
} from '@cube-frontend/api'
import { fixpacksApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { usePolling } from '@cube-frontend/web-app/hooks/usePolling'
import { useContext, useMemo } from 'react'

const POLLING_INTERVAL = 10 * 1000
const UNREACHABLE = 'unreachable'

type UseNodeFixpackStatus = {
  isLoading: boolean
  nodeStatuses: ListFixpackNodeStatusResponseDataInner[]
  partiallyInstalledVersions: Set<string>
}

/**
 * Versions installed on some reachable nodes but not on others.
 */
export const getPartiallyInstalledVersions = (
  nodeStatuses: ListFixpackNodeStatusResponseDataInner[],
): Set<string> => {
  const reachable = nodeStatuses.filter((n) => n.status !== UNREACHABLE)
  const installed = new Set(reachable.flatMap((n) => n.installed))

  return new Set(
    [...installed].filter((version) =>
      reachable.some((n) => !n.installed.includes(version)),
    ),
  )
}

export const useNodeFixpackStatus = (): UseNodeFixpackStatus => {
  const { dataCenter } = useContext(DataCenterContext)

  const {
    isLoading,
    data,
    getResource: listNodeStatus,
  } = useCosGetRequest(
    fixpacksApi.listFixpackNodeStatus,
    (): FixpacksApiListFixpackNodeStatusRequest => ({
      dataCenter: dataCenter!.name,
    }),
  )

  usePolling(listNodeStatus, POLLING_INTERVAL, { pauseWhenHidden: true })

  const nodeStatuses = useMemo(() => data ?? [], [data])

  const partiallyInstalledVersions = useMemo(
    () => getPartiallyInstalledVersions(nodeStatuses),
    [nodeStatuses],
  )

  return { isLoading, nodeStatuses, partiallyInstalledVersions }
}
