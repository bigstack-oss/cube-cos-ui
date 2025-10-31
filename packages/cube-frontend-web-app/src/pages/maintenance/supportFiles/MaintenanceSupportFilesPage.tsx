import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { noop } from 'lodash'
import { SupportFileSet } from '@cube-frontend/api'
import {
  CosGeneralPanel,
  CosHyperlink,
  CosPagination,
  CosStroke,
  CosTableRow,
} from '@cube-frontend/ui-library'
import ChevronRight from '@cube-frontend/ui-library/icons/monochrome/chevron_right.svg?react'
import { SupportFilesFilters } from './_components/SupportFilesFilters'
import { DownloadSupportFilesModal } from './_components/DownloadSupportFilesModal'
import { SupportFilesTable } from './_components/SupportFilesTable'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { useSupportFileListQuery } from './_components/useSupportFileListQuery'
import { DeleteSupportFilesModal } from './_components/DeleteSupportFilesModal'
import { useSupportFilesTable } from './_components/useSupportFilesTable'

export type SupportFileRow = SupportFileSet & CosTableRow

export const MaintenanceSupportFilesPage = () => {
  const { t } = useTranslation()

  const {
    query,
    keywordDebouncedQuery,
    onKeywordChange,
    onKeywordClear,
    onRolesChange,
    onStartDateChange,
    onEndDateChange,
    onPageChange,
    onItemsPerPageChange,
  } = useSupportFileListQuery()

  const { rows, showLoading, supportFilesData, deleteModal, downloadModal } =
    useSupportFilesTable(keywordDebouncedQuery)

  return (
    <>
      <CosGeneralPanel topic={t('maintenance.supportFiles.title')}>
        <div className="flex flex-col gap-y-6">
          <Link className="w-fit" to={CosRoutesEnum.NODES_PAGE}>
            <CosHyperlink
              variant="icon-right"
              Icon={ChevronRight}
              onClick={noop}
            >
              {t('maintenance.supportFiles.gotoCreateSupportFiles')}
            </CosHyperlink>
          </Link>
          <CosStroke type="dot" />
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-2">
              <SupportFilesFilters
                keyword={query.keyword}
                handleSearchKeywordChange={onKeywordChange}
                handleSearchKeywordClear={onKeywordClear}
                roles={query.roles}
                handleRolesSelect={onRolesChange}
                startDate={query.startDate}
                endDate={query.endDate}
                handleStartDateChange={onStartDateChange}
                handleEndDateChange={onEndDateChange}
              />
              <SupportFilesTable
                rows={rows}
                isLoading={showLoading}
                skeletonRowCount={query.itemsPerPage}
                onDownloadClick={downloadModal.open}
                onDeleteClick={deleteModal.open}
              />
            </div>
            <CosPagination
              isLoading={showLoading}
              totalItems={supportFilesData?.page.totalItemCount ?? 0}
              currentPage={query.currentPage}
              itemsPerPage={query.itemsPerPage}
              onPageChange={onPageChange}
              onItemsPerPageChange={onItemsPerPageChange}
            />
          </div>
        </div>
      </CosGeneralPanel>
      <DeleteSupportFilesModal
        supportFiles={deleteModal.target}
        deleting={deleteModal.deleting}
        onActionClick={deleteModal.confirm}
        onCloseClick={deleteModal.close}
      />
      {downloadModal.target && (
        <DownloadSupportFilesModal
          isOpen={downloadModal.isOpen}
          supportFiles={downloadModal.target}
          onCloseClick={downloadModal.close}
        />
      )}
    </>
  )
}
