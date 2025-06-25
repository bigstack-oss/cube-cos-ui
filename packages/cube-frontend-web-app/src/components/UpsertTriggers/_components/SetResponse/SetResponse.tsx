import { useMemo } from 'react'
import { CosButton, CosStroke } from '@cube-frontend/ui-library'
import ChevronRight from '@cube-frontend/ui-library/icons/monochrome/chevron_right.svg?react'
import { StepBoard } from '@cube-frontend/web-app/components/StepBoard/StepBoard'
import { UpsertTriggersPayload } from '../../upsertTriggersUtils'
import { TriggersPreviousButton } from '../TriggersPreviousButton'

export type SetResponseProps = {
  isLoading: boolean
  payload: UpsertTriggersPayload | undefined
  onNextClick: () => void
}

export const SetResponse = (props: SetResponseProps) => {
  const { onNextClick } = props

  const isValueValid = useMemo(() => {
    // TODO: Implement actual validation logic
    return true
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <StepBoard>SetResponse</StepBoard>
      <CosStroke type="dot" />
      <div className="flex items-center gap-x-4">
        <TriggersPreviousButton />
        <CosButton
          className="self-start"
          usage="icon-right"
          Icon={ChevronRight}
          disabled={!isValueValid}
          onClick={onNextClick}
        >
          Next
        </CosButton>
      </div>
    </div>
  )
}
