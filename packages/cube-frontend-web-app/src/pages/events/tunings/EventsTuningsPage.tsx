import {
  ListTuningResponseDataTuningsInnerHostsInner,
  ListTuningResponseDataTuningsInnerStatus,
} from '@cube-frontend/api'
import {
  CosButton,
  CosHyperlink,
  CosInlineNotification,
  CosLoadingSpinner,
  CosModal,
  CosPagination,
  CosStroke,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import Plus from '@cube-frontend/ui-library/icons/monochrome/plus.svg?react'
import dayjs from 'dayjs'
import { Link } from 'react-router'
import { ActionCell } from './_components/tableCells/ActionCell'
import { TuningsFilter } from './TuningsFilter'
import { joinHostNames, maxHostsDisplayCount, TuningRow } from './tuningsUtils'
import { useResetTuningModal } from './uesResetTuningModal'
import { useListTuningsQuery } from './useListTuningsQuery'
import { useOperationErrors } from '@cube-frontend/web-app/hooks/useOperationErrors/useOperationErrors'
import { useTuningHostsModal } from './useTuningHostsModal'
import { useTuningRows } from './useTuningRows'

const TuningTable = GetCosBasicTable<TuningRow>()

export const EventsTuningsPage = () => {
  const {
    query,
    onKeywordChange,
    onKeywordClear,
    onModifyStatusItemClick,
    onNodeItemClick,
    onNodesAllCheckChange,
    onPageChange,
    onItemsPerPageChange,
  } = useListTuningsQuery()

  const { operationErrors, onOperationErrorOccur, onOperationErrorClose } =
    useOperationErrors()

  const {
    isLoading,
    rows,
    page,
    hasModifiedTuning,
    onToggleChange,
    resetTuning,
  } = useTuningRows(query, onOperationErrorOccur)

  const {
    isHostsModalOpen,
    rowForHostModal,
    onShowHostsClick,
    onHostsModalClose,
  } = useTuningHostsModal(rows)

  const renderHosts = (
    hosts: ListTuningResponseDataTuningsInnerHostsInner[],
    row: TuningRow,
  ) => {
    const previewHosts = joinHostNames(hosts.slice(0, maxHostsDisplayCount))
    if (hosts.length > maxHostsDisplayCount) {
      return (
        <>
          {`${previewHosts},`}
          <CosHyperlink
            variant="text-only"
            onClick={() => onShowHostsClick(row)}
          >
            [...]
          </CosHyperlink>
        </>
      )
    }
    return previewHosts
  }

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
    <div
      className="flex flex-col gap-y-6 rounded-[5px] bg-grey-0 px-6 py-4"
      style={{
        boxShadow: '0px 0px 3px 0px rgba(0, 0, 0, 0.10)',
      }}
    >
      <div className="flex flex-col gap-y-4">
        <h4 className="secondary-h4">Tunings</h4>
        <Link className="self-start" to="/events/tunings/create">
          <CosButton usage="icon-left" Icon={Plus}>
            Create Tuning
          </CosButton>
        </Link>
      </div>
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
        onModifyStatusItemClick={onModifyStatusItemClick}
        onNodeItemClick={onNodeItemClick}
        onNodesAllCheckChange={onNodesAllCheckChange}
      />
      <TuningTable isLoading={isLoading} rows={rows}>
        <TuningTable.Column
          property="name"
          label="Name (Keys)"
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
        <TuningTable.Column property="hosts" label="Hosts">
          {renderHosts}
        </TuningTable.Column>
        <TuningTable.Column property="status" label="Update Time">
          {renderUpdateTime}
        </TuningTable.Column>
        <TuningTable.Column property="description" label="Description" />
        <TuningTable.Column property="value" label="Value" />
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
      <CosModal
        title="Hosts"
        size="sm"
        isOpen={isHostsModalOpen}
        isActionButtonVisible={false}
        onCloseClick={onHostsModalClose}
      >
        <div className="primary-body4 text-functional-text">
          {joinHostNames(rowForHostModal?.hosts)}
        </div>
      </CosModal>
      <CosModal
        title="Reset Tuning"
        size="sm"
        isOpen={isResetModalOpen}
        actionText="Reset"
        onActionClick={onConfirmReset}
        onCloseClick={onCloseResetModal}
      >
        <div className="primary-body4 text-functional-text">
          Are you sure you want to reset this tuning to default?
        </div>
      </CosModal>
    </div>
  )
}
