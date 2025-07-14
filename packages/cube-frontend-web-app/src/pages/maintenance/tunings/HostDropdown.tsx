import { Node, NodesApiGetNodesRequest } from '@cube-frontend/api'
import { CosDropdown } from '@cube-frontend/ui-library'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useContext } from 'react'

type HostDropdownProps = {
  selectedHosts: string[]
  onItemClick: (node: Node) => void
  onAllCheckChange: (nodes: Node[]) => void
}

export const HostDropdown = (props: HostDropdownProps) => {
  const {
    selectedHosts,
    onItemClick,
    onAllCheckChange: onAllCheckChangeProp,
  } = props

  const { dataCenter } = useContext(DataCenterContext)

  const { isLoading, data: getNodesData } = useCosGetRequest(
    nodesApi.getNodes,
    (): NodesApiGetNodesRequest => ({
      dataCenter: dataCenter!.name,
    }),
  )

  const { nodes = [] } = getNodesData ?? {}

  const onAllCheckChange = (checked: boolean): void => {
    if (!getNodesData) {
      return
    }
    if (checked) {
      onAllCheckChangeProp(getNodesData.nodes)
    } else {
      onAllCheckChangeProp([])
    }
  }

  const onClearSelection = (): void => {
    onAllCheckChangeProp([])
  }

  return (
    <CosDropdown
      size="sm"
      type="checkbox"
      variant="withFilter"
      isLoading={isLoading}
      skeletonClassName="w-36"
      selectedItems={selectedHosts}
      onAllCheckChange={onAllCheckChange}
      onClearSelection={onClearSelection}
    >
      <CosDropdown.Trigger className="w-36" placeholder="Hosts">
        {selectedHosts.length ? 'Hosts' : undefined}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {nodes.map((node) => (
          <CosDropdown.Item
            key={node.hostname}
            item={node.hostname}
            onClick={() => onItemClick(node)}
          >
            {node.hostname}
          </CosDropdown.Item>
        ))}
      </CosDropdown.Menu>
    </CosDropdown>
  )
}
