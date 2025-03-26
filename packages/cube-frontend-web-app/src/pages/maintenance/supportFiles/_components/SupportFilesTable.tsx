import dayjs from 'dayjs'
import { CosButton, GetCosBasicTable } from '@cube-frontend/ui-library'
import {
  convertSize,
  getReadableSizeUnit,
} from '@cube-frontend/web-app/utils/byte'
import { SupportFileRow } from '../MaintenanceSupportFilesPage'

const SupportFilesBasicTable = GetCosBasicTable<SupportFileRow>()

export type SupportFilesTableProps = React.ComponentProps<
  typeof SupportFilesBasicTable
> & {
  onDownloadClick: (row: SupportFileRow) => void
}

export const SupportFilesTable = (props: SupportFilesTableProps) => {
  const { rows, isLoading, onDownloadClick } = props

  return (
    <SupportFilesBasicTable rows={rows} isLoading={isLoading}>
      <SupportFilesBasicTable.Column
        label="Timestamp"
        property="name"
        emphasize={true}
      >
        {(name) => dayjs.respectTzOffset(name).format('YYYY-MM-DD HH:mm:ss')}
      </SupportFilesBasicTable.Column>
      <SupportFilesBasicTable.Column label="Hosts" property="files">
        {(files) => (
          <span className="w-[58px] text-functional-text">
            {files.map((file) => file.source.host).join(', ')}
          </span>
        )}
      </SupportFilesBasicTable.Column>
      <SupportFilesBasicTable.Column label="Size" property="sizeMiB">
        {(MiB) => {
          const readableSizeUnit = getReadableSizeUnit(MiB, 'MiB')
          const readableSize = convertSize(MiB, {
            fromUnit: 'MiB',
            toUnit: readableSizeUnit,
          })
          return `${readableSize} ${readableSizeUnit}`
        }}
      </SupportFilesBasicTable.Column>
      <SupportFilesBasicTable.Column label="Comments" property="description" />
      <SupportFilesBasicTable.Column fitContent={true}>
        {(_, row) => (
          <CosButton type="ghost" onClick={() => onDownloadClick(row)}>
            Download
          </CosButton>
        )}
      </SupportFilesBasicTable.Column>
    </SupportFilesBasicTable>
  )
}
