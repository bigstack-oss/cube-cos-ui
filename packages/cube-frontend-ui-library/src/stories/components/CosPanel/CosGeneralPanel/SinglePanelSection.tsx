import { StoryLayout } from '../../../../internal/components/StoryLayout/StoryLayout'
import {
  CosButton,
  CosGeneralPanel,
  CosGeneralPanelTitleBar,
} from '@cube-frontend/ui-library'
import { PanelBlock } from '../PanelBlock'
import { PanelDropdown, PanelIcon } from './MockComponents'

export const SinglePanelSection = () => {
  return (
    <StoryLayout.Section title="Layout - Single Panel">
      <div className="flex flex-col gap-y-10">
        <PanelBlock title="Master">
          <CosGeneralPanelTitleBar
            title="Panel Title"
            time="yyyy/mm/dd 00:00"
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

        <PanelBlock title="Title Bar Without Time">
          <CosGeneralPanelTitleBar
            title="Panel Title"
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

        <PanelBlock title="Title Bar Without Dropdown">
          <CosGeneralPanelTitleBar title="Panel Title" />
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

        <PanelBlock title="Without Title Bar">
          <CosGeneralPanel
            topic="Topic Name"
            button={<CosButton>Call to Action</CosButton>}
            dropdown={<PanelDropdown />}
            subtext="Subtext"
          >
            Content Text
          </CosGeneralPanel>
        </PanelBlock>

        <PanelBlock title="Only Topic Name">
          <CosGeneralPanel topic="Topic Name">Content Text</CosGeneralPanel>
        </PanelBlock>

        <PanelBlock title="Only Content">
          <CosGeneralPanel>Content Text</CosGeneralPanel>
        </PanelBlock>

        <PanelBlock title="Multiple Dropdown">
          <CosGeneralPanelTitleBar
            title="Panel Title"
            time="yyyy/mm/dd 00:00"
            dropdown={<PanelDropdown />}
          />
          <CosGeneralPanel
            topic="Topic Name"
            button={<CosButton>Call to Action</CosButton>}
            icon={<PanelIcon />}
            dropdown={
              <div className="flex gap-x-2">
                {<PanelDropdown />}
                {<PanelDropdown />}
              </div>
            }
            subtext="Subtext"
          >
            Content Text
          </CosGeneralPanel>
        </PanelBlock>
      </div>
    </StoryLayout.Section>
  )
}
