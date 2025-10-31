import { useTranslation } from 'react-i18next'
import {
  CosButton,
  CosLoadingSpinner,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import DeleteIcon from '@cube-frontend/ui-library/icons/monochrome/delete.svg?react'
import { toReadableSizeString } from '@cube-frontend/web-app/utils/byte'
import { formatSupportFilesTimestamp } from '@cube-frontend/web-app/utils/date'
import { SupportFileRow } from '../MaintenanceSupportFilesPage'

const SupportFilesBasicTable = GetCosBasicTable<SupportFileRow>()

export type SupportFilesTableProps = React.ComponentProps<
  typeof SupportFilesBasicTable
> & {
  onDownloadClick: (row: SupportFileRow) => void
  onDeleteClick: (row: SupportFileRow) => void
}

export const SupportFilesTable = (props: SupportFilesTableProps) => {
  const { onDownloadClick, onDeleteClick, ...basicTableProps } = props

  const { t } = useTranslation()

  return (
    <SupportFilesBasicTable {...basicTableProps}>
      <SupportFilesBasicTable.Column
        label={t('maintenance.supportFiles.timestamp')}
        emphasize={true}
      >
        {(_, row) => {
          return formatSupportFilesTimestamp(row.status.createdAt)
        }}
      </SupportFilesBasicTable.Column>
      <SupportFilesBasicTable.Column
        label={t('maintenance.supportFiles.hosts')}
        property="files"
      >
        {(files) => (
          <span className="w-[58px] text-functional-text">
            {files.map((file) => file.source.host).join(', ')}
          </span>
        )}
      </SupportFilesBasicTable.Column>
      <SupportFilesBasicTable.Column
        label={t('maintenance.supportFiles.size')}
        property="sizeMiB"
      >
        {(MiB) => toReadableSizeString(MiB, 'MiB')}
      </SupportFilesBasicTable.Column>
      <SupportFilesBasicTable.Column
        label={t('maintenance.supportFiles.comments')}
        property="description"
      />
      <SupportFilesBasicTable.Column fitContent={true}>
        {(_, row) =>
          row.status.isCreating ? (
            <div className="flex h-[34px] items-center gap-x-2">
              <CosLoadingSpinner variant="dot45" />
              <span className="primary-body4 text-functional-text-light">
                {t('maintenance.supportFiles.status.creating')}
              </span>
            </div>
          ) : (
            <div className="flex items-center">
              <CosButton type="ghost" onClick={() => onDownloadClick(row)}>
                {t('maintenance.supportFiles.download')}
              </CosButton>
              <CosButton
                type="ghost"
                usage="icon-only"
                Icon={DeleteIcon}
                onClick={() => onDeleteClick(row)}
              />
            </div>
          )
        }
      </SupportFilesBasicTable.Column>
    </SupportFilesBasicTable>
  )
}
