import { CosTabs } from '@cube-frontend/ui-library'

export type TabLabelsProps = {
  tabs: {
    label: string
    Component: React.ComponentType
  }[]
  activeIndex: number
  setActiveIndex: (index: number) => void
}

export const TabLabels = (props: TabLabelsProps) => {
  const { tabs, activeIndex, setActiveIndex } = props
  return (
    <div className="w-fit">
      <CosTabs>
        {tabs.map((tab, index) => (
          <CosTabs.Tab
            key={tab.label}
            label={tab.label}
            isActive={activeIndex === index}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </CosTabs>
    </div>
  )
}
