import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { ListTuningResponseDataTuningsInnerStatus } from '@cube-frontend/api'
import {
  CosButton,
  CosGeneralPanel,
  CosInlineNotification,
  CosLoadingSpinner,
  CosModal,
  CosPagination,
  CosStroke,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import Plus from '@cube-frontend/ui-library/icons/monochrome/plus.svg?react'
import { HostListModal } from '@cube-frontend/web-app/components/HostPreviewTableCell/HostListModal'
import { HostPreviewTableCell } from '@cube-frontend/web-app/components/HostPreviewTableCell/HostPreviewTableCell'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { useOperationErrors } from '@cube-frontend/web-app/hooks/useOperationErrors/useOperationErrors'
import { ActionCell } from './_components/tableCells/ActionCell'
import { TuningsFilter } from './TuningsFilter'
import { TuningRow } from './tuningsUtils'
import { useResetTuningModal } from './uesResetTuningModal'
import { useListTuningsQuery } from './useListTuningsQuery'
import { useTuningHostsModal } from './useTuningHostsModal'
import { useTuningRows } from './useTuningRows'

const TuningTable = GetCosBasicTable<TuningRow>()

export const MaintenanceTuningsPage = () => {
  const { t } = useTranslation()

  const {
    query,
    keywordDebouncedQuery,
    onKeywordChange,
    onKeywordClear,
    onModifiedItemClick,
    onModifiedAllCheckChange,
    onNodeItemClick,
    onNodesAllCheckChange,
    onPageChange,
    onItemsPerPageChange,
  } = useListTuningsQuery()

  const { operationErrors, onOperationErrorOccur, onOperationErrorClose } =
    useOperationErrors()

  const {
    showLoading,
    rows,
    page,
    hasModifiedTuning,
    onToggleChange,
    resetTuning,
  } = useTuningRows(keywordDebouncedQuery, onOperationErrorOccur)

  const {
    isHostsModalOpen,
    rowForHostModal,
    onShowHostsClick,
    onHostsModalClose,
  } = useTuningHostsModal(rows)

  const renderUpdateTime = (
    status: ListTuningResponseDataTuningsInnerStatus,
  ) => {
    const { updatedAt } = status
    if (!updatedAt) {
      return <span className="text-functional-text-light">Never</span>
    }
    return dayjs.respectTzOffset(updatedAt).format('YYYY/MM/DD')
  }

  const { isResetModalOpen, toBeResetRowId, onResetClick, onCloseResetModal } =
    useResetTuningModal()

  const onConfirmReset = async (): Promise<void> => {
    if (toBeResetRowId) {
      onCloseResetModal()
      await resetTuning(toBeResetRowId)
    }
  }

  return (
    <CosGeneralPanel topic={t('maintenance.tunings.title')}>
      <div className="flex flex-col gap-y-6">
        <Link
          className="self-start"
          to={CosRoutesEnum.MAINTENANCE_TUNINGS_CREATE_PAGE}
        >
          <CosButton usage="icon-left" Icon={Plus}>
            {t('maintenance.tunings.createTuning')}
          </CosButton>
        </Link>
        {operationErrors.map((error, index) => (
          <CosInlineNotification
            key={error.id}
            type="error"
            onClose={() => onOperationErrorClose(index)}
          >
            {error.message}
          </CosInlineNotification>
        ))}
        <CosStroke type="dot" />
        <TuningsFilter
          query={query}
          onKeywordChange={onKeywordChange}
          onKeywordClear={onKeywordClear}
          onModifiedItemClick={onModifiedItemClick}
          onModifiedAllCheckChange={onModifiedAllCheckChange}
          onNodeItemClick={onNodeItemClick}
          onNodesAllCheckChange={onNodesAllCheckChange}
        />
        <TuningTable isLoading={showLoading} rows={rows}>
          <TuningTable.Column
            property="name"
            label={t('maintenance.tunings.nameKeys')}
            emphasize={true}
          >
            {(name, row) => (
              <div className="flex gap-x-2">
                <span>{name}</span>
                {row.status.isUpdating && (
                  <CosLoadingSpinner className="ml-2" variant="dot45" />
                )}
              </div>
            )}
          </TuningTable.Column>
          <TuningTable.Column
            property="hosts"
            label={t('maintenance.tunings.hosts')}
          >
            {(hosts, row) => (
              <HostPreviewTableCell
                hostNames={hosts.map((h) => h.name)}
                onShowAllClick={() => onShowHostsClick(row)}
              />
            )}
          </TuningTable.Column>
          <TuningTable.Column
            property="status"
            label={t('maintenance.tunings.updateTime')}
          >
            {renderUpdateTime}
          </TuningTable.Column>
          <TuningTable.Column
            property="description"
            label={t('maintenance.tunings.description')}
          />
          <TuningTable.Column
            property="value"
            label={t('maintenance.tunings.value')}
          />
          <TuningTable.Column>
            {(_, row) => (
              <ActionCell
                row={row}
                saveSpaceForResetButton={rows.length === 1 || hasModifiedTuning}
                onToggleChange={(enabled) => onToggleChange(row.id, enabled)}
                onResetClick={() => onResetClick(row.id)}
              />
            )}
          </TuningTable.Column>
        </TuningTable>
        <CosPagination
          totalItems={page?.totalItemCount ?? 0}
          currentPage={query.currentPage}
          itemsPerPage={query.itemsPerPage}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
        />
        <HostListModal
          isOpen={isHostsModalOpen}
          hostNames={rowForHostModal?.hosts.map((h) => h.name) ?? []}
          onCloseClick={onHostsModalClose}
        />
        <CosModal
          title={t('maintenance.tunings.resetTuningModal.title')}
          size="sm"
          isOpen={isResetModalOpen}
          actionText={t('maintenance.tunings.resetTuningModal.reset')}
          onActionClick={onConfirmReset}
          onCloseClick={onCloseResetModal}
        >
          <div className="primary-body2 text-functional-text">
            {t('maintenance.tunings.resetTuningModal.resetConfirmation')}
          </div>
        </CosModal>
      </div>
    </CosGeneralPanel>
  )
}
