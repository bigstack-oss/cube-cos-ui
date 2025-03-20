import { useContext } from 'react'
import { CosButton, CosLoadingSpinner } from '@cube-frontend/ui-library'
import ArrowRefresh from '@cube-frontend/ui-library/icons/monochrome/arrow_refresh_02.svg?react'
import { EventsFilterTableContext } from './context'

export const EventsRefreshButton = () => {
  const { onEventsMutate, isEventsLoading } = useContext(
    EventsFilterTableContext,
  )

  const handleEventsRefresh = () => {
    onEventsMutate?.()
  }

  return (
    <div className="flex items-center gap-2">
      {/** TODO: implement loading state to the button */}
      {isEventsLoading && <CosLoadingSpinner variant="dot120" />}
      <CosButton
        type="secondary"
        usage="icon-only"
        Icon={ArrowRefresh}
        onClick={handleEventsRefresh}
      />
    </div>
  )
}
