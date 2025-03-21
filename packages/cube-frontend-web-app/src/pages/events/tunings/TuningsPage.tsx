import { ListTuningResponseDataTuningsInnerStatus } from '@cube-frontend/api'
import {
  CosButton,
  CosHyperlink,
  CosLoadingSpinner,
  CosModal,
  CosPagination,
  CosStroke,
  GetCosBasicTable,
  useCosPagination,
} from '@cube-frontend/ui-library'
import Plus from '@cube-frontend/ui-library/icons/monochrome/plus.svg?react'
import dayjs from 'dayjs'
import { Link } from 'react-router'
import { ActionCell } from './tableCells/ActionCell'
import { TuningsFilter } from './TuningsFilter'
import { joinHosts, maxHostsDisplayCount, TuningRow } from './tuningsUtils'
import { useResetTuningModal } from './uesResetTuningModal'
import { useTuningHostsModal } from './useTuningHostsModal'
import { useTuningRows } from './useTuningRows'
import { useTuningFilters } from './useTuningsFilter'

const TuningTable = GetCosBasicTable<TuningRow>()

export const TuningsPage = () => {
  const {
    filter,
    onKeywordChange,
    onModifyStatusItemClick,
    onNodeItemClick,
    onNodesAllCheckChange,
  } = useTuningFilters()

  const { currentPage, itemsPerPage, onPageChange, onItemsPerPageChange } =
    useCosPagination()

  const { isLoading, rows, page, onToggleChange, resetTuning } = useTuningRows({
    filter,
    currentPage,
    itemsPerPage,
  })

  const {
    isHostsModalOpen,
    hostsForModal,
    onShowHostsClick,
    onHostsModalClose,
  } = useTuningHostsModal()

  const renderHosts = (hosts: string[], row: TuningRow) => {
    const previewHosts = joinHosts(hosts.slice(0, maxHostsDisplayCount))
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
      return undefined
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
      <CosStroke type="dot" />
      <TuningsFilter
        filter={filter}
        onKeywordChange={onKeywordChange}
        onModifyStatusItemClick={onModifyStatusItemClick}
        onNodeItemClick={onNodeItemClick}
        onNodesAllCheckChange={onNodesAllCheckChange}
      />
      <TuningTable isLoading={isLoading} rows={rows}>
        <TuningTable.Column property="name" label="Name (Keys)">
          {(name, row) => (
            <div className="flex gap-x-2">
              <span className="font-semibold">{name}</span>
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
              onToggleChange={(enabled) => onToggleChange(row.id, enabled)}
              onResetClick={() => onResetClick(row.id)}
            />
          )}
        </TuningTable.Column>
      </TuningTable>
      <CosPagination
        totalItems={page?.totalItemCount ?? 0}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
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
        {joinHosts(hostsForModal)}
      </CosModal>
      <CosModal
        title="Reset Tuning"
        size="sm"
        isOpen={isResetModalOpen}
        actionText="Reset"
        onActionClick={onConfirmReset}
        onCloseClick={onCloseResetModal}
      >
        Are you sure you want to reset this tuning to default?
      </CosModal>
    </div>
  )
}
