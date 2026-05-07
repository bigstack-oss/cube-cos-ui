import { NodesApiGetNodeRequest, NodeStatusEnum } from '@cube-frontend/api'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { usePolling } from '@cube-frontend/web-app/hooks/usePolling'
import { useContext } from 'react'
import { Navigate, useParams } from 'react-router'
import { NodeDevices } from './_components/devices/NodeDevices'
import { NodeCharts } from './_components/NodeCharts'
import { NodeDetailsHeader } from './_components/NodeDetailsHeader'
import { NodeEvents } from './_components/NodeEvents'
import { NodeNetworks } from './_components/NodeNetworks'
import { NodeSummary } from './_components/NodeSummary'
import { NODE_DETAILS_POLLING_INTERVAL } from './NodeDetailsPageUtils'
import NodeResources from './_components/NodeResources'

export const NodeDetailsPage = () => {
  const { name: nodeName } = useParams()

  const { dataCenter } = useContext(DataCenterContext)

  if (!nodeName) {
    throw new Error('Cannot find node name in the URL')
  }

  const {
    isLoading,
    data: node,
    getResource: getNodeDetails,
  } = useCosGetRequest(
    nodesApi.getNode,
    (): NodesApiGetNodeRequest => ({
      dataCenter: dataCenter!.name,
      nodeName,
    }),
  )

  usePolling(getNodeDetails, NODE_DETAILS_POLLING_INTERVAL)

  if (!isLoading && !node) {
    // Node not found.
    return <Navigate to={CosRoutesEnum.NODES_PAGE} replace={true} />
  }

  return (
    <div className="flex flex-col gap-y-4">
      <NodeDetailsHeader node={node} />
      <NodeSummary node={node} />
      {(!node || node.status === NodeStatusEnum.Up) && (
        <>
          <NodeNetworks node={node} />
          <NodeDevices hostname={node?.hostname} />
          <NodeResources node={node} />
          <NodeCharts node={node} />
          <NodeEvents node={node} />
        </>
      )}
    </div>
  )
}
