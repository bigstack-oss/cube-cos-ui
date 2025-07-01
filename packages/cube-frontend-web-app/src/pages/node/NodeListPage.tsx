import { useContext, useEffect, useMemo, useState } from 'react'
import { uniqueId } from 'lodash'
import { Node, NodesApiGetNodesRequest } from '@cube-frontend/api'
import {
  CosButton,
  CosGeneralPanel,
  CosPagination,
} from '@cube-frontend/ui-library'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { useDebounce } from '@cube-frontend/web-app/hooks/useDebounce'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { NodeTable } from './_components/NodeTable'
import { NodeFilters } from './_components/NodeFilters'
import { CreateSupportFilesModal } from './_components/CreateSupportFilesModal'
import { useCreateSupportFilesModal } from './_components/useCreateSupportFilesModal'
import { useNodeListQuery } from './_components/useNodeListQuery'
import { canCreateSupportFile } from '@cube-frontend/web-app/utils/node'

export const NodeListPage = () => {
  const { dataCenter } = useContext(DataCenterContext)

  const {
    query,
    onKeywordChange,
    onRolesChange,
    onPageChange,
    onItemsPerPageChange,
  } = useNodeListQuery()

  const [debouncedKeyword, setDebounceKeyword] = useDebounce(query.keyword, 300)

  const onSearchKeywordClear = () => {
    onKeywordChange('')
    setDebounceKeyword('')
  }

  const { data: nodesData, isLoading } = useCosGetRequest(
    nodesApi.getNodes,
    () => {
      return {
        dataCenter: dataCenter!.name,
        keyword: debouncedKeyword,
        roles: query.roles,
        pageNum: query.currentPage,
        pageSize: query.itemsPerPage,
      } satisfies NodesApiGetNodesRequest
    },
  )

  const rows = useMemo<Node[]>(() => {
    const nodes = nodesData?.nodes ?? []
    return nodes.map((node) => ({
      ...node,
      // Adjust `id` because `id` will be an empty string when the node is in `down` status.
      id: node.id || uniqueId('node'),
    }))
  }, [nodesData?.nodes])

  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([])

  const selectedNodes = useMemo<Node[]>(() => {
    if (!nodesData) return []
    const selectedNodeIdSet = new Set(selectedNodeIds)
    return nodesData.nodes.filter((node) => selectedNodeIdSet.has(node.id))
  }, [nodesData, selectedNodeIds])

  const disabledRowIds = useMemo<string[]>(() => {
    return rows.filter((row) => !canCreateSupportFile(row)).map((row) => row.id)
  }, [rows])

  const handleRowCheckChange = (nodeId: string, checked: boolean) => {
    setSelectedNodeIds((prev) => {
      if (checked) {
        return [...prev, nodeId]
      }
      return prev.filter((id) => id !== nodeId)
    })
  }

  useEffect(() => {
    setSelectedNodeIds([])
  }, [nodesData])

  const {
    isCreateSupportFilesModalOpen,
    comments,
    onCommentsChange,
    openCreateSupportFilesModal,
    closeCreateSupportFilesModal,
  } = useCreateSupportFilesModal()

  return (
    <>
      <CosGeneralPanel topic="Nodes">
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center justify-between">
            <NodeFilters
              keyword={query.keyword}
              handleKeywordChange={onKeywordChange}
              handleKeywordClear={onSearchKeywordClear}
              roles={query.roles}
              handleRolesSelect={onRolesChange}
            />
            <CosButton
              onClick={openCreateSupportFilesModal}
              disabled={selectedNodes.length === 0}
            >
              Create support files
            </CosButton>
          </div>
          <NodeTable
            rows={rows}
            isLoading={isLoading}
            disabledRowIds={disabledRowIds}
            skeletonRowCount={query.itemsPerPage}
            selectedRowIds={selectedNodeIds}
            showHeaderCheckbox={false}
            onCheckChange={handleRowCheckChange}
          />
          <CosPagination
            isLoading={isLoading}
            totalItems={nodesData?.page.totalItemCount ?? 0}
            currentPage={query.currentPage}
            itemsPerPage={query.itemsPerPage}
            onPageChange={onPageChange}
            onItemsPerPageChange={onItemsPerPageChange}
          />
        </div>
      </CosGeneralPanel>
      <CreateSupportFilesModal
        isOpen={isCreateSupportFilesModalOpen}
        selectedNodes={selectedNodes}
        comments={comments}
        onCommentsChange={onCommentsChange}
        onCloseClick={closeCreateSupportFilesModal}
        onSuccess={() => setSelectedNodeIds([])}
      />
    </>
  )
}
