import { noop } from 'lodash'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { CosButton } from '../../../components/CosButton/CosButton'
import { CosPanel } from '../../../components/CosPanel/CosPanel'
import { PanelBlock } from './PanelBlock'

export const SkeletonSection = () => {
  return (
    <StoryLayout.Section title="Skeleton">
      <PanelBlock title="Time and Subtext loading">
        <CosPanel
          title="Panel Title"
          time=""
          isTimeLoading={true}
          hyperLinkProps={{ onClick: noop }}
        >
          <CosPanel.Item
            topic="Topic Name"
            subtext=""
            isSubtextLoading={true}
            button={<CosButton>Call to Action</CosButton>}
          >
            Content Text
          </CosPanel.Item>
        </CosPanel>
      </PanelBlock>
    </StoryLayout.Section>
  )
}
