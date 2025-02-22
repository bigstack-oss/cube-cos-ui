import { CosPanel } from '../../../components/CosPanel/CosPanel'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { CosPanelContentItem } from '../../../components/CosPanel/CosPanelContentItem'
import { CosButton } from '../../../components/CosButton/CosButton'
import { noop } from 'lodash'

export const MultiPanelSection = () => {
  return (
    <StoryLayout.Section title="Layout - Multi-Panel">
      <div className="flex flex-col gap-y-3">
        <div className="flex gap-x-3">
          <CosPanel
            title="Panel Title"
            time="yyyy/mm/dd 00:00"
            hyperLinkProps={{ onClick: noop }}
          >
            <CosPanelContentItem
              topic="Topic Name"
              subtext="Subtext"
              button={<CosButton>Call to Action</CosButton>}
            >
              Content Text
            </CosPanelContentItem>
          </CosPanel>
          <CosPanel
            title="Panel Title"
            time="yyyy/mm/dd 00:00"
            hyperLinkProps={{ onClick: noop }}
          >
            <CosPanelContentItem
              topic="Topic Name"
              subtext="Subtext"
              button={<CosButton>Call to Action</CosButton>}
            >
              Content Text
            </CosPanelContentItem>
          </CosPanel>
        </div>
        <CosPanel
          title="Panel Title"
          time="yyyy/mm/dd 00:00"
          hyperLinkProps={{ onClick: noop }}
        >
          <CosPanelContentItem
            topic="Topic Name"
            subtext="Subtext"
            button={<CosButton>Call to Action</CosButton>}
          >
            Content Text
          </CosPanelContentItem>
        </CosPanel>
        <CosPanel
          title="Panel Title"
          time="yyyy/mm/dd 00:00"
          hyperLinkProps={{ onClick: noop }}
        >
          <CosPanelContentItem
            topic="Topic Name"
            subtext="Subtext"
            button={<CosButton>Call to Action</CosButton>}
          >
            Content Text
          </CosPanelContentItem>
        </CosPanel>
      </div>
    </StoryLayout.Section>
  )
}
