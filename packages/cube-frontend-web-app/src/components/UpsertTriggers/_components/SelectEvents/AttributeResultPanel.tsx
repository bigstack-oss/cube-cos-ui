import { Fragment } from 'react'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { CosSkeleton } from '@cube-frontend/ui-library'
import X from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'
import { GetPredefinedEventFilterResponseDataInner } from '@cube-frontend/api'

const panel = cva(
  [
    'flex flex-col gap-y-4 overflow-hidden rounded-[5px]',
    'bg-grey-0 shadow-[0px_0px_3px_0px_rgba(0,_0,_0,_0.10)]',
    'transition-all duration-300',
  ],
  {
    variants: {
      isPanelOpen: {
        true: 'w-1/2 p-6',
        false: 'hidden size-0 whitespace-nowrap',
      },
    },
  },
)

type AttributeResultPanelProps = {
  isPanelOpen: boolean
  isMatchingEventsLoading: boolean
  matchingEvents: GetPredefinedEventFilterResponseDataInner[]
  onPanelClose: () => void
}

export const AttributeResultPanel = (props: AttributeResultPanelProps) => {
  const { isPanelOpen, isMatchingEventsLoading, matchingEvents, onPanelClose } =
    props

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
    <div className={twMerge(panel({ isPanelOpen }))}>
      <div className="flex items-center justify-between">
        <h4 className="secondary-h4 text-functional-title">Attribute Result</h4>
        <button
          type="button"
          className="inline-flex size-[26px] cursor-pointer items-center justify-center"
          onClick={onPanelClose}
        >
          <X className="icon-lg text-functional-text" />
        </button>
      </div>
      <p className="primary-body3 text-functional-text-light">
        The right panel displays real-time values of the selected attributes.
      </p>
      <div className="flex flex-wrap gap-2">{renderResultIds()}</div>
    </div>
  )
}
