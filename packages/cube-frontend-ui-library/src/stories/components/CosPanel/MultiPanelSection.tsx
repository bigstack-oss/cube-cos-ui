import { noop } from 'lodash'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { CosPanel } from '../../../components/CosPanel/CosPanel'
import { CosButton } from '../../../components/CosButton/CosButton'

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
            <CosPanel.Item
              topic="Topic Name"
              subtext="Subtext"
              button={<CosButton>Call to Action</CosButton>}
            >
              Content Text
            </CosPanel.Item>
          </CosPanel>
          <CosPanel
            title="Panel Title"
            time="yyyy/mm/dd 00:00"
            hyperLinkProps={{ onClick: noop }}
          >
            <CosPanel.Item
              topic="Topic Name"
              subtext="Subtext"
              button={<CosButton>Call to Action</CosButton>}
            >
              Content Text
            </CosPanel.Item>
          </CosPanel>
        </div>

        <CosPanel
          title="Panel Title"
          time="yyyy/mm/dd 00:00"
          hyperLinkProps={{ onClick: noop }}
        >
          <CosPanel.Item
            topic="Topic Name"
            subtext="Subtext"
            button={<CosButton>Call to Action</CosButton>}
          >
            Content Text
          </CosPanel.Item>
        </CosPanel>

        <CosPanel
          title="Panel Title"
          time="yyyy/mm/dd 00:00"
          hyperLinkProps={{ onClick: noop }}
        >
          <CosPanel.Item
            topic="Topic Name"
            subtext="Subtext"
            button={<CosButton>Call to Action</CosButton>}
          >
            Content Text
          </CosPanel.Item>
        </CosPanel>
      </div>
    </StoryLayout.Section>
  )
}
