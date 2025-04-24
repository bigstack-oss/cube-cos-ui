import { useEffect, useMemo, useState } from 'react'
import { GetNodesResponseData, Node } from '@cube-frontend/api'

export const useNodeSelection = (
  nodesData: GetNodesResponseData | undefined,
) => {
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([])

  const selectedNodes = useMemo<Node[]>(() => {
    if (!nodesData) return []
    const selectedNodeIdSet = new Set(selectedNodeIds)
    return nodesData.nodes.filter((node) => selectedNodeIdSet.has(node.id))
  }, [nodesData, selectedNodeIds])

  useEffect(() => {
    setSelectedNodeIds([])
  }, [nodesData])

  const handleRowCheckChange = (nodeId: string, checked: boolean) => {
    setSelectedNodeIds((prev) => {
      if (checked) {
        return [...prev, nodeId]
      }
      return prev.filter((id) => id !== nodeId)
    })
  }

  const handleAllCheckChange = (checked: boolean) => {
    if (checked) {
      const allNodeIds = nodesData?.nodes.map((node) => node.id) || []
      setSelectedNodeIds(allNodeIds)
    } else {
      setSelectedNodeIds([])
    }
  }

  return {
    selectedNodeIds,
    selectedNodes,
    handleRowCheckChange,
    handleAllCheckChange,
  }
}
