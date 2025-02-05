import { useState } from 'react'
import OverviewTab from './OverviewTab'
import { TabLabels } from './TabLabels'
import ChartTab from './ChartTab'
import HealthTab from './HealthTab'
import ManageTab from './ManageTab'

const tabs = [
  {
    label: 'Overview',
    Component: OverviewTab,
  },
  {
    label: 'Chart',
    Component: ChartTab,
  },
  {
    label: 'Health',
    Component: HealthTab,
  },
  {
    label: 'Manage',
    Component: ManageTab,
  },
]

const HomePage = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const TabContent = tabs[activeIndex].Component

  return (
    <div>
      <TabLabels
        tabs={tabs}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      <div className="mt-5">
        <TabContent />
      </div>
    </div>
  )
}

export default HomePage
