import { useContext, useState } from 'react'
import { Link } from 'react-router'
import { Dayjs } from 'dayjs'
import { noop } from 'lodash'
import {
  GetNodesRolesEnum,
  SupportFilesApiGetSupportFilesRequest,
  SupportFileSet,
} from '@cube-frontend/api'
import {
  CosGeneralPanel,
  CosHyperlink,
  CosPagination,
  CosStroke,
  CosTableRow,
  DEFAULT_ITEMS_PER_PAGE,
} from '@cube-frontend/ui-library'
import ChevronRight from '@cube-frontend/ui-library/icons/monochrome/chevron_right.svg?react'
import { supportFilesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useDebounce } from '@cube-frontend/web-app/hooks/useDebounce'
import { SupportFilesFilters } from './_components/SupportFilesFilters'
import { DownloadSupportFilesModal } from './_components/DownloadSupportFilesModal'
import { SupportFilesTable } from './_components/SupportFilesTable'

export type SupportFileRow = SupportFileSet & CosTableRow

export const MaintenanceSupportFilesPage = () => {
  const { dataCenter } = useContext(DataCenterContext)

  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [selectedRoles, setSelectedRoles] = useState<GetNodesRolesEnum[]>([])
  const [startDate, setStartDate] = useState<Dayjs>()
  const [endDate, setEndDate] = useState<Dayjs>()
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_ITEMS_PER_PAGE)

  const [debouncedSearchKeyword, setDebounceSearchKeyword] = useDebounce(
    searchKeyword,
    300,
  )

  const { data: supportFilesData, isLoading } = useCosGetRequest(
    supportFilesApi.getSupportFiles,
    () => {
      return {
        dataCenter: dataCenter!.name,
        pageNum,
        pageSize,
        keyword: debouncedSearchKeyword,
        start: startDate?.format(),
        stop: endDate?.format(),
        roles: selectedRoles,
      } satisfies SupportFilesApiGetSupportFilesRequest
    },
  )

  const handleSearchKeywordClear = () => {
    setSearchKeyword('')
    setDebounceSearchKeyword('')
  }

  const rows: SupportFileRow[] =
    supportFilesData?.supportFileSet.map((supportFileSet) => ({
      ...supportFileSet,
      id: supportFileSet.name,
    })) || []

  const [downloadTarget, setDownloadTarget] = useState<SupportFileRow>()
  const isDownloadModalOpen = downloadTarget !== undefined

  const onCloseClick = () => {
    setDownloadTarget(undefined)
  }

  return (
    <>
      <CosGeneralPanel topic="Support Files">
        <div className="flex flex-col gap-y-6">
          <Link className="w-fit" to="/nodes">
            <CosHyperlink
              variant="icon-right"
              Icon={ChevronRight}
              onClick={noop}
            >
              Go to create Support files
            </CosHyperlink>
          </Link>
          <CosStroke type="dot" />
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-2">
              <h5 className="primary-h5 text-functional-text">Support Files</h5>
              <SupportFilesFilters
                searchKeyword={searchKeyword}
                handleSearchKeywordChange={setSearchKeyword}
                handleSearchKeywordClear={handleSearchKeywordClear}
                selectedRoles={selectedRoles}
                handleRolesSelect={setSelectedRoles}
                startDate={startDate}
                endDate={endDate}
                handleStartDateChange={setStartDate}
                handleEndDateChange={setEndDate}
              />
              <SupportFilesTable
                rows={rows}
                isLoading={isLoading}
                skeletonRowCount={pageSize}
                onDownloadClick={setDownloadTarget}
              />
            </div>
            <CosPagination
              isLoading={isLoading}
              totalItems={supportFilesData?.page.totalItemCount ?? 0}
              currentPage={pageNum}
              itemsPerPage={pageSize}
              onPageChange={setPageNum}
              onItemsPerPageChange={setPageSize}
            />
          </div>
        </div>
      </CosGeneralPanel>
      {downloadTarget && (
        <DownloadSupportFilesModal
          isOpen={isDownloadModalOpen}
          supportFiles={downloadTarget}
          onCloseClick={onCloseClick}
        />
      )}
    </>
  )
}
