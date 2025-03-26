import { useContext } from 'react'
import { NodesApiGetNodesRequest } from '@cube-frontend/api'
import { CosDashboardPanel } from '@cube-frontend/ui-library'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useUpdateTime } from '@cube-frontend/web-app/hooks/useUpdateTime'
import { useCosStreamRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosStreamRequest'
import { NodeTable } from '@cube-frontend/web-app/components/NodeTable/NodeTable'

const HOME_PAGE_NODE_ROW_LIMIT = 5

export const NodePanel = () => {
  const dataCenter = useContext(DataCenterContext)

  const { data: nodesData, isLoading } = useCosStreamRequest(
    nodesApi.getNodes,
    () => {
      return {
        dataCenter: dataCenter.name,
        pageNum: 1,
        pageSize: HOME_PAGE_NODE_ROW_LIMIT,
      } satisfies NodesApiGetNodesRequest
    },
  )

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
