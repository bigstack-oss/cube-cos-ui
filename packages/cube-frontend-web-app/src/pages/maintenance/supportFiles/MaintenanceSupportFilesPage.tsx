import { useContext, useState } from 'react'
import { Link } from 'react-router'
import { noop } from 'lodash'
import {
  SupportFilesApiGetSupportFilesRequest,
  SupportFileSet,
} from '@cube-frontend/api'
import {
  CosGeneralPanel,
  CosHyperlink,
  CosPagination,
  CosStroke,
  CosTableRow,
} from '@cube-frontend/ui-library'
import ChevronRight from '@cube-frontend/ui-library/icons/monochrome/chevron_right.svg?react'
import { supportFilesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useDebounce } from '@cube-frontend/web-app/hooks/useDebounce'
import { SupportFilesFilters } from './_components/SupportFilesFilters'
import { DownloadSupportFilesModal } from './_components/DownloadSupportFilesModal'
import { SupportFilesTable } from './_components/SupportFilesTable'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { useSupportFileListQuery } from './_components/useSupportFileListQuery'

export type SupportFileRow = SupportFileSet & CosTableRow

export const MaintenanceSupportFilesPage = () => {
  const { dataCenter } = useContext(DataCenterContext)

  const {
    query,
    onKeywordChange,
    onRolesChange,
    onStartDateChange,
    onEndDateChange,
    onPageChange,
    onItemsPerPageChange,
  } = useSupportFileListQuery()

  const [debouncedSearchKeyword, setDebounceSearchKeyword] = useDebounce(
    query.keyword,
    300,
  )

  const onSearchKeywordClear = () => {
    onKeywordChange('')
    setDebounceSearchKeyword('')
  }

  const { data: supportFilesData, isLoading } = useCosGetRequest(
    supportFilesApi.getSupportFiles,
    () => {
      return {
        dataCenter: dataCenter!.name,
        pageNum: query.currentPage,
        pageSize: query.itemsPerPage,
        keyword: debouncedSearchKeyword,
        roles: query.roles,
        start: query.startDate?.format(),
        stop: query.endDate?.format(),
      } satisfies SupportFilesApiGetSupportFilesRequest
    },
  )
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
          <Link className="w-fit" to={CosRoutesEnum.NODES_PAGE}>
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
              <SupportFilesFilters
                keyword={query.keyword}
                handleSearchKeywordChange={onKeywordChange}
                handleSearchKeywordClear={onSearchKeywordClear}
                roles={query.roles}
                handleRolesSelect={onRolesChange}
                startDate={query.startDate}
                endDate={query.endDate}
                handleStartDateChange={onStartDateChange}
                handleEndDateChange={onEndDateChange}
              />
              <SupportFilesTable
                rows={rows}
                isLoading={isLoading}
                skeletonRowCount={query.itemsPerPage}
                onDownloadClick={setDownloadTarget}
              />
            </div>
            <CosPagination
              isLoading={isLoading}
              totalItems={supportFilesData?.page.totalItemCount ?? 0}
              currentPage={query.currentPage}
              itemsPerPage={query.itemsPerPage}
              onPageChange={onPageChange}
              onItemsPerPageChange={onItemsPerPageChange}
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
