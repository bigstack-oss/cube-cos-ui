import { VerifyLicenseResponseDataLicense } from '@cube-frontend/api'
import { CosDetailsTable } from '@cube-frontend/ui-library'
import { formatLicenseDate } from '@cube-frontend/web-app/utils/date'
import { capitalize } from 'lodash'

export type ImportLicenseTableProps = {
  license: VerifyLicenseResponseDataLicense
}

export const ImportLicenseTable = (props: ImportLicenseTableProps) => {
  const { license } = props

  return (
    <CosDetailsTable header={license.name || 'Unnamed License'}>
      <CosDetailsTable.Row title="Product">
        {license.product.name}
      </CosDetailsTable.Row>
      <CosDetailsTable.Row title="Status">
        {license.status.current}
      </CosDetailsTable.Row>
      <CosDetailsTable.Row title="Feature">
        {capitalize(license.product.feature)}
      </CosDetailsTable.Row>
      <CosDetailsTable.Row title="Support Plan">
        {license.supportPlan}
      </CosDetailsTable.Row>
      <CosDetailsTable.Row title="Issue Date">
        {formatLicenseDate(license.issue.date)}
      </CosDetailsTable.Row>
      <CosDetailsTable.Row title="Issuer">
        {license.issue.by}
      </CosDetailsTable.Row>
      <CosDetailsTable.Row title="Expire Date">
        {formatLicenseDate(license.expiry.date)}
      </CosDetailsTable.Row>
      <CosDetailsTable.Row title="Hardware serials">
        {license.issue.hardware}
      </CosDetailsTable.Row>
    </CosDetailsTable>
  )
}
