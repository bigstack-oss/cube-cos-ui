import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { CosSkeleton } from '@cube-frontend/ui-library'
import { GetPredefinedEventFilterResponseDataInner } from '@cube-frontend/api'

type AttributeResultPanelProps = {
  isMatchingEventsLoading: boolean
  matchingEvents: GetPredefinedEventFilterResponseDataInner[]
}

export const AttributeResultPanel = (props: AttributeResultPanelProps) => {
  const { isMatchingEventsLoading, matchingEvents } = props

  const { t } = useTranslation()

  const matchingEventIds = matchingEvents.map((event) => event.id)

  const renderResultIds = () => {
    if (isMatchingEventsLoading)
      return <CosSkeleton className="h-[16px] w-[120px]" />

    if (matchingEventIds.length === 0)
      return (
        <p className="primary-body4 text-functional-text">
          {t('events.triggers.upsert.attributeResult.noResult')}
        </p>
      )

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
        {t('events.triggers.upsert.attributeResult.message')}
      </p>
      <div className="grid grid-cols-4 gap-2">{renderResultIds()}</div>
    </div>
  )
}
