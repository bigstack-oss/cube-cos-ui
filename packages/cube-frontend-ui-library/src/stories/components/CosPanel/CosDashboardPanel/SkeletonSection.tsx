import { noop } from 'lodash'
import { StoryLayout } from '../../../../internal/components/StoryLayout/StoryLayout'
import { CosButton } from '../../../../components/CosButton/CosButton'
import { CosDashboardPanel } from '../../../../components/CosPanel/CosDashboardPanel/CosDashboardPanel'
import { PanelBlock } from '../PanelBlock'

export const SkeletonSection = () => {
  return (
    <StoryLayout.Section title="Skeleton">
      <PanelBlock title="Time and Subtext loading">
        <CosDashboardPanel
          title="Panel Title"
          time=""
          isTimeLoading={true}
          hyperLinkProps={{ onClick: noop }}
        >
          <CosDashboardPanel.Item
            topic="Topic Name"
            subtext=""
            isSubtextLoading={true}
            button={<CosButton>Call to Action</CosButton>}
          >
            Content Text
          </CosDashboardPanel.Item>
        </CosDashboardPanel>
      </PanelBlock>
    </StoryLayout.Section>
  )
}
