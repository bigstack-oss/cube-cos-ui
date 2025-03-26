import { upperFirst } from 'lodash'
import { GetLicensesResponseDataLicensesInner } from '@cube-frontend/api'
import { CosTableRow, GetCosBasicTable } from '@cube-frontend/ui-library'

export type LicenseRow = GetLicensesResponseDataLicensesInner & CosTableRow

const BasicLicenseTable = GetCosBasicTable<LicenseRow>()

export type LicenseTableProps = React.ComponentProps<typeof BasicLicenseTable>

export const LicenseTable = (props: LicenseTableProps) => {
  return (
    <BasicLicenseTable {...props}>
      <BasicLicenseTable.Column label="Product" property="product">
        {(product) => product.name}
      </BasicLicenseTable.Column>
      <BasicLicenseTable.Column label="License name" property="serial" />
      <BasicLicenseTable.Column label="Hosts" property="hosts">
        {(hosts) => {
          return hosts.join(', ')
        }}
      </BasicLicenseTable.Column>
      <BasicLicenseTable.Column label="Issue date" property="issue">
        {(issue) => {
          return issue.date
        }}
      </BasicLicenseTable.Column>
      <BasicLicenseTable.Column label="Expire date">
        {(_, row) => {
          return row.expiry.date
        }}
      </BasicLicenseTable.Column>
      <BasicLicenseTable.Column label="Expired">
        {(_, row) => {
          return row.expiry.days
        }}
      </BasicLicenseTable.Column>
      <BasicLicenseTable.Column label="Type" property="type">
        {upperFirst}
      </BasicLicenseTable.Column>
    </BasicLicenseTable>
  )
}
