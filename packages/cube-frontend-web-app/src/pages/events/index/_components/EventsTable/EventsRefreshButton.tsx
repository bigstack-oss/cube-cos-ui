import { CosButton } from '@cube-frontend/ui-library'
import { GetEventsResponseData } from '@cube-frontend/api'
import ArrowRefresh from '@cube-frontend/ui-library/icons/monochrome/arrow_refresh_02.svg?react'

type EventsRefreshButtonProps = {
  onEventsMutate: (() => Promise<GetEventsResponseData>) | undefined
  isEventsLoading: boolean
}

export const EventsRefreshButton = (props: EventsRefreshButtonProps) => {
  const { onEventsMutate, isEventsLoading } = props

  const handleEventsRefresh = () => {
    onEventsMutate?.()
  }

  return (
    <CosButton
      type="secondary"
      usage="icon-only"
      Icon={ArrowRefresh}
      loading={isEventsLoading}
      onClick={handleEventsRefresh}
    />
  )
}
