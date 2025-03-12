import { StoryLayout } from '../../../../internal/components/StoryLayout/StoryLayout'
import { MultiPanelSection } from './MultiPanelSection'
import { SinglePanelSection } from './SinglePanelSection'
import { SkeletonSection } from './SkeletonSection'
import { UsageSection } from './UsageSection'

export const DashboardPanelLayout = () => {
  return (
    <StoryLayout title="Panel - Dashboard" useSceneBgColor>
      <SinglePanelSection />
      <MultiPanelSection />
      <SkeletonSection />
      <UsageSection />
    </StoryLayout>
  )
}
