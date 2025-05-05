import { capitalize, upperFirst } from 'lodash'
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

  const getDetailItems = (
    license: LicenseRow,
  ): CosViewDetailsTableDetailItem[] => {
    return [
      {
        title: 'Quantity',
        value: license.quantity,
      },
      {
        title: 'Support Plan',
        value: license.supportPlan,
      },
      {
        title: 'Feature',
        value: capitalize(license.product.feature),
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
        <LicenseViewDetailsTable.Column label="Product" property="product">
          {(product) => product.name}
        </LicenseViewDetailsTable.Column>
        <LicenseViewDetailsTable.Column label="License name" property="name">
          {(name, row) => (
            <div className="flex items-center gap-x-2">
              <span>{name}</span>
              <ExpiryIconText expiryDays={row.expiry.days} />
            </div>
          )}
        </LicenseViewDetailsTable.Column>
        <LicenseViewDetailsTable.Column label="Hosts" property="hosts">
          {(hosts, row) => (
            <HostPreviewTableCell
              hostNames={hosts}
              onShowAllClick={() => onShowHostsClick(row)}
            />
          )}
        </LicenseViewDetailsTable.Column>
        <LicenseViewDetailsTable.Column label="Issue date" property="issue">
          {(issue) => formatLicenseDate(issue.date)}
        </LicenseViewDetailsTable.Column>
        <LicenseViewDetailsTable.Column label="Expire date" property="expiry">
          {(_, license) => toLicenseExpirationDate(license)}
        </LicenseViewDetailsTable.Column>
        <LicenseViewDetailsTable.Column label="Expired" property="expiry">
          {renderExpiredDays}
        </LicenseViewDetailsTable.Column>
        <LicenseViewDetailsTable.Column label="Type" property="type">
          {upperFirst}
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
