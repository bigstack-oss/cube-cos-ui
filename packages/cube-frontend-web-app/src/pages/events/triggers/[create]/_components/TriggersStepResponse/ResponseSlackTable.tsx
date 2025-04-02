import { useContext, useMemo } from 'react'
import { GetTriggersResponseDataInnerResponseSlacksInner } from '@cube-frontend/api'
import { GetCosBatchActionTable } from '@cube-frontend/ui-library'
import { ResponseSlackFilter } from './ResponseSlackFilter'
import { TriggersCreateContext } from '../context'

type SlackTableType = GetTriggersResponseDataInnerResponseSlacksInner & {
  id: string
}

const SlackTable = GetCosBatchActionTable<SlackTableType>()

const mapToSlackTable = (
  slack: GetTriggersResponseDataInnerResponseSlacksInner,
): SlackTableType => ({
  ...slack,
  id: slack.url,
})

export const ResponseSlackTable = () => {
  const { trigger, selectedSlacks, handleSlackSelect, handleSlackSelectAll } =
    useContext(TriggersCreateContext)

  const slackRows = useMemo<SlackTableType[]>(() => {
    return trigger?.response.slacks.map(mapToSlackTable) || []
  }, [trigger])

  return (
    <div className="flex flex-col rounded-[5px] bg-white px-6 py-4">
      <ResponseSlackFilter />
      <div className="primary-body2 mb-2 font-semibold text-functional-text">
        Select Slack channels
      </div>
      <SlackTable
        rows={slackRows}
        selectedRowIds={selectedSlacks}
        onCheckChange={handleSlackSelect}
        showHeaderCheckbox={true}
        onAllCheckChange={handleSlackSelectAll}
      >
        <SlackTable.Column label="Slack channels" property="name" />
        <SlackTable.Column label="URL" property="url" />
        <SlackTable.Column label="Description" property="description" />
      </SlackTable>
    </div>
  )
}
