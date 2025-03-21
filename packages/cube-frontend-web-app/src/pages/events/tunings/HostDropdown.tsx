import { Node, NodesApiGetNodesRequest } from '@cube-frontend/api'
import { CosDropdown } from '@cube-frontend/ui-library'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { ChangeEvent, useContext, useMemo, useState } from 'react'
import { joinHosts } from './tuningsUtils'

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

  const { name: dataCenter } = useContext(DataCenterContext)

  const [searchValue, setSearchValue] = useState('')

  const { isLoading, data: getNodesData } = useCosGetRequest(
    nodesApi.getNodes,
    (): NodesApiGetNodesRequest => ({
      dataCenter,
    }),
  )

  const matchedHosts = useMemo<Node[]>(() => {
    const { nodes } = getNodesData ?? {}
    if (!nodes) {
      return []
    }

    if (!searchValue) {
      return nodes
    }

    const loweredValue = searchValue.toLowerCase()
    return nodes.filter((node) =>
      node.hostname.toLowerCase().includes(loweredValue),
    )
  }, [getNodesData, searchValue])

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

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value)
  }

  const onClearClick = (): void => {
    onAllCheckChangeProp([])
  }

  return (
    <CosDropdown
      type="search-checkbox"
      isLoading={isLoading}
      selectedItems={selectedHosts}
      searchValue={searchValue}
      onAllCheckChange={onAllCheckChange}
      onSearchChange={onSearchChange}
      onClearClick={onClearClick}
    >
      <CosDropdown.Trigger className="h-[34px] w-32" placeholder="Hosts">
        {joinHosts(selectedHosts)}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {matchedHosts.map((node) => (
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
