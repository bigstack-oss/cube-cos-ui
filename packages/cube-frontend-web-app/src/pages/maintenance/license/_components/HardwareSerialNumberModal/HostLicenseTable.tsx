import { GetNodesResponseData } from '@cube-frontend/api'
import { GetCosBasicTable } from '@cube-frontend/ui-library'

const BasicHostLicenseTable =
  GetCosBasicTable<GetNodesResponseData['nodes'][number]>()

export type HostLicenseTableProps = React.ComponentProps<
  typeof BasicHostLicenseTable
>

export const HostLicenseTable = (props: HostLicenseTableProps) => {
  return (
    <BasicHostLicenseTable {...props}>
      <BasicHostLicenseTable.Column label="Host" property="hostname" />
      <BasicHostLicenseTable.Column label="Hardware serial">
        {(_, row) => row.license.serial}
      </BasicHostLicenseTable.Column>
      <BasicHostLicenseTable.Column label="Role" property="role" />
      <BasicHostLicenseTable.Column label="Product">
        {(_, row) => row.license.product.name}
      </BasicHostLicenseTable.Column>
      <BasicHostLicenseTable.Column label="Status">
        {(_, row) => row.license.status.current}
      </BasicHostLicenseTable.Column>
    </BasicHostLicenseTable>
  )
}
