import { CosCheckbox, CosInput } from '@cube-frontend/ui-library'
import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { ModalStoryRow } from './ModalStoryRow'

const meta = {
  title: 'Organisms/Modal',
} satisfies Meta

export default meta

export const Gallery: StoryObj = {
  render: () => {
    return (
      <StoryLayout title="Modal">
        <StoryLayout.Section title="Size">
          <ModalStoryRow
            label="SM"
            size="sm"
            content="This is a small modal."
          />
          <ModalStoryRow
            label="MD"
            size="md"
            content="This is a medium modal."
          />
        </StoryLayout.Section>
        <StoryLayout.Section title="Usage">
          <ModalStoryRow
            label="Text"
            content="Do you want to delete this resource?"
          />
          <ModalStoryRow
            label="Input"
            content={
              <CosInput
                label="Label"
                placeholder="Input text"
                helpMessage="Helper text"
              />
            }
          />
          <ModalStoryRow
            label="Multi-input"
            content={
              <div className="flex flex-col gap-y-5">
                <p>Description</p>
                <CosInput
                  label="Label 1"
                  placeholder="Input text 1"
                  helpMessage="Helper text 1"
                />
                <CosInput
                  label="Label 2"
                  placeholder="Input text 2"
                  helpMessage="Helper text 2"
                />
                <CosInput
                  label="Label 3"
                  placeholder="Input text 3"
                  helpMessage="Helper text 3"
                />
              </div>
            }
          />
          <ModalStoryRow
            label="Checkbox"
            content={
              <div className="grid grid-cols-4 gap-y-3">
                {Array.from({
                  length: 23,
                }).map((_, index) => (
                  <CosCheckbox key={index} label={`Item ${index + 1}`} />
                ))}
              </div>
            }
            actionText="Add Attribute"
          />
        </StoryLayout.Section>
        <StoryLayout.Section title="Overflow">
          <ModalStoryRow
            label="SM & x-axis"
            size="sm"
            content={
              <div className="w-[150dvw]">
                This container overflows on the x-axis.
              </div>
            }
          />
          <ModalStoryRow
            label="SM & y-axis"
            size="sm"
            content={
              <div className="h-[150dvh]">
                This container overflows on the y-axis.
              </div>
            }
          />
          <ModalStoryRow
            label="MD & Both Axis"
            size="md"
            content={
              <div className="h-[150dvh] w-[150dvw]">
                This container overflows on both axis.
              </div>
            }
          />
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
