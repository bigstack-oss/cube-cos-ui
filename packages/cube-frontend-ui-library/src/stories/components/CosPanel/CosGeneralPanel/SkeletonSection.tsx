import { StoryLayout } from '../../../../internal/components/StoryLayout/StoryLayout'
import { PanelBlock } from '../PanelBlock'
import {
  CosButton,
  CosGeneralPanel,
  CosGeneralPanelTitleBar,
} from '@cube-frontend/ui-library'
import { PanelDropdown, PanelIcon } from './MockComponents'

export const SkeletonSection = () => {
  return (
    <StoryLayout.Section title="Skeleton">
      <div className="flex flex-col gap-y-10">
        <PanelBlock title="Time Loading">
          <CosGeneralPanelTitleBar
            title="Panel Title"
            time=""
            isTimeLoading={true}
            dropdown={<PanelDropdown />}
          />
          <CosGeneralPanel
            topic="Topic Name"
            button={<CosButton>Call to Action</CosButton>}
            icon={<PanelIcon />}
            dropdown={<PanelDropdown />}
            subtext="Subtext"
          >
            Content Text
          </CosGeneralPanel>
        </PanelBlock>
      </div>
    </StoryLayout.Section>
  )
}
