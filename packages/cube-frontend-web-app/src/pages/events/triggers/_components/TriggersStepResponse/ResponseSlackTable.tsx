import { useContext, useMemo } from 'react'
import { GetTriggersResponseDataInnerResponseSlacksInner } from '@cube-frontend/api'
import { GetCosBatchActionTable } from '@cube-frontend/ui-library'
import { ResponseSlackFilter } from './ResponseSlackFilter'
import { TriggersCreateContext } from '../../create/context'

type SlackTableType = GetTriggersResponseDataInnerResponseSlacksInner & {
  id: string
}

const SlackTable = GetCosBatchActionTable<SlackTableType>()

const mapToSlackTable = (
  slack: GetTriggersResponseDataInnerResponseSlacksInner,
): SlackTableType => ({
  ...slack,
  /**
   * We use the slack url as the row ID since it is unique.
   * This is a workaround for the fact that the API does not return an ID field.
   */
  id: slack.url,
})

export const ResponseSlackTable = () => {
  const { formOptions, formValue, handleSlackSelect, handleSlackSelectAll } =
    useContext(TriggersCreateContext)

  const { allSlacks } = formOptions

  const { formSlacks } = formValue

  const slackRows = useMemo<SlackTableType[]>(() => {
    return allSlacks.map(mapToSlackTable) || []
  }, [allSlacks])

  return (
    <div className="flex flex-col rounded-[5px] bg-white px-6 py-4">
      <ResponseSlackFilter />
      <div className="primary-body2 mb-2 font-semibold text-functional-text">
        Select Slack channels
      </div>
      <SlackTable
        rows={slackRows}
        selectedRowIds={formSlacks}
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
