import { noop } from 'lodash'
import { StoryLayout } from '../../../../internal/components/StoryLayout/StoryLayout'
import { CosDashboardPanel } from '../../../../components/CosPanel/CosDashboardPanel/CosDashboardPanel'
import { CosButton } from '../../../../components/CosButton/CosButton'

export const MultiPanelSection = () => {
  return (
    <StoryLayout.Section title="Layout - Multi-Panel">
      <div className="flex flex-col gap-y-3">
        <div className="flex gap-x-3">
          <CosDashboardPanel
            title="Panel Title"
            time="yyyy/mm/dd 00:00"
            hyperLinkProps={{ onClick: noop }}
          >
            <CosDashboardPanel.Item
              topic="Topic Name"
              subtext="Subtext"
              button={<CosButton>Call to Action</CosButton>}
            >
              Content Text
            </CosDashboardPanel.Item>
          </CosDashboardPanel>
          <CosDashboardPanel
            title="Panel Title"
            time="yyyy/mm/dd 00:00"
            hyperLinkProps={{ onClick: noop }}
          >
            <CosDashboardPanel.Item
              topic="Topic Name"
              subtext="Subtext"
              button={<CosButton>Call to Action</CosButton>}
            >
              Content Text
            </CosDashboardPanel.Item>
          </CosDashboardPanel>
        </div>

        <CosDashboardPanel
          title="Panel Title"
          time="yyyy/mm/dd 00:00"
          hyperLinkProps={{ onClick: noop }}
        >
          <CosDashboardPanel.Item
            topic="Topic Name"
            subtext="Subtext"
            button={<CosButton>Call to Action</CosButton>}
          >
            Content Text
          </CosDashboardPanel.Item>
        </CosDashboardPanel>

        <CosDashboardPanel
          title="Panel Title"
          time="yyyy/mm/dd 00:00"
          hyperLinkProps={{ onClick: noop }}
        >
          <CosDashboardPanel.Item
            topic="Topic Name"
            subtext="Subtext"
            button={<CosButton>Call to Action</CosButton>}
          >
            Content Text
          </CosDashboardPanel.Item>
        </CosDashboardPanel>
      </div>
    </StoryLayout.Section>
  )
}
