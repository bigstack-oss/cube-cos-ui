import { CosButton } from '@cube-frontend/ui-library'
import { GetEventsResponseData } from '@cube-frontend/api'
import ArrowRefresh from '@cube-frontend/ui-library/icons/monochrome/arrow_refresh_02.svg?react'

type EventsRefreshButtonProps = {
  onEventsRefresh: (() => Promise<GetEventsResponseData>) | undefined
  isEventsLoading: boolean
}

export const EventsRefreshButton = (props: EventsRefreshButtonProps) => {
  const { onEventsRefresh, isEventsLoading } = props

  const handleEventsRefresh = () => {
    onEventsRefresh?.()
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
