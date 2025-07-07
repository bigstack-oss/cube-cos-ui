import { GetCosBatchActionTable } from '@cube-frontend/ui-library'
import { SlackChannelTableRow } from '../SetResponse'

const SlackChannelTable = GetCosBatchActionTable<SlackChannelTableRow>()

type SlackBatchActionTableProps = {
  isLoading: boolean
  rows: SlackChannelTableRow[]
  selectedRowIds: string[]
  onCheckChange: (slack: string) => void
}

export const SlackBatchActionTable = (props: SlackBatchActionTableProps) => {
  const { isLoading, rows, selectedRowIds, onCheckChange } = props

  return (
    <div className="flex flex-col gap-y-4">
      <h5 className="secondary-h5">Select Slack Channels</h5>
      <SlackChannelTable
        isLoading={isLoading}
        rows={rows}
        selectedRowIds={selectedRowIds}
        onCheckChange={onCheckChange}
        showHeaderCheckbox={false}
        skeletonRowCount={5}
      >
        <SlackChannelTable.Column label="Slack Channel" property="name" />
        <SlackChannelTable.Column label="URL" property="url" />
        <SlackChannelTable.Column label="Description" property="description" />
      </SlackChannelTable>
    </div>
  )
}
