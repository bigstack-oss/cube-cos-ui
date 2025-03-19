import { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { CosStepProcess } from '../../../components/CosStepProcess/CosStepProcess'
import { StepProcessGrid } from './StepProcessGrid'

const meta = {
  title: 'Molecules/Step Process',
} satisfies Meta<typeof CosStepProcess>

export default meta

const steps = [
  { serialNumber: 1, label: 'Step Title 1' },
  { serialNumber: 2, label: 'Step Title 2' },
  { serialNumber: 3, label: 'Step Title 3' },
  { serialNumber: 4, label: 'Step Title 4' },
  { serialNumber: 5, label: 'Step Title 5' },
]

export const Gallery: StoryObj = {
  args: {},
  render: function Render() {
    return (
      <StoryLayout title="Step Process">
        <StoryLayout.Section title="Step Process">
          <StepProcessGrid title="Default">
            <CosStepProcess isLoading={false}>
              {steps.map((step) => (
                <CosStepProcess.Item
                  key={`default-${step.label}`}
                  serialNumber={step.serialNumber}
                  label={step.label}
                  isActive={false}
                />
              ))}
            </CosStepProcess>
          </StepProcessGrid>
          <StepProcessGrid title="Active">
            <CosStepProcess isLoading={false}>
              {steps.map((step) => (
                <CosStepProcess.Item
                  key={`active-${step.label}`}
                  serialNumber={step.serialNumber}
                  label={step.label}
                  isActive={true}
                />
              ))}
            </CosStepProcess>
          </StepProcessGrid>
        </StoryLayout.Section>
        <StoryLayout.Section title="Layout">
          <StepProcessGrid title="Current Head">
            <CosStepProcess isLoading={false}>
              {steps.map((step) => (
                <CosStepProcess.Item
                  key={`current-head-${step.label}`}
                  serialNumber={step.serialNumber}
                  label={step.label}
                  isActive={step === steps[0]}
                />
              ))}
            </CosStepProcess>
          </StepProcessGrid>
          <StepProcessGrid title="Current Middle">
            <CosStepProcess isLoading={false}>
              {steps.map((step) => (
                <CosStepProcess.Item
                  key={`current-middle-${step.label}`}
                  serialNumber={step.serialNumber}
                  label={step.label}
                  isActive={step === steps[2]}
                />
              ))}
            </CosStepProcess>
          </StepProcessGrid>
          <StepProcessGrid title="Current Final">
            <CosStepProcess isLoading={false}>
              {steps.map((step) => (
                <CosStepProcess.Item
                  key={`current-final-${step.label}`}
                  serialNumber={step.serialNumber}
                  label={step.label}
                  isActive={step === steps[4]}
                />
              ))}
            </CosStepProcess>
          </StepProcessGrid>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <StepProcessGrid title="Regular">
            <CosStepProcess isLoading={true} />
          </StepProcessGrid>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
