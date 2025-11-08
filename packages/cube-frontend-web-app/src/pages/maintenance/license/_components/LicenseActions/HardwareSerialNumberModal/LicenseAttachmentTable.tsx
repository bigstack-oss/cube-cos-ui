import { useTranslation } from 'react-i18next'
import { GetLicenseAttachmentsResponseDataInner } from '@cube-frontend/api'
import { GetCosBatchActionTable } from '@cube-frontend/ui-library'
import { useNodeLicenseStatusTranslations } from '../../useNodeLicenseStatusTranslations'

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
  const { t } = useTranslation()

  const nodeLicenseStatusTranslations = useNodeLicenseStatusTranslations()

  return (
    <BatchLicenseAttachmentTable {...props}>
      <BatchLicenseAttachmentTable.Column
        label={t('maintenance.license.hardwareSerialsModal.host')}
        property="hostname"
      />
      <BatchLicenseAttachmentTable.Column
        label={t('maintenance.license.hardwareSerialsModal.hardwareSerial')}
        property="serialNumber"
      />
      <BatchLicenseAttachmentTable.Column
        label={t('maintenance.license.hardwareSerialsModal.role')}
        property="role"
      />
      <BatchLicenseAttachmentTable.Column
        label={t('maintenance.license.hardwareSerialsModal.product')}
        property="product"
      />
      <BatchLicenseAttachmentTable.Column
        label={t('maintenance.license.nodeStatus')}
        property="status"
      >
        {(status) => nodeLicenseStatusTranslations[status]}
      </BatchLicenseAttachmentTable.Column>
    </BatchLicenseAttachmentTable>
  )
}
