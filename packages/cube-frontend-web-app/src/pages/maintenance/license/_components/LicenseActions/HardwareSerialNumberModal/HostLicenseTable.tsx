import { GetNodesResponseData } from '@cube-frontend/api'
import { GetCosBatchActionTable } from '@cube-frontend/ui-library'

const BatchActionHostLicenseTable =
  GetCosBatchActionTable<GetNodesResponseData['nodes'][number]>()

export type HostLicenseTableProps = React.ComponentProps<
  typeof BatchActionHostLicenseTable
>

export const HostLicenseTable = (props: HostLicenseTableProps) => {
  return (
    <BatchActionHostLicenseTable {...props}>
      <BatchActionHostLicenseTable.Column label="Host" property="hostname" />
      <BatchActionHostLicenseTable.Column
        label="Hardware serial"
        property="license"
      >
        {(license) => license.serial}
      </BatchActionHostLicenseTable.Column>
      <BatchActionHostLicenseTable.Column label="Role" property="role" />
      <BatchActionHostLicenseTable.Column label="Product" property="license">
        {(license) => license.product.name}
      </BatchActionHostLicenseTable.Column>
      <BatchActionHostLicenseTable.Column label="Status" property="license">
        {(license) => license.status.current}
      </BatchActionHostLicenseTable.Column>
    </BatchActionHostLicenseTable>
  )
}
