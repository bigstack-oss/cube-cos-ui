import { useContext, useEffect, useState } from 'react'
import {
  Node,
  NodesApiGetNodesRequest,
  SupportFilesApiCreateSupportFilesRequest,
} from '@cube-frontend/api'
import {
  CosButton,
  CosGeneralPanel,
  CosPagination,
  DEFAULT_ITEMS_PER_PAGE,
} from '@cube-frontend/ui-library'
import { CosApiResponse } from '@cube-frontend/web-app/hooks/useCosRequest/cosRequestUtils'
import { nodesApi, supportFilesApi } from '@cube-frontend/web-app/api/cosApi'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { useDebounce } from '@cube-frontend/web-app/hooks/useDebounce'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { Role } from '@cube-frontend/web-app/utils/role'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { NodeTable } from '@cube-frontend/web-app/components/NodeTable/NodeTable'
import { NodeFilters } from './_components/NodeFilters'
import { CreateSupportFilesModal } from './_components/CreateSupportFilesModal'

export const NodeListPage = () => {
  const dataCenter = useContext(DataCenterContext)

  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([])
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
        dataCenter: dataCenter.name,
        pageNum,
        pageSize,

        // TODO: add keyword search and roles filter.
        // @ts-expect-error: the API not supported yet.
        roles: selectedRoles,
        keyword: debouncedSearchKeyword,
      } satisfies NodesApiGetNodesRequest
    },
  )

  const handleSearchKeywordClear = () => {
    setSearchKeyword('')
    setDebounceSearchKeyword('')
  }

  const {
    isLoading: isCreatingSupportFiles,
    mutateResource: createSupportFiles,
  } = useCosMutationRequest(
    supportFilesApi.createSupportFiles as (
      params: SupportFilesApiCreateSupportFilesRequest,
    ) => Promise<CosApiResponse<undefined>>,
  )

  const [isCreateSupportFilesModalOpen, setIsCreateSupportFilesModalOpen] =
    useState(false)
  const [selectedNodes, setSelectedNodes] = useState<Node[]>([])
  const [comments, setComments] = useState('')

  useEffect(() => {
    setSelectedNodes(nodesData?.nodes || [])
  }, [nodesData])

  const handleCreateSupportFilesButtonClick = () => {
    setComments('')
    setIsCreateSupportFilesModalOpen(true)
  }

  const handleConfirmCreateSupportFiles = async () => {
    try {
      await createSupportFiles({
        dataCenter: dataCenter.name,
        createSupportFilesRequest: {
          description: comments,
          hosts: selectedNodes.map((node) => node.hostname),
        },
      })
    } catch (error) {
      console.error('Create support files error: ', error)
    } finally {
      setIsCreateSupportFilesModalOpen(false)
      setSelectedNodes([])
    }
  }

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
              onClick={handleCreateSupportFilesButtonClick}
              disabled={selectedNodes.length === 0}
            >
              Create support files
            </CosButton>
          </div>
          <NodeTable
            rows={nodesData?.nodes || []}
            isLoading={isLoading}
            skeletonRowCount={pageSize}
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
        isCreating={isCreatingSupportFiles}
        selectedNodes={selectedNodes}
        comments={comments}
        onCommentsChange={setComments}
        onCreateClick={handleConfirmCreateSupportFiles}
        onCloseClick={() => setIsCreateSupportFilesModalOpen(false)}
      />
    </>
  )
}
