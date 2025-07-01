import { useMemo } from 'react'
import { CosButton, CosStroke, CosTextArea } from '@cube-frontend/ui-library'
import { StepBoard } from '@cube-frontend/web-app/components/StepBoard/StepBoard'
import { UpsertTriggersPayload } from '../../upsertTriggersUtils'
import { TriggersPreviousButton } from '../TriggersPreviousButton'

type AddDescriptionProps = {
  isLoading: boolean
  nextButtonText: string
  payload: UpsertTriggersPayload
  onNameChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onPublishClick: (payload: UpsertTriggersPayload) => void
}

export const AddDescription = (props: AddDescriptionProps) => {
  const {
    isLoading,
    nextButtonText,
    payload,
    onNameChange,
    onDescriptionChange,
    onPublishClick: onPublishClickProp,
  } = props

  const isValueValid = useMemo(() => {
    // TODO: Implement actual validation logic
    if (!payload.name) return false
    return true
  }, [payload.name])

  const onPublishClick = () => {
    onPublishClickProp(payload)
  }

  return (
    <div className="flex flex-col gap-4">
      <StepBoard>
        <CosTextArea
          isLoading={isLoading}
          label="Description"
          placeholder="Description"
          maxLength={100000000}
          value={payload?.description}
          onChange={onDescriptionChange}
        />
        <CosTextArea
          isLoading={isLoading}
          label="Trigger ID name"
          placeholder="Trigger ID name"
          maxLength={100}
          value={payload?.name}
          onChange={onNameChange}
        />
      </StepBoard>
      <CosStroke type="dot" />
      <div className="flex items-center gap-x-4">
        <TriggersPreviousButton />
        <CosButton
          className="self-start"
          disabled={!isValueValid}
          onClick={onPublishClick}
        >
          {nextButtonText}
        </CosButton>
      </div>
    </div>
  )
}
