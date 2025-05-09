import { useContext, useMemo } from 'react'
import { Node, NodesApiGetNodesRequest } from '@cube-frontend/api'
import { CosDashboardPanel } from '@cube-frontend/ui-library'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useUpdateTime } from '@cube-frontend/web-app/hooks/useUpdateTime'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useSequentialInterval } from '@cube-frontend/web-app/hooks/useSequentialInterval/useSequentialInterval'
import { HOME_OVERVIEW_PAGE_POLLING_INTERVAL } from '../../homeOverviewPageUtils'
import { NodeTable } from './NodeTable'
import { noop, uniqueId } from 'lodash'
import { Link } from 'react-router'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'

const HOME_PAGE_NODE_ROW_LIMIT = 5

export const NodePanel = () => {
  const { dataCenter } = useContext(DataCenterContext)

  const {
    data: nodesData,
    hasResponseBeenReceived,
    getResource: getNodes,
  } = useCosGetRequest(nodesApi.getNodes, () => {
    return {
      dataCenter: dataCenter!.name,
      pageNum: 1,
      pageSize: HOME_PAGE_NODE_ROW_LIMIT,
    } satisfies NodesApiGetNodesRequest
  })

  const isLoading = !hasResponseBeenReceived

  useSequentialInterval(getNodes, HOME_OVERVIEW_PAGE_POLLING_INTERVAL, {
    immediate: false,
  })

  const updateTime = useUpdateTime(nodesData, isLoading)

  const rows = useMemo<Node[]>(() => {
    const nodes = nodesData?.nodes ?? []
    return nodes.map((node) => ({
      ...node,
      // Adjust `id` because `id` will be an empty string when the node is in `down` status.
      id: node.id || uniqueId('node'),
    }))
  }, [nodesData?.nodes])

  return (
    <CosDashboardPanel
      title="Nodes"
      time={updateTime}
      hyperLinkProps={{ onClick: noop }}
      HyperLinkContainer={<Link to={CosRoutesEnum.NODES_PAGE} />}
      useContentWrapper={false}
      isTimeLoading={isLoading}
    >
      <NodeTable
        rows={rows}
        isLoading={isLoading}
        skeletonRowCount={HOME_PAGE_NODE_ROW_LIMIT}
      />
    </CosDashboardPanel>
  )
}
