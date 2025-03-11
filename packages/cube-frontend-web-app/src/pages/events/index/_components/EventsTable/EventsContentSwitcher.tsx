import { useContext } from 'react'
import { GetEventsTypeEnum } from '@cube-frontend/api'
import { CosContentSwitcher } from '@cube-frontend/ui-library'
import { toUpperCaseFirstLetter } from '@cube-frontend/utils'
import { EventsFilterTableContext } from './context'

export const EventsContentSwitcher = () => {
  const { eventsType: activeTab, handleEventsTypeChange: handleTabChange } =
    useContext(EventsFilterTableContext)
  return (
    <CosContentSwitcher variant="radius">
      {Object.values(GetEventsTypeEnum).map((tab) => (
        <CosContentSwitcher.Item
          key={`tab-${tab}`}
          isActive={tab === activeTab}
          onClick={() => handleTabChange(tab)}
        >
          {toUpperCaseFirstLetter(tab)}
        </CosContentSwitcher.Item>
      ))}
    </CosContentSwitcher>
  )
}
