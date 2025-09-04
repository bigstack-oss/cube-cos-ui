import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { CosButton } from '../../../components/CosButton/CosButton'
import { CosCollapsiblePanelLayout } from '../../../components/CosCollapsiblePanelLayout/CosCollapsiblePanelLayout'
import { PanelLayoutSection } from './PanelLayoutSection'
import { CollapsiblePanelLayout } from './CollapsiblePanelLayout'

const meta = {
  title: 'Organisms/Collapsible Panels',
} satisfies Meta<typeof CosCollapsiblePanelLayout>

export default meta

export const Gallery: StoryObj<typeof CosCollapsiblePanelLayout> = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false)

    const onToggle = () => {
      setIsOpen((prev) => !prev)
    }

    return (
      <StoryLayout title="Collapsible Panel Layout">
        <StoryLayout.Section title="Collapsible Panel Layout">
          <PanelLayoutSection
            title="Master"
            description="Uncontrolled / Default Open"
          >
            <CollapsiblePanelLayout />
          </PanelLayoutSection>
          <PanelLayoutSection
            title="Master"
            description="Controlled / Default Close"
          >
            <CollapsiblePanelLayout
              isControlledPanelOpen={isOpen}
              onControlledPanelOpenChange={onToggle}
            />
          </PanelLayoutSection>
          <PanelLayoutSection title="Custom Toggle Button">
            <CollapsiblePanelLayout
              customToggleButton={<CosButton>Toggle Me!</CosButton>}
            />
          </PanelLayoutSection>
          <PanelLayoutSection title="Custom Right Panel Width">
            <CollapsiblePanelLayout rightPanelWidthPercentage={30} />
          </PanelLayoutSection>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
