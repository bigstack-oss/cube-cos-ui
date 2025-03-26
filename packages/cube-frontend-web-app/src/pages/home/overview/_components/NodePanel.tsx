import { useContext } from 'react'
import { NodesApiGetNodesRequest } from '@cube-frontend/api'
import { CosDashboardPanel } from '@cube-frontend/ui-library'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useUpdateTime } from '@cube-frontend/web-app/hooks/useUpdateTime'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { NodeTable } from '@cube-frontend/web-app/components/NodeTable/NodeTable'
import { useSequentialInterval } from '@cube-frontend/web-app/hooks/useSequentialInterval/useSequentialInterval'
import { HOME_OVERVIEW_PAGE_POLLING_INTERVAL } from '../homeOverviewPageUtils'

const HOME_PAGE_NODE_ROW_LIMIT = 5

export const NodePanel = () => {
  const dataCenter = useContext(DataCenterContext)

  const {
    data: nodesData,
    hasResponseBeenReceived,
    getResource: getNodes,
  } = useCosGetRequest(nodesApi.getNodes, () => {
    return {
      dataCenter: dataCenter.name,
      pageNum: 1,
      pageSize: HOME_PAGE_NODE_ROW_LIMIT,
    } satisfies NodesApiGetNodesRequest
  })

  const isLoading = !hasResponseBeenReceived

  useSequentialInterval(getNodes, HOME_OVERVIEW_PAGE_POLLING_INTERVAL, {
    immediate: false,
  })

  const updateTime = useUpdateTime(nodesData, isLoading)

  return (
    <CosDashboardPanel
      title="Nodes"
      time={updateTime}
      hyperLinkProps={{ href: '/nodes' }}
      useContentWrapper={false}
      isTimeLoading={isLoading}
    >
      <NodeTable
        rows={nodesData?.nodes || []}
        isLoading={isLoading}
        skeletonRowCount={HOME_PAGE_NODE_ROW_LIMIT}
      />
    </CosDashboardPanel>
  )
}
