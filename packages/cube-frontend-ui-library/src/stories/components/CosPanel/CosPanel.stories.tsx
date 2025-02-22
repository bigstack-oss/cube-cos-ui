import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { MultiPanelSection } from './MultiPanelSection'
import { SinglePanelSection } from './SinglePanelSection'
import { UsageSection } from './UsageSection'

const meta = {
  title: 'Organisms/Panel',
} satisfies Meta

export default meta

export const Layout: StoryObj = {
  render: () => <PanelLayout />,
}

const PanelLayout = () => {
  return (
    <StoryLayout title="Panel" useSceneBgColor>
      <SinglePanelSection />
      <MultiPanelSection />
      <UsageSection />
    </StoryLayout>
  )
}
