import { VerifyLicenseResponseDataLicense } from '@cube-frontend/api'
import { CosTableRow, GetCosBasicTable } from '@cube-frontend/ui-library'
import { toLicenseDateDisplay } from '@cube-frontend/web-app/utils/date'

export type LicenseDetailRow = {
  key: string
  value: string
} & CosTableRow

export type ImportLicenseTableProps = {
  license: VerifyLicenseResponseDataLicense
}

const LicenseDetailTable = GetCosBasicTable<LicenseDetailRow>()

export const ImportLicenseTable = (props: ImportLicenseTableProps) => {
  const { license } = props

  const licenseDetailsRows = [
    { key: 'Product', value: license.product.name },
    { key: 'Status', value: license.status.current },
    { key: 'Support Plan', value: license.supportPlan },
    {
      key: 'Issue Date',
      value: toLicenseDateDisplay(license.issue.date),
    },
    { key: 'Issuer', value: license.issue.by },
    {
      key: 'Expire Date',
      value: toLicenseDateDisplay(license.expiry.date),
    },
    { key: 'Hardware serials', value: license.issue.hardware },
  ].map((kv) => ({ id: kv.key, ...kv }) satisfies LicenseDetailRow)

  return (
    <LicenseDetailTable rows={licenseDetailsRows}>
      <LicenseDetailTable.Column label={license.name} property="key" />
      <LicenseDetailTable.Column property="value" />
    </LicenseDetailTable>
  )
}
