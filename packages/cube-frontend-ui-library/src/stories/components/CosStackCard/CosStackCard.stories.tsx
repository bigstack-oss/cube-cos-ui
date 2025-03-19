import { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { CosStackCard } from '../../../components/CosStackCard/CosStackCard'
import { CosTag } from '../../../components/CosTag/CosTag'
import { StackCardGrid } from './StackCardGrid'

const meta = {
  title: 'Molecules/Stack Card',
  component: CosStackCard,
} satisfies Meta<typeof CosStackCard>

export default meta

export const Default: StoryObj = {
  args: {},
  render: function Render() {
    return (
      <StoryLayout
        title="Stack Card"
        desc="Stack Card is only allowed to be used on a white background, and it is not permitted to be used on a gray background."
      >
        <StoryLayout.Section title="Stack Card">
          <StackCardGrid title="Master">
            <CosStackCard title="Topic Name" subtext="Subtext">
              Content Text
            </CosStackCard>
          </StackCardGrid>
        </StoryLayout.Section>
        <StoryLayout.Section title="Usage">
          <StackCardGrid title="With Tags">
            <CosStackCard title="Topic Name" subtext="Subtext">
              <div className="flex gap-2">
                {Array.from({ length: 6 }).map(() => (
                  <CosTag
                    color="blue"
                    variant="stroke"
                    showCloseButton={true}
                    onClose={() => {}}
                  >
                    Component
                  </CosTag>
                ))}
              </div>
            </CosStackCard>
          </StackCardGrid>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
