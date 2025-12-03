import { ChangeEvent, useContext, useMemo } from 'react'
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
        <InstallableNodeTable.Column
          label={t('maintenance.update.fixpack.installModal.host')}
          property="name"
        />
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
