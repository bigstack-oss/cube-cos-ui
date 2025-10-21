import { useTranslation } from 'react-i18next'
import { GetEventsTypeEnum } from '@cube-frontend/api'
import { CosContentSwitcher } from '@cube-frontend/ui-library'

type EventsContentSwitcherProps = {
  activeTab: GetEventsTypeEnum
  onEventsTypeChange: (type: GetEventsTypeEnum) => void
}

export const EventsContentSwitcher = (props: EventsContentSwitcherProps) => {
  const { activeTab, onEventsTypeChange: handleTabChange } = props

  const { t } = useTranslation()

  return (
    <CosContentSwitcher variant="radius">
      {Object.values(GetEventsTypeEnum).map((tab) => (
        <CosContentSwitcher.Item
          key={tab}
          isActive={tab === activeTab}
          onClick={() => handleTabChange(tab)}
        >
          {t(`events.${tab}`)}
        </CosContentSwitcher.Item>
      ))}
    </CosContentSwitcher>
  )
}
