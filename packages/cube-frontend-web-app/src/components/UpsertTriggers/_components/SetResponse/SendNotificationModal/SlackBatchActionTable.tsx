import { GetCosBatchActionTable } from '@cube-frontend/ui-library'
import { SlackChannelTableRow } from '../SetResponse'
import { useTranslation } from 'react-i18next'

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

  const { t } = useTranslation()

  const selectedRowIds = selectedRows.map((row) => row.id)

  const onCheckChange = (id: string) => {
    const selectedSlack = rows.find((slack) => slack.id === id)

    if (!selectedSlack) return
    onRowCheckChange(selectedSlack)
  }

  return (
    <div className="flex flex-col gap-y-4">
      <h5 className="secondary-h5">
        {t('events.triggers.upsert.sendNotification.selectSlackChannels')}
      </h5>
      <SlackChannelTable
        isLoading={isLoading}
        rows={rows}
        selectedRowIds={selectedRowIds}
        onCheckChange={onCheckChange}
        showHeaderCheckbox={false}
        skeletonRowCount={5}
      >
        <SlackChannelTable.Column
          label={t('events.triggers.upsert.sendNotification.slackChannel')}
          property="name"
        />
        <SlackChannelTable.Column
          label={t('events.triggers.upsert.sendNotification.url')}
          property="url"
        />
        <SlackChannelTable.Column
          label={t('events.triggers.upsert.sendNotification.description')}
          property="description"
        />
      </SlackChannelTable>
    </div>
  )
}
