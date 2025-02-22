import { noop } from 'lodash'
import { CosButton } from '../../../components/CosButton/CosButton'
import { CosPanel } from '../../../components/CosPanel/CosPanel'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { PanelBlock } from './PanelBlock'

export const SinglePanelSection = () => {
  return (
    <StoryLayout.Section title="Layout - Single Panel">
      <div className="flex flex-col gap-y-10">
        <PanelBlock title="Single Content box">
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
        </PanelBlock>

        <PanelBlock title="Multi Content box - Vertical">
          <CosPanel
            title="Panel Title"
            time="yyyy/mm/dd 00:00"
            hyperLinkProps={{ onClick: noop }}
          >
            <CosPanel.Item topic="Topic Name" subtext="Subtext">
              Content Text
            </CosPanel.Item>
            <CosPanel.Item topic="Topic Name" subtext="Subtext">
              Content Text
            </CosPanel.Item>
          </CosPanel>
        </PanelBlock>

        <PanelBlock title="Multi Content box - Horizontal">
          <CosPanel
            title="Panel Title"
            time="yyyy/mm/dd 00:00"
            hyperLinkProps={{ onClick: noop }}
          >
            <CosPanel.Row className="[&>*]:flex-1">
              <CosPanel.Item topic="Topic Name" subtext="Subtext">
                Content Text
              </CosPanel.Item>
              <CosPanel.Item topic="Topic Name" subtext="Subtext">
                Content Text
              </CosPanel.Item>
            </CosPanel.Row>
          </CosPanel>
        </PanelBlock>

        <PanelBlock title="Multi Content box - Complex">
          <CosPanel
            title="Panel Title"
            time="yyyy/mm/dd 00:00"
            hyperLinkProps={{ onClick: noop }}
          >
            <CosPanel.Row>
              <CosPanel.Col className="flex-1">
                <CosPanel.Item topic="Topic Name" subtext="Subtext">
                  Content Text
                </CosPanel.Item>
                <CosPanel.Item topic="Topic Name" subtext="Subtext">
                  Content Text
                </CosPanel.Item>
              </CosPanel.Col>
              <CosPanel.Item
                className="w-[460px]"
                topic="Topic Name"
                subtext="Subtext"
                button={<CosButton>Call to Action</CosButton>}
              >
                Content Text
              </CosPanel.Item>
            </CosPanel.Row>
          </CosPanel>
        </PanelBlock>

        <CosPanel
          title="Panel Title"
          time="yyyy/mm/dd 00:00"
          hyperLinkProps={{ onClick: noop }}
        >
          <CosPanel.Row className="[&>*]:flex-1">
            <CosPanel.Item topic="Topic Name" subtext="Subtext">
              Content Text
            </CosPanel.Item>
            <CosPanel.Item topic="Topic Name" subtext="Subtext">
              Content Text
            </CosPanel.Item>
          </CosPanel.Row>
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
