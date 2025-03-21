import { upperFirst } from 'lodash'
import { GetEventsTypeEnum } from '@cube-frontend/api'
import { CosContentSwitcher } from '@cube-frontend/ui-library'

type EventsContentSwitcherProps = {
  activeTab: GetEventsTypeEnum
  onEventsTypeChange: (type: GetEventsTypeEnum) => void
}

export const EventsContentSwitcher = (props: EventsContentSwitcherProps) => {
  const { activeTab, onEventsTypeChange: handleTabChange } = props

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
