import { ChangeEvent, useContext, useEffect, useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import {
  FixpacksApiListFixpackUpdatableNodesRequest,
  ListFixpackUpdatableNodesResponseDataInner,
} from '@cube-frontend/api'
import {
  CosCheckbox,
  CosTableRow,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import { fixpacksApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { formatUpdatedAt } from '../_components/fixpackUpdateUtils'
import { FixpackRow } from '../listFixpacksUtils'

type FixpackInstallableNodesViewProps = {
  fixpack: FixpackRow
  selectedNodes: string[]
  onSelectedNodesChange: (nodes: string[]) => void
  isRollbackDisclaimerRead: boolean
  isRollbackDisclaimerDisabled: boolean
  onRollbackDisclaimerReadChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const InstallableNodeTable = GetCosBasicTable<InstallableNodeRow>()

type InstallableNodeRow = CosTableRow &
  ListFixpackUpdatableNodesResponseDataInner

const nodeToTableRow = (
  node: ListFixpackUpdatableNodesResponseDataInner,
): InstallableNodeRow => ({
  ...node,
  id: node.name,
})

export const FixpackInstallableNodesView = (
  props: FixpackInstallableNodesViewProps,
) => {
  const {
    fixpack,
    selectedNodes,
    onSelectedNodesChange,
    isRollbackDisclaimerRead,
    isRollbackDisclaimerDisabled,
    onRollbackDisclaimerReadChange,
  } = props

  const { dataCenter } = useContext(DataCenterContext)

  const { isLoading, data: updatableNodes } = useCosGetRequest(
    fixpacksApi.listFixpackUpdatableNodes,
    (): FixpacksApiListFixpackUpdatableNodesRequest => ({
      dataCenter: dataCenter!.name,
      version: fixpack.version,
    }),
  )

  const rows = useMemo<InstallableNodeRow[]>(
    () => (updatableNodes ?? []).map(nodeToTableRow),
    [updatableNodes],
  )

  // Pre-select the nodes that don't have this fixpack yet.
  useEffect(() => {
    if (!updatableNodes) return
    onSelectedNodesChange(
      updatableNodes.filter((n) => !n.installed).map((n) => n.name),
    )
  }, [updatableNodes, onSelectedNodesChange])

  const toggleNode = (name: string, checked: boolean): void => {
    onSelectedNodesChange(
      checked
        ? [...selectedNodes, name]
        : selectedNodes.filter((n) => n !== name),
    )
  }

  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-y-5">
      <div className="primary-body2 text-functional-text">
        <Trans
          i18nKey="maintenance.update.fixpack.installModal.topMessage.confirmInstall"
          values={{ fixpack: fixpack.display }}
          components={{ b: <b className="font-semibold" /> }}
        />
      </div>
      <InstallableNodeTable isLoading={isLoading} rows={rows}>
        <InstallableNodeTable.Column fitContent={true}>
          {(_, row) => (
            <CosCheckbox
              aria-label={row.name}
              checked={selectedNodes.includes(row.name)}
              disabled={row.installed}
              onChange={(e) => toggleNode(row.name, e.target.checked)}
            />
          )}
        </InstallableNodeTable.Column>
        <InstallableNodeTable.Column
          label={t('maintenance.update.fixpack.installModal.host')}
          property="name"
        />
        <InstallableNodeTable.Column
          label={t('maintenance.update.fixpack.installModal.installStatus')}
          property="installed"
        >
          {(installed: boolean) =>
            installed
              ? t('maintenance.update.fixpack.installModal.installed')
              : t('maintenance.update.fixpack.installModal.notInstalled')
          }
        </InstallableNodeTable.Column>
        <InstallableNodeTable.Column
          label={t('maintenance.update.fixpack.installModal.lastUpdated')}
          property="updatedAt"
        >
          {formatUpdatedAt}
        </InstallableNodeTable.Column>
        <InstallableNodeTable.Column
          label={t('maintenance.update.fixpack.installModal.firmwareVersion')}
          property="version"
        />
      </InstallableNodeTable>
      {!fixpack.status.isRollbackable && (
        <CosCheckbox
          labelClassName="max-w-none"
          label={t(
            'maintenance.update.fixpack.installModal.rollbackDisclaimer',
          )}
          checked={isRollbackDisclaimerRead}
          disabled={isRollbackDisclaimerDisabled}
          onChange={onRollbackDisclaimerReadChange}
        />
      )}
    </div>
  )
}
