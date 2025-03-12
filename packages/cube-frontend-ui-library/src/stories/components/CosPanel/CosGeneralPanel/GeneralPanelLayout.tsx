import { StoryLayout } from '../../../../internal/components/StoryLayout/StoryLayout'
import { SinglePanelSection } from './SinglePanelSection'
import { MultiPanelSection } from './MultiPanelSection'
import { SkeletonSection } from './SkeletonSection'

export const GeneralPanelLayout = () => {
  return (
    <StoryLayout title="Panel - General" useSceneBgColor>
      <SinglePanelSection />
      <MultiPanelSection />
      <SkeletonSection />
    </StoryLayout>
  )
}
