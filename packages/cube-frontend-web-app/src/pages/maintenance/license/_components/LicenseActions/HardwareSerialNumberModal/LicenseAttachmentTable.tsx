import { GetLicenseAttachmentsResponseDataInner } from '@cube-frontend/api'
import { GetCosBatchActionTable } from '@cube-frontend/ui-library'
import { upperFirst } from 'lodash'

export type BatchLicenseAttachmentTableRow =
  GetLicenseAttachmentsResponseDataInner & {
    id: string
  }

const BatchLicenseAttachmentTable =
  GetCosBatchActionTable<BatchLicenseAttachmentTableRow>()

export type LicenseAttachmentTableProps = React.ComponentProps<
  typeof BatchLicenseAttachmentTable
>

export const LicenseAttachmentTable = (props: LicenseAttachmentTableProps) => {
  return (
    <BatchLicenseAttachmentTable {...props}>
      <BatchLicenseAttachmentTable.Column label="Host" property="hostname" />
      <BatchLicenseAttachmentTable.Column
        label="Hardware serial"
        property="serialNumber"
      />
      <BatchLicenseAttachmentTable.Column label="Role" property="role" />
      <BatchLicenseAttachmentTable.Column label="Product" property="product" />
      <BatchLicenseAttachmentTable.Column label="Status" property="status">
        {upperFirst}
      </BatchLicenseAttachmentTable.Column>
    </BatchLicenseAttachmentTable>
  )
}
