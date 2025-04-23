import { NodesApiGetNodeRequest } from '@cube-frontend/api'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useSequentialInterval } from '@cube-frontend/web-app/hooks/useSequentialInterval/useSequentialInterval'
import { useContext } from 'react'
import { Navigate, useParams } from 'react-router'
import { NodeCharts } from './_components/NodeCharts'
import { NodeDetailsHeader } from './_components/NodeDetailsHeader'
import { NodeDevices } from './_components/NodeDevices'
import { NodeEvents } from './_components/NodeEvents'
import { NodeNetworks } from './_components/NodeNetworks'
import { NodeSummary } from './_components/NodeSummary'

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

  useSequentialInterval(getNodeDetails, 5000, {
    immediate: false,
  })

  if (!isLoading && !node) {
    // Node not found.
    return <Navigate to="/nodes" replace={true} />
  }

  return (
    <div className="flex flex-col gap-y-4 px-5 py-4">
      <NodeDetailsHeader node={node} />
      <NodeSummary node={node} />
      <NodeNetworks node={node} />
      <NodeDevices node={node} />
      <NodeCharts node={node} />
      <NodeEvents node={node} />
    </div>
  )
}
