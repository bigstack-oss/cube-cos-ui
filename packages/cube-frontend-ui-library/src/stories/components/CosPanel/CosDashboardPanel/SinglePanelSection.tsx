import { noop } from 'lodash'
import { CosButton } from '../../../../components/CosButton/CosButton'
import { CosDashboardPanel } from '../../../../components/CosPanel/CosDashboardPanel/CosDashboardPanel'
import { StoryLayout } from '../../../../internal/components/StoryLayout/StoryLayout'
import { PanelBlock } from '../PanelBlock'

export const SinglePanelSection = () => {
  return (
    <StoryLayout.Section title="Layout - Single Panel">
      <div className="flex flex-col gap-y-10">
        <PanelBlock title="Single Content box">
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
        </PanelBlock>

        <PanelBlock title="Single Content box - Error">
          <CosDashboardPanel
            title="Panel Title"
            time="yyyy/mm/dd 00:00"
            errorCount={1}
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
        </PanelBlock>

        <CosDashboardPanel
          title="Panel Title"
          time="yyyy/mm/dd 00:00"
          errorCount={2}
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

        <PanelBlock title="Multi Content box - Vertical">
          <CosDashboardPanel
            title="Panel Title"
            time="yyyy/mm/dd 00:00"
            hyperLinkProps={{ onClick: noop }}
          >
            <CosDashboardPanel.Item topic="Topic Name" subtext="Subtext">
              Content Text
            </CosDashboardPanel.Item>
            <CosDashboardPanel.Item topic="Topic Name" subtext="Subtext">
              Content Text
            </CosDashboardPanel.Item>
          </CosDashboardPanel>
        </PanelBlock>

        <PanelBlock title="Multi Content box - Horizontal">
          <CosDashboardPanel
            title="Panel Title"
            time="yyyy/mm/dd 00:00"
            hyperLinkProps={{ onClick: noop }}
          >
            <CosDashboardPanel.Row className="[&>*]:flex-1">
              <CosDashboardPanel.Item topic="Topic Name" subtext="Subtext">
                Content Text
              </CosDashboardPanel.Item>
              <CosDashboardPanel.Item topic="Topic Name" subtext="Subtext">
                Content Text
              </CosDashboardPanel.Item>
            </CosDashboardPanel.Row>
          </CosDashboardPanel>
        </PanelBlock>

        <PanelBlock title="Multi Content box - Complex">
          <CosDashboardPanel
            title="Panel Title"
            time="yyyy/mm/dd 00:00"
            hyperLinkProps={{ onClick: noop }}
          >
            <CosDashboardPanel.Row>
              <CosDashboardPanel.Col>
                <CosDashboardPanel.Item topic="Topic Name" subtext="Subtext">
                  Content Text
                </CosDashboardPanel.Item>
                <CosDashboardPanel.Item topic="Topic Name" subtext="Subtext">
                  Content Text
                </CosDashboardPanel.Item>
              </CosDashboardPanel.Col>
              <CosDashboardPanel.Item
                className="w-[460px]"
                topic="Topic Name"
                subtext="Subtext"
                button={<CosButton>Call to Action</CosButton>}
              >
                Content Text
              </CosDashboardPanel.Item>
            </CosDashboardPanel.Row>
          </CosDashboardPanel>
        </PanelBlock>

        <CosDashboardPanel
          title="Panel Title"
          time="yyyy/mm/dd 00:00"
          hyperLinkProps={{ onClick: noop }}
        >
          <CosDashboardPanel.Row className="[&>*]:flex-1">
            <CosDashboardPanel.Item topic="Topic Name" subtext="Subtext">
              Content Text
            </CosDashboardPanel.Item>
            <CosDashboardPanel.Item topic="Topic Name" subtext="Subtext">
              Content Text
            </CosDashboardPanel.Item>
          </CosDashboardPanel.Row>
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
