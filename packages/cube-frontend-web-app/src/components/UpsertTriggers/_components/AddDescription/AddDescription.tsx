import { useMemo } from 'react'
import { CosButton, CosStroke, CosTextArea } from '@cube-frontend/ui-library'
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
      <StepBoard>
        <CosTextArea
          label="Description"
          placeholder="Description"
          maxLength={100000000}
        />
        <CosTextArea
          label="Trigger ID name"
          placeholder="Trigger ID name"
          maxLength={100}
        />
      </StepBoard>
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
