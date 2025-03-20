import { StoryLayout } from '../../../../internal/components/StoryLayout/StoryLayout'
import { CosButton, CosGeneralPanel } from '@cube-frontend/ui-library'
import { PanelBlock } from '../PanelBlock'
import { PanelDropdown, PanelIcon } from './MockComponents'

export const MultiPanelSection = () => {
  return (
    <StoryLayout.Section title="Layout - Multi Panel">
      <div className="flex flex-col gap-y-10">
        <PanelBlock title="Multi Panel">
          <div className="flex items-stretch gap-x-3 [&>*]:flex-1">
            <CosGeneralPanel
              topic="Topic Name"
              button={<CosButton>Call to Action</CosButton>}
              icon={<PanelIcon />}
              subtext="Subtext"
              titleBarProps={{
                title: 'Panel Title',
                dropdown: <PanelDropdown />,
              }}
            >
              Content Text
            </CosGeneralPanel>
            <CosGeneralPanel
              topic="Topic Name"
              icon={<PanelIcon />}
              titleBarProps={{
                title: 'Panel Title',
                dropdown: <PanelDropdown />,
              }}
            >
              Content Text
            </CosGeneralPanel>
          </div>
        </PanelBlock>

        <PanelBlock title="Multi Panel with 1 Title Bar">
          <CosGeneralPanel.Container>
            <CosGeneralPanel.TitleBar
              title="Panel Title"
              dropdown={<PanelDropdown />}
            />
            <div className="flex items-stretch gap-x-3 [&>*]:flex-1">
              <CosGeneralPanel
                topic="Topic Name"
                button={<CosButton>Call to Action</CosButton>}
                icon={<PanelIcon />}
                subtext="Subtext"
              >
                Content Text
              </CosGeneralPanel>
              <CosGeneralPanel topic="Topic Name" icon={<PanelIcon />}>
                Content Text
              </CosGeneralPanel>
            </div>
          </CosGeneralPanel.Container>
        </PanelBlock>

        <PanelBlock title="Without Title Bar">
          <div className="flex gap-x-3 [&>*]:flex-1">
            <CosGeneralPanel topic="Topic Name">Content Text</CosGeneralPanel>
            <CosGeneralPanel topic="Topic Name">Content Text</CosGeneralPanel>
            <CosGeneralPanel topic="Topic Name">Content Text</CosGeneralPanel>
          </div>
        </PanelBlock>
      </div>
    </StoryLayout.Section>
  )
}
