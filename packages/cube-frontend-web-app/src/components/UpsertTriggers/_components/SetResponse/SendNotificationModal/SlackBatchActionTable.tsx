import { GetCosBatchActionTable } from '@cube-frontend/ui-library'
import { SlackChannelTableRow } from '../SetResponse'

const SlackChannelTable = GetCosBatchActionTable<SlackChannelTableRow>()

type SlackBatchActionTableProps = {
  isLoading: boolean
  rows: SlackChannelTableRow[]
  selectedRows: SlackChannelTableRow[]
  onCheckChange: (slack: SlackChannelTableRow) => void
}

export const SlackBatchActionTable = (props: SlackBatchActionTableProps) => {
  const {
    isLoading,
    rows,
    selectedRows,
    onCheckChange: onRowCheckChange,
  } = props

  const selectedRowIds = selectedRows.map((row) => row.id)

  const onCheckChange = (id: string) => {
    const selectedSlack = rows.find((slack) => slack.id === id)

    if (!selectedSlack) return
    onRowCheckChange(selectedSlack)
  }

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
