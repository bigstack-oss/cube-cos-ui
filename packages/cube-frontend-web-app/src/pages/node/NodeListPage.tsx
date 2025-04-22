import { useContext, useMemo, useState } from 'react'
import {
  GetNodesRolesEnum,
  Node,
  NodesApiGetNodesRequest,
} from '@cube-frontend/api'
import {
  CosButton,
  CosGeneralPanel,
  CosPagination,
  DEFAULT_ITEMS_PER_PAGE,
} from '@cube-frontend/ui-library'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { useDebounce } from '@cube-frontend/web-app/hooks/useDebounce'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { NodeTable } from './_components/NodeTable'
import { NodeFilters } from './_components/NodeFilters'
import { CreateSupportFilesModal } from './_components/CreateSupportFilesModal'
import { useCreateSupportFilesModal } from './_components/useCreateSupportFilesModal'

export const NodeListPage = () => {
  const { dataCenter } = useContext(DataCenterContext)

  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedRoles, setSelectedRoles] = useState<GetNodesRolesEnum[]>([])
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_ITEMS_PER_PAGE)

  const [debouncedSearchKeyword, setDebounceSearchKeyword] = useDebounce(
    searchKeyword,
    300,
  )

  const { data: nodesData, isLoading } = useCosGetRequest(
    nodesApi.getNodes,
    () => {
      return {
        dataCenter: dataCenter!.name,
        pageNum,
        pageSize,
        roles: selectedRoles,
        keyword: debouncedSearchKeyword,
      } satisfies NodesApiGetNodesRequest
    },
  )

  const handleSearchKeywordClear = () => {
    setSearchKeyword('')
    setDebounceSearchKeyword('')
  }

  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([])

  const selectedNodes = useMemo<Node[]>(() => {
    if (!nodesData) return []
    const selectedNodeIdSet = new Set(selectedNodeIds)
    return nodesData.nodes.filter((node) => selectedNodeIdSet.has(node.id))
  }, [nodesData, selectedNodeIds])

  const handleRowCheckChange = (nodeId: string, checked: boolean) => {
    setSelectedNodeIds((prev) => {
      if (checked) {
        return [...prev, nodeId]
      }
      return prev.filter((id) => id !== nodeId)
    })
  }

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
              searchKeyword={searchKeyword}
              handleSearchKeywordChange={setSearchKeyword}
              handleSearchKeywordClear={handleSearchKeywordClear}
              selectedRoles={selectedRoles}
              handleRolesSelect={setSelectedRoles}
            />
            <CosButton
              onClick={openCreateSupportFilesModal}
              disabled={selectedNodes.length === 0}
            >
              Create support files
            </CosButton>
          </div>
          <NodeTable
            rows={nodesData?.nodes || []}
            isLoading={isLoading}
            skeletonRowCount={pageSize}
            selectedRowIds={selectedNodeIds}
            showHeaderCheckbox={false}
            onCheckChange={handleRowCheckChange}
          />
          <CosPagination
            isLoading={isLoading}
            totalItems={nodesData?.page.totalItemCount ?? 0}
            currentPage={pageNum}
            itemsPerPage={pageSize}
            onPageChange={setPageNum}
            onItemsPerPageChange={setPageSize}
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
