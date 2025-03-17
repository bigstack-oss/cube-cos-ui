import { CosContentSwitcher } from '@cube-frontend/ui-library'
import { toUpperCaseFirstLetter } from '@cube-frontend/utils'

type EventsContentSwitcherProps<T extends string> = {
  tabOptions: Record<string, T>
  selectedTab: T
  handleTabChange: (tab: T) => void
}

export const EventsContentSwitcher = <T extends string>(
  props: EventsContentSwitcherProps<T>,
) => {
  const { tabOptions, selectedTab, handleTabChange } = props
  return (
    <CosContentSwitcher variant="radius">
      {Object.values(tabOptions).map((option) => (
        <CosContentSwitcher.Item
          key={option}
          isActive={selectedTab === option}
          onClick={() => handleTabChange(option)}
        >
          {toUpperCaseFirstLetter(option)}
        </CosContentSwitcher.Item>
      ))}
    </CosContentSwitcher>
  )
}
