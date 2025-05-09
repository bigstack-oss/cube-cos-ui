import {
  CosButton,
  CosLoadingSpinner,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import { toReadableSizeString } from '@cube-frontend/web-app/utils/byte'
import { formatSupportFilesTimestamp } from '@cube-frontend/web-app/utils/date'
import { SupportFileRow } from '../MaintenanceSupportFilesPage'

const SupportFilesBasicTable = GetCosBasicTable<SupportFileRow>()

export type SupportFilesTableProps = React.ComponentProps<
  typeof SupportFilesBasicTable
> & {
  onDownloadClick: (row: SupportFileRow) => void
}

export const SupportFilesTable = (props: SupportFilesTableProps) => {
  const { onDownloadClick, ...basicTableProps } = props

  return (
    <SupportFilesBasicTable {...basicTableProps}>
      <SupportFilesBasicTable.Column label="Timestamp" emphasize={true}>
        {(_, row) => {
          return formatSupportFilesTimestamp(row.status.createdAt)
        }}
      </SupportFilesBasicTable.Column>
      <SupportFilesBasicTable.Column label="Hosts" property="files">
        {(files) => (
          <span className="w-[58px] text-functional-text">
            {files.map((file) => file.source.host).join(', ')}
          </span>
        )}
      </SupportFilesBasicTable.Column>
      <SupportFilesBasicTable.Column label="Size" property="sizeMiB">
        {(MiB) => toReadableSizeString(MiB, 'MiB')}
      </SupportFilesBasicTable.Column>
      <SupportFilesBasicTable.Column label="Comments" property="description" />
      <SupportFilesBasicTable.Column fitContent={true}>
        {(_, row) =>
          row.status.isCreating ? (
            <div className="flex h-[34px] items-center gap-x-2">
              <CosLoadingSpinner variant="dot45" />
              <span className="primary-body4 text-functional-text-light">
                Creating...
              </span>
            </div>
          ) : (
            <CosButton type="ghost" onClick={() => onDownloadClick(row)}>
              Download
            </CosButton>
          )
        }
      </SupportFilesBasicTable.Column>
    </SupportFilesBasicTable>
  )
}
