import { useContext } from 'react'
import { CosStroke } from '@cube-frontend/ui-library'
import { TriggersStepDescription } from './TriggersStepDescription/TriggersStepDescription'
import { TriggersStepResponse } from './TriggersStepResponse/TriggersStepResponse'
import { TriggersStepTemplate } from './TriggersStepTemplate/TriggersStepTemplate'
import { TriggersStepEvent } from './TriggersStepEvents/TriggersStepEvents'
import { TriggersCreateActionButton } from './TriggersCreateActionButton'
import { TriggersCreateContext } from './context'

export const TriggersCreateForm = () => {
  const { activeStep } = useContext(TriggersCreateContext)

  const renderContent = () => {
    if (activeStep.label === 'Select Template') {
      return <TriggersStepTemplate />
    }

    if (activeStep.label === 'Select Events') {
      return <TriggersStepEvent />
    }

    if (activeStep.label === 'Set Response') {
      return <TriggersStepResponse />
    }

    if (activeStep.label === 'Add Description') {
      return <TriggersStepDescription />
    }

    throw new Error(`Unhandled step ${activeStep}`)
  }

  return (
    <div className="flex flex-col gap-4">
      {renderContent()}
      <CosStroke type="dot" />
      <TriggersCreateActionButton />
    </div>
  )
}
