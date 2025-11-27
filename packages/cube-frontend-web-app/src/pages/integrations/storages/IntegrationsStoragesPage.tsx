import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { upperFirst } from 'lodash'
import {
  CosButton,
  CosGeneralPanel,
  CosIconText,
  CosLoadingSpinner,
  CosTooltip,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import { StorageRowActions } from './_components/StorageRowActions'
import { StorageTableActions } from './_components/StorageTableActions'
import { useStorageTable } from './_components/useStorageTable'
import CheckmarkCircleFill from '@cube-frontend/ui-library/icons/monochrome/checkmark_circle_fill.svg?react'
import CrossFill from '@cube-frontend/ui-library/icons/monochrome/cross_fill.svg?react'
import { DeleteConfirmModal } from './models/_components/DeleteConfirmModal'
import { ProcessingType, StorageRow } from './storageUtils'

const StorageTable = GetCosBasicTable<StorageRow>()

export const IntegrationsStoragesPage = () => {
  const { rows, showLoading, rowActions } = useStorageTable()

  const { t } = useTranslation()

  const processingMessages: Record<ProcessingType, string> = {
    ['creating']: t('integrations.storages.processingMessage.creating'),
    ['updating']: t('integrations.storages.processingMessage.updating'),
    ['deleting']: t('integrations.storages.processingMessage.deleting'),
    ['verifying']: t('integrations.storages.processingMessage.verifying'),
    ['setting to default']: t(
      'integrations.storages.processingMessage.settingToDefault',
    ),
  }

  const renderStorageName = (name: string, row: StorageRow) => {
    return (
      <div className="flex items-center gap-x-2">
        <span>{name}</span>
        {row.isDefault && (
          <CosIconText type="primary">
            {t('integrations.storages.default')}
          </CosIconText>
        )}
        {row.rowStates.showProcessing && !!row.rowStates.processingType && (
          <CosTooltip
            placement="top-left"
            hoverContent={{
              message: processingMessages[row.rowStates.processingType],
            }}
          >
            <div className="flex items-center justify-center">
              <CosLoadingSpinner variant="dot120" />
            </div>
          </CosTooltip>
        )}
      </div>
    )
  }

  const renderUpdateTime = (updatedAt: string) =>
    dayjs.respectTzOffset(updatedAt).format('YYYY/MM/DD')

  const renderVerifyColumn = (row: StorageRow) => {
    const verifyStates = row.rowStates.verify

    if (verifyStates.hidden) return null

    if (verifyStates.failed) {
      return (
        <div className="flex items-center gap-x-2 text-status-negative">
          <CrossFill className="icon-md-sm" />
          <span className="secondary-body3 font-semibold">
            {t('integrations.storages.failed')}
          </span>
        </div>
      )
    }

    if (row.isVerified) {
      return (
        <div className="flex items-center gap-x-2 text-status-positive">
          <CheckmarkCircleFill className="icon-md-sm" />
          <span>{t('integrations.storages.verified')}</span>
        </div>
      )
    }

    return (
      <CosButton
        type="secondary"
        size="md"
        usage="text-only"
        disabled={verifyStates.disabled}
        loading={verifyStates.loading}
        onClick={() => rowActions.verify(row.name)}
      >
        {t('integrations.storages.verify')}
      </CosButton>
    )
  }

  const renderType = (type: string) => {
    // TODO: We should define enum in the OpenAPI spec for storage type instead of using string.
    const typeTranslations: Record<string, string> = {
      ['built-in']: t('integrations.storages.type.builtIn'),
      external: t('integrations.storages.type.external'),
    }

    return typeTranslations[type] || upperFirst(type)
  }

  return (
    <CosGeneralPanel
      topic={t('integrations.storages.title')}
      rightSlot={<StorageTableActions />}
    >
      <StorageTable rows={rows} isLoading={showLoading}>
        <StorageTable.Column
          label={t('integrations.storages.storage')}
          property="name"
          emphasize={true}
        >
          {renderStorageName}
        </StorageTable.Column>
        <StorageTable.Column
          label={t('integrations.storages.type')}
          property="type"
        >
          {renderType}
        </StorageTable.Column>
        <StorageTable.Column
          label={t('integrations.storages.vendor')}
          property="vendor"
        />
        <StorageTable.Column
          label={t('integrations.storages.updateTime')}
          property="updatedAt"
        >
          {renderUpdateTime}
        </StorageTable.Column>
        <StorageTable.Column
          label={t('integrations.storages.managementIp')}
          property="managementIp"
        />
        <StorageTable.Column label={t('integrations.storages.verify')}>
          {(_, row) => renderVerifyColumn(row)}
        </StorageTable.Column>
        <StorageTable.Column>
          {(_, row) => <StorageRowActions row={row} rowActions={rowActions} />}
        </StorageTable.Column>
      </StorageTable>
      <DeleteConfirmModal action={rowActions.delete} />
    </CosGeneralPanel>
  )
}
