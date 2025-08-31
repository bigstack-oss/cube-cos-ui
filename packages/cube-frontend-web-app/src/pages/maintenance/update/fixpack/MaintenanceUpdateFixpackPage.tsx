import {
  CosButton,
  CosGeneralPanel,
  CosPagination,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import InformationCircle from '@cube-frontend/ui-library/icons/monochrome/information_circle.svg?react'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import dayjs from 'dayjs'
import { useContext, useMemo } from 'react'
import { MaintenanceUpdateLayout } from '../_components/MaintenanceUpdateLayout'
import { ReleaseNotePanel } from '../_components/ReleaseNotePanel'
import { useReleaseNotePanel } from '../_components/useReleaseNotePanel'
import { InstallAction } from './actions/InstallAction'
import { RemoveAction } from './actions/RemoveAction'
import { RollbackAction } from './actions/RollbackAction'
import {
  computeFixpacksActionState,
  FixpackActionState,
} from './computeFixpacksActionState'
import { FixpackRow } from './listFixpacksUtils'
import { useListFixpacks } from './useListFixpacks'
import { useListFixpacksQuery } from './useListFixpacksQuery'

const FixpackTable = GetCosBasicTable<FixpackRow>()

export const MaintenanceUpdateFixpackPage = () => {
  const { dataCenter } = useContext(DataCenterContext)

  const { query, onPageChange, onItemsPerPageChange } = useListFixpacksQuery()

  const { showLoading, allFixpacks, pagedRows, totalItemCount } =
    useListFixpacks(query)

  const {
    rowForReleaseNote,
    isReleaseNotePanelOpen,
    showReleaseNoteFor,
    onReleaseNotePanelClose,
    toggleReleaseNotePanel,
  } = useReleaseNotePanel<FixpackRow>()

  const fixpacksActionStates = useMemo<FixpackActionState[]>(
    () => computeFixpacksActionState(allFixpacks),
    [allFixpacks],
  )

  const formatUpdatedAt = (updatedAt: string): string => {
    if (!updatedAt) return ''
    return dayjs.respectTzOffset(updatedAt).format('YYYY/MM/DD')
  }

  const renderAction = (_row: FixpackRow, actionState: FixpackActionState) => {
    const { install, rollback, remove } = actionState

    return (
      <div className="flex items-center justify-between gap-x-2">
        {!!install && <InstallAction state={install} />}
        {!!rollback && <RollbackAction state={rollback} />}
        {!!remove && <RemoveAction state={remove} />}
      </div>
    )
  }

  return (
    <MaintenanceUpdateLayout
      currentVersion={dataCenter!.fixpack.version}
      lastUpdated={dataCenter!.fixpack.updatedAt}
    >
      <div className="flex items-start gap-x-4">
        <CosGeneralPanel
          containerClassName="grow"
          topic="Fixpack List"
          dropdown={
            <div className="flex items-center gap-x-4">
              <CosButton disabled={showLoading}>Upload Fixpack</CosButton>
              <button
                type="button"
                className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full bg-primary-50"
                onClick={toggleReleaseNotePanel}
              >
                <InformationCircle className="icon-md text-functional-text" />
              </button>
            </div>
          }
        >
          <div className="flex flex-col gap-y-6">
            <FixpackTable
              rows={pagedRows}
              isLoading={showLoading}
              rowClassName="cursor-pointer"
              onRowClick={showReleaseNoteFor}
            >
              <FixpackTable.Column
                label="Fixpack"
                property="version"
                fitContent={true}
                emphasize={true}
              >
                {(version) => (
                  <div className="whitespace-nowrap">{version}</div>
                )}
              </FixpackTable.Column>
              <FixpackTable.Column
                label="Last Updated"
                property="updatedAt"
                fitContent={true}
              >
                {formatUpdatedAt}
              </FixpackTable.Column>
              <FixpackTable.Column label="Note" property="note" />
              <FixpackTable.Column
                fitContent={true}
                skeletonVariant="icon-right"
              >
                {(_, row, index) => {
                  const actionState = fixpacksActionStates[index]
                  return (
                    !!actionState &&
                    renderAction(row, fixpacksActionStates[index])
                  )
                }}
              </FixpackTable.Column>
            </FixpackTable>
            <CosPagination
              isLoading={showLoading}
              totalItems={totalItemCount}
              currentPage={query.page}
              itemsPerPage={query.pageSize}
              onPageChange={onPageChange}
              onItemsPerPageChange={onItemsPerPageChange}
            />
          </div>
        </CosGeneralPanel>
        <ReleaseNotePanel
          isOpen={isReleaseNotePanelOpen}
          fallbackTitle="Fixpack Version"
          version={rowForReleaseNote?.version}
          releaseNote={rowForReleaseNote?.details}
          onClose={onReleaseNotePanelClose}
        />
      </div>
    </MaintenanceUpdateLayout>
  )
}
