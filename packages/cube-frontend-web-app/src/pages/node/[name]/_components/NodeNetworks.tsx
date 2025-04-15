import { Node, NodeNetworkInterfacesInner } from '@cube-frontend/api'
import { CosTableRow, GetCosBasicTable } from '@cube-frontend/ui-library'
import { Panel } from './Panel'

type NodeNetworksProps = {
  node: Node | undefined
}

type NetworkRow = CosTableRow & NodeNetworkInterfacesInner

const NetworkTable = GetCosBasicTable<NetworkRow>()

export const NodeNetworks = (props: NodeNetworksProps) => {
  const { node } = props

  const getNetworkRows = (): NetworkRow[] => {
    const networks = node?.networkInterfaces ?? []
    return networks.map((network) => ({
      id: network.busIdSlaves,
      ...network,
    }))
  }

  return (
    <Panel className="gap-y-2">
      <div className="primary-body3 text-functional-text">Network</div>
      <NetworkTable isLoading={!node} rows={getNetworkRows()}>
        <NetworkTable.Column label="Label" property="label" emphasize={true} />
        <NetworkTable.Column label="BusID/Slaves" property="busIdSlaves" />
        <NetworkTable.Column label="Driver" property="driver" />
        <NetworkTable.Column label="State" property="state" />
        <NetworkTable.Column label="Speed" property="speed" />
      </NetworkTable>
    </Panel>
  )
}
