import {
  CosButton,
  CosGeneralPanel,
  CosInput,
  CosStroke,
  CosTextArea,
} from '@cube-frontend/ui-library'
import { UpsertTriggersPayload } from '../../upsertTriggersUtils'
import { TriggersPreviousButton } from '../TriggersPreviousButton'
import { twMerge } from 'tailwind-merge'

type AddDescriptionProps = {
  isLoading: boolean
  isPublishing: boolean
  /**
   * @default false
   */
  isEditMode?: boolean
  nextButtonText: string
  payload: UpsertTriggersPayload
  errorMessage?: string | undefined
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onPublishClick: (payload: UpsertTriggersPayload) => Promise<void>
}

export const AddDescription = (props: AddDescriptionProps) => {
  const {
    isLoading,
    isPublishing,
    isEditMode = false,
    nextButtonText,
    payload,
    errorMessage,
    onNameChange,
    onDescriptionChange,
    onPublishClick,
  } = props

  const isValueValid = !!payload.name

  return (
    <div className="flex flex-col gap-y-4">
      <CosGeneralPanel>
        <div className="flex flex-col gap-y-4">
          <CosInput
            isLoading={isLoading}
            label="Trigger Name (used for identification)"
            placeholder="Name"
            value={payload?.name}
            onChange={onNameChange}
            className={twMerge(
              'max-w-[512px]',
              isEditMode && 'cursor-not-allowed',
            )}
            disabled={isEditMode}
          />
          <CosTextArea
            isLoading={isLoading}
            label="Description"
            placeholder="Description"
            maxLength={200}
            value={payload?.description}
            onChange={onDescriptionChange}
          />
        </div>
      </CosGeneralPanel>
      <CosStroke type="dot" />
      {errorMessage && (
        <div className="primary-body3 text-status-negative">{errorMessage}</div>
      )}
      <div className="flex items-center gap-x-4">
        <TriggersPreviousButton />
        <CosButton
          loading={isPublishing}
          disabled={!isValueValid}
          onClick={() => onPublishClick(payload)}
          className="self-start"
        >
          {nextButtonText}
        </CosButton>
      </div>
    </div>
  )
}
