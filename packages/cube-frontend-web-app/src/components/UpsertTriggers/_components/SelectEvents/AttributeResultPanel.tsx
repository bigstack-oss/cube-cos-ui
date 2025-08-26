import { Fragment } from 'react'
import { CosSkeleton } from '@cube-frontend/ui-library'
import { GetPredefinedEventFilterResponseDataInner } from '@cube-frontend/api'

type AttributeResultPanelProps = {
  isMatchingEventsLoading: boolean
  matchingEvents: GetPredefinedEventFilterResponseDataInner[]
}

export const AttributeResultPanel = (props: AttributeResultPanelProps) => {
  const { isMatchingEventsLoading, matchingEvents } = props

  const matchingEventIds = matchingEvents.map((event) => event.id)

  const renderResultIds = () => {
    if (isMatchingEventsLoading)
      return <CosSkeleton className="h-[16px] w-[120px]" />

    if (matchingEventIds.length === 0)
      return <p className="primary-body4 text-functional-text">No Result</p>

    return (
      <Fragment>
        {matchingEventIds.map((id) => (
          <p
            key={id}
            id={id}
            className="primary-body4 w-[120px] text-functional-text"
          >
            {id}
          </p>
        ))}
      </Fragment>
    )
  }

  return (
    <div className="flex flex-col gap-y-4">
      <p className="primary-body3 text-functional-text-light">
        The right panel displays real-time values of the selected attributes.
      </p>
      <div className="grid grid-cols-4 gap-2">{renderResultIds()}</div>
    </div>
  )
}
