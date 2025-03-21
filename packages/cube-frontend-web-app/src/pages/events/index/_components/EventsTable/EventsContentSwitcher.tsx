import { upperFirst } from 'lodash'
import { GetEventsTypeEnum } from '@cube-frontend/api'
import { CosContentSwitcher } from '@cube-frontend/ui-library'
import { useEventsFilterStore } from '@cube-frontend/web-app/stores/events'

type EventsContentSwitcherProps = {
  onEventsTypeChange: (tab: GetEventsTypeEnum) => void
}

export const EventsContentSwitcher = (props: EventsContentSwitcherProps) => {
  const { onEventsTypeChange: handleTabChange } = props
  const { eventsType: activeTab } = useEventsFilterStore()

  return (
    <CosContentSwitcher variant="radius">
      {Object.values(GetEventsTypeEnum).map((tab) => (
        <CosContentSwitcher.Item
          key={tab}
          isActive={tab === activeTab}
          onClick={() => handleTabChange(tab)}
        >
          {upperFirst(tab)}
        </CosContentSwitcher.Item>
      ))}
    </CosContentSwitcher>
  )
}
