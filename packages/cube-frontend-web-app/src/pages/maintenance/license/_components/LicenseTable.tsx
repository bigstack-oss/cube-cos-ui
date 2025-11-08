import { useTranslation } from 'react-i18next'
import { GetLicensesResponseDataLicensesInner } from '@cube-frontend/api'
import {
  CosBasicTableProps,
  CosTableRow,
  CosViewDetailsTableDetailItem,
  GetCosViewDetailsTable,
  useExpandedRowIdSet,
} from '@cube-frontend/ui-library'
import {
  formatLicenseDate,
  toLicenseExpirationDate,
} from '@cube-frontend/web-app/utils/date'
import { HostPreviewTableCell } from '@cube-frontend/web-app/components/HostPreviewTableCell/HostPreviewTableCell'
import { HostListModal } from '@cube-frontend/web-app/components/HostPreviewTableCell/HostListModal'
import { renderExpiredDays } from './utils'
import { useLicenseHostsModal } from './useLicenseHostsModal'
import { ExpiryIconText } from './ExpiryIconText'
import { useLicenseTypeTranslations } from './useLicenseTypeTranslations'
import { useFeatureTranslations } from './useFeatureTranslations'
import { useOnlyTranslateNA } from './useOnlyTranslateNA'

export type LicenseRow = GetLicensesResponseDataLicensesInner & CosTableRow

const LicenseViewDetailsTable = GetCosViewDetailsTable<LicenseRow>()

export type LicenseTableProps = CosBasicTableProps<LicenseRow>

export const LicenseTable = (props: LicenseTableProps) => {
  const { rows } = props

  const {
    isHostsModalOpen,
    rowForHostModal,
    onShowHostsClick,
    onHostsModalClose,
  } = useLicenseHostsModal(rows)

  const { expandedRowIdSet, onExpandChange } = useExpandedRowIdSet()

  const { t } = useTranslation()

  const licenseTypeTranslations = useLicenseTypeTranslations()
  const featureTranslations = useFeatureTranslations()
  const onlyTranslateNA = useOnlyTranslateNA()

  const getDetailItems = (
    license: LicenseRow,
  ): CosViewDetailsTableDetailItem[] => {
    return [
      {
        title: t('maintenance.license.quantity'),
        value: onlyTranslateNA(license.quantity),
      },
      {
        title: t('maintenance.license.supportPlan'),
        value: onlyTranslateNA(license.supportPlan),
      },
      {
        title: t('maintenance.license.feature'),
        value: featureTranslations[license.product.feature],
      },
    ]
  }

  return (
    <>
      <LicenseViewDetailsTable
        {...props}
        expandedRowIdSet={expandedRowIdSet}
        onExpandChange={onExpandChange}
        getDetailItems={getDetailItems}
      >
        <LicenseViewDetailsTable.Column
          label={t('maintenance.license.product')}
          property="product"
        >
          {(product) => product.name}
        </LicenseViewDetailsTable.Column>
        <LicenseViewDetailsTable.Column
          label={t('maintenance.license.licenseName')}
          property="name"
        >
          {(name, row) => (
            <div className="flex items-center gap-x-2">
              <span>{name}</span>
              <ExpiryIconText expiryDays={row.expiry.days} />
            </div>
          )}
        </LicenseViewDetailsTable.Column>
        <LicenseViewDetailsTable.Column
          label={t('maintenance.license.hosts')}
          property="hosts"
        >
          {(hosts, row) => (
            <HostPreviewTableCell
              hostNames={hosts}
              onShowAllClick={() => onShowHostsClick(row)}
            />
          )}
        </LicenseViewDetailsTable.Column>
        <LicenseViewDetailsTable.Column
          label={t('maintenance.license.issueDate')}
          property="issue"
        >
          {(issue) => formatLicenseDate(issue.date)}
        </LicenseViewDetailsTable.Column>
        <LicenseViewDetailsTable.Column
          label={t('maintenance.license.expireDate')}
          property="expiry"
        >
          {(_, license) => toLicenseExpirationDate(license, t)}
        </LicenseViewDetailsTable.Column>
        <LicenseViewDetailsTable.Column
          label={t('maintenance.license.expired')}
          property="expiry"
        >
          {(expiry) => renderExpiredDays(expiry, t)}
        </LicenseViewDetailsTable.Column>
        <LicenseViewDetailsTable.Column
          label={t('maintenance.license.type')}
          property="type"
        >
          {(type) => licenseTypeTranslations[type]}
        </LicenseViewDetailsTable.Column>
      </LicenseViewDetailsTable>
      <HostListModal
        isOpen={isHostsModalOpen}
        hostNames={rowForHostModal?.hosts ?? []}
        onCloseClick={onHostsModalClose}
      />
    </>
  )
}
