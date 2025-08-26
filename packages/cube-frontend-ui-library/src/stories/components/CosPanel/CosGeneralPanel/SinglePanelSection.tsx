import { noop } from 'lodash'
import { StoryLayout } from '../../../../internal/components/StoryLayout/StoryLayout'
import { CosGeneralPanel } from '@cube-frontend/ui-library'
import { PanelBlock } from '../PanelBlock'
import { PanelButton, PanelDropdown, PanelIcon } from './MockComponents'

export const SinglePanelSection = () => {
  return (
    <StoryLayout.Section title="Layout - Single Panel">
      <div className="flex flex-col gap-y-10">
        <PanelBlock title="Master">
          <CosGeneralPanel
            topic="Topic Name"
            leftSlot={<PanelButton />}
            rightSlot={
              <>
                <PanelIcon />
                <PanelDropdown />
              </>
            }
            subtext="Subtext"
            titleBarProps={{
              title: 'Panel Title',
              time: 'yyyy/mm/dd 00:00',
              dropdown: <PanelDropdown />,
              hyperLinkProps: { children: 'Call to action', onClick: noop },
            }}
          >
            Content Text
          </CosGeneralPanel>
        </PanelBlock>

        <PanelBlock title="Title Bar Without Time">
          <CosGeneralPanel
            topic="Topic Name"
            leftSlot={<PanelButton />}
            rightSlot={
              <>
                <PanelIcon />
                <PanelDropdown />
              </>
            }
            subtext="Subtext"
            titleBarProps={{
              title: 'Panel Title',
              dropdown: <PanelDropdown />,
            }}
          >
            Content Text
          </CosGeneralPanel>
        </PanelBlock>

        <PanelBlock title="Title Bar Without Dropdown">
          <CosGeneralPanel
            topic="Topic Name"
            leftSlot={<PanelButton />}
            rightSlot={
              <>
                <PanelIcon />
                <PanelDropdown />
              </>
            }
            subtext="Subtext"
            titleBarProps={{
              title: 'Panel Title',
            }}
          >
            Content Text
          </CosGeneralPanel>
        </PanelBlock>

        <PanelBlock title="Without Title Bar">
          <CosGeneralPanel
            topic="Topic Name"
            leftSlot={<PanelButton />}
            rightSlot={
              <>
                <PanelIcon />
                <PanelDropdown />
              </>
            }
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
          <CosGeneralPanel
            topic="Topic Name"
            leftSlot={<PanelButton />}
            rightSlot={
              <>
                <PanelIcon />
                <PanelDropdown />
                <PanelDropdown />
              </>
            }
            subtext="Subtext"
            titleBarProps={{
              title: 'Panel Title',
              time: 'yyyy/mm/dd 00:00',
              dropdown: <PanelDropdown />,
            }}
          >
            Content Text
          </CosGeneralPanel>
        </PanelBlock>
      </div>
    </StoryLayout.Section>
  )
}
