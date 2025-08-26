import { StoryLayout } from '../../../../internal/components/StoryLayout/StoryLayout'
import { PanelBlock } from '../PanelBlock'
import { CosGeneralPanel } from '@cube-frontend/ui-library'
import { PanelButton, PanelDropdown, PanelIcon } from './MockComponents'

export const SkeletonSection = () => {
  return (
    <StoryLayout.Section title="Skeleton">
      <div className="flex flex-col gap-y-10">
        <PanelBlock title="Time Loading">
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
              time: '',
              isTimeLoading: true,
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
