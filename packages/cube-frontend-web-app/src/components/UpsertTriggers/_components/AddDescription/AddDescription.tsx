import { useMemo } from 'react'
import { CosButton, CosStroke } from '@cube-frontend/ui-library'
import { StepBoard } from '@cube-frontend/web-app/components/StepBoard/StepBoard'
import { UpsertTriggersPayload } from '../../upsertTriggersUtils'
import { TriggersPreviousButton } from '../TriggersPreviousButton'

type AddDescriptionProps = {
  isLoading: boolean
  payload: UpsertTriggersPayload | undefined
  onNextClick: () => void
  nextButtonText: string
}

export const AddDescription = (props: AddDescriptionProps) => {
  const { onNextClick, nextButtonText } = props

  const isValueValid = useMemo(() => {
    // TODO: Implement actual validation logic
    return true
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <StepBoard>AddDescription</StepBoard>
      <CosStroke type="dot" />
      <div className="flex items-center gap-x-4">
        <TriggersPreviousButton />
        <CosButton
          className="self-start"
          disabled={!isValueValid}
          onClick={onNextClick}
        >
          {nextButtonText}
        </CosButton>
      </div>
    </div>
  )
}
